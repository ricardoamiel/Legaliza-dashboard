"use client";

import React, { useEffect, useState } from "react";
import ApiDataFetcher from "@/app/tramites/[id]/components/ApiDataFetcher";

// Tipos para estados y secciones
type Estado = "PENDIENTE" | "COMPLETADO";
type SeccionesPorEstado = {
  PENDIENTE: string[];
  COMPLETADO: string[];
};

// Campos requeridos para un formulario completo
const requiredFields = [
  "idUsuario",
  "tipoConstitucion",
  "nombresEmpresa",
  "tipoSociedad",
  "actividadesEmpresa",
  //"descripcionEmpresa",
  "socios", // datosSocio
  "capitalSocial",
  "tipoAportacion",
  //"cantidadEfectivo",
  //"cantidadBienes",
  "representanteLegal", // datosRepresentante
  //"aporteBienes",
  //"aporteEfectivo",
  "correoEmpresa",
  "telefonoEmpresa",
  "direccionEmpresa",
  "tipoDomicilio",
  "tipoRegimen",
  "Bienes",
];

// Función para verificar si un formulario está completo
const isFormularioCompleto = (tramite: any): boolean => {
  // Validar campos generales
  const generalFieldsValid = requiredFields.every((field) => {
    const value = tramite[field];
    console.log("Campo", field, ":", value);
    return value !== null && value !== undefined && value !== "";
  });
  console.log("Campos generales válidos:", generalFieldsValid);

  // Validar que los arreglos específicos no estén vacíos
  const sociosValid = Array.isArray(tramite.socios) && tramite.socios.length > 0;
  const representanteLegalValid = Array.isArray(tramite.representanteLegal) && tramite.representanteLegal.length > 0;
  const bienesValid = Array.isArray(tramite.Bienes) && tramite.Bienes.length > 0;
  
  console.log("Socios válidos:", sociosValid);
  console.log("Representante legal válido:", representanteLegalValid);
  console.log("Bienes válidos:", bienesValid);
  
  // Retornar si todos los campos generales son válidos y los arreglos no están vacíos
  return generalFieldsValid && sociosValid && representanteLegalValid && bienesValid;
};
  

export default function ConstitucionEmpresaDashboardPage() {
  const [tramites, setTramites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Diccionario de secciones basadas en estado
  const seccionesPorEstado: SeccionesPorEstado = {
    PENDIENTE: ["Formulario incompleto", "Formulario completado","En observación"],
    COMPLETADO: ["Completados", "Pago realizado", "Firma agendada"],
  };

  // Función para obtener todos los trámites paginados
  const fetchAllTramites = async () => {
    let allTramites: any[] = [];
    let page = 1;
    const limit = 10;

    while (true) {
      try {
        const response = await ApiDataFetcher.fetchAllTramites(page, limit);

        if (response.data && response.data.length > 0) {
          allTramites = [...allTramites, ...response.data];
          page++;
        } else {
          break;
        }

        if (response.totalPages && page > response.totalPages) {
          break;
        }
      } catch (error) {
        console.error("Error fetching paginated tramites:", error);
        break;
      }
    }

    return allTramites;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const allTramites = await fetchAllTramites();
        //console.log("Todos los trámites recuperados:", allTramites);

        const constitucionEmpresaDetails = await ApiDataFetcher.fetchTramitesByType(
          "constitucion-empresa"
        );
        //console.log("Detalles de constitucion-empresa:", constitucionEmpresaDetails);

        const matchedTramites = await Promise.all(
          constitucionEmpresaDetails.map(async (detalle: any) => {
            const tramiteGeneral = allTramites.find(
              (t: any) => t.idTipoTramite === detalle._id
            );

            let usuario = null;
            if (detalle.idUsuario) {
              try {
                usuario = await ApiDataFetcher.fetchUserById(detalle.idUsuario);
              } catch (error) {
                console.error(
                  `Error fetching user for idUsuario ${detalle.idUsuario}:`,
                  error
                );
              }
            }

            return {
              ...detalle,
              estado: tramiteGeneral ? tramiteGeneral.estado : "Desconocido",
              
              correo: usuario ? usuario.email : "Correo no disponible",
              formularioCompleto: isFormularioCompleto(detalle),
            };
          })
        );

        //console.log("Trámites finalizados:", matchedTramites);
        setTramites(matchedTramites);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Constitución Empresa data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-white">Cargando datos...</div>;
  }

  const renderTramitesPorSeccion = (estado: Estado, seccion: string) => {
    const filteredTramites = tramites.filter((tramite) => {
      if (seccion === "Formulario incompleto") {
        return tramite.estado === estado && !tramite.formularioCompleto;
      }
      if (seccion === "Formulario completado") {
        return tramite.estado === estado && tramite.formularioCompleto;
      }
      if (seccion === "En observación") {
        return tramite.estado === estado && tramite.formularioCompleto;
      }
      return tramite.estado === estado;
    });

    if (filteredTramites.length === 0) {
      return <p className="text-gray-400">No hay trámites en esta sección.</p>;
    }

    return filteredTramites.map((tramite) => (
      <div
        key={tramite._id}
        className="bg-gray-700 rounded-lg p-4 shadow-md mb-4"
      >
        <p>
          <strong>Nombre de la Empresa:</strong> {tramite.nombresEmpresa?.[0] || "Desconocido"}
        </p>
        <p>
          <strong>Tipo de Sociedad:</strong> {tramite.tipoSociedad || "No disponible"}
        </p>
        <p>
          <strong>Actividades:</strong> {tramite.actividadesEmpresa?.join(", ") || "No disponible"}
        </p>
        <p>
          <strong>Correo Empresa:</strong> {tramite.correoEmpresa || "No disponible"}
        </p>
        <p>
          <strong>Teléfono Empresa:</strong> {tramite.telefonoEmpresa || "No disponible"}
        </p>
        <p>
          <strong>Fecha de Creación:</strong> {tramite.createdAt
            ? new Date(tramite.createdAt).toLocaleString()
            : "No disponible"}
        </p>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Dashboard de Constitución de Empresa
      </h1>
      <div className="w-full h-full overflow-auto">
        <div className="flex overflow-x-auto space-x-3">
          {Object.keys(seccionesPorEstado).map((estado) =>
            seccionesPorEstado[estado as Estado].map((seccion) => (
              <div
                key={`${estado}-${seccion}`}
                className="min-w-[300px] bg-gray-800 rounded-lg p-4 shadow-md"
              >
                <h2 className="text-xl font-semibold text-white mb-4">{seccion}</h2>
                <div
                  className="space-y-4 overflow-y-auto"
                  style={{ maxHeight: `calc(100vh - 300px)` }}
                >
                  {renderTramitesPorSeccion(estado as Estado, seccion)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
