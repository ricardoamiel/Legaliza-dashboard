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
import { PoderFueraDeRegistroData, ToggleProps } from "@/interfaces/types";

interface Props {
  tramiteId: string;
  numeroProceso: number;
  toggle: ToggleProps;
}

// Función para formatear la fecha al formato yyyy-mm-dd
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const PoderFueraDeRegistroFormTab: React.FC<Props> = ({ tramiteId, numeroProceso, toggle }) => {
  const router = useRouter(); // Inicializa useRouter
  const [userRole, setUserRole] = useState<string | null>(null);
  const form = useForm<PoderFueraDeRegistroData>({
    initialValues: {
      _id: "",
      idUsuario: "",
      tipoPoder: "",
      datoClientes: [{
        tipoCondicion: "",
        tipoDocumento: "",
        numeroDocumento: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        nombres: "",
        estadoCivil: "",
        direccion: "",
        idADocumentoIdentidadAnverso: "",
        idDocumentoIdentidadReverso: ""
      }],
      plazoPoder: "",
      facultadesOtorgar: "",
      opcionTomaDomicilio: "",
      fecha: "",
      horaTomaDomicilio: "",
      numeroProceso: 0,
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
        const response = await ApiFetcher.fetchApiDataByType("poder-fuera-de-registro", numeroProceso.toString());
        const data = response.data;
        data.fecha = formatDate(data.fecha);
        form.setValues(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [numeroProceso]);

  const editarDatosMutation = useMutation({
    mutationFn: async (value: { body: Omit<PoderFueraDeRegistroData, "_id" | "idUsuario" | "numeroProceso" | "createdAt" | "updatedAt" | "__v"> }) => {
      return fetch(publicApiConfig.apiUrl + "/poder-fuera-registros/" + numeroProceso.toString(), {
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
            throw new Error("Error al guardar datos del poder fuera de registro");
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

  const handleInputChangeSolo = <T extends keyof PoderFueraDeRegistroData>(field: T, value: any) => {
    form.setField(field, value);
  };

  const handleInputChange = <T extends keyof PoderFueraDeRegistroData>(field: T, index: number, subField: PoderFueraDeRegistroData[T] extends Array<infer U> ? keyof U : never, value: any) => {
    if (Array.isArray(form.values[field])) {
      const updatedField = [...(form.values[field] as any)];
      updatedField[index][subField] = value;
      form.setField(field, updatedField);
    }
  };

  const handleFileChange = <T extends keyof PoderFueraDeRegistroData>(
    field: T,
    index: number,
    subField: PoderFueraDeRegistroData[T] extends Array<infer U> ? keyof U : never,
    file: File | null
  ) => {
    if (file && Array.isArray(form.values[field])) {
      const updatedField = [...(form.values[field] as any)];
      updatedField[index][subField] = file.name;
      form.setField(field, updatedField);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md overflow-y-auto h-[calc(100vh-200px)] pl-4"> {/* Añade padding a la izquierda y barra de desplazamiento */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Tipo Poder</label>
            <Input
              placeholder="Tipo Poder"
              value={form.values.tipoPoder}
              onChange={(e) => handleInputChangeSolo("tipoPoder", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Plazo Poder</label>
            <Input
              placeholder="Plazo Poder"
              value={form.values.plazoPoder}
              onChange={(e) => handleInputChangeSolo("plazoPoder", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Facultades Otorgar</label>
            <Input
              placeholder="Facultades Otorgar"
              value={form.values.facultadesOtorgar}
              onChange={(e) => handleInputChangeSolo("facultadesOtorgar", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Opción Toma Domicilio</label>
            <Input
              placeholder="Opción Toma Domicilio"
              value={form.values.opcionTomaDomicilio}
              onChange={(e) => handleInputChangeSolo("opcionTomaDomicilio", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Fecha</label>
            <Input
              type="date"
              value={form.values.fecha}
              onChange={(e) => handleInputChangeSolo("fecha", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Hora Toma Domicilio</label>
            <Input
              placeholder="Hora Toma Domicilio"
              value={form.values.horaTomaDomicilio}
              onChange={(e) => handleInputChangeSolo("horaTomaDomicilio", e.target.value)}
            />
          </div>
          {/* Campos para datoClientes */}
          {form.values.datoClientes.map((cliente, index) => (
            <React.Fragment key={index}>
              <div>
                <label className="block text-sm font-medium text-gray-300">Tipo Condicion</label>
                <Input
                  placeholder="Tipo Condicion"
                  value={cliente.tipoCondicion}
                  onChange={(e) => handleInputChange("datoClientes", index, "tipoCondicion", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Tipo Documento</label>
                <Input
                  placeholder="Tipo Documento"
                  value={cliente.tipoDocumento}
                  onChange={(e) => handleInputChange("datoClientes", index, "tipoDocumento", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Número Documento</label>
                <Input
                  placeholder="Número Documento"
                  value={cliente.numeroDocumento}
                  onChange={(e) => handleInputChange("datoClientes", index, "numeroDocumento", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Apellido Paterno</label>
                <Input
                  placeholder="Apellido Paterno"
                  value={cliente.apellidoPaterno}
                  onChange={(e) => handleInputChange("datoClientes", index, "apellidoPaterno", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Apellido Materno</label>
                <Input
                  placeholder="Apellido Materno"
                  value={cliente.apellidoMaterno}
                  onChange={(e) => handleInputChange("datoClientes", index, "apellidoMaterno", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Nombres</label>
                <Input
                  placeholder="Nombres"
                  value={cliente.nombres}
                  onChange={(e) => handleInputChange("datoClientes", index, "nombres", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Estado Civil</label>
                <Input
                  placeholder="Estado Civil"
                  value={cliente.estadoCivil}
                  onChange={(e) => handleInputChange("datoClientes", index, "estadoCivil", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Dirección</label>
                <Input
                  placeholder="Dirección"
                  value={cliente.direccion}
                  onChange={(e) => handleInputChange("datoClientes", index, "direccion", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Documento Identidad Anverso</label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange("datoClientes", index, "idADocumentoIdentidadAnverso", e.target.files ? e.target.files[0] : null)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Documento Identidad Reverso</label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange("datoClientes", index, "idDocumentoIdentidadReverso", e.target.files ? e.target.files[0] : null)}
                />
              </div>
            </React.Fragment>
          ))}
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

export default PoderFueraDeRegistroFormTab;