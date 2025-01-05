import { parseISO, format } from "date-fns";

export function parsedDate(date: string) {
  return format(parseISO(date), "dd/MM/yyyy hh:mm:ss a");
}
