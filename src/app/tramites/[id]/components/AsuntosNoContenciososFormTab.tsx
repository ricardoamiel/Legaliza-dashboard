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
import { AsuntoNoContenciosoData, ToggleProps } from "@/interfaces/types";

interface Props {
  tramiteId: string;
  numeroProceso: number;
  toggle: ToggleProps;
}

const AsuntoNoContenciosoFormTab: React.FC<Props> = ({ tramiteId, numeroProceso, toggle }) => {
  const router = useRouter(); // Inicializa useRouter
  const [userRole, setUserRole] = useState<string | null>(null);
  const form = useForm<AsuntoNoContenciosoData>({
    initialValues: {
      _id: "",
      idUsuario: "",
      numeroProceso: 0,
      tipoActo: "",
      dataContratantes: [{
        tipoCondicion: "",
        tipoDocumento: "",
        numeroDocumento: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        nombres: "",
        estadoCivil: "",
        direccion: "",
        correo: "",
        ocupacion: ""
      }],
      motivo: "",
      file1: "",
      file2: "",
      file3: "",
      file4: "",
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
        const response = await ApiFetcher.fetchApiDataByType("asuntos-no-contenciosos", numeroProceso.toString());
        const data = response.data;
        form.setValues(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [numeroProceso]);

  const editarDatosMutation = useMutation({
    mutationFn: async (value: { body: Omit<AsuntoNoContenciosoData, "_id" | "idUsuario" | "numeroProceso" | "createdAt" | "updatedAt" | "__v"> }) => {
      return fetch(publicApiConfig.apiUrl + "/asuntos-no-contenciosos/" + numeroProceso.toString(), {
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
            throw new Error("Error al guardar datos del asunto no contencioso");
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

  const handleInputChangeSolo = <T extends keyof AsuntoNoContenciosoData>(field: T, value: any) => {
    form.setField(field, value);
  };

  const handleInputChange = <T extends keyof AsuntoNoContenciosoData>(
    field: T,
    index: number,
    subField: AsuntoNoContenciosoData[T] extends Array<infer U> ? keyof U : never,
    value: any
  ) => {
    if (Array.isArray(form.values[field])) {
      const updatedField = [...(form.values[field] as any)];
      updatedField[index][subField] = value;
      form.setField(field, updatedField);
    }
  };

  const handleFileChange = (field: keyof AsuntoNoContenciosoData, file: File | null) => {
    if (file) {
      form.setField(field, file.name);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md overflow-y-auto h-[calc(100vh-200px)] pl-4"> {/* Añade padding a la izquierda y barra de desplazamiento */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Tipo Acto</label>
            <Input
              placeholder="Tipo Acto"
              value={form.values.tipoActo}
              onChange={(e) => handleInputChangeSolo("tipoActo", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Motivo</label>
            <Input
              placeholder="Motivo"
              value={form.values.motivo}
              onChange={(e) => handleInputChangeSolo("motivo", e.target.value)}
            />
          </div>
          {/* Campos para dataContratantes */}
          {form.values.dataContratantes.map((contratante, index) => (
            <React.Fragment key={index}>
              <div>
                <label className="block text-sm font-medium text-gray-300">Tipo Condición</label>
                <Input
                  placeholder="Tipo Condición"
                  value={contratante.tipoCondicion}
                  onChange={(e) => handleInputChange("dataContratantes", index, "tipoCondicion", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Tipo Documento</label>
                <Input
                  placeholder="Tipo Documento"
                  value={contratante.tipoDocumento}
                  onChange={(e) => handleInputChange("dataContratantes", index, "tipoDocumento", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Número Documento</label>
                <Input
                  placeholder="Número Documento"
                  value={contratante.numeroDocumento}
                  onChange={(e) => handleInputChange("dataContratantes", index, "numeroDocumento", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Apellido Paterno</label>
                <Input
                  placeholder="Apellido Paterno"
                  value={contratante.apellidoPaterno}
                  onChange={(e) => handleInputChange("dataContratantes", index, "apellidoPaterno", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Apellido Materno</label>
                <Input
                  placeholder="Apellido Materno"
                  value={contratante.apellidoMaterno}
                  onChange={(e) => handleInputChange("dataContratantes", index, "apellidoMaterno", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Nombres</label>
                <Input
                  placeholder="Nombres"
                  value={contratante.nombres}
                  onChange={(e) => handleInputChange("dataContratantes", index, "nombres", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Estado Civil</label>
                <Input
                  placeholder="Estado Civil"
                  value={contratante.estadoCivil}
                  onChange={(e) => handleInputChange("dataContratantes", index, "estadoCivil", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Dirección</label>
                <Input
                  placeholder="Dirección"
                  value={contratante.direccion}
                  onChange={(e) => handleInputChange("dataContratantes", index, "direccion", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Correo</label>
                <Input
                  placeholder="Correo"
                  value={contratante.correo}
                  onChange={(e) => handleInputChange("dataContratantes", index, "correo", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Ocupación</label>
                <Input
                  placeholder="Ocupación"
                  value={contratante.ocupacion}
                  onChange={(e) => handleInputChange("dataContratantes", index, "ocupacion", e.target.value)}
                />
              </div>
            </React.Fragment>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-300">Archivo 1</label>
            <input
              type="file"
              onChange={(e) => handleFileChange("file1", e.target.files ? e.target.files[0] : null)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Archivo 2</label>
            <input
              type="file"
              onChange={(e) => handleFileChange("file2", e.target.files ? e.target.files[0] : null)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Archivo 3</label>
            <input
              type="file"
              onChange={(e) => handleFileChange("file3", e.target.files ? e.target.files[0] : null)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Archivo 4</label>
            <input
              type="file"
              onChange={(e) => handleFileChange("file4", e.target.files ? e.target.files[0] : null)}
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

export default AsuntoNoContenciosoFormTab;