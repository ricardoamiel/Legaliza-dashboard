import Icon from "@/Components/ui/icon";
import Modal from "@/Components/ui/modal";
import useToggle from "@/hooks/toggle.hook";
import Input from "@/Components/ui/input";
import React, { use, useState } from "react";
import Select from "@/Components/ui/Select";
import SelectFilterSm from "@/Components/ui/select-filter-sm";
import ButtonSm from "@/Components/ui/button-sm";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import publicApiConfig from "@/config/public-api.config";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  CreateUserInput,
  Users,
  ToggleProps,
} from "@/interfaces/types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { rolesOptions } from "../utils/list-options";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddCardSchema } from "../schemas/add-card.schemas";
import { authConfig } from "@/context/auth.context";
import Cookies from "js-cookie";

interface Props extends ToggleProps {
  dataUsers?: Users;
  refetch?: () => void;
  existingEmails: string[];
}
const AddCardModule: React.FC<Props> = ({
  existingEmails,
  refetch,
  dataUsers,
  ...toggle
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [confirmarContraseña, setConfirmarContraseña] = useState("");

  // Obtener el token desde las cookies
  const token = Cookies.get(authConfig.storageTokenKeyName);
  if (!token) {
    console.error("No se encontró un token de autenticación");
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImageRemove = () => {
    setSelectedImage(null);
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    ...form
  } = useForm<CreateUserInput>({
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      roles: undefined,
      fotoPerfil: undefined,
      password: "",
    },
    resolver: zodResolver(AddCardSchema),
  });

  const usuarioMutation = useMutation({
    mutationFn: async (value: { body: any }) => {
      return fetch(publicApiConfig.apiUrl + "/auth/register", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value.body),
      })
        .then((res) => res.json())
        .then(
          (res: { idProcess: string; messages: string; status: string }) => {
            if (res.status !== "success") {
              throw new Error(res.messages);
            }
            return res;
          },
        );
    },
    onSuccess: (res) => {
      toast.success("Cuenta creada correctamente");
      refetch?.();
      toggle.onClose();
    },
  });
  const onSubmit: SubmitHandler<CreateUserInput> = (user) => {
    if (
      !user?.name ||
      !user?.lastName ||
      !user?.email ||
      !user?.roles ||
      !user?.password
    ) {
      toast.error("Debe completar todos los campos");
      return;
    }
    if (user?.password.length < 8 || confirmarContraseña.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres");
      return;
    }
    if (user?.password !== confirmarContraseña) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    if (user?.email === existingEmails.find((email) => email === user?.email)) {
      toast.error("El correo electrónico ya está en uso");
      return;
    }

    console.log(user?.name!);
    console.log(user?.lastName!);
    console.log(user?.email!);
    //console.log(user?.roles!);


    const formData = {
      nombres: user?.name!,
      apellidos: user?.lastName!,
      email: user?.email!,
      tipoUsuario: user?.roles!,
      password: user?.password!,
      fotoPerfil: selectedImage,
    }
    /*
    if (selectedImage) {
      const fileInput = document.getElementById(
        "nuevo-img-car",
      ) as HTMLInputElement;
      const file = fileInput?.files?.[0];
      if (file) {
        formData.append("fotoPerfil", file);
      }
    }*/

    usuarioMutation.mutate({
      body: formData,
    });

    console.log("form", formData);
  };

  const handleKeyPressLetterAndSpace = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]$/.test(e.key)) {
      e.preventDefault();
    }
  };
  const [nameValue, setNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");

  // const handleInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   setValue: React.Dispatch<React.SetStateAction<string>>,
  // ) => {
  //   let inputValue = e.target.value;

  //   // Convierte la primera letra de cada palabra a mayúscula
  //   inputValue = inputValue
  //     .toLowerCase()
  //     .replace(/(^\w|\s\w)/g, (match) => match.toUpperCase());

  //   setValue(inputValue);
  // };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    let inputValue = e.target.value;

    // Convierte la primera letra de cada palabra a mayúscula, respetando tildes
    inputValue = inputValue.replace(/(^\w|\s\w)/g, (match) =>
      match.toUpperCase(),
    );

    setValue(inputValue);
  };
  return (
    <Modal
      modalClassName="text-black dark:text-white dark:bg-[#111827] w-full max-w-xl rounded-lg"
      {...toggle}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-4 px-12 py-7"
      >
        <div className="flex w-full justify-between text-2xl font-bold text-black dark:text-white">
          <p>Crear nueva cuenta</p>
          <button onClick={toggle.onClose} type="button">
            <Icon name="x-marker" className="h-5 w-5" />
          </button>
        </div>
        <div className="flex w-full justify-center">
          <input
            id="nuevo-img-car"
            type="file"
            accept="image/*"
            className="hidden"
            {...register("fotoPerfil")}
            onChange={handleImageChange}
          />
          {selectedImage ? (
            <label
              htmlFor="nuevo-img-car"
              className="dark:border-white flex flex-col items-center justify-center gap-2"
            >
              <div className="relative">
                <Image
                  src={selectedImage}
                  className="max-h-[120px] max-w-[120px]"
                  alt=""
                  width={300}
                  height={300}
                />
                <Icon
                  name="camera-circle"
                  className="absolute -right-3 bottom-0 h-9 w-9 text-black"
                />
              </div>

              <p className="text-sm font-normal text-[#A0A0A0] dark:text-[#EDF0F4]">
                300 px x 300 px
              </p>
            </label>
          ) : (
            <label htmlFor="nuevo-img-car">
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-[#EDF0F4]">
                  <Icon name="img-addition" className="h-16 w-16 text-black" />
                  <Icon
                    name="camera-circle"
                    className="absolute -right-3 bottom-0 h-9 w-9 text-black"
                  />
                </div>
                <p className="text-base font-medium text-primary underline decoration-2 underline-offset-4 dark:text-[#C0CAFE]">
                  Subir imagen (JPG,PNG)
                </p>
                <p className="text-sm font-normal text-[#A0A0A0] dark:text-[#EDF0F4]">
                  300 px x 300 px
                </p>
              </div>
            </label>
          )}
        </div>
        <div className="w-full">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Nombres"
              onKeyPress={handleKeyPressLetterAndSpace}
              {...register("name")}
              error={errors.name && errors.name.message}
              value={nameValue}
              onChange={(e) => handleInputChange(e, setNameValue)}
            />
            <Input
              placeholder="Apellidos"
              onKeyPress={handleKeyPressLetterAndSpace}
              {...register("lastName")}
              error={errors.lastName && errors.lastName.message}
              value={lastNameValue}
              onChange={(e) => handleInputChange(e, setLastNameValue)}
            />
          </div>

          <Input
            type="email"
            className="col-span-2"
            placeholder="Correo Electronico"
            {...register("email", { required: true })}
            error={errors.email && errors.email.message}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="password"
              placeholder="Contraseña"
              {...register("password")}
              error={errors.password && errors.password.message}
            />
            <Input
              type="password"
              placeholder="Confirmar Contraseña"
              value={confirmarContraseña}
              onChange={(e) => {
                setConfirmarContraseña(e.target.value);
              }}
            />
          </div>

          <Controller
            name="roles"
            control={form.control}
            render={({ field: { onChange, value } }) => (
              <SelectFilterSm
                options={rolesOptions}
                label="Rol"
                value={rolesOptions.find((i) => i.value === value) || null}
                onChange={(selectedOption) => onChange(selectedOption?.value || "")}
                error={errors.roles && errors.roles.message}
              />
            )}
          />
        </div>
        <div className="flex w-full items-center justify-between border-t border-[#A0A0A0] pt-3">
          <ButtonSm
            type="button"
            onClick={toggle.onClose}
            className="max-w-min border border-black bg-gray-800 text-black dark:border-white dark:bg-[#111827] dark:text-white"
          >
            Cancelar
          </ButtonSm>
          <ButtonSm
            type="submit"
            className="max-w-min border border-black bg-gray-800 text-black dark:border-white dark:bg-[#111827] dark:text-white"
            disabled={usuarioMutation.isPending}
          >
            Crear
            <Icon name="arrow-right" className="h-4 w-4" />
          </ButtonSm>
        </div>
      </form>
    </Modal>
  );
};

export default AddCardModule;
