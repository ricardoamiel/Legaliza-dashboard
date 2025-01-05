"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ApiDataFetcher from "@/app/tramites/[id]/components/ApiDataFetcher";
import { ToggleProps } from "@/interfaces/types";
import CartaNotarialFormTab from "../components/CartaNotarialFormTab"; // Importa el formulario
import AperturaLibroFormTab from "../components/AperturaLibroFormTab";
import PermisoDeViajeFormTab from "../components/PermisoViajeFormTab";
import PoderFueraDeRegistroFormTab from "../components/PoderFueraDeRegistroFormTab";
import ConstatacionDomiciliariaFormTab from "../components/ConstatacionDomiciliariaFormTab";
import EscrituraPublicaFormTab from "../components/EscrituraPublicaFormTab";
import AsuntosNoContenciososFormTab from "../components/AsuntosNoContenciososFormTab";
import TransferenciaVehicularFormTab from "../components/TransferenciaVehicularFormTab";
import ConstitucionEmpresaFormTab from "../components/ConstitucionEmpresaFormTab";

export default function ModificarTramite() {
  const { id } = useParams();
  const [tramiteData, setTramiteData] = useState<any>(null);
  
  const toggle: ToggleProps = {
    isOpen: true,
    onClose: () => {
      console.log("Modal closed");
    },
  };
  
  useEffect(() => {
    async function fetchData() {
      try {
        if (typeof id === "string") {
          const data = await ApiDataFetcher.fetchTramiteById(id);
          setTramiteData(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [id]);

  if (!tramiteData) {
    return <div className="text-white">Cargando datos del trámite...</div>;
  }

  const numeroProceso = tramiteData.data.numeroProceso;

  return (
    <div className="text-white p-6 overflow-y-auto h-screen pb-20"
        style={{ maxHeight: `calc(100vh - 150px)` }}
    >
      <h1 className="text-4xl font-bold mb-8 text-center pl-8 pr-8">
        Modificar Trámite
      </h1>
      {tramiteData.data.tipoTramite === "carta-notarial" && (
        <CartaNotarialFormTab tramiteId={id as string} numeroProceso={numeroProceso} toggle={toggle} />
      )}
      {tramiteData.data.tipoTramite === "apertura-de-libro" && (
        <AperturaLibroFormTab tramiteId={id as string} numeroProceso={numeroProceso} toggle={toggle} />
      )}
      {tramiteData.data.tipoTramite === "permiso-de-viaje" && (
        <PermisoDeViajeFormTab tramiteId={id as string} numeroProceso={numeroProceso} toggle={toggle} />
      )}
      {tramiteData.data.tipoTramite === "poder-fuera-de-registro" && (
        <PoderFueraDeRegistroFormTab tramiteId={id as string} numeroProceso={numeroProceso} toggle={toggle} />
      )}
      {tramiteData.data.tipoTramite === "constatacion-domiciliaria" && (
        <ConstatacionDomiciliariaFormTab tramiteId={id as string} numeroProceso={numeroProceso} toggle={toggle} />
      )}
      {tramiteData.data.tipoTramite === "escritura-publica" && (
        <EscrituraPublicaFormTab tramiteId={id as string} numeroProceso={numeroProceso} toggle={toggle} />
      )}
      {tramiteData.data.tipoTramite === "asuntos-no-contenciosos" && (
        <AsuntosNoContenciososFormTab tramiteId={id as string} numeroProceso={numeroProceso} toggle={toggle} />
      )}
      {tramiteData.data.tipoTramite === "transferencia-vehicular" && (
        <TransferenciaVehicularFormTab tramiteId={id as string} numeroProceso={numeroProceso} toggle={toggle} />
      )}
      {tramiteData.data.tipoTramite === "constitucion-empresa" && (
        <ConstitucionEmpresaFormTab tramiteId={id as string} numeroProceso={numeroProceso} toggle={toggle} />
      )}
    </div>
  );
}