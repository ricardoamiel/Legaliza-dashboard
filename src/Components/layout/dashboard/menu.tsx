import { DocumentPen } from "@/assets/icons/DocumentPen";
import { Home } from "@/assets/icons/Home";
import useToggle from "@/hooks/toggle.hook";
import cx from "@/libs/cx";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { authConfig } from "@/context/auth.context";
import publicApiConfig from "@/config/public-api.config";

const Menu: React.FC<{ isOpenSidebar: boolean; onOpenSidebar: () => void }> = ({
  isOpenSidebar,
  onOpenSidebar,
}) => {
  return (
    <ul className="text-primary flex flex-col gap-y-3 px-3 py-6">
      <MenuItem
        label="Inicio"
        icon={<Home className="h-6 w-6 text-primary-600" />}
        isOpenSidebar={isOpenSidebar}
        route="/"
        onOpenSidebar={onOpenSidebar}
      />
      <MenuItem
        label="Tramites"
        icon={<DocumentPen className="h-6 w-6 text-primary-600" />}
        isOpenSidebar={isOpenSidebar}
        route="/tramites"
        onOpenSidebar={onOpenSidebar}
      />
    </ul>
  );
};

export default Menu;

const MenuItem: React.FC<{
  label: string;
  icon?: ReactNode;
  submenu?: boolean;
  route?: string;
  submenuItems?: {
    label: string;
    route: string;
  }[];
  isOpenSidebar: boolean;
  onOpenSidebar: () => void;
}> = ({
  label,
  icon,
  submenu,
  submenuItems,
  route,
  isOpenSidebar,
  onOpenSidebar,
}) => {
  const toggleMenu = useToggle();
  const router = useRouter();
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  const isActive = pathname === route;
  
  useEffect(() => {
    const fetchUserRole = async () => {
      const token = Cookies.get(authConfig.storageTokenKeyName);
      //console.log("token ",token);
      const userId = Cookies.get(authConfig.storageUserId); // Asumiendo que el ID del usuario se guarda en una cookie llamada "userId"
      //console.log("userId ",userId);
      if (!token || !userId) {
        toast.error("No se encontró el token de autenticación o el ID del usuario");
        return;
      }

      try {
        const response = await fetch(publicApiConfig.apiUrl + "/users/" + userId, {
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
        setUserRole(userData.tipoUsuario);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Error al recuperar los datos del usuario");
      }
    };

    fetchUserRole();
  }, []);
  
  const handleClick = () => {
    /*if (route === "/tramites" && userRole !== "ADMINISTRADOR") {
      toast.error("No tienes permisos para visualizar los trámites registrados");
      return;*/
      if (route === "/tramites") {
        if (userRole === "ADMINISTRADOR") {
          router.push("/tramites");
        } else if (userRole === "CLIENTE") {
          router.push("/tramites/cliente");
        } else {
          toast.error("No tienes permisos para visualizar los trámites registrados");
        }
        return;
    }

    if (submenu) {
      !isOpenSidebar && onOpenSidebar();
      toggleMenu.onToggle();
    } else {
      route ? router.push(route) : null;
    }
  };

  return (
    <li
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <button
          type="button"
          className={cx(
            "grid h-[48px] w-full grid-cols-[48px_1fr] items-center rounded-lg font-bold",
            isActive
              ? "bg-primary text-primary bg-opacity-15 dark:hover:bg-white"
              : "hover:bg-[#DEE3FD] dark:hover:bg-white",
            isHovered ? "rounded-l-lg rounded-r-none" : "rounded-lg",
          )}
          onClick={handleClick}
        >
          <div
            className={`my-auto flex h-full w-full items-center justify-center`}
          >
            {icon && icon}
          </div>

          {isOpenSidebar ? (
            <div className="flex h-full items-center justify-start text-left text-primary-600">
              <span>{label}</span>
            </div>
          ) : null}
          {isHovered && !isOpenSidebar ? (
            <div className="absolute left-[62px] z-50 flex justify-start rounded-sm bg-[#DEE3FD] px-6 py-3 text-primary-600 dark:bg-white">
              <span>{label}</span>
            </div>
          ) : null}
        </button>

        <motion.div
          className="overflow-hidden"
          variants={{
            open: {
              height: "auto",
            },
            closed: {
              height: 0,
            },
          }}
          initial="closed"
          animate={toggleMenu.isOpen && isOpenSidebar ? "open" : "closed"}
        >
          <ul className="pl-4 pt-2">
            {submenuItems && submenuItems.length > 0
              ? submenuItems.map((item) => (
                  <SubmenuItem key={item.label} {...item} />
                ))
              : null}
          </ul>
        </motion.div>
      </div>
    </li>
  );
};

const SubmenuItem: React.FC<{
  label: string;
  route: string;
}> = ({ label, route }) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname === route;

  const handleClick = () => {
    router.push(route);
  };

  return (
    <li>
      <button
        type="button"
        className={cx(
          "w-full border-l-2 px-3 py-1.5 pl-7 text-left font-medium",
          isActive ? "border-primary text-primary" : "",
        )}
        onClick={handleClick}
      >
        {label}
      </button>
    </li>
  );
};