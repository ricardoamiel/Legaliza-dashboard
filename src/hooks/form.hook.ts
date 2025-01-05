import { useState } from "react";

export interface FormError<T> {
  [key: string]: string;
}

export default function useForm<T extends Record<string, any>>({
  initialValues,
}: {
  initialValues: T;
}) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormError<T>>({});

  const setField = (field: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const validate = (validator: (values: T) => FormError<T>) => {
    const validationErrors = validator(values);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  return {
    values,
    setValues,
    setField,
    validate,
    errors,
  };
}
