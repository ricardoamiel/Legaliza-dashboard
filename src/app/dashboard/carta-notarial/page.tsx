"use client";

import React, { useEffect, useState } from "react";
import ApiDataFetcher from "@/app/tramites/[id]/components/ApiDataFetcher";
import { capitalize } from "@/modules/administrar-cuentas/utils/capitalize";

// Tipos para estados y secciones
type Estado = "PENDIENTE" | "COMPLETADO";
type SeccionesPorEstado = {
  PENDIENTE: string[];
  COMPLETADO: string[];
};

// Campos requeridos para un formulario completo
const requiredFields = [
  "datoRemitentes",
  "datoDestinatarios",
  "datoEntregaCarta",
  "datoEnviador",
  "idUsuario",
];

// Función para verificar si un formulario está completo
const isFormularioCompleto = (tramite: any): boolean => {
  return requiredFields.every((field) => {
    const value = tramite[field];
    if (Array.isArray(value)) {
      // Verificar que el array exista y tenga al menos un elemento
      return value.length > 0;
    }
    // Verificar que el valor no sea nulo, indefinido o vacío
    return value !== null && value !== undefined && value !== "";
  });
};

export default function CartaNotarialDashboardPage() {
  const [tramites, setTramites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Diccionario de secciones basadas en estado
  const seccionesPorEstado: SeccionesPorEstado = {
    PENDIENTE: [
      "Formulario incompleto",
      "Formulario completado",
      "En observación",
    ],
    COMPLETADO: [
      "Completados",
      "Pago realizado",
      "Firma agendada",
      "Agenda firma documentada",
      "Inscripción en Sunarp",
    ],
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
          page++; // Avanzamos a la siguiente página
        } else {
          break; // Terminamos el bucle si no hay más datos
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

        const cartaNotarialDetails = await ApiDataFetcher.fetchTramitesByType(
          "carta-notarial"
        );
        //console.log("Detalles de carta-notarial:", cartaNotarialDetails);

        const matchedTramites = await Promise.all(
          cartaNotarialDetails.map(async (detalle: any) => {
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
              name: usuario ? usuario.nombres : "Nombres no disponibles",
              apellidos: usuario ? usuario.apellidos : "Apellidos no disponibles",
              formularioCompleto: isFormularioCompleto(detalle),
            };
          })
        );

        //console.log("Trámites finalizados:", matchedTramites);
        setTramites(matchedTramites);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Carta Notarial data:", error);
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
          <strong>Tipo de Documento:</strong> {tramite.datoRemitentes?.[0]?.tipoDocumento || "Desconocido"}
        </p>
        <p>
          <strong>DNI:</strong>{" "}
          {tramite.datoRemitentes?.[0]?.numeroDocumento || "No disponible"}
        </p>
        <p>
          <strong>Remitente principal:</strong>{" "}
          {capitalize(tramite.name + ' ' + tramite.apellidos) || "Desconocido"}
        </p>
        <p>
          <strong>Correo:</strong> {tramite.correo || "No disponible"}
        </p>
        <p>
          <strong>Lugar de entrega:</strong>{" "}
          {tramite.datoEntregaCarta?.[0]?.lugarEntrega || "No disponible"}
        </p>
        <p>
          <strong>Fecha:</strong>{" "}
          {tramite.createdAt
            ? new Date(tramite.createdAt).toLocaleString()
            : "No disponible"}
        </p>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Dashboard de Carta Notarial
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
