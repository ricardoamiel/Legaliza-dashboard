interface ConstatacionDomiciliariaDashboardProps {
    tramite: {
      tipoCliente: string;
      numeroProceso: number;
      tipoDocumento: string;
      numeroDocumento: string;
      nombres: string;
      apellidoPaterno: string;
      apellidoMaterno: string;
      correo: string;
      direccion: string;
      documentoCopiaLiteral: string;
      departamentoArchivo: string;
      provinciaArchivo: string;
      distritoArchivo: string;
      direccionArchivo: string;
      observaciones: string;
      idUsuario: string;
    };
  }
  
export default function ConstatacionDomiciliariaDashboard({
  tramite,
}: ConstatacionDomiciliariaDashboardProps) {
  if (!tramite) {
    return <div>No hay datos para mostrar</div>;
  }

  return (
    <div className="p-6 pl-10 pb-10 pr-10">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Detalles del Trámite: Constatación Domiciliaria
      </h2>

      <table className="table-auto w-full border-collapse border border-gray-300 bg-gray-800 text-white rounded-lg shadow-md mb-6">
        <thead>
          <tr className="bg-gray-700">
            <th className="border border-gray-500 px-4 py-2 text-left">Campo</th>
            <th className="border border-gray-500 px-4 py-2 text-left">Valor</th>
          </tr>
        </thead>
        <tbody>
          {[
            { label: "Tipo de Cliente", value: tramite.tipoCliente || "No disponible" },
            { label: "Número de Proceso", value: tramite.numeroProceso || "No disponible" },
            { label: "Tipo de Documento", value: tramite.tipoDocumento || "No disponible" },
            { label: "Número de Documento", value: tramite.numeroDocumento || "No disponible" },
            { label: "Nombres", value: tramite.nombres || "No disponible" },
            { label: "Apellido Paterno", value: tramite.apellidoPaterno || "No disponible" },
            { label: "Apellido Materno", value: tramite.apellidoMaterno || "No disponible" },
            { label: "Correo", value: tramite.correo || "No disponible" },
            { label: "Dirección", value: tramite.direccion || "No disponible" },
            { label: "Documento Copia Literal", value: tramite.documentoCopiaLiteral || "Falta Subir" },
            { label: "Departamento", value: tramite.departamentoArchivo || "No disponible" },
            { label: "Provincia", value: tramite.provinciaArchivo || "No disponible" },
            { label: "Distrito", value: tramite.distritoArchivo || "No disponible" },
            { label: "Dirección Archivo", value: tramite.direccionArchivo || "No disponible" },
            { label: "Observaciones", value: tramite.observaciones || "Sin observaciones" },
            { label: "ID de Usuario", value: tramite.idUsuario || "No disponible" },
          ].map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"}
            >
              <td className="border border-gray-500 px-4 py-2">{item.label}</td>
              <td className="border border-gray-500 px-4 py-2">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}