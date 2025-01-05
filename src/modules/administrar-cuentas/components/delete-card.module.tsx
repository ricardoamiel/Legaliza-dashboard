import ButtonSm from "@/Components/ui/button-sm";
import Icon from "@/Components/ui/icon";
import Modal from "@/Components/ui/modal";
import publicApiConfig from "@/config/public-api.config";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ToggleProps } from "@/interfaces/types";
import { authConfig } from "@/context/auth.context";
import Cookies from "js-cookie";
import React from "react";

interface Props extends ToggleProps {
  deleteId: string;
  refetch?: () => void;
}
const DeleteCardModule: React.FC<Props> = ({
  refetch,
  deleteId,
  ...toggle
}) => {

  // Obtener el token desde las cookies
  const token = Cookies.get(authConfig.storageTokenKeyName);
  //console.log("Token encontrado:", token);
  if (!token) {
    console.error("No se encontró un token de autenticación");
    // Maneja este caso (por ejemplo, redirigir al login)
  }

  const deleteUserMutation = useMutation({
    mutationFn: async (value: { body: FormData }) => {
      return fetch(
        publicApiConfig.apiUrl + "/users/" + deleteId,

        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
          body: value.body,
        },
      )
        .then((res) => {
          if (res.status >= 400)
            throw new Error("Error al eliminar el documento");
          return res.json();
        })
        .then((res: { message: string; status: string }) => {
          return res;
        });
    },
    onSuccess: (res) => {
      toast.success("Cuenta eliminada correctamente");
      refetch?.();
    },
  });
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("id", deleteId);
    deleteUserMutation.mutate({
      body: formData,
    });
  };
  return (
    <Modal
      modalClassName="text-black dark:text-white dark:bg-[#111827] w-full max-w-2xl rounded-lg"
      {...toggle}
    >
      <div className="flex w-full flex-col items-center justify-center gap-4 p-6">
        <div className="flex w-full justify-center border-b border-[#A0A0A0] pb-2">
          <p className="text-2xl font-bold text-black dark:text-white">
            ¿Estás seguro de querer{" "}
            <span className="text-red-500">eliminar</span> este usuario?
          </p>
        </div>
        <div className="grid w-full grid-cols-2 gap-4 text-xl">
          <ButtonSm
            className="border border-black flex items-center justify-center gap-2"
            onClick={() => toggle.onClose()}
          >
            Cancelalo, mantén esa cuenta
          </ButtonSm>
          <ButtonSm
            className="border border-black flex items-center justify-center gap-2"
            onClick={() => {
              toggle.onClose();
              handleSubmit();
            }}
          >
            Sí, elimina esa cuenta
            <Icon name="arrow-right" className="h-4 w-4" />
          </ButtonSm>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteCardModule;
