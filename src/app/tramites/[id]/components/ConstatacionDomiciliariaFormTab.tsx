import React, { useEffect, useState } from "react";
import Icon from "@/Components/ui/icon";
import Input from "@/Components/ui/input";
import ButtonSm from "@/Components/ui/button-sm";
import { useMutation } from "@tanstack/react-query";
import publicApiConfig from "@/config/public-api.config";
import { toast } from "sonner";
import { authConfig } from "@/context/auth.context";
import Cookies from "js-cookie";
import ApiFetcher from "@/app/tramites/[id]/components/ApiDataFetcher";
import useForm from "@/hooks/form.hook";
import { useRouter } from "next/navigation"; // Importa useRouter
import { ConstatacionDomiciliariaData, ToggleProps } from "@/interfaces/types";

interface Props {
  tramiteId: string;
  numeroProceso: number;
  toggle: ToggleProps;
}

const ConstatacionDomiciliariaFormTab: React.FC<Props> = ({ tramiteId, numeroProceso, toggle }) => {
  const router = useRouter(); // Inicializa useRouter
  const [userRole, setUserRole] = useState<string | null>(null);
  const form = useForm<ConstatacionDomiciliariaData>({
    initialValues: {
      _id: "",
      tipoCliente: "",
      numeroProceso: 0,
      tipoDocumento: "",
      numeroDocumento: "",
      nombres: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      correo: "",
      direccion: "",
      documentoCopiaLiteral: "",
      departamentoArchivo: "",
      provinciaArchivo: "",
      distritoArchivo: "",
      direccionArchivo: "",
      observaciones: "",
      idUsuario: "",
      createdAt: "",
      updatedAt: "",
      __v: 0,
    },
  });

  const token = Cookies.get(authConfig.storageTokenKeyName);
  if (!token) {
    console.error("No se encontró un token de autenticación");
  }
  
  useEffect(() => {
    const fetchUserRole = async () => {
      const token = Cookies.get(authConfig.storageTokenKeyName);
      const userId = Cookies.get(authConfig.storageUserId);
      if (!token || !userId) {
        return;
      }

      try {
        const response = await fetch(`${publicApiConfig.apiUrl}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const userData = await response.json();
        setUserRole(userData.tipoUsuario);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiFetcher.fetchApiDataByType("constatacion-domiciliaria", numeroProceso.toString());
        const data = response.data;
        form.setValues(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [numeroProceso]);

  const editarDatosMutation = useMutation({
    mutationFn: async (value: { body: Omit<ConstatacionDomiciliariaData, "_id" | "idUsuario" | "numeroProceso" | "createdAt" | "updatedAt" | "__v"> }) => {
      return fetch(publicApiConfig.apiUrl + "/const-domiciliaria/" + numeroProceso.toString(), {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value.body),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status >= 400) {
            throw new Error("Error al guardar datos de la constatación domiciliaria");
          }
          return res;
        });
    },
    onSuccess: () => {
      toast.success("Datos actualizados correctamente");
      toggle.onClose();
    },
  });

  const handleSubmit = () => {
    const { _id, idUsuario, numeroProceso, createdAt, updatedAt, __v, ...filteredValues } = form.values;
    editarDatosMutation.mutate({
      body: filteredValues,
    });
  };

  const handleCancel = () => {
    if (userRole === "ADMINISTRADOR") {
      router.push("/tramites");
    } else {
      router.push("/tramites/cliente");
    }
  };

  const handleInputChangeSolo = <T extends keyof ConstatacionDomiciliariaData>(field: T, value: any) => {
    form.setField(field, value);
  };

  const handleInputChange = <T extends keyof ConstatacionDomiciliariaData>(field: T, value: any) => {
    form.setField(field, value);
  };

  const handleFileChange = (field: keyof ConstatacionDomiciliariaData, file: File | null) => {
    if (file) {
      form.setField(field, file.name);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md overflow-y-auto h-[calc(100vh-200px)] pl-4"> {/* Añade padding a la izquierda y barra de desplazamiento */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Tipo Cliente</label>
            <Input
              placeholder="Tipo Cliente"
              value={form.values.tipoCliente}
              onChange={(e) => handleInputChangeSolo("tipoCliente", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Tipo Documento</label>
            <Input
              placeholder="Tipo Documento"
              value={form.values.tipoDocumento}
              onChange={(e) => handleInputChangeSolo("tipoDocumento", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Número Documento</label>
            <Input
              placeholder="Número Documento"
              value={form.values.numeroDocumento}
              onChange={(e) => handleInputChangeSolo("numeroDocumento", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Nombres</label>
            <Input
              placeholder="Nombres"
              value={form.values.nombres}
              onChange={(e) => handleInputChangeSolo("nombres", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Apellido Paterno</label>
            <Input
              placeholder="Apellido Paterno"
              value={form.values.apellidoPaterno}
              onChange={(e) => handleInputChangeSolo("apellidoPaterno", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Apellido Materno</label>
            <Input
              placeholder="Apellido Materno"
              value={form.values.apellidoMaterno}
              onChange={(e) => handleInputChangeSolo("apellidoMaterno", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Correo</label>
            <Input
              placeholder="Correo"
              value={form.values.correo}
              onChange={(e) => handleInputChangeSolo("correo", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Dirección</label>
            <Input
              placeholder="Dirección"
              value={form.values.direccion}
              onChange={(e) => handleInputChangeSolo("direccion", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Documento Copia Literal</label>
            <input
              type="file"
              onChange={(e) => handleFileChange("documentoCopiaLiteral", e.target.files ? e.target.files[0] : null)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Departamento Archivo</label>
            <Input
              placeholder="Departamento Archivo"
              value={form.values.departamentoArchivo}
              onChange={(e) => handleInputChangeSolo("departamentoArchivo", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Provincia Archivo</label>
            <Input
              placeholder="Provincia Archivo"
              value={form.values.provinciaArchivo}
              onChange={(e) => handleInputChangeSolo("provinciaArchivo", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Distrito Archivo</label>
            <Input
              placeholder="Distrito Archivo"
              value={form.values.distritoArchivo}
              onChange={(e) => handleInputChangeSolo("distritoArchivo", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Dirección Archivo</label>
            <Input
              placeholder="Dirección Archivo"
              value={form.values.direccionArchivo}
              onChange={(e) => handleInputChangeSolo("direccionArchivo", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Observaciones</label>
            <Input
              placeholder="Observaciones"
              value={form.values.observaciones}
              onChange={(e) => handleInputChangeSolo("observaciones", e.target.value)}
            />
          </div>
        </div>
        <div className="flex w-full justify-between grid-cols-2 gap-2">
          <ButtonSm onClick={handleCancel} className="bg-primary-700">
            Regresar
          </ButtonSm>
          <ButtonSm onClick={handleSubmit} className="bg-primary-700">
            Guardar
          </ButtonSm>
        </div>
      </div>
    </div>
  );
};

export default ConstatacionDomiciliariaFormTab;