import axios from "axios";
import { useCallback, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import publicApiConfig from "@/config/public-api.config";

interface Props {
  url: string;
}

export default function usePost<T>({ url }: Props) {
  const urlApi = publicApiConfig.apiUrl;
  //console.log(urlApi);
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const postFunction = useCallback(
    async ({ body }: { body?: Record<string, any> }) => {
      const token = Cookies.get("auth_access_token_os");
      //console.log(token);
      try {
        const responsive = await axios.post<any, any>(
          `${urlApi}/${url}`,
          body,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          },
        );
        const data: T = responsive.data;
        //console.log(data);
        setData(data);
        setLoading(false);
        toast.success("Registro exitoso");
      } catch (e) {
        //console.log(e);
        setData({} as T);
        setError(true);
        toast.error("Error al registrar");
      }
    },
    [],
  );
  return { data: data ?? ({} as T), loading, error, postFunction };
}
