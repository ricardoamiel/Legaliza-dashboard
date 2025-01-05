import Icon from "@/Components/ui/icon";
import Image from "next/image";
import React, { useState } from "react";
import Input from "@/Components/ui/input";
import SelectFilterSm from "@/Components/ui/select-filter-sm";
import { rolesOptions } from "../utils/list-options";
import ButtonSm from "@/Components/ui/button-sm";
import { useMutation } from "@tanstack/react-query";
import publicApiConfig from "@/config/public-api.config";
import { toast } from "sonner";
import { UpdateUserInput, ToggleProps } from "@/interfaces/types";
import useForm from "@/hooks/form.hook";
import { authConfig } from "@/context/auth.context";
import Cookies from "js-cookie";

interface Props {
  toggle: ToggleProps;
  deleteId?: string;
  userData?: UpdateUserInput;
  refetch: () => void;
}
const UpdateDataTab: React.FC<Props> = ({
  toggle,
  deleteId,
  userData,
  refetch,
}) => {
  const form = useForm<UpdateUserInput>({
    initialValues: {
      name: userData?.name || "",
      lastName: userData?.lastName || "",
      email: userData?.email || "",
      roles: userData?.roles || "",
    },
    // validate: (values) => {
    //   const errors: FormError<UpdateUserInput> = {};

    //   // Parse the form values using the Zod schema
    //   const result = UpdateDataSchema.safeParse(values);

    //   // If there are parsing errors
    //   if (!result.success) {
    //     result.error.issues.forEach((issue) => {
    //       if (issue.path.length > 0) {
    //         // Map the error path to the form field name
    //         const key = issue.path[0] as keyof UpdateUserInput;
    //         errors[key] = issue.message; // Set the error message
    //       }
    //     });
    //   }

    //   return errors;
    // },
    // resolver: zodResolver(UpddateDataSchema),
  });

  const token = Cookies.get(authConfig.storageTokenKeyName);
  if (!token) {
    console.error("No se encontró un token de autenticación");
  }
  //console.log(token);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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
  const editarDatosMutation = useMutation({
    mutationFn: async (value: { body: any }) => {
      return fetch(publicApiConfig.apiUrl + "/users/" + deleteId, {
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
            throw new Error("Error al guardar datos de vehículo");
          }
          return res;
        })
        .then((res) => {
          return res;
        });
    },
    onSuccess: (res) => {
      toast.success("Datos actualizados correctamente");
      refetch();
    },
  });
  //console.log("id", deleteId);
  //console.log(userData?.name);
  console.log(form.values.name);
  console.log(form.values.lastName);
  console.log(form.values.email);
  //console.log(form.values.roles);

  const handleSubmit = () => {
    const formData = {
      nombres: form.values.name,
      apellidos: form.values.lastName,
      email: form.values.email,
      tipoUsuario: form.values.roles,
      fotoPerfil: selectedImage,
    };
    editarDatosMutation.mutate({
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

  // const handleInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   field: keyof UpdateUserInput,
  // ) => {
  //   let inputValue = e.target.value;

  //   // Convierte la primera letra de cada palabra a mayúscula
  //   inputValue = inputValue
  //     .toLowerCase()
  //     .replace(/(^|\s)\S/g, (match) => match.toUpperCase());

  //   form.setField(field, inputValue);
  // };
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-7">
      <div className="flex w-full justify-center">
        <input
          id="nuevo-img-car"
          type="file"
          accept="image/*"
          className="hidden"
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
            // {...register("name")}
            value={form.values.name}
            onChange={(e) => {
              form.setField("name", e.target.value);

              // handleInputChange(e, "name");
            }}
            onKeyPress={handleKeyPressLetterAndSpace}
            // error={form.errors.name && form.errors.name}
          />
          <Input
            placeholder="Apellidos"
            value={form.values.lastName}
            onChange={(e) => {
              form.setField("lastName", e.target.value);

              // handleInputChange(e, "lastName");
            }}
            onKeyPress={handleKeyPressLetterAndSpace}
            // {...register("lastName")}
            // {...register("lastName")}
            // error={errors.lastName && errors.lastName.message}
            // error={form.errors.lastName && form.errors.lastName}
          />
        </div>
        <Input
          type="email"
          placeholder="Correo Electronico"
          value={form.values.email}
          onChange={(e) => {
            form.setField("email", e.target.value);
          }}
          // error={form.errors.email && form.errors.email}
          // {...register("email", { required: true })}
          // {...register("email", { required: true })}
          // error={errors.email && errors.email.message}
        />
        <SelectFilterSm
          options={rolesOptions}
          label="Rol"
          value={rolesOptions.find((i) => i.value === form.values.roles) || null}
          onChange={(selectedOption) => {
            form.setField("roles", selectedOption.value);
          }}
        />
        {/* <Controller
          name="roles"
          control={form.control}
          render={({ field: { onChange, value } }) => (
            <SelectFilterSm
              options={rolesOptions}
              label="Rol"
              styleIcon
              xicon={false}
              value={rolesOptions.find((i) => i.value === value)}
              onChange={(value) => onChange(value?.value)}
              error={errors.roles && errors.roles.message}
            />
          )}
        /> */}
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
          type="button"
          onClick={() => {
            handleSubmit();
            toggle.onClose();
          }}
          className="max-w-min border border-black bg-gray-800 text-black dark:border-white dark:bg-[#111827] dark:text-white"
          disabled={editarDatosMutation.isPending}
        >
          Guardar
          <Icon name="save" className="h-4 w-4" />
        </ButtonSm>
      </div>
    </div>
  );
};

export default UpdateDataTab;
