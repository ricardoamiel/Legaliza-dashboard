import React from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectFilterSmProps {
  label: string;
  options?: Option[]; // { value: string; label: string }[];
  onChange?: (value: Option) => void; // (value: { value: string; label: string }) => void;
  value?: Option | null; // { value: string; label: string } | null;
  error?: string; // Añadir soporte para errores
}

const SelectFilterSm: React.FC<SelectFilterSmProps> = ({
  label,
  options = [],
  onChange,
  value,
  error,
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-bold mb-1">{label}</label>
      <select
        className="bg-gray-900 rounded-lg border px-3 py-2"
        value={value?.value || ""}
        onChange={(e) => {
          const selectedOption = options.find((opt) => opt.value === e.target.value);
          onChange?.(selectedOption || { value: "", label: "" });
        }}
      >
        <option value="" disabled>
          Seleccione una opción
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default SelectFilterSm;
