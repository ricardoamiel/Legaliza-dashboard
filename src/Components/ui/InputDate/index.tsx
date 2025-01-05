import React, { useState, useEffect, useId } from "react";
import cx from "@/libs/cx";
import isEmpty from "@/libs/is-empty";
import { Typography } from "../Typography/Typography";
import { Calendar } from "@/assets/icons/Calendar";
import OutsideContainer from "@/hooks/OutsideClick";
import Dates from "./Dates";
import { DateType } from "@/interfaces/types";

interface Props {
  label?: string;
  error?: string;
  value?: string;
  onChange?: (date: string) => void;
  defaultDate?: DateType;
  className?: string; // Agregamos className como una propiedad opcional
}

const InputDate = ({ label, value, onChange, className, ...props }: Props) => {
  const uid = useId();

  const hasError = props.error && !isEmpty(props.error);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(value ?? "");
  //console.log({ date, value });
  useEffect(() => {
    onChange?.(date ?? "");
  }, [date]);

  return (
    <OutsideContainer setIsOpen={setOpen} className="relative">
      <>
        <div
          className={cx(
            hasError
              ? "border-red-400 focus:border-red-600"
              : "border-primary-800 focus:border-primary-500",
            "peer relative h-[60px] w-full rounded-lg border bg-transparent px-3 pt-5 font-bold text-white outline-none transition-colors",
            className // Aceptamos la clase externa aquí
          )}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <label
            htmlFor={`input-${uid}`}
            className={cx(
              "text-white",
              date || open // Si 'date' no está vacío, aplica las clases deseadas
                ? "left-3 top-1 text-white text-opacity-80"
                : "left-3 top-[19px]",
              hasError ? "text-red-600" : "peer-focus:text-white",
              "absolute transition-all peer-focus:left-3 peer-focus:top-1",
              "font-bold",
            )}
          >
            {label}
          </label>

          <Typography
            as="p"
            text="span"
            font="outfit"
            className="absolute translate-y-2 text-white"
          >
            {date}
          </Typography>

          <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 text-primary-500" />
        </div>

        {open && (
          <Dates
            getDate={(date) => {
              setDate(date);
            }}
            defaultDate={value}
          />
        )}
        <Typography
          as="p"
          text="span"
          font="outfit"
          className="mt-[2px] block px-[15px] font-bold text-red-500"
        >
          {hasError ? props.error : ""}
        </Typography>
      </>
    </OutsideContainer>
  );
};

export default InputDate;
