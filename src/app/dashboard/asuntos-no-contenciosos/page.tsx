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
  "numeroProceso",
  "tipoActo",
  "dataContratantes",
  "file1",
  "file2",
  "file3",
  "file4",
];

// Función para verificar si un formulario está completo
const isFormularioCompleto = (tramite: any): boolean => {
  const generalFieldsValid = requiredFields.every((field) => {
    const value = tramite[field];
    return value !== null && value !== undefined && value !== "";
  });

  return generalFieldsValid;
};

export default function AsuntosNoContenciososDashboardPage() {
  const [tramites, setTramites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Diccionario de secciones basadas en estado
  const seccionesPorEstado: SeccionesPorEstado = {
    PENDIENTE: ["Formulario incompleto", "Formulario completado", "Enviar correo/Lost", "En observación"],
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

        const asuntosNoContenciososDetails = await ApiDataFetcher.fetchTramitesByType(
          "asuntos-no-contenciosos"
        );
        //console.log("Detalles de asuntos-no-contenciosos:", asuntosNoContenciososDetails);

        const matchedTramites = await Promise.all(
          asuntosNoContenciososDetails.map(async (detalle: any) => {
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
              name: usuario ? usuario.nombres : "Nombre no disponible",
              apellidos: usuario ? usuario.apellidos : "Apellidos no disponibles",
              formularioCompleto: isFormularioCompleto(detalle),
            };
          })
        );

        //console.log("Trámites finalizados:", matchedTramites);
        setTramites(matchedTramites);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Asuntos No Contenciosos data:", error);
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
      if (seccion === "Enviar correo/Lost") {
        return (
          tramite.estado === estado &&
          (!tramite.file1 || !tramite.file2 || !tramite.file3 || !tramite.file4)
        );
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
          <strong>Tipo de Acto:</strong> {tramite.tipoActo || "Desconocido"}
        </p>
        <p>
          <strong>Tipo de Documento Contratante principal:</strong> {tramite.dataContratantes?.[0]?.tipoDocumento || "Desconocido"}
        </p>
        <p>
          <strong>Número de Documento Contratante principal:</strong> {tramite.dataContratantes?.[0]?.numeroDocumento || "No disponible"}
        </p>
        <p>
          <strong>Contratantes:</strong>
        </p>
        <ul className="list-disc list-inside">
          {tramite.dataContratantes?.map((contratante: any, index: number) => (
            <li key={index}>
              {contratante.nombres} {contratante.apellidoPaterno} {contratante.apellidoMaterno}
            </li>
          ))}
        </ul>
        <p>
          <strong>Correo:</strong> {tramite.correo || "No disponible"}
        </p>
        <p>
          <strong>Fecha de Creación:</strong> {tramite.createdAt
            ? new Date(tramite.createdAt).toLocaleString()
            : "No disponible"}
        </p>
        {seccion === "Enviar correo/Lost" && (
          <div>
            <p className="text-red-400">
              <strong>Faltan:</strong> {" "}
              {!tramite.file1 && "Archivo 1, "}
              {!tramite.file2 && "Archivo 2, "}
              {!tramite.file3 && "Archivo 3, "}
              {!tramite.file4 && "Archivo 4"}
            </p>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:ml-[0px] ml-[74px]">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Dashboard de Asuntos No Contenciosos
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
