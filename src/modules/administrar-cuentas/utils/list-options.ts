export const rolesOptions: Option[] = [
  { value: "ADMINISTRADOR", label: "ADMINISTRADOR" },
  { value: "ASISTENTE_VEHICULAR", label: "ASISTENTE VEHICULAR" },
  { value: "ASISTENTE_NOTARIAL", label: "ASISTENTE NOTARIAL" },
  { value: "CLIENTE", label: "CLIENTE" },
];

export type Option = {
  value: string;
  label: string;
};

export type RoleType = typeof rolesOptions[number]["value"];
