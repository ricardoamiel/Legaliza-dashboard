"use client";
import { Logo } from "@/assets/icons/Logo";
import Button from "@/Components/ui/button/button";
import Input from "@/Components/ui/input";
import Select from "@/Components/ui/Select";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { type SubmitHandler, useForm } from "react-hook-form";
import { loginSchema } from "./login.schema";
import { toast } from "sonner";
import useAuth from "@/hooks/auth.hook";
import { rolesOptions } from "@/modules/administrar-cuentas/utils/list-options";
import { useState } from "react";
import publicApiConfig from "@/config/public-api.config";


type LoginInputs = {
  email: string;
  password: string;
};

type RegisterInputs = {
  nombres: string;
  apellidos: string;
  email: string;
  password: string;
  tipoUsuario: string;
};

const LoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  // Login form
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
  });

  const auth = useAuth();

  const onLoginSubmit: SubmitHandler<LoginInputs> = async (data) => {
    if (!data.email || !data.password) {
      toast.error("Por favor, complete todos los campos");
      return;
    }

    const result = await auth.login({ authValues: data });

    if (result.status !== "success") {
      toast.error("Email o contraseña son incorrectos");
    } else {
      toast.success("Inicio de sesión exitoso");
    }
  };

  // Register form
  const {
    register: registerForm,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
  } = useForm<RegisterInputs>({
    defaultValues: {
      tipoUsuario: "",
    },
  });

  const onRegisterSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    try {
      //console.log(JSON.stringify(data));
      const response = await fetch(`${publicApiConfig.apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al registrar el usuario");
      }

      toast.success("Usuario registrado exitosamente");
      setIsRegistering(false); // Volver a la vista de inicio de sesión
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al registrar el usuario");
    }
  };

  return (
    <main>
      <div className="grid h-dvh grid-cols-1 overflow-y-auto lg:grid-cols-2">
        <div className="relative inset-0 z-10 flex w-full items-center justify-center bg-white px-4 py-14 dark:bg-slate-900">
          {isRegistering ? (
            // Registro
            <form
              onSubmit={handleRegisterSubmit(onRegisterSubmit)}
              className="relative flex h-auto w-[384px] flex-col items-start justify-start gap-[15px] rounded-lg bg-white p-6 dark:bg-slate-900"
            >
              <div className="flex w-full items-center justify-start gap-4">
                <Logo className="h-[74px] w-[74px] text-primary-800" />
                <p className="text-2xl font-bold text-black dark:text-white">
                  Registrarse
                </p>
              </div>
              <Input
                type="text"
                placeholder="Nombres"
                {...registerForm("nombres", { required: true })}
                error={registerErrors.nombres?.message}
              />
              <Input
                type="text"
                placeholder="Apellidos"
                {...registerForm("apellidos", { required: true })}
                error={registerErrors.apellidos?.message}
              />
              <Input
                type="email"
                placeholder="Email"
                {...registerForm("email", { required: true })}
                error={registerErrors.email?.message}
              />
              <Select
                label="Tipo de Usuario"
                options={rolesOptions.map((role) => ({
                  label: role.label,
                  value: role.value,
                }))}
                onChange={(selectedOption) => {
                  registerForm("tipoUsuario").onChange({
                    target: { name: "tipoUsuario", value: selectedOption.value },
                  }); // Simulamos un evento de cambio para react-hook-form
                }}
                error={registerErrors.tipoUsuario?.message}
              />
              <Input
                type="password"
                placeholder="Contraseña"
                {...registerForm("password", { required: true })}
                error={registerErrors.password?.message}
              />
              <div className="flex w-full justify-between grid-cols-2 gap-2">
                <Button type="submit" className="bg-primary-700">
                  Registrar
                </Button>
                <Button
                  type="button"
                  onClick={() => setIsRegistering(false)}
                  className="bg-gray-500"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          ) : (
            // Login
            <form
              onSubmit={handleLoginSubmit(onLoginSubmit)}
              className="relative flex h-auto w-[384px] flex-col items-start justify-start gap-[15px] rounded-lg bg-white p-6 dark:bg-slate-900"
            >
              <div className="flex w-full items-center justify-start gap-4">
                <Logo className="h-[74px] w-[74px] text-primary-800" />
                <p className="text-2xl font-bold text-black dark:text-white">
                  Iniciar sesión
                </p>
              </div>
              <Input
                type="email"
                placeholder="Email"
                {...loginRegister("email", { required: true })}
                error={loginErrors.email?.message}
              />
              <Input
                type="password"
                placeholder="Contraseña"
                {...loginRegister("password", { required: true })}
                error={loginErrors.password?.message}
              />
              <Button type="submit" className="bg-primary-700">
                Iniciar sesión
              </Button>
              <Button
                type="button"
                onClick={() => setIsRegistering(true)}
                className="bg-primary-700"
              >
                Registrarse
              </Button>
            </form>
          )}
        </div>

        <div className="absolute z-0 block h-full w-full lg:relative lg:h-auto lg:w-auto lg:flex-1">
          <Image
            unoptimized
            src={"/people.png"}
            alt="people"
            width={100}
            height={100}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-[#0E1C3A] bg-opacity-70">
            <p className="z-10 hidden w-[90%] text-6xl font-semibold leading-[76px] text-white lg:block">
              ¡Bienvenido de nuevo a{" "}
              <span className="font-black text-[#2C4DFB]">
                <span className="borde-white border-b-8">Legaliza!</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
