import React, { useEffect, useState } from "react";
import Icon from "@/Components/ui/icon";
import Input from "@/Components/ui/input";
import ButtonSm from "@/Components/ui/button-sm";
import { useMutation } from "@tanstack/react-query";
import publicApiConfig from "@/config/public-api.config";
import { toast } from "sonner";
import { authConfig } from "@/context/auth.context";
import Cookies from "js-cookie";
import ApiFetcher from "@/app/tramites/[id]/components/ApiDataFetcher";
import useForm from "@/hooks/form.hook";
import { useRouter } from "next/navigation"; // Importa useRouter
import { PermisoDeViajeData, ToggleProps } from "@/interfaces/types";

interface Props {
  tramiteId: string;
  numeroProceso: number;
  toggle: ToggleProps;
}

// Función para formatear la fecha al formato yyyy-mm-dd
const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
// Función para parsear la fecha del formato yyyy-mm-dd al formato dd/mm/aa
/*const parseDate = (dateString: string): string => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };*/
  
// Función para parsear string a número
const parseNumber = (value: string): number => {
    return parseInt(value, 10);
  };

const PermisoDeViajeFormTab: React.FC<Props> = ({ tramiteId, numeroProceso, toggle }) => {
  const router = useRouter(); // Inicializa useRouter
  const [userRole, setUserRole] = useState<string | null>(null);
  const form = useForm<PermisoDeViajeData>({
    initialValues: {
      _id: "",
      idUsuario: "",
      tipoPermisoViaje: "",
      datoPadres: [{
        tipoInterviniente: "",
        tipoDocumento: "",
        numeroDocumento: "",
        email: "",
        celular: "",
        departamento: "",
        provincia: "",
        distrito: "",
        oficinaRegistral: "",
        partidaRegistral: "",
        condicion: "",
        idADocumentoIdentidadAnverso: "",
        idDocumentoIdentidadReverso: ""
      }],
      datoMenores: [{
        tipoDocumento: "",
        numeroDocumento: "",
        nombreCompleto: "",
        edad: 0,
        idADocumentoIdentidadAnverso: "",
        idDocumentoIdentidadReverso: ""
      }],
      destinoSale: "",
      destinoViaje: "",
      isRetorna: false,
      fechaSalida: "",
      fechaRetorno: "",
      medioTransporte: "",
      isViajeSolo: false,
      datoAcompanantes: [{
        tipoDocumento: "",
        numeroDocumento: "",
        nombreCompleto: ""
      }],
      detalleObservacion: "",
      numeroProceso: 0,
      createdAt: "",
      updatedAt: "",
      __v: 0,
    },
  });

  const token = Cookies.get(authConfig.storageTokenKeyName);
  if (!token) {
    console.error("No se encontró un token de autenticación");
  }
  
  useEffect(() => {
    const fetchUserRole = async () => {
      const token = Cookies.get(authConfig.storageTokenKeyName);
      const userId = Cookies.get(authConfig.storageUserId);
      if (!token || !userId) {
        return;
      }

      try {
        const response = await fetch(`${publicApiConfig.apiUrl}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const userData = await response.json();
        setUserRole(userData.tipoUsuario);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiFetcher.fetchApiDataByType("permiso-de-viaje", numeroProceso.toString());
        const data = response.data;
        data.fechaSalida = formatDate(data.fechaSalida);
        data.fechaRetorno = formatDate(data.fechaRetorno);
        // Asegurar que datoAcompanantes sea un array vacío si no está presente
        if (!data.datoAcompanantes) {
            data.datoAcompanantes = [];
        }
        form.setValues(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [numeroProceso]);

  const editarDatosMutation = useMutation({
    mutationFn: async (value: { body: Omit<PermisoDeViajeData, "_id" | "idUsuario" | "numeroProceso" | "createdAt" | "updatedAt" | "__v"> }) => {
      return fetch(publicApiConfig.apiUrl + "/permiso-viajes/" + numeroProceso.toString(), {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value.body),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status >= 400) {
            throw new Error("Error al guardar datos del permiso de viaje");
          }
          return res;
        });
    },
    onSuccess: () => {
      toast.success("Datos actualizados correctamente");
      toggle.onClose();
    },
  });

  const handleSubmit = () => {
    const { _id, idUsuario, numeroProceso, createdAt, updatedAt, __v, ...filteredValues } = form.values;
    console.log("Datos a guardar:", filteredValues);
    //filteredValues.fechaSalida = parseDate(filteredValues.fechaSalida);
    //filteredValues.fechaRetorno = parseDate(filteredValues.fechaRetorno);
    filteredValues.datoMenores[0].edad = parseNumber(filteredValues.datoMenores[0].edad.toString());
    console.log("Datos a guardar:", filteredValues);
    editarDatosMutation.mutate({
      body: filteredValues,
    });
    
  };

  const handleCancel = () => {
    if (userRole === "ADMINISTRADOR") {
      router.push("/tramites");
    } else {
      router.push("/tramites/cliente");
    }
  };

  const handleInputChangeSolo = <T extends keyof PermisoDeViajeData>(field: T, value: any) => {
    form.setField(field, value);
  };

  const handleInputChange = <T extends keyof PermisoDeViajeData>(field: T, index: number, subField: PermisoDeViajeData[T] extends Array<infer U> ? keyof U : never, value: any) => {
    if (Array.isArray(form.values[field])) {
      const updatedField = [...(form.values[field] as any)];
      updatedField[index][subField] = subField === "edad" ? parseInt(value, 10) : value;
      form.setField(field, updatedField);
    }
  };

  const handleFileChange = <T extends keyof PermisoDeViajeData>(
    field: T,
    index: number,
    subField: PermisoDeViajeData[T] extends Array<infer U> ? keyof U : never,
    file: File | null
  ) => {
    if (file && Array.isArray(form.values[field])) {
      const updatedField = [...(form.values[field] as any)];
      updatedField[index][subField] = file.name;
      form.setField(field, updatedField);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md overflow-y-auto h-[calc(100vh-200px)] pl-4"> {/* Añade padding a la izquierda y barra de desplazamiento */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Tipo Permiso Viaje</label>
            <Input
              placeholder="Tipo Permiso Viaje"
              value={form.values.tipoPermisoViaje}
              onChange={(e) => handleInputChangeSolo("tipoPermisoViaje", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Destino Sale</label>
            <Input
              placeholder="Destino Sale"
              value={form.values.destinoSale}
              onChange={(e) => handleInputChangeSolo("destinoSale", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Destino Viaje</label>
            <Input
              placeholder="Destino Viaje"
              value={form.values.destinoViaje}
              onChange={(e) => handleInputChangeSolo("destinoViaje", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Fecha Salida</label>
            <Input
              type="date"
              value={form.values.fechaSalida}
              onChange={(e) => handleInputChangeSolo("fechaSalida", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Fecha Retorno</label>
            <Input
              type="date"
              value={form.values.fechaRetorno}
              onChange={(e) => handleInputChangeSolo("fechaRetorno", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Medio Transporte</label>
            <Input
              placeholder="Medio Transporte"
              value={form.values.medioTransporte}
              onChange={(e) => handleInputChangeSolo("medioTransporte", e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={form.values.isRetorna}
              onChange={(e) => handleInputChangeSolo("isRetorna", e.target.checked)}
            />
            <label className="ml-2">Retorna</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={form.values.isViajeSolo}
              onChange={(e) => handleInputChangeSolo("isViajeSolo", e.target.checked)}
            />
            <label className="ml-2">Viaje Solo</label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Detalle Observación</label>
            <Input
              placeholder="Detalle Observación"
              value={form.values.detalleObservacion}
              onChange={(e) => handleInputChangeSolo("detalleObservacion", e.target.value)}
            />
          </div>
          {/* Campos para datoPadres */}
          {form.values.datoPadres.map((padre, index) => (
            <React.Fragment key={index}>
              <div>
                <label className="block text-sm font-medium text-gray-300">Tipo Interviniente</label>
                <Input
                  placeholder="Tipo Interviniente"
                  value={padre.tipoInterviniente}
                  onChange={(e) => handleInputChange("datoPadres", index, "tipoInterviniente", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Tipo Documento</label>
                <Input
                  placeholder="Tipo Documento"
                  value={padre.tipoDocumento}
                  onChange={(e) => handleInputChange("datoPadres", index, "tipoDocumento", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Número Documento</label>
                <Input
                  placeholder="Número Documento"
                  value={padre.numeroDocumento}
                  onChange={(e) => handleInputChange("datoPadres", index, "numeroDocumento", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Email</label>
                <Input
                  placeholder="Email"
                  value={padre.email}
                  onChange={(e) => handleInputChange("datoPadres", index, "email", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Celular</label>
                <Input
                  placeholder="Celular"
                  value={padre.celular}
                  onChange={(e) => handleInputChange("datoPadres", index, "celular", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Departamento</label>
                <Input
                  placeholder="Departamento"
                  value={padre.departamento}
                  onChange={(e) => handleInputChange("datoPadres", index, "departamento", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Provincia</label>
                <Input
                  placeholder="Provincia"
                  value={padre.provincia}
                  onChange={(e) => handleInputChange("datoPadres", index, "provincia", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Distrito</label>
                <Input
                  placeholder="Distrito"
                  value={padre.distrito}
                  onChange={(e) => handleInputChange("datoPadres", index, "distrito", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Oficina Registral</label>
                <Input
                  placeholder="Oficina Registral"
                  value={padre.oficinaRegistral}
                  onChange={(e) => handleInputChange("datoPadres", index, "oficinaRegistral", e.target.value ? e.target.value : "")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Partida Registral</label>
                <Input
                  placeholder="Partida Registral"
                  value={padre.partidaRegistral}
                  onChange={(e) => handleInputChange("datoPadres", index, "partidaRegistral", e.target.value ? e.target.value : "")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Condición</label>
                <Input
                  placeholder="Condición"
                  value={padre.condicion}
                  onChange={(e) => handleInputChange("datoPadres", index, "condicion", e.target.value ? e.target.value : "")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Documento Identidad Anverso</label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange("datoPadres", index, "idADocumentoIdentidadAnverso", e.target.files ? e.target.files[0] : null)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Documento Identidad Reverso</label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange("datoPadres", index, "idDocumentoIdentidadReverso", e.target.files ? e.target.files[0] : null)}
                />
              </div>
            </React.Fragment>
          ))}
          {/* Campos para datoMenores */}
          {form.values.datoMenores.map((menor, index) => (
            <React.Fragment key={index}>
              <div>
                <label className="block text-sm font-medium text-gray-300">Tipo Documento</label>
                <Input
                  placeholder="Tipo Documento"
                  value={menor.tipoDocumento}
                  onChange={(e) => handleInputChange("datoMenores", index, "tipoDocumento", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Número Documento</label>
                <Input
                  placeholder="Número Documento"
                  value={menor.numeroDocumento}
                  onChange={(e) => handleInputChange("datoMenores", index, "numeroDocumento", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Nombre Completo</label>
                <Input
                  placeholder="Nombre Completo"
                  value={menor.nombreCompleto}
                  onChange={(e) => handleInputChange("datoMenores", index, "nombreCompleto", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Edad</label>
                <Input
                  placeholder="Edad"
                  value={menor.edad}
                  onChange={(e) => handleInputChange("datoMenores", index, "edad", parseInt(e.target.value, 10))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Documento Identidad Anverso</label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange("datoMenores", index, "idADocumentoIdentidadAnverso", e.target.files ? e.target.files[0] : null)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Documento Identidad Reverso</label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange("datoMenores", index, "idDocumentoIdentidadReverso", e.target.files ? e.target.files[0] : null)}
                />
              </div>
            </React.Fragment>
          ))}
           {/* Campos para datoAcompanantes */}
            {form.values.datoAcompanantes.map((acompanante, index) => (
            <React.Fragment key={index}>
                <div>
                <label className="block text-sm font-medium text-gray-300">Tipo Documento</label>
                <Input
                    placeholder="Tipo Documento"
                    value={acompanante.tipoDocumento}
                    onChange={(e) => handleInputChange("datoAcompanantes", index, "tipoDocumento", e.target.value)}
                    //disabled={form.values.isViajeSolo} // Deshabilitar si isViajeSolo está marcado
                />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-300">Número Documento</label>
                <Input
                    placeholder="Número Documento"
                    value={acompanante.numeroDocumento}
                    onChange={(e) => handleInputChange("datoAcompanantes", index, "numeroDocumento", e.target.value)}
                    //disabled={form.values.isViajeSolo} // Deshabilitar si isViajeSolo está marcado
                />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-300">Nombre Completo</label>
                <Input
                    placeholder="Nombre Completo"
                    value={acompanante.nombreCompleto}
                    onChange={(e) => handleInputChange("datoAcompanantes", index, "nombreCompleto", e.target.value)}
                    //disabled={form.values.isViajeSolo} // Deshabilitar si isViajeSolo está marcado
                />
                </div>
            </React.Fragment>
            ))}
        </div>
        <div className="flex w-full justify-between grid-cols-2 gap-2">
          <ButtonSm onClick={handleCancel} className="bg-primary-700">
            Regresar
          </ButtonSm>
          <ButtonSm onClick={handleSubmit} className="bg-primary-700">
            Guardar
          </ButtonSm>
        </div>
      </div>
    </div>
  );
};

export default PermisoDeViajeFormTab;