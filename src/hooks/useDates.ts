import { DateType } from "@/interfaces/types";
import isEmpty from "@/libs/is-empty";
import { eachDayOfInterval, endOfMonth, format, startOfMonth } from "date-fns";
import { es } from "date-fns/locale";
import { useCallback, useEffect, useMemo, useState } from "react";

interface Parameters {
  defaultValue?: string;
}

const dayWeeks: Record<string, number> = {
  lunes: 1,
  martes: 2,
  miércoles: 3,
  jueves: 4,
  viernes: 5,
  sábado: 6,
  domingo: 7,
};

const months: Record<number, string> = {
  1: "Enero",
  2: "Febrero",
  3: "Marzo",
  4: "Abril",
  5: "Mayo",
  6: "Junio",
  7: "Julio",
  8: "Agosto",
  9: "Septiembre",
  10: "Octubre",
  11: "Noviembre",
  12: "Diciembre",
};

const getMonth = (month: number) => months[month];

const getDayMonth = (date: Date) => {
  return eachDayOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  }).map((day) => ({
    dia: format(day, "d", { locale: es }),
    diaSemana: format(day, "EEEE", { locale: es }),
  }));
};

const parseDate = (date?: string): DateType => {
  if (typeof date === "string" && !isEmpty(date)) {
    const [dia, mes, año] = date.split("/");
    return {
      dia,
      mes: {
        numero: mes.padStart(2, "0"),
        nombre: getMonth(Number(mes)),
      },
      año,
    };
  }
  const now = useMemo(() => {
    return new Date();
  }, []);
  return {
    dia: now.getDate().toString(),
    mes: {
      numero: (now.getMonth() + 1).toString().padStart(2, "0"),
      nombre: getMonth(now.getMonth() + 1),
    },
    año: now.getFullYear().toString(),
  };
};

export function useDates({ defaultValue }: Parameters) {
  const [allDates, setAllDates] =
    useState<{ dia?: string; diaSemana?: string }[]>();
  const [currentDate, setCurrentDate] = useState<DateType>(() =>
    defaultValue ? parseDate(defaultValue) : {},
  );

  useEffect(() => {
    setAllDates(getDayMonth(new Date()));
  }, []);

  useEffect(() => {
    const { año, mes } = currentDate;
    if (año && mes?.numero) {
      setAllDates(
        getDayMonth(new Date(parseInt(año), parseInt(mes.numero) - 1)),
      );
    }
  }, [currentDate.año, currentDate.mes]);

  const Days = useMemo(() => ["lu", "ma", "mi", "ju", "vi", "sa", "do"], []);
  const Years = useMemo(
    () =>
      Array.from(
        { length: new Date().getFullYear() - 1970 + 1 },
        (_, i) => 1970 + i,
      ).reverse(),
    [],
  );
  const Months = useMemo(
    () =>
      Object.entries(months).map(([numero, nombre]) => ({
        numero: numero.padStart(2, "0"),
        nombre,
      })),
    [],
  );

  return {
    allDates,
    setAllDates,
    getDayMonth,
    getDayWeek: (day: string) => dayWeeks[day] ?? -1,
    Days,
    Years,
    Months,
    currentDate,
    setCurrentDate,
    parseDate: useCallback(parseDate, []),
  };
}
