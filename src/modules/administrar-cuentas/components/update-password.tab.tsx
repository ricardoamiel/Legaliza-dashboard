import ButtonSm from "@/Components/ui/button-sm";
import Input from "@/Components/ui/input";
import Icon from "@/Components/ui/icon";
import { useMutation } from "@tanstack/react-query";
import publicApiConfig from "@/config/public-api.config";
import { toast } from "sonner";
import { useState } from "react";
import { ToggleProps } from "@/interfaces/types";
import Cookies from "js-cookie";
import { authConfig } from "@/context/auth.context";

interface Props {
  toggle: ToggleProps;
  deleteId?: string;
  refetch: () => void;
}

const UpdatePasswordTab: React.FC<Props> = ({ toggle, deleteId, refetch }) => {
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [password, setPassword] = useState("");

  // Obtener el token desde las cookies
  const token = Cookies.get(authConfig.storageTokenKeyName);
  if (!token) {
    console.error("No se encontró un token de autenticación");
    // Manejar este caso
  }

  const editarPasswordMutation = useMutation({
    mutationFn: async (value: { password: string }) => {
      return fetch(`${publicApiConfig.apiUrl}/users/${deleteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(value),
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        return res.json();
      });
    },
    onSuccess: () => {
      toast.success("Contraseña actualizada correctamente");
      toggle.onClose();
      refetch();
    },
  });

  const handleSubmit = () => {
    if (password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres");
      return;
    }
    if (password !== confirmarContraseña) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    editarPasswordMutation.mutate({ password });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-7">
      <p className="float-start w-full text-base font-normal text-black dark:text-white">
        <span className="text-[#FF0303]">*</span> La contraseña nueva debe tener
        como mínimo 8 dígitos.
      </p>
      <Input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Confirmar Contraseña"
        value={confirmarContraseña}
        onChange={(e) => setConfirmarContraseña(e.target.value)}
      />
      <div className="flex w-full items-center justify-between border-t border-[#A0A0A0] pt-3">
        <ButtonSm
          type="button"
          onClick={toggle.onClose}
          className="max-w-min border border-black bg-gray-800 text-black dark:border-white dark:bg-[#111827] dark:text-white"
        >
          Cancelar
        </ButtonSm>
        <ButtonSm
          type="button"
          onClick={handleSubmit}
          className="max-w-min border border-black bg-gray-800 text-black dark:border-white dark:bg-[#111827] dark:text-white"
        >
          Guardar
          <Icon name="save" className="h-4 w-4" />
        </ButtonSm>
      </div>
    </div>
  );
};

export default UpdatePasswordTab;