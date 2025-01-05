interface ConstitucionEmpresaDashboardProps {
  tramite: {
    idUsuario: string;
    tipoConstitucion?: string;
    nombresEmpresa: Array<string>;
    tipoSociedad: string;
    actividadesEmpresa: Array<string>;
    descripcionEmpresa: string;
    socios: Array<{
      nombresSocio: string;
      apellidosSocio: string;
      correoSocio: string;
      cargoSocio: string;
    }>;
    capitalSocial: number;
    tipoAportacion: string;
    cantidadEfectivo: number;
    cantidadBienes: number;
    representanteLegal: Array<{
      nombres: string;
      apellidos: string;
      tipoDocumento: string;
      numeroDocumento: string;
      profesion: string;
      nacionalidad: string;
      numeroContacto?: string;
      departamento: string;
      provincia: string;
      distrito: string;
      direccion: string;
      estadoCivil: string;
      bienesSeparados: boolean;
      NombresConyuge?: string;
      ApellidosConyuge?: string;
      tipoDocumentoConyuge?: string;
      numeroDocumentoConyuge?: string;
      oficinaRegistral?: string;
    }>;
    aporteEfectivo:number;
    aporteBienes:number;
    Bienes: Array<{
      cantidad: number;
      descripcion: string;
      valor: number;
      electronico: boolean;
      marcaModelo?: string;
      n_serie?: string;
    }>;
    correoEmpresa: string;
    telefonoEmpresa: string;
    direccionEmpresa: string;
    tipoDomicilio: string;
    tipoRegimen: string;
    numeroProceso: number;
  };
}

