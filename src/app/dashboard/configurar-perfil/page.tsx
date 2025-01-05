"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import publicApiConfig from "@/config/public-api.config";
import { authConfig } from "@/context/auth.context";
import Button from "@/Components/ui/button/button";

const ProfileSettings = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get(authConfig.storageTokenKeyName);
      const userId = Cookies.get(authConfig.storageUserId);

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

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Error al recuperar los datos del usuario");
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async (updatedData: any) => {
    const token = Cookies.get(authConfig.storageTokenKeyName);
    const userId = Cookies.get(authConfig.storageUserId);

    if (!token || !userId) {
      toast.error("No se encontró el token de autenticación o el ID del usuario");
      return;
    }

    try {
      const response = await fetch(publicApiConfig.apiUrl + "/users/" + userId, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setUserData(data);
      toast.success("Perfil actualizado con éxito");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error al actualizar el perfil");
    }
  };

  const handleChangePassword = async (currentPassword: string, newPassword: string) => {
    const token = Cookies.get(authConfig.storageTokenKeyName);
    const userId = Cookies.get(authConfig.storageUserId);

    if (!token || !userId) {
      toast.error("No se encontró el token de autenticación o el ID del usuario");
      return;
    }

    try {
      const response = await fetch(publicApiConfig.apiUrl + "/users/" + userId + "/change-password", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      toast.success("Contraseña actualizada con éxito");
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Error al cambiar la contraseña");
    }
  };

  if (!userData) {
    return <div className="text-white">Cargando datos...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-center mb-8">Configurar Perfil</h1>
      <div
        className="space-y-4 overflow-y-auto w-full px-4"
        style={{ maxHeight: `calc(100vh - 300px)` }}
      >
        <div className="w-full max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-4">Actualizar Perfil</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const updatedData = {
                nombres: formData.get("nombres"),
                apellidos: formData.get("apellidos"),
                email: formData.get("email"),
              };
              handleUpdateProfile(updatedData);
            }}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">Nombres</label>
              <input
                type="text"
                name="nombres"
                defaultValue={userData.nombres}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white h-12"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">Apellidos</label>
              <input
                type="text"
                name="apellidos"
                defaultValue={userData.apellidos}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white h-12"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                defaultValue={userData.email}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white h-12"
              />
            </div>
            <Button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Actualizar Perfil
            </Button>
          </form>
        </div>
        <div className="w-full max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-2xl font-bold text-center mb-4">Cambiar Contraseña</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const currentPassword = formData.get("currentPassword") as string;
              const newPassword = formData.get("newPassword") as string;
              handleChangePassword(currentPassword, newPassword);
            }}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">Contraseña Actual</label>
              <input
                type="password"
                name="currentPassword"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white h-12"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">Nueva Contraseña</label>
              <input
                type="password"
                name="newPassword"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white h-12"
              />
            </div>
            <Button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Cambiar Contraseña
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;