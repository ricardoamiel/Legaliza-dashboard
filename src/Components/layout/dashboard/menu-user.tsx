import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Admin } from "@/assets/icons/Admin";
import { User } from "@/assets/icons/User";
import { Flag } from "@/assets/icons/Flag";
import { GoOut } from "@/assets/icons/GoOut";
import { toast } from "sonner"; // Asegúrate de importar la librería de notificaciones que estés utilizando

interface Props {
  onClose: () => void;
  onLogout?: () => void;
  fullNameUser: string;
  rolesUser: string;
}

const MenuUser: React.FC<Props> = ({
  onClose,
  onLogout,
  fullNameUser,
  rolesUser,
}) => {
  const userMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuRef, onClose]);

  const handleAdminClick = () => {
    if (rolesUser === "ADMINISTRADOR") {
      router.push("/dashboard/administrar-cuentas");
    } else {
      router.push("/dashboard/configurar-perfil");
    }
  };

  return (
    <div
      ref={userMenuRef}
      className="absolute right-0 flex w-[390px] flex-col items-start justify-center rounded bg-white shadow-[0px_5px_15px_rgba(0,0,0,0.35)] dark:bg-gray-900 dark:shadow-[0px_5px_15px_rgba(255,255,255,0.35)]"
    >
      <div className="bg grid grid-cols-3 items-center justify-start px-6 py-4">
        <div>
          <div className="h-auto w-auto rounded-full">
            <Image
              className="h-[80%] w-[80%]"
              src="/admin.png"
              alt="logo"
              width={32}
              height={32}
              unoptimized
            />
          </div>
        </div>

        <div className="col-span-2 flex w-full flex-col items-start gap-2">
          <p className="w-full text-2xl font-bold text-black dark:text-white">
            {fullNameUser}
          </p>
          <div className="text-primary flex items-center justify-start gap-2 text-xs font-bold dark:text-white">
            <Admin className="h-4 w-4" />
            <p className="capitalize">{rolesUser}</p>
          </div>
        </div>
      </div>
      <div className="text-primary flex w-full flex-col items-start border-y border-[#A0A0A0] px-1 py-1 text-base font-bold">
        <button
          type="button"
          onClick={handleAdminClick}
          className="flex w-full items-center gap-4 rounded-md px-5 py-4 text-primary-600 hover:bg-[#C0CAFE] hover:bg-opacity-50 dark:hover:bg-[#FDFDFD] dark:hover:bg-opacity-90"
        >
          <User className="h-7 w-7" />
          {rolesUser === "ADMINISTRADOR"
            ? "Administrar cuentas"
            : "Configurar perfil"}
        </button>
        <div className="flex w-full items-center gap-4 rounded-md px-5 py-4 text-primary-600 hover:bg-[#C0CAFE] hover:bg-opacity-50 dark:hover:bg-[#FDFDFD] dark:hover:bg-opacity-90">
          <Flag className="h-7 w-7" />
          Informes de mensajes
        </div>
      </div>
      <div className="w-full px-1 py-2">
        <button
          type="button"
          className="flex w-full items-center justify-start gap-3 rounded-md px-6 py-3 text-base font-medium text-black hover:bg-[#C0CAFE] hover:bg-opacity-50 dark:text-white"
          onClick={() => {
            onClose();
            onLogout?.();
          }}
        >
          <GoOut className="h-7 w-7" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default MenuUser;