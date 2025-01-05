import publicApiConfig from "@/config/public-api.config";
import Cookies from "js-cookie";
import { authConfig } from "@/context/auth.context";
import { ApiEndpointMapping } from "./Api-mapping";
import { ClassDictionary } from "clsx";

const ApiDataFetcher = {
  // Método para obtener un trámite por ID
  async fetchTramiteById(id: string) {
    try {
      // Obtén el token desde las cookies
      const token = Cookies.get(authConfig.storageTokenKeyName);
      //console.log("Token encontrado:", token);
      if (!token) {
        throw new Error("No se encontró un token de autenticación");
      }

      // Realiza la solicitud
      const response = await fetch(publicApiConfig.apiUrl + `/tramites/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Incluye el token en los encabezados
          "Content-Type": "application/json",
        },
      });

      // Verifica si la respuesta fue exitosa
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      // Devuelve los datos en formato JSON
      return await response.json();
    } catch (error) {
      console.error("Error fetching tramite by ID:", error);
      throw error;
    }
  },

  // Método para obtener datos específicos de la API basados en el tipo
  async fetchApiDataByType(type: string, id: string) {
    try {
      // Obtén el token desde las cookies
      const token = Cookies.get(authConfig.storageTokenKeyName);

      if (!token) {
        throw new Error("No se encontró un token de autenticación");
      }
      
      // Usa el diccionario de mapeo para obtener el endpoint correcto
      const endpoint = ApiEndpointMapping[type] || type;

      // Realiza la solicitud
      const response = await fetch(
        publicApiConfig.apiUrl + `/${endpoint}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Incluye el token en los encabezados
            "Content-Type": "application/json",
          },
        }
      );

      // Verifica si la respuesta fue exitosa
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      // Devuelve los datos en formato JSON
      return await response.json();
    } catch (error) {
      console.error("Error fetching API data by type:", error);
      throw error;
    }
  },
  
  // Nuevo método para obtener todos los trámites de un tipo
  async fetchTramitesByType(type: string) {
    try {
      const token = Cookies.get(authConfig.storageTokenKeyName);
      if (!token) {
        throw new Error("No se encontró un token de autenticación");
      }

      const endpoint = ApiEndpointMapping[type] || type;

      const response = await fetch(publicApiConfig.apiUrl + `/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching tramites by type:", error);
      throw error;
    }
  },
  
  async fetchAllTramites(page: number, limit: number) {
    try {
      const token = Cookies.get(authConfig.storageTokenKeyName);
      if (!token) {
        throw new Error("No se encontró un token de autenticación");
      }

      const response = await fetch(
        publicApiConfig.apiUrl + `/tramites?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching all tramites:", error);
      throw error;
    }
  },
  
  // recuperar usuario por su idusuario
  async fetchUserById(id: string) {
    try {
      const token = Cookies.get(authConfig.storageTokenKeyName);
      if (!token) throw new Error("No se encontró un token de autenticación");
  
      const response = await fetch(publicApiConfig.apiUrl + `/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  },
  
  // Método para modificar un trámite (PUT)
  async modifyTramite(id: string, data:ClassDictionary, type: string) {
    try {
      const token = Cookies.get(authConfig.storageTokenKeyName);
      if (!token) throw new Error("No se encontró un token de autenticación");

      const endpoint = ApiEndpointMapping[type] || type;

      const response = await fetch(publicApiConfig.apiUrl + `/${endpoint}/${id}`, {
        method: "PUT", // Usamos PUT para actualizar
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Cuerpo de la solicitud con los datos que deseas actualizar
      });

      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

      return await response.json();
    } catch (error) {
      console.error("Error modifying tramite:", error);
      throw error;
    }
  },

  // Método para eliminar un trámite (DELETE)
  async deleteTramite(id:string, type: string) {
    try {
      const token = Cookies.get(authConfig.storageTokenKeyName);
      if (!token) throw new Error("No se encontró un token de autenticación");

      const endpoint = ApiEndpointMapping[type] || type;

      const response = await fetch(publicApiConfig.apiUrl + `/${endpoint}/${id}`, {
        method: "DELETE", // Usamos DELETE para eliminar
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

      return await response.json();
    } catch (error) {
      console.error("Error deleting tramite:", error);
      throw error;
    }
  },
  
  // Nuevo método para obtener el primer trámite de un usuario
  async fetchFirstTramiteByUserId(userId: string) {
    try {
      const token = Cookies.get(authConfig.storageTokenKeyName);
      if (!token) {
        throw new Error("No se encontró un token de autenticación");
      }

      const response = await fetch(publicApiConfig.apiUrl + `/tramites?userId=${userId}&limit=1`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data[0]; // Devuelve el primer trámite
    } catch (error) {
      console.error("Error fetching first tramite by user ID:", error);
      throw error;
    }
  },
};

export default ApiDataFetcher;
