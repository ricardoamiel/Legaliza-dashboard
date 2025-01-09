"use client";
import useToggle from "@/hooks/toggle.hook";
import cx from "@/libs/cx";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Menu from "./menu";
import React, { useEffect, useRef, useState } from "react";
import useAuth from "@/hooks/auth.hook";
import MenuUser from "./menu-user";
import Link from "next/link";
import { MenuChevron } from "@/assets/icons/MenuChevron";
import { Logo } from "@/assets/icons/Logo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [queryClient] = useState(() => new QueryClient());
  const auth = useAuth();
  const pathname = usePathname();
  const [configSidebar, setConfigSidebar] = useState({
    sidebar: false,
  });

  const toggleUserMenu = useToggle();
  const asideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rawConfigSidebar = window?.localStorage.getItem("config_sidebar");
    const configSidebar = JSON.parse(rawConfigSidebar || "{}");

    if (configSidebar.sidebar) {
      setConfigSidebar(configSidebar);
    }

    const handleResize = () => {
      // Ocultar el sidebar automáticamente en pantallas pequeñas
      if (window.innerWidth < 768) {
        setConfigSidebar((prev) => ({ ...prev, sidebar: false }));
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        asideRef.current &&
        !asideRef.current.contains(event.target as Node) &&
        configSidebar.sidebar
      ) {
        setConfigSidebar((prev) => ({ ...prev, sidebar: false }));
        window.localStorage.setItem(
          "config_sidebar",
          JSON.stringify({ sidebar: false }),
        );
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleUserMenu]);

  if (pathname.includes("/auth")) return <>{children}</>;

  return (
    <div className="flex">
      <aside
        ref={asideRef}
        className={cx(
          "h-screen bg-[#FDFDFD] shadow transition-all duration-300 dark:bg-gray-900",
          configSidebar.sidebar ? "w-[300px]" : "w-[74px]",
          "fixed md:relative",
          "md:block",
          "z-20" // Asegúrate de que el z-index sea alto para que el sidebar esté por encima del contenido
        )}
      >
        <div className="flex h-[96px] w-full items-center justify-start gap-x-4 px-3 py-4">
          <Link href="/">
            <Logo width={62} height={62} className="text-primary-600" />
          </Link>

          <span
            className={cx(
              "text-[32px] font-extrabold leading-8 text-primary-600",
              configSidebar.sidebar ? "block" : "hidden",
            )}
          >
            Legaliza
          </span>
        </div>

        <div className="flex w-full justify-end px-4">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-md text-black transition-colors hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            onClick={() => {
              setConfigSidebar((prev) => ({ ...prev, sidebar: !prev.sidebar }));
              window.localStorage.setItem(
                "config_sidebar",
                JSON.stringify({ sidebar: !configSidebar.sidebar }),
              );
            }}
          >
            <MenuChevron
              className={cx(
                "h-6 w-6 transition-all duration-300",
                !configSidebar.sidebar && "rotate-180",
              )}
            />
          </button>
        </div>

        <div className="h-[calc(100vh_-_96px_-_40px)] w-full overflow-hidden text-black dark:text-white">
          <Menu
            isOpenSidebar={configSidebar.sidebar}
            onOpenSidebar={() => {
              setConfigSidebar((prev) => ({ ...prev, sidebar: true }));
            }}
          />
        </div>
      </aside>

      <header
        className={cx(
          "fixed right-0 top-0 z-10 flex h-[74px] w-full items-center justify-end gap-4 bg-white py-4 pr-8 text-black transition-all duration-300 dark:bg-gray-900",
          configSidebar.sidebar
            ? "w-[calc(100%_-_300px)]"
            : "w-[calc(100%_-_74px)]",
        )}
      >
        <div className="relative">
          <button
            className="border-primary relative h-[58px] w-[58px] rounded-full border-2"
            onClick={toggleUserMenu.onToggle}
          >
            <Image
              className="h-full w-full"
              src="/user.png"
              alt="logo"
              width={32}
              height={32}
              unoptimized
            />
            <div className="border-primary absolute bottom-0 right-0 h-[15px] w-[15px] rounded-full border-2 bg-[#CFFFEA]"></div>
          </button>
          {toggleUserMenu.isOpen && (
            <MenuUser
              fullNameUser={`${auth.data?.user?.nombres} ${auth.data?.user?.apellidos}`}
              rolesUser={auth.data?.user?.tipoUsuario || ""}
              onClose={toggleUserMenu.onClose}
              onLogout={auth.logout}
            />
          )}
        </div>
      </header>
      <div className="w-full flex-1 overflow-hidden pt-[74px]">
        <div className="h-[calc(100vh_-_74px)] w-full flex-1 bg-[#edf0f4] p-6 dark:bg-[#1f2937]">
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;