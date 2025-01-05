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
import { EscrituraPublicaData, ToggleProps } from "@/interfaces/types";

interface Props {
  tramiteId: string;
  numeroProceso: number;
  toggle: ToggleProps;
}

const EscrituraPublicaFormTab: React.FC<Props> = ({ tramiteId, numeroProceso, toggle }) => {
  const router = useRouter(); // Inicializa useRouter
  const [userRole, setUserRole] = useState<string | null>(null);
  const form = useForm<EscrituraPublicaData>({
    initialValues: {
      _id: "",
      idUsuario: "",
      numeroProceso: 0,
      tipoTramite: "",
      dataSolicitantes: [{
        tipoCondicion: "",
        tipoDocumento: "",
        numeroDocumento: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        nombres: "",
        estadoCivil: "",
        direccion: "",
        correo: "",
        ocupacion: "",
        documentoDni: "",
        documentoCopiaLiteral: ""
      }],
      observaciones: "",
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
        const response = await ApiFetcher.fetchApiDataByType("escritura-publica", numeroProceso.toString());
        const data = response.data;
        form.setValues(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [numeroProceso]);

  const editarDatosMutation = useMutation({
    mutationFn: async (value: { body: Omit<EscrituraPublicaData, "_id" | "idUsuario" | "numeroProceso" | "createdAt" | "updatedAt" | "__v"> }) => {
      return fetch(publicApiConfig.apiUrl + "/escritura-publica/" + numeroProceso.toString(), {
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
            throw new Error("Error al guardar datos de la escritura pública");
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

  const handleInputChangeSolo = <T extends keyof EscrituraPublicaData>(field: T, value: any) => {
    form.setField(field, value);
  };

  const handleInputChange = <T extends keyof EscrituraPublicaData>(field: T, index: number, subField: EscrituraPublicaData[T] extends Array<infer U> ? keyof U : never, value: any) => {
    if (Array.isArray(form.values[field])) {
      const updatedField = [...(form.values[field] as any)];
      updatedField[index][subField] = value;
      form.setField(field, updatedField);
    }
  };

  const handleFileChange = <T extends keyof EscrituraPublicaData>(
    field: T,
    index: number,
    subField: EscrituraPublicaData[T] extends Array<infer U> ? keyof U : never,
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
            <label className="block text-sm font-medium text-gray-300">Tipo Trámite</label>
            <Input
              placeholder="Tipo Trámite"
              value={form.values.tipoTramite}
              onChange={(e) => handleInputChangeSolo("tipoTramite", e.target.value)}
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
          {/* Campos para dataSolicitantes */}
          {form.values.dataSolicitantes.map((solicitante, index) => (
            <React.Fragment key={index}>
              <div>
                <label className="block text-sm font-medium text-gray-300">Tipo Condición</label>
                <Input
                  placeholder="Tipo Condición"
                  value={solicitante.tipoCondicion}
                  onChange={(e) => handleInputChange("dataSolicitantes", index, "tipoCondicion", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Tipo Documento</label>
                <Input
                  placeholder="Tipo Documento"
                  value={solicitante.tipoDocumento}
                  onChange={(e) => handleInputChange("dataSolicitantes", index, "tipoDocumento", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Número Documento</label>
                <Input
                  placeholder="Número Documento"
                  value={solicitante.numeroDocumento}
                  onChange={(e) => handleInputChange("dataSolicitantes", index, "numeroDocumento", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Apellido Paterno</label>
                <Input
                  placeholder="Apellido Paterno"
                  value={solicitante.apellidoPaterno}
                  onChange={(e) => handleInputChange("dataSolicitantes", index, "apellidoPaterno", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Apellido Materno</label>
                <Input
                  placeholder="Apellido Materno"
                  value={solicitante.apellidoMaterno}
                  onChange={(e) => handleInputChange("dataSolicitantes", index, "apellidoMaterno", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Nombres</label>
                <Input
                  placeholder="Nombres"
                  value={solicitante.nombres}
                  onChange={(e) => handleInputChange("dataSolicitantes", index, "nombres", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Estado Civil</label>
                <Input
                  placeholder="Estado Civil"
                  value={solicitante.estadoCivil}
                  onChange={(e) => handleInputChange("dataSolicitantes", index, "estadoCivil", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Dirección</label>
                <Input
                  placeholder="Dirección"
                  value={solicitante.direccion}
                  onChange={(e) => handleInputChange("dataSolicitantes", index, "direccion", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Correo</label>
                <Input
                  placeholder="Correo"
                  value={solicitante.correo}
                  onChange={(e) => handleInputChange("dataSolicitantes", index, "correo", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Ocupación</label>
                <Input
                  placeholder="Ocupación"
                  value={solicitante.ocupacion}
                  onChange={(e) => handleInputChange("dataSolicitantes", index, "ocupacion", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Documento DNI</label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange("dataSolicitantes", index, "documentoDni", e.target.files ? e.target.files[0] : null)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Documento Copia Literal</label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange("dataSolicitantes", index, "documentoCopiaLiteral", e.target.files ? e.target.files[0] : null)}
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

export default EscrituraPublicaFormTab;