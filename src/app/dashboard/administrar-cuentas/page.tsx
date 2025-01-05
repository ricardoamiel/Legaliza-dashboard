"use client";

import React from "react";
import AllAccounts from "@/modules/administrar-cuentas/all-accounts"; // Asumiendo que este componente es el listado de todas las cuentas

export default function TodasLasCuentas() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        Administrar Todas las Cuentas
      </h1>
      <AllAccounts
        setCantCuentas={(value) => console.log("Cantidad de cuentas:", value)}
        setCantAdministradores={(value) =>
          console.log("Cantidad de administradores:", value)
        }
      />
    </div>
  );
}