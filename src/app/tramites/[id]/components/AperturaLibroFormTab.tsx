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
import { AperturaLibroData, ToggleProps } from "@/interfaces/types";

interface Props {
  tramiteId: string;
  numeroProceso: number;
  toggle: ToggleProps;
}

const AperturaLibroFormTab: React.FC<Props> = ({ tramiteId, numeroProceso, toggle }) => {
  const router = useRouter(); // Inicializa useRouter
  const [userRole, setUserRole] = useState<string | null>(null);
  const form = useForm<AperturaLibroData>({
    initialValues: {
      _id: "",
      tipoDocumento: "",
      numeroDocumento: "",
      correo: "",
      celular: 0,
      idADocumentoIdentidadAnverso: "",
      idDocumentoIdentidadReverso: "",
      numeroLibro: "",
      tipoLibro: "",
      tipoLegalizacion: "",
      numeroFojas: "",
      tipoFojas: "",
      detallesObservaciones: "",
      idUsuario: "",
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
        const response = await ApiFetcher.fetchApiDataByType("apertura-de-libro", numeroProceso.toString());
        const data = response.data;
        form.setValues(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [numeroProceso]);
  
  console.log(numeroProceso.toString());

  const editarDatosMutation = useMutation({
    mutationFn: async (value: { body: Omit<AperturaLibroData, "_id" | "idUsuario" | "numeroProceso" | "createdAt" | "updatedAt" | "__v"> }) => {
      return fetch(publicApiConfig.apiUrl + "/apertura-libros/" + numeroProceso.toString(), {
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
            throw new Error("Error al guardar datos de la apertura de libro");
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

  const handleInputChange = <T extends keyof AperturaLibroData>(field: T, value: any) => {
    form.setField(field, value);
  };

  const handleFileChange = (field: keyof AperturaLibroData, file: File | null) => {
    if (file) {
      form.setField(field, file.name); // Guardar el nombre del archivo
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md overflow-y-auto h-[calc(100vh-200px)] pl-4"> {/* Añade padding a la izquierda y barra de desplazamiento */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Tipo Documento</label>
            <Input
              placeholder="Tipo Documento"
              value={form.values.tipoDocumento}
              onChange={(e) => handleInputChange("tipoDocumento", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Número Documento</label>
            <Input
              placeholder="Número Documento"
              value={form.values.numeroDocumento}
              onChange={(e) => handleInputChange("numeroDocumento", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Correo</label>
            <Input
              placeholder="Correo"
              value={form.values.correo}
              onChange={(e) => handleInputChange("correo", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Celular</label>
            <Input
              placeholder="Celular"
              value={form.values.celular}
              onChange={(e) => handleInputChange("celular", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Número Libro</label>
            <Input
              placeholder="Número Libro"
              value={form.values.numeroLibro}
              onChange={(e) => handleInputChange("numeroLibro", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Tipo Libro</label>
            <Input
              placeholder="Tipo Libro"
              value={form.values.tipoLibro}
              onChange={(e) => handleInputChange("tipoLibro", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Tipo Legalización</label>
            <Input
              placeholder="Tipo Legalización"
              value={form.values.tipoLegalizacion}
              onChange={(e) => handleInputChange("tipoLegalizacion", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Número Fojas</label>
            <Input
              placeholder="Número Fojas"
              value={form.values.numeroFojas}
              onChange={(e) => handleInputChange("numeroFojas", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Tipo Fojas</label>
            <Input
              placeholder="Tipo Fojas"
              value={form.values.tipoFojas}
              onChange={(e) => handleInputChange("tipoFojas", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Detalles Observaciones</label>
            <Input
              placeholder="Detalles Observaciones"
              value={form.values.detallesObservaciones}
              onChange={(e) => handleInputChange("detallesObservaciones", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Documento Identidad Anverso</label>
            <input
              type="file"
              onChange={(e) => handleFileChange("idADocumentoIdentidadAnverso", e.target.files ? e.target.files[0] : null)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Documento Identidad Reverso</label>
            <input
              type="file"
              onChange={(e) => handleFileChange("idDocumentoIdentidadReverso", e.target.files ? e.target.files[0] : null)}
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-between border-t border-[#A0A0A0] pt-3">
            <ButtonSm
            type="button"
            onClick={handleCancel} // Llama a handleCancel
            className="max-w-min border border-black bg-gray-800 text-black dark:border-white dark:bg-[#111827] dark:text-white"
            >
            Cancelar
            </ButtonSm>
            <ButtonSm
            type="button"
            onClick={() => {
                handleSubmit();
                toggle.onClose();
            }}
            className="max-w-min border border-black bg-gray-800 text-black dark:border-white dark:bg-[#111827] dark:text-white"
            >
            Guardar
            <Icon name="save" className="h-4 w-4" />
            </ButtonSm>
        </div>
      </div>
    </div>
  );
};

export default AperturaLibroFormTab;