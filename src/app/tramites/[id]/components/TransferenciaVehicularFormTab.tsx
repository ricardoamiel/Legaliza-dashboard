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
import { TransferenciaVehicularData, ToggleProps } from "@/interfaces/types";

interface Props {
  tramiteId: string;
  numeroProceso: number;
  toggle: ToggleProps;
}

const TransferenciaVehicularFormTab: React.FC<Props> = ({ tramiteId, numeroProceso, toggle }) => {
  const router = useRouter(); // Inicializa useRouter
  const [userRole, setUserRole] = useState<string | null>(null);
  const form = useForm<TransferenciaVehicularData>({
    initialValues: {
      _id: "",
      idUsuario: "",
      tipoActo: "",
      datosVehiculo: [{
        placa: "",
        oficinaRegistral: "",
        tipoMonedaOperacion: "",
        precioVenta: "",
        soatVigente: "",
        tarjetaPropiedad: "",
        medioPago: ""
      }],
      datosVendedor: [{
        tipoDocumento: "",
        nroDocumento: "",
        ocupacion: "",
        correo: "",
        celular: "",
        estadoCivil: "",
        copiaLiteral: "",
        ruc: ""
      }],
      datosCompradores: [{
        tipoDocumento: "",
        nroDocumento: "",
        ocupacion: "",
        correo: "",
        celular: "",
        estadoCivil: ""
      }],
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
        const response = await ApiFetcher.fetchApiDataByType("transferencia-vehicular", numeroProceso.toString());
        const data = response.data;
        form.setValues(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [numeroProceso]);

  const editarDatosMutation = useMutation({
    mutationFn: async (value: { body: Omit<TransferenciaVehicularData, "_id" | "idUsuario" | "numeroProceso" | "createdAt" | "updatedAt" | "__v"> }) => {
      return fetch(publicApiConfig.apiUrl + "/transferencia-vehicular/" + numeroProceso.toString(), {
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
            throw new Error("Error al guardar datos de la transferencia vehicular");
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

  const handleInputChangeSolo = <T extends keyof TransferenciaVehicularData>(field: T, value: any) => {
    form.setField(field, value);
  };

  const handleInputChange = <T extends keyof TransferenciaVehicularData>(field: T, index: number, subField: TransferenciaVehicularData[T] extends Array<infer U> ? keyof U : never, value: any) => {
    if (Array.isArray(form.values[field])) {
      const updatedField = [...(form.values[field] as any)];
      updatedField[index][subField] = value;
      form.setField(field, updatedField);
    }
  };

  const handleFileChange = <T extends keyof TransferenciaVehicularData>(
      field: T,
      index: number,
      subField: TransferenciaVehicularData[T] extends Array<infer U> ? keyof U : never,
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
            <label className="block text-sm font-medium text-gray-300">Tipo Acto</label>
            <Input
              placeholder="Tipo Acto"
              value={form.values.tipoActo}
              onChange={(e) => handleInputChangeSolo("tipoActo", e.target.value)}
            />
          </div>
          {/* Campos para datosVehiculo */}
          {form.values.datosVehiculo.map((vehiculo, index) => (
            <React.Fragment key={index}>
              <div>
                <label className="block text-sm font-medium text-gray-300">Placa</label>
                <Input
                  placeholder="Placa"
                  value={vehiculo.placa}
                  onChange={(e) => handleInputChange("datosVehiculo", index, "placa", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Oficina Registral</label>
                <Input
                  placeholder="Oficina Registral"
                  value={vehiculo.oficinaRegistral}
                  onChange={(e) => handleInputChange("datosVehiculo", index, "oficinaRegistral", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Tipo Moneda Operación</label>
                <Input
                  placeholder="Tipo Moneda Operación"
                  value={vehiculo.tipoMonedaOperacion}
                  onChange={(e) => handleInputChange("datosVehiculo", index, "tipoMonedaOperacion", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Precio Venta</label>
                <Input
                  placeholder="Precio Venta"
                  value={vehiculo.precioVenta}
                  onChange={(e) => handleInputChange("datosVehiculo", index, "precioVenta", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">SOAT Vigente</label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange("datosVehiculo", index, "soatVigente", e.target.files ? e.target.files[0] : null)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Tarjeta Propiedad</label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange("datosVehiculo", index, "tarjetaPropiedad", e.target.files ? e.target.files[0] : null)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Medio Pago</label>
                <Input
                  placeholder="Medio Pago"
                  value={vehiculo.medioPago}
                  onChange={(e) => handleInputChange("datosVehiculo", index, "medioPago", e.target.value)}
                />
              </div>
            </React.Fragment>
          ))}
          {/* Campos para datosVendedor */}
          {form.values.datosVendedor.map((vendedor, index) => (
            <React.Fragment key={index}>
              <div>
                <label className="block text-sm font-medium text-gray-300">Tipo Documento</label>
                <Input
                  placeholder="Tipo Documento"
                  value={vendedor.tipoDocumento}
                  onChange={(e) => handleInputChange("datosVendedor", index, "tipoDocumento", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Número Documento</label>
                <Input
                  placeholder="Número Documento"
                  value={vendedor.nroDocumento}
                  onChange={(e) => handleInputChange("datosVendedor", index, "nroDocumento", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Ocupación</label>
                <Input
                  placeholder="Ocupación"
                  value={vendedor.ocupacion}
                  onChange={(e) => handleInputChange("datosVendedor", index, "ocupacion", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Correo</label>
                <Input
                  placeholder="Correo"
                  value={vendedor.correo}
                  onChange={(e) => handleInputChange("datosVendedor", index, "correo", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Celular</label>
                <Input
                  placeholder="Celular"
                  value={vendedor.celular}
                  onChange={(e) => handleInputChange("datosVendedor", index, "celular", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Estado Civil</label>
                <Input
                  placeholder="Estado Civil"
                  value={vendedor.estadoCivil}
                  onChange={(e) => handleInputChange("datosVendedor", index, "estadoCivil", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Copia Literal</label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange("datosVendedor", index, "copiaLiteral", e.target.files ? e.target.files[0] : null)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">RUC</label>
                <Input
                  placeholder="RUC"
                  value={vendedor.ruc}
                  onChange={(e) => handleInputChange("datosVendedor", index, "ruc", e.target.value)}
                />
              </div>
            </React.Fragment>
          ))}
          {/* Campos para datosCompradores */}
          {form.values.datosCompradores.map((comprador, index) => (
            <React.Fragment key={index}>
              <div>
                <label className="block text-sm font-medium text-gray-300">Tipo Documento</label>
                <Input
                  placeholder="Tipo Documento"
                  value={comprador.tipoDocumento}
                  onChange={(e) => handleInputChange("datosCompradores", index, "tipoDocumento", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Número Documento</label>
                <Input
                  placeholder="Número Documento"
                  value={comprador.nroDocumento}
                  onChange={(e) => handleInputChange("datosCompradores", index, "nroDocumento", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Ocupación</label>
                <Input
                  placeholder="Ocupación"
                  value={comprador.ocupacion}
                  onChange={(e) => handleInputChange("datosCompradores", index, "ocupacion", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Correo</label>
                <Input
                  placeholder="Correo"
                  value={comprador.correo}
                  onChange={(e) => handleInputChange("datosCompradores", index, "correo", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Celular</label>
                <Input
                  placeholder="Celular"
                  value={comprador.celular}
                  onChange={(e) => handleInputChange("datosCompradores", index, "celular", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Estado Civil</label>
                <Input
                  placeholder="Estado Civil"
                  value={comprador.estadoCivil}
                  onChange={(e) => handleInputChange("datosCompradores", index, "estadoCivil", e.target.value)}
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

export default TransferenciaVehicularFormTab;