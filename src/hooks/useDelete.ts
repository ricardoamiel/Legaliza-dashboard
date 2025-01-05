import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import publicApiConfig from "@/config/public-api.config";

interface Props {
  url: string;
}

export default function useDelete<T>({ url }: Props) {
  const urlApi = publicApiConfig.apiUrl;
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const deleteFunciton = async (id: string) => {
    const token = Cookies.get("auth_access_token_os");
    try {
      await axios.delete<any, any>(`${urlApi}/${url}/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setData(true);
      setLoading(false);
      toast.success("Eliminacion exitosa");
    } catch (e) {
      //console.log(e);
      setData(false);
      setError(true);
      toast.error("Error al eliminar");
    }
  };

  return { data: data ?? ({} as T), loading, error, deleteFunciton };
}
