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
import { Data, ToggleProps } from "@/interfaces/types";

interface Props {
  tramiteId: string;
  numeroProceso: number;
  toggle: ToggleProps;
}

const CartaNotarialFormTab: React.FC<Props> = ({ tramiteId, numeroProceso, toggle }) => {
  const router = useRouter(); // Inicializa useRouter
  const [userRole, setUserRole] = useState<string | null>(null);
  const form = useForm<Data>({
    initialValues: {
      _id: "",
      idUsuario: "",
      datoRemitentes: [{ nombre: "", direccion: "", tipoDocumento: "", numeroDocumento: "" }],
      datoDestinatarios: [{ nombre: "", direccion: "", tipoDocumento: "", numeroDocumento: "" }],
      datoEntregaCarta: [{ lugarEntrega: "", provincia: "", departamento: "", distrito: "" }],
      datoEnviador: [{ nombre: "", correo: "", celular: "", cartaPuerta: false, servicioExpress: false }],
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
        const response = await ApiFetcher.fetchApiDataByType("carta-notarial", numeroProceso.toString());
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
    mutationFn: async (value: { body: Omit<Data, "_id" | "idUsuario" | "numeroProceso" | "createdAt" | "updatedAt" | "__v"> }) => {
      return fetch(publicApiConfig.apiUrl + "/carta-notarial/" + numeroProceso.toString(), {
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
            throw new Error("Error al guardar datos de la carta notarial");
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

  const handleInputChange = <T extends keyof Data>(
    field: T, 
    index: number, 
    subField: Data[T] extends Array<infer U> ? keyof U : never,
    value: any
  ) => {
    if (Array.isArray(form.values[field])) {
      const updatedField = [...(form.values[field] as any)];
      updatedField[index][subField] = value;
      form.setField(field, updatedField);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md"> {/* Añade padding a la izquierda y barra de desplazamiento */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Nombre Remitente</label>
            <Input
              placeholder="Nombre Remitente"
              value={form.values.datoRemitentes[0].nombre}
              onChange={(e) => handleInputChange("datoRemitentes", 0, "nombre", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Dirección Remitente</label>
            <Input
              placeholder="Dirección Remitente"
              value={form.values.datoRemitentes[0].direccion}
              onChange={(e) => handleInputChange("datoRemitentes", 0, "direccion", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Tipo Documento Remitente</label>
            <Input
              placeholder="Tipo Documento Remitente"
              value={form.values.datoRemitentes[0].tipoDocumento}
              onChange={(e) => handleInputChange("datoRemitentes", 0, "tipoDocumento", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Número Documento Remitente</label>
            <Input
              placeholder="Número Documento Remitente"
              value={form.values.datoRemitentes[0].numeroDocumento}
              onChange={(e) => handleInputChange("datoRemitentes", 0, "numeroDocumento", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Nombre Destinatario</label>
            <Input
              placeholder="Nombre Destinatario"
              value={form.values.datoDestinatarios[0].nombre}
              onChange={(e) => handleInputChange("datoDestinatarios", 0, "nombre", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Dirección Destinatario</label>
            <Input
              placeholder="Dirección Destinatario"
              value={form.values.datoDestinatarios[0].direccion}
              onChange={(e) => handleInputChange("datoDestinatarios", 0, "direccion", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Tipo Documento Destinatario</label>
            <Input
              placeholder="Tipo Documento Destinatario"
              value={form.values.datoDestinatarios[0].tipoDocumento}
              onChange={(e) => handleInputChange("datoDestinatarios", 0, "tipoDocumento", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Número Documento Destinatario</label>
            <Input
              placeholder="Número Documento Destinatario"
              value={form.values.datoDestinatarios[0].numeroDocumento}
              onChange={(e) => handleInputChange("datoDestinatarios", 0, "numeroDocumento", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Lugar de Entrega</label>
            <Input
              placeholder="Lugar de Entrega"
              value={form.values.datoEntregaCarta[0].lugarEntrega}
              onChange={(e) => handleInputChange("datoEntregaCarta", 0, "lugarEntrega", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Provincia</label>
            <Input
              placeholder="Provincia"
              value={form.values.datoEntregaCarta[0].provincia}
              onChange={(e) => handleInputChange("datoEntregaCarta", 0, "provincia", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Departamento</label>
            <Input
              placeholder="Departamento"
              value={form.values.datoEntregaCarta[0].departamento}
              onChange={(e) => handleInputChange("datoEntregaCarta", 0, "departamento", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Distrito</label>
            <Input
              placeholder="Distrito"
              value={form.values.datoEntregaCarta[0].distrito}
              onChange={(e) => handleInputChange("datoEntregaCarta", 0, "distrito", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Nombre Enviador</label>
            <Input
              placeholder="Nombre Enviador"
              value={form.values.datoEnviador[0].nombre}
              onChange={(e) => handleInputChange("datoEnviador", 0, "nombre", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Correo Enviador</label>
            <Input
              placeholder="Correo Enviador"
              value={form.values.datoEnviador[0].correo}
              onChange={(e) => handleInputChange("datoEnviador", 0, "correo", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Celular Enviador</label>
            <Input
              placeholder="Celular Enviador"
              value={form.values.datoEnviador[0].celular}
              onChange={(e) => handleInputChange("datoEnviador", 0, "celular", e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={form.values.datoEnviador[0].cartaPuerta}
              onChange={(e) => handleInputChange("datoEnviador", 0, "cartaPuerta", e.target.checked)}
            />
            <label className="ml-2">Carta Puerta</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={form.values.datoEnviador[0].servicioExpress}
              onChange={(e) => handleInputChange("datoEnviador", 0, "servicioExpress", e.target.checked)}
            />
            <label className="ml-2">Servicio Express</label>
          </div>
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
  );
};

export default CartaNotarialFormTab;