export default function ConstitucionEmpresaDashboard({
  tramite,
}: ConstitucionEmpresaDashboardProps) {
  if (!tramite) {
    return <div>No hay datos para mostrar</div>;
  }

  const {
    idUsuario,
    nombresEmpresa,
    tipoSociedad,
    actividadesEmpresa,
    descripcionEmpresa,
    socios,
    representanteLegal,
    numeroProceso,
    capitalSocial,
    tipoAportacion,
    cantidadEfectivo,
    cantidadBienes,
    correoEmpresa,
    telefonoEmpresa,
    direccionEmpresa,
    tipoDomicilio,
    tipoRegimen,
    tipoConstitucion,
    Bienes,
    aporteBienes,
    aporteEfectivo,
  } = tramite;

  return (
    <div className="p-6 pl-10 pb-10">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Detalles del Trámite: Constitución de Empresa
      </h2>

      {/* Información General */}
      <div className="mb-6">
        <p><strong>ID Usuario:</strong> {idUsuario || "No disponible"}</p>
        <p><strong>Número de Proceso:</strong> {numeroProceso || "No disponible"}</p>
        <p><strong>Nombre de la Empresa:</strong> {nombresEmpresa?.join(", ") || "No disponible"}</p>
        <p><strong>Tipo de Sociedad:</strong> {tipoSociedad || "No disponible"}</p>
        <p><strong>Actividades de la Empresa:</strong> {actividadesEmpresa?.join(", ") || "No disponible"}</p>
        <p><strong>Descripción:</strong> {descripcionEmpresa || "No disponible"}</p>
        <p><strong>Correo de la Empresa:</strong> {correoEmpresa || "No disponible"}</p>
        <p><strong>Telefono de la Empresa:</strong> {telefonoEmpresa || "No disponible"}</p>
        <p><strong>Dirección de la Empresa:</strong> {direccionEmpresa || "No disponible"}</p>
        <p><strong>Tipo de domicilio de la Empresa:</strong> {tipoDomicilio || "No disponible"}</p>
        <p><strong>Tipo de régimen de la Empresa:</strong> {tipoRegimen || "No disponible"}</p>
        <p><strong>Tipo de constitución de la Empresa:</strong> {tipoConstitucion || "No disponible"}</p>
        <p><strong>Capital Social:</strong> {capitalSocial || "No disponible"}</p>
        <p><strong>Tipo de Aportación:</strong> {tipoAportacion || "No disponible"}</p>
        <p><strong>Cantidad en Efectivo:</strong> {cantidadEfectivo || "No disponible"}</p>
        <p><strong>Cantidad en Bienes:</strong> {cantidadBienes || "No disponible"}</p>
        <p><strong>Aporte en Efectivo:</strong> {aporteEfectivo || "No disponible"}</p>
        <p><strong>Aporte en Bienes:</strong> {aporteBienes || "No disponible"}</p>
      </div>

      {/* Socios */}
      {socios && (
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4">Datos de los Socios</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socios.map((socio, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-md bg-gray-800 text-white"
              >
                <p><strong>Nombres:</strong> {socio.nombresSocio}</p>
                <p><strong>Apellidos:</strong> {socio.apellidosSocio}</p>
                <p><strong>Correo:</strong> {socio.correoSocio}</p>
                <p><strong>Cargo:</strong> {socio.cargoSocio}</p>
                <p><strong>Capital Social:</strong> {capitalSocial}</p>
                <p><strong>Tipo de Aportación:</strong> {tipoAportacion}</p>
                <p><strong>Cantidad en Efectivo:</strong> {cantidadEfectivo}</p>
                <p><strong>Cantidad en Bienes:</strong> {cantidadBienes}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Representante Legal */}
      {representanteLegal && (
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4">Representante Legal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {representanteLegal.map((representante, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-md bg-gray-800 text-white"
              >
                <p><strong>Nombres:</strong> {representante.nombres}</p>
                <p><strong>Apellidos:</strong> {representante.apellidos}</p>
                <p><strong>Tipo de Documento:</strong> {representante.tipoDocumento}</p>
                <p><strong>Número de Documento:</strong> {representante.numeroDocumento}</p>
                <p><strong>Profesión:</strong> {representante.profesion}</p>
                <p><strong>Nacionalidad:</strong> {representante.nacionalidad}</p>
                <p><strong>Número de Contacto:</strong> {representante.numeroContacto}</p>
                <p><strong>Departamento:</strong> {representante.departamento}</p>
                <p><strong>Provincia:</strong> {representante.provincia}</p>
                <p><strong>Distrito:</strong> {representante.distrito}</p>
                <p><strong>Dirección:</strong> {representante.direccion}</p>
                <p><strong>Estado Civil:</strong> {representante.estadoCivil}</p>
                <p><strong>¿Bienes Separados?:</strong> {representante.bienesSeparados ? "Sí" : "No"}</p>
                <p><strong>Nombres Cónyuge:</strong> {representante.NombresConyuge|| "No tiene"}</p>
                <p><strong>Apellidos Cónyuge:</strong> {representante.ApellidosConyuge|| "No tiene"}</p>
                <p><strong>Tipo Documento Cónyuge:</strong> {representante.tipoDocumentoConyuge|| "No tiene"}</p>
                <p><strong>Número Documento Cónyuge:</strong> {representante.numeroDocumentoConyuge|| "No tiene"}</p>
                <p><strong>Oficina Registral:</strong> {representante.oficinaRegistral|| "No tiene"}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bienes */}
      {Bienes && (
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4">Bienes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Bienes.map((bien, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-md bg-gray-800 text-white"
              >
                <p><strong>Cantidad:</strong> {bien.cantidad}</p>
                <p><strong>Descripción:</strong> {bien.descripcion}</p>
                <p><strong>Valor:</strong> {bien.valor}</p>
                <p><strong>¿Electrónico?:</strong> {bien.electronico ? "Sí" : "No"}</p>
                <p><strong>Marca/Modelo:</strong> {bien.marcaModelo || "No registrada"}</p>
                <p><strong>Número de Serie:</strong> {bien.n_serie || "No registrada"}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}