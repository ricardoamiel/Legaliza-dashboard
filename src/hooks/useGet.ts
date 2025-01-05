import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import publicApiConfig from "@/config/public-api.config";

interface Props {
  url: string;
  body?: Record<string, any>;
  arrayDependencies?: any[];
}

export default function useGet<T>({
  url,
  body,
  arrayDependencies = [],
}: Props) {
  const urlApi = publicApiConfig.apiUrl;
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const token = Cookies.get("auth_access_token_os");

      try {
        const responsive = await axios.get<any, any>(`${urlApi}/${url}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
          params: body,
        });

        const data: T = responsive.data;
        setData(data);
        setLoading(false);
      } catch (e) {
        setData({} as T);
        setError(true);
      }
    };
    getData();
  }, [url, body, urlApi, ...arrayDependencies]);
  return { data: data ?? ({} as T), loading, error };
}
