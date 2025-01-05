import React, { useEffect, useState } from "react";
import { Typography } from "../Typography/Typography";
import cx from "@/libs/cx";
import { Iconchevrondown } from "@/assets/icons/Iconchevrondown";
import OutsideContainer from "@/hooks/OutsideClick";
import { DateType } from "@/interfaces/types";
import { useDates } from "@/hooks/useDates";

interface Props {
  getDate?: (date: string) => void;
  defaultDate?: string;
}

export default function Dates({ getDate, defaultDate }: Props) {
  const {
    currentDate,
    setCurrentDate,
    Days,
    Months,
    Years,
    allDates,
    getDayWeek,
  } = useDates({ defaultValue: defaultDate });
  //console.log({ currentDate });

  useEffect(() => {
    if (currentDate.dia && currentDate.mes && currentDate.año) {
      getDate?.(
        `${currentDate.dia}/${currentDate.mes?.numero}/${currentDate.año}`
      );
    }
  }, [currentDate, getDate]);

  const [openYear, setOpenYear] = useState(false);
  const [openMonth, setOpenMonth] = useState(false);

  const handleDayClick = (dia: string) => {
    setCurrentDate((prev) => ({ ...prev, dia })); // Selecciona el día.
  };

  return (
    <div className="absolute left-0 top-full z-10 flex h-[330px] w-full translate-y-2 flex-col rounded-lg border border-primary-800 bg-[#111827] px-[15px] py-[8px]">
      <header className="flex w-full gap-[15px] px-[12px] py-[8px]">
        <div className="relative">
          <OutsideContainer setIsOpen={setOpenMonth}>
            <button
              type="button"
              className="flex items-center gap-2"
              onClick={() => setOpenMonth(!openMonth)}
            >
              {currentDate.mes?.nombre}{" "}
              <Iconchevrondown
                className={cx(
                  "w-[10px] transition-all",
                  openMonth && "-rotate-180"
                )}
              />
            </button>
            {openMonth && (
              <div className="absolute flex h-[220px] translate-y-2 flex-col gap-y-2 overflow-y-scroll border border-slate-500 bg-neutral-500 p-2">
                {Months.map((value) => (
                  <Typography
                    as="p"
                    key={value.nombre}
                    text="span"
                    font="outfit"
                    className={cx(
                      "cursor-pointer rounded-xl px-2 py-2 hover:shadow-xl",
                      value.nombre === currentDate.mes?.nombre &&
                        "rounded-md bg-primary-500 text-white"
                    )}
                    onClick={() => {
                      setCurrentDate((prev) => ({ ...prev, mes: value }));
                      setOpenMonth(false);
                    }}
                  >
                    {value.nombre}
                  </Typography>
                ))}
              </div>
            )}
          </OutsideContainer>
        </div>
        <div className="relative">
          <OutsideContainer setIsOpen={setOpenYear}>
            <button
              type="button"
              className="flex items-center gap-2"
              onClick={() => setOpenYear(!openYear)}
            >
              {currentDate.año}{" "}
              <Iconchevrondown
                className={cx(
                  "w-[10px] transition-all",
                  openYear && "-rotate-180"
                )}
              />
            </button>
            {openYear && (
              <div className="absolute flex h-[220px] translate-y-2 flex-col gap-y-2 overflow-y-scroll border border-slate-500 bg-neutral-500 p-2">
                {Years.map((value) => (
                  <Typography
                    as="p"
                    key={value}
                    text="span"
                    font="outfit"
                    className={cx(
                      "cursor-pointer rounded-xl px-2 py-2 hover:shadow-xl",
                      value.toString() === currentDate.año &&
                        "rounded-md bg-primary-500 text-white"
                    )}
                    onClick={() => {
                      setCurrentDate((prev) => ({
                        ...prev,
                        año: value.toString(),
                      }));
                      setOpenYear(false);
                    }}
                  >
                    {value}
                  </Typography>
                ))}
              </div>
            )}
          </OutsideContainer>
        </div>
      </header>
      <section className="flex flex-col">
        <div className="mb-2 grid grid-cols-7 border-b py-2">
          {Days.map((value, index) => (
            <Typography
              key={`${value}-${index}`}
              as="span"
              text="span"
              className="flex justify-center text-white"
              font="outfit"
            >
              {value}
            </Typography>
          ))}
        </div>

        <div className="grid grid-cols-7 place-content-center">
          {allDates?.map((values, index) => (
            <div
              className="flex w-full justify-center"
              style={
                values.dia === "1"
                  ? { gridColumnStart: getDayWeek(values.diaSemana ?? "") }
                  : {}
              }
              key={`${values.dia}-${values.diaSemana}-${index}`}
            >
              <div
                className={cx(
                  "flex h-auto w-[70%] cursor-pointer justify-center rounded-full py-[6px] transition-colors delay-100 ease-out",
                  currentDate?.dia === values.dia && "bg-primary-500"
                )}
              >
                <Typography
                  as="span"
                  text="paragraph"
                  font="outfit"
                  className="text-white"
                  onClick={() => handleDayClick(values.dia ?? "")}
                >
                  {values.dia?.padStart(2, "0")}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
