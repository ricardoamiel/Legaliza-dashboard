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
import { ConstitucionEmpresaData, ToggleProps } from "@/interfaces/types";

interface Props {
  tramiteId: string;
  numeroProceso: number;
  toggle: ToggleProps;
}

const ConstitucionEmpresaFormTab: React.FC<Props> = ({ tramiteId, numeroProceso, toggle }) => {
  const router = useRouter(); // Inicializa useRouter
  const [userRole, setUserRole] = useState<string | null>(null);
  const form = useForm<ConstitucionEmpresaData>({
    initialValues: {
      _id: "",
      tipoConstitucion: "",
      nombresEmpresa: [""],
      tipoSociedad: "",
      actividadesEmpresa: [""],
      descripcionEmpresa: "",
      socios: [{
        nombresSocio: "",
        apellidosSocio: "",
        correoSocio: "",
        cargoSocio: ""
      }],
      capitalSocial: 0,
      tipoAportacion: "",
      cantidadEfectivo: 0,
      cantidadBienes: 0,
      representanteLegal: [{
        nombres: "",
        apellidos: "",
        tipoDocumento: "",
        numeroDocumento: "",
        profesion: "",
        nacionalidad: "",
        numeroContacto: "",
        departamento: "",
        provincia: "",
        distrito: "",
        direccion: "",
        estadoCivil: "",
        bienesSeparados: false,
        NombresConyuge: "",
        ApellidosConyuge: "",
        tipoDocumentoConyuge: "",
        numeroDocumentoConyuge: "",
        oficinaRegistral: ""
      }],
      aporteEfectivo: 0,
      aporteBienes: 0,
      Bienes: [{
        cantidad: 0,
        descripcion: "",
        valor: 0,
        electronico: false,
        marcaModelo: "",
        n_serie: ""
      }],
      correoEmpresa: "",
      telefonoEmpresa: "",
      direccionEmpresa: "",
      tipoDomicilio: "",
      tipoRegimen: "",
      idUsuario: "",
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
        const response = await ApiFetcher.fetchApiDataByType("constitucion-empresa", numeroProceso.toString());
        const data = response.data;
        form.setValues(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [numeroProceso]);

  const editarDatosMutation = useMutation({
    mutationFn: async (value: { body: Omit<ConstitucionEmpresaData, "_id" | "idUsuario" | "numeroProceso" | "createdAt" | "updatedAt" | "__v"> }) => {
      return fetch(publicApiConfig.apiUrl + "/constitucion-empresa/" + numeroProceso.toString(), {
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
            throw new Error("Error al guardar datos de la constitución de empresa");
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

  const handleInputChangeSolo = <T extends keyof ConstitucionEmpresaData>(field: T, value: any) => {
    form.setField(field, value);
  };

  const handleInputChange = <T extends keyof ConstitucionEmpresaData>(field: T, index: number, subField: ConstitucionEmpresaData[T] extends Array<infer U> ? keyof U : never, value: any) => {
    if (Array.isArray(form.values[field])) {
      const updatedField = [...(form.values[field] as any)];
      updatedField[index][subField] = value;
      form.setField(field, updatedField);
    }
  };
  
  const handleInputChangeStringArray = (field: keyof ConstitucionEmpresaData, index: number, value: string) => {
    if (Array.isArray(form.values[field])) {
      const updatedField = [...(form.values[field] as string[])];
      updatedField[index] = value;
      form.setField(field, updatedField);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md overflow-y-auto h-[calc(100vh-200px)] pl-4"> {/* Añade padding a la izquierda y barra de desplazamiento */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Tipo Constitución</label>
            <Input
              placeholder="Tipo Constitución"
              value={form.values.tipoConstitucion}
              onChange={(e) => handleInputChangeSolo("tipoConstitucion", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Tipo Sociedad</label>
            <Input
              placeholder="Tipo Sociedad"
              value={form.values.tipoSociedad}
              onChange={(e) => handleInputChangeSolo("tipoSociedad", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Descripción Empresa</label>
            <Input
              placeholder="Descripción Empresa"
              value={form.values.descripcionEmpresa}
              onChange={(e) => handleInputChangeSolo("descripcionEmpresa", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Capital Social</label>
            <Input
              placeholder="Capital Social"
              value={form.values.capitalSocial}
              onChange={(e) => handleInputChangeSolo("capitalSocial", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Tipo Aportación</label>
            <Input
              placeholder="Tipo Aportación"
              value={form.values.tipoAportacion}
              onChange={(e) => handleInputChangeSolo("tipoAportacion", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Cantidad Efectivo</label>
            <Input
              placeholder="Cantidad Efectivo"
              value={form.values.cantidadEfectivo}
              onChange={(e) => handleInputChangeSolo("cantidadEfectivo", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Cantidad Bienes</label>
            <Input
              placeholder="Cantidad Bienes"
              value={form.values.cantidadBienes}
              onChange={(e) => handleInputChangeSolo("cantidadBienes", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Correo Empresa</label>
            <Input
              placeholder="Correo Empresa"
              value={form.values.correoEmpresa}
              onChange={(e) => handleInputChangeSolo("correoEmpresa", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Teléfono Empresa</label>
            <Input
              placeholder="Teléfono Empresa"
              value={form.values.telefonoEmpresa}
              onChange={(e) => handleInputChangeSolo("telefonoEmpresa", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Dirección Empresa</label>
            <Input
              placeholder="Dirección Empresa"
              value={form.values.direccionEmpresa}
              onChange={(e) => handleInputChangeSolo("direccionEmpresa", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Tipo Domicilio</label>
            <Input
              placeholder="Tipo Domicilio"
              value={form.values.tipoDomicilio}
              onChange={(e) => handleInputChangeSolo("tipoDomicilio", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Tipo Régimen</label>
            <Input
              placeholder="Tipo Régimen"
              value={form.values.tipoRegimen}
              onChange={(e) => handleInputChangeSolo("tipoRegimen", e.target.value)}
            />
          </div>
          {/* Campos para nombresEmpresa */}
          {form.values.nombresEmpresa.map((nombre, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-300">Nombre Empresa</label>
              <Input
                placeholder="Nombre Empresa"
                value={nombre}
                onChange={(e) => handleInputChangeStringArray("nombresEmpresa", index, e.target.value)}
              />
            </div>
          ))}
          {/* Campos para actividadesEmpresa */}
          {form.values.actividadesEmpresa.map((actividad, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-300">Actividad Empresa</label>
              <Input
                placeholder="Actividad Empresa"
                value={actividad}
                onChange={(e) => handleInputChangeStringArray("actividadesEmpresa", index, e.target.value)}
              />
            </div>
          ))}
          {/* Campos para socios */}
          {form.values.socios.map((socio, index) => (
            <React.Fragment key={index}>
              <div>
                <label className="block text-sm font-medium text-gray-300">Nombres Socio</label>
                <Input
                  placeholder="Nombres Socio"
                  value={socio.nombresSocio}
                  onChange={(e) => handleInputChange("socios", index, "nombresSocio", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Apellidos Socio</label>
                <Input
                  placeholder="Apellidos Socio"
                  value={socio.apellidosSocio}
                  onChange={(e) => handleInputChange("socios", index, "apellidosSocio", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Correo Socio</label>
                <Input
                  placeholder="Correo Socio"
                  value={socio.correoSocio}
                  onChange={(e) => handleInputChange("socios", index, "correoSocio", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Cargo Socio</label>
                <Input
                  placeholder="Cargo Socio"
                  value={socio.cargoSocio}
                  onChange={(e) => handleInputChange("socios", index, "cargoSocio", e.target.value)}
                />
              </div>
            </React.Fragment>
          ))}
          {/* Campos para representanteLegal */}
          {form.values.representanteLegal.map((representante, index) => (
            <React.Fragment key={index}>
              <div>
                <label className="block text-sm font-medium text-gray-300">Nombres</label>
                <Input
                  placeholder="Nombres"
                  value={representante.nombres}
                  onChange={(e) => handleInputChange("representanteLegal", index, "nombres", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Apellidos</label>
                <Input
                  placeholder="Apellidos"
                  value={representante.apellidos}
                  onChange={(e) => handleInputChange("representanteLegal", index, "apellidos", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Tipo Documento</label>
                <Input
                  placeholder="Tipo Documento"
                  value={representante.tipoDocumento}
                  onChange={(e) => handleInputChange("representanteLegal", index, "tipoDocumento", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Número Documento</label>
                <Input
                  placeholder="Número Documento"
                  value={representante.numeroDocumento}
                  onChange={(e) => handleInputChange("representanteLegal", index, "numeroDocumento", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Profesión</label>
                <Input
                  placeholder="Profesión"
                  value={representante.profesion}
                  onChange={(e) => handleInputChange("representanteLegal", index, "profesion", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Nacionalidad</label>
                <Input
                  placeholder="Nacionalidad"
                  value={representante.nacionalidad}
                  onChange={(e) => handleInputChange("representanteLegal", index, "nacionalidad", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Número Contacto</label>
                <Input
                  placeholder="Número Contacto"
                  value={representante.numeroContacto}
                  onChange={(e) => handleInputChange("representanteLegal", index, "numeroContacto", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Departamento</label>
                <Input
                  placeholder="Departamento"
                  value={representante.departamento}
                  onChange={(e) => handleInputChange("representanteLegal", index, "departamento", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Provincia</label>
                <Input
                  placeholder="Provincia"
                  value={representante.provincia}
                  onChange={(e) => handleInputChange("representanteLegal", index, "provincia", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Distrito</label>
                <Input
                  placeholder="Distrito"
                  value={representante.distrito}
                  onChange={(e) => handleInputChange("representanteLegal", index, "distrito", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Dirección</label>
                <Input
                  placeholder="Dirección"
                  value={representante.direccion}
                  onChange={(e) => handleInputChange("representanteLegal", index, "direccion", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Estado Civil</label>
                <Input
                  placeholder="Estado Civil"
                  value={representante.estadoCivil}
                  onChange={(e) => handleInputChange("representanteLegal", index, "estadoCivil", e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={representante.bienesSeparados}
                  onChange={(e) => handleInputChange("representanteLegal", index, "bienesSeparados", e.target.checked)}
                />
                <label className="ml-2">Bienes Separados</label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Nombres Cónyuge</label>
                <Input
                  placeholder="Nombres Cónyuge"
                  value={representante.NombresConyuge}
                  onChange={(e) => handleInputChange("representanteLegal", index, "NombresConyuge", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Apellidos Cónyuge</label>
                <Input
                  placeholder="Apellidos Cónyuge"
                  value={representante.ApellidosConyuge}
                    onChange={(e) => handleInputChange("representanteLegal", index, "ApellidosConyuge", e.target.value)}
                />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300">Apellidos Cónyuge</label>
                    <Input
                    placeholder="Apellidos Cónyuge"
                    value={representante.ApellidosConyuge}
                    onChange={(e) => handleInputChange("representanteLegal", index, "ApellidosConyuge", e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300">Tipo Documento Cónyuge</label>
                    <Input
                    placeholder="Tipo Documento Cónyuge"
                    value={representante.tipoDocumentoConyuge}
                    onChange={(e) => handleInputChange("representanteLegal", index, "tipoDocumentoConyuge", e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300">Número Documento Cónyuge</label>
                    <Input
                    placeholder="Número Documento Cónyuge"
                    value={representante.numeroDocumentoConyuge}
                    onChange={(e) => handleInputChange("representanteLegal", index, "numeroDocumentoConyuge", e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300">Número Documento Cónyuge</label>
                    <Input
                    placeholder="Oficina Registral"
                    value={representante.oficinaRegistral}
                    onChange={(e) => handleInputChange("representanteLegal", index, "oficinaRegistral", e.target.value)}
                    />
                </div>
                </React.Fragment>
            ))}
            {/* Campos para bienes */}
            {form.values.Bienes.map((bien, index) => (
                <React.Fragment key={index}>
                <div>
                    <label className="block text-sm font-medium text-gray-300">Cantidad</label>
                    <Input
                    placeholder="Cantidad"
                    value={bien.cantidad}
                    onChange={(e) => handleInputChange("Bienes", index, "cantidad", e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300">Descripción</label>
                    <Input
                    placeholder="Descripción"
                    value={bien.descripcion}
                    onChange={(e) => handleInputChange("Bienes", index, "descripcion", e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300">Valor</label>
                    <Input
                    placeholder="Valor"
                    value={bien.valor}
                    onChange={(e) => handleInputChange("Bienes", index, "valor", e.target.value)}
                    />
                </div>
                <div className="flex items-center">
                    <input
                    type="checkbox"
                    checked={bien.electronico}
                    onChange={(e) => handleInputChange("Bienes", index, "electronico", e.target.checked)}
                    />
                    <label className="ml-2">Electrónico</label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300">Marca/Modelo</label>
                    <Input
                    placeholder="Marca/Modelo"
                    value={bien.marcaModelo}
                    onChange={(e) => handleInputChange("Bienes", index, "marcaModelo", e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300">Número de Serie</label>
                    <Input
                    placeholder="Número de Serie"
                    value={bien.n_serie}
                    onChange={(e) => handleInputChange("Bienes", index, "n_serie", e.target.value)}
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

export default ConstitucionEmpresaFormTab;