"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ApiDataFetcher from "./components/ApiDataFetcher";
import CartaNotarialDashboard from "./components/CartaNotarialDashboard";
import AperturaLibroDashboard from "./components/AperturaLibroDashboard";
import PermisoViajeDashboard from "./components/PermisoViajeDashboard";
import PoderFueraDeRegistroDashboard from "./components/PoderFueraDeRegistroDashboard";
import ConstatacionDomiciliariaDashboard from "./components/ConstatacionDomiciliariaDashboard";
import EscrituraPublicaDashboard from "./components/EscrituraPublicaDashboard";
import AsuntosNoContenciososDashboard from "./components/AsuntosNoContenciososDashboard";
import TransferenciaVehicularDashboard from "./components/TransferenciaVehicularDashboard";
import ConstitucionEmpresaDashboard from "./components/ConstitucionEmpresaDashboard";

export default function TramiteDetail() {
  const { id } = useParams();
  const [tramiteData, setTramiteData] = useState<any>(null);
  const [apiData, setApiData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      if (typeof id === 'string') {
        try {
          const data = await ApiDataFetcher.fetchTramiteById(id);
          console.log("Trámite general:", data);
          setTramiteData(data);
  
          if (data.data.tipoTramite && data.data.numeroProceso) {
            const apiDetails = await ApiDataFetcher.fetchApiDataByType(
              data.data.tipoTramite,
              data.data.numeroProceso
            );
            console.log("Datos específicos del trámite:", apiDetails);
            setApiData(apiDetails.data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        console.error("Invalid id:", id);
      }
    }
  
    fetchData();
  }, [id]);
  
  if (!tramiteData) {
    return <div className="text-white">Cargando datos generales del trámite...</div>;
  }

  if (!apiData) {
    return <div className="text-white">Cargando datos específicos del trámite...</div>;
  }

  const renderContent = () => {
    const { tipoTramite } = tramiteData.data;

    switch (tipoTramite) {
      case "carta-notarial":
        return <CartaNotarialDashboard tramite={apiData} />;
      case "apertura-de-libro":
        return <AperturaLibroDashboard tramite={apiData} />;
      case "permiso-de-viaje":
        return <PermisoViajeDashboard tramite={apiData} />;
      case "poder-fuera-de-registro":
        return <PoderFueraDeRegistroDashboard tramite={apiData} />;
      case "constatacion-domiciliaria":
        return <ConstatacionDomiciliariaDashboard tramite={apiData} />;
      case "escritura-publica":
        return <EscrituraPublicaDashboard tramite={apiData} />;
      case "asuntos-no-contenciosos":
        return <AsuntosNoContenciososDashboard tramite={apiData} />;
      case "transferencia-vehicular":
        return <TransferenciaVehicularDashboard tramite={apiData} />;
      case "constitucion-empresa":
        return <ConstitucionEmpresaDashboard tramite={apiData} />;
      default:
        return <p>No hay un diseño específico para este tipo de trámite.</p>;
    }
  };

  return (
    <div className="text-white p-6 overflow-y-auto h-screen pb-20">
      {/* Título ajustado */}
      <h1 className="text-4xl font-bold mb-8 text-center pl-8 pr-8">
        Detalles del Trámite
      </h1>
      {renderContent()}
    </div>
  );
}
