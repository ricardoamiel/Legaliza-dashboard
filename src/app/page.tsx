"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { authConfig } from "@/context/auth.context";
import publicApiConfig from "@/config/public-api.config";

const MENU_OPTIONS = [
  { title: "Carta Notarial", route: "/dashboard/carta-notarial", color: "bg-[#14225E]" },
  { title: "Apertura de Libro", route: "/dashboard/apertura-de-libro", color: "bg-[#14225E]" },
  { title: "Permiso de Viaje", route: "/dashboard/permiso-de-viaje", color: "bg-[#14225E]" },
  { title: "Poder Fuera de Registro", route: "/dashboard/poder-fuera-de-registro", color: "bg-[#14225E]" },
  { title: "Constatación Domiciliaria", route: "/dashboard/constatacion-domiciliaria", color: "bg-[#14225E]" },
  { title: "Escritura Pública", route: "/dashboard/escritura-publica", color: "bg-[#14225E]" },
  { title: "Asuntos No Contenciosos", route: "/dashboard/asuntos-no-contenciosos", color: "bg-[#14225E]" },
  { title: "Transferencia Vehicular", route: "/dashboard/transferencia-vehicular", color: "bg-[#14225E]" },
  { title: "Constitución de Empresa", route: "/dashboard/constitucion-empresa", color: "bg-[#14225E]" },
];

export default function MainMenu() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const token = Cookies.get(authConfig.storageTokenKeyName);
      //console.log("token ",token);
      const userId = Cookies.get(authConfig.storageUserId); // Asumiendo que el ID del usuario se guarda en una cookie llamada "userId"
      //console.log("userId ",userId);
      if (!token || !userId) {
        toast.error("No se encontró el token de autenticación o el ID del usuario");
        return;
      }

      try {
        const response = await fetch(publicApiConfig.apiUrl + "/users/" + userId, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const userData = await response.json();
        setUserRole(userData.tipoUsuario);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Error al recuperar los datos del usuario");
      }
    };

    fetchUserRole();
  }, []);

  const handleMenuClick = (route: string) => {
    if (userRole !== "ADMINISTRADOR") {
      toast.error("No tienes permisos para visualizar los dashboard de los trámites");
      return;
    }

    router.push(route);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden md:ml-[0px] ml-[74px]">
      <div className="max-w-7xl mx-auto p-6 h-full flex flex-col">
        <h1 className="text-4xl font-bold text-center mb-8">
          Dashboards de trámites
        </h1>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 overflow-y-scroll"
          style={{
            maxHeight: "calc(100vh - 275px)", // Ajusta el espacio disponible
            scrollbarWidth: "none", // Oculta barra en Firefox
            msOverflowStyle: "none", // Oculta barra en IE y Edge
          }}
        >
          {MENU_OPTIONS.map((option, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-md cursor-pointer hover:scale-105 hover:shadow-lg transition-transform duration-300 ${option.color} mx-auto w-full max-w-[95%]`}
              onClick={() => handleMenuClick(option.route)}
            >
              <h2 className="text-2xl font-bold text-center truncate">
                {option.title}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}