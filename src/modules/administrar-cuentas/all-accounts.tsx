import Icon from "@/Components/ui/icon";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ProfileCard from "./profile-card";
import useToggle from "@/hooks/toggle.hook";
import Button from "@/Components/ui/button/button";
import AddCardModule from "./components/add-card.module";
import publicApiConfig from "@/config/public-api.config";
import { useQuery } from "@tanstack/react-query";
import { UpdateUserInput, Users } from "@/interfaces/types";
import DeleteCardModule from "./components/delete-card.module";
import EditCardModule from "./components/edit-card.module";
import { authConfig } from "@/context/auth.context";
import Cookies from "js-cookie";
import { Controller } from "react-hook-form";
import { rolesOptions } from "./utils/list-options";
import Select from "@/Components/ui/Select";
import { toast } from "sonner";

interface Props {
  setCantCuentas: (value: number) => void;
  setCantAdministradores: (value: number) => void;
}

const AllAccounts: React.FC<Props> = ({
  setCantCuentas,
  setCantAdministradores,
}) => {
  const addCard = useToggle();
  const deleteCard = useToggle();
  const editCard = useToggle();

  const token = Cookies.get(authConfig.storageTokenKeyName);

  const { data: users = [], refetch } = useQuery<Users>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch(publicApiConfig.apiUrl + "/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return response.json();
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    enabled: !!token,
  });

  const [deleteId, setDeleteId] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<Users>([]);

  useEffect(() => {
    setFilteredUsers(users);
    setCantCuentas(users.length);
    setCantAdministradores(
      users.filter((user) => user.tipoUsuario.includes("ADMINISTRADOR")).length
    );
  }, [users]);

  const [userData, setUserData] = useState<UpdateUserInput>({
    name: "",
    lastName: "",
    email: "",
    roles: "",
  });

  const handleSearchByEmail = async () => {
    try {
      const user = users.find((user: any) => user.email === email);

      if (!user) {
        toast.error("No se encontró ningún usuario con ese correo");
        return;
      }

      const response = await fetch(publicApiConfig.apiUrl + "/users/" + user._id, {
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

      setFilteredUsers([userData]); // Actualiza los datos con el usuario encontrado

      setUserData({
        name: userData.nombres,
        lastName: userData.apellidos,
        email: userData.email,
        roles: userData.tipoUsuario,
      });
      setDeleteId(userData._id);
      //editCard.onToggle();
    } catch (error) {
      console.error("Error searching by email:", error);
      toast.error("Error al buscar por correo");
    }
  };

  const handleFilterByRole = (role: string | null) => {
    setSelectedRole(role);
    if (role) {
      setFilteredUsers(users.filter((user) => user.tipoUsuario === role));
    } else {
      setFilteredUsers(users);
    }
  };

  return (
    <div className="flex flex-col h-screen pb-4 bg-gray-900 text-white overflow-hidden">
      <div className="grid grid-cols-3 gap-4 px-6 py-4">
        <div className="col-span-1">
          <p className="text-white font-bold">Cantidad de cuentas: {filteredUsers.length}</p>
        </div>
        <Button
          className="h-12 w-full max-w-[200px] bg-blue-600 hover:bg-blue-700 text-white rounded-lg border border-gray-700 font-bold focus:outline-none focus:ring-2 focus:ring-blue-600"
          onClick={addCard.onToggle}
        >
          + Crear nueva cuenta
        </Button>
        <Button
          className="col-span-1 h-12 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg border border-gray-700 font-bold focus:outline-none focus:ring-2 focus:ring-red-600"
          onClick={() => handleFilterByRole(null)}
        >
          Limpiar Filtros
        </Button>
      </div>

      <div
        className="flex-grow px-6 overflow-auto pb-4 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-700"
        style={{ maxHeight: `calc(100vh - 300px)` }}
      >
        <div className="mb-6 grid grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Buscar por correo del cliente"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="col-span-1 h-12 px-4 rounded-lg border border-gray-700 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <Select
            label="Filtrar por tipo"
            options={rolesOptions}
            value={selectedRole || ""}
            onChange={(e) => handleFilterByRole(e.value)}
            className="col-span-1 h-12 border border-gray-700 rounded-lg"
          />
          <button
            className="col-span-1 h-12 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg border border-gray-700 font-bold focus:outline-none focus:ring-2 focus:ring-red-600"
            onClick={handleSearchByEmail}
          >
            Buscar
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <ProfileCard
              key={user._id}
              //imageSrc={"/default-profile.png"}
              name={`${user.nombres} ${user.apellidos}`}
              role={user.tipoUsuario.replace("_", " ")}
              roleIcon="Rol:"
              onEdit={() => {
                editCard.onToggle();
                setUserData({
                  name: user.nombres,
                  lastName: user.apellidos,
                  email: user.email,
                  roles: user.tipoUsuario,
                });
                setDeleteId(user._id);
              }}
              onDelete={() => {
                deleteCard.onToggle();
                setDeleteId(user._id);
              }}
            />
          ))}
        </div>
      </div>

      {addCard.isOpen && (
        <AddCardModule
          existingEmails={users.map((user) => user.email)}
          refetch={refetch}
          {...addCard}
        />
      )}
      {editCard.isOpen && (
        <EditCardModule
          userData={userData}
          deleteId={deleteId}
          refetch={refetch}
          {...editCard}
        />
      )}
      {deleteCard.isOpen && (
        <DeleteCardModule
          deleteId={deleteId}
          refetch={refetch}
          {...deleteCard}
        />
      )}
    </div>
  );
};

export default AllAccounts;