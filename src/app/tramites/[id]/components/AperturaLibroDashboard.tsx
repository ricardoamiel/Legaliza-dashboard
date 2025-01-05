interface AperturaLibroDashboardProps {
  tramite: {
    tipoDocumento: string;
    numeroDocumento: string;
    correo: string;
    celular: string;
    idADocumentoIdentidadAnverso: string;
    idDocumentoIdentidadReverso: string;
    numeroLibro: string;
    tipoLibro: string;
    tipoLegalizacion: string;
    numeroFojas: string;
    tipoFojas: string;
    detallesObservaciones: string;
    idUsuario: string;
    numeroProceso: number;
  };
}

export default function AperturaLibroDashboard({ tramite }: AperturaLibroDashboardProps) {
  if (!tramite) {
    return <div>No hay datos para mostrar</div>;
  }

  return (
    <div className="p-6 pl-10 pb-10 pr-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Datos del Trámite: Apertura de Libro</h2>
      <table className="table-auto w-full border-collapse border border-gray-300 bg-gray-800 text-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-700">
            <th className="border border-gray-600 px-4 py-2 text-left">Campo</th>
            <th className="border border-gray-600 px-4 py-2 text-left">Valor</th>
          </tr>
        </thead>
        <tbody>
          {[
            { label: "Tipo de Documento", value: tramite.tipoDocumento },
            { label: "Número de Documento", value: tramite.numeroDocumento },
            { label: "Correo", value: tramite.correo },
            { label: "Celular", value: tramite.celular },
            { label: "ID de Documento Identidad (Anverso)", value: tramite.idADocumentoIdentidadAnverso || "Falta subir" },
            { label: "ID de Documento Identidad (Reverso)", value: tramite.idDocumentoIdentidadReverso || "Falta subir" },
            { label: "Número de Libro", value: tramite.numeroLibro },
            { label: "Tipo de Libro", value: tramite.tipoLibro },
            { label: "Tipo de Legalización", value: tramite.tipoLegalizacion },
            { label: "Número de Fojas", value: tramite.numeroFojas },
            { label: "Tipo de Fojas", value: tramite.tipoFojas },
            { label: "Detalles de Observaciones", value: tramite.detallesObservaciones },
            { label: "ID de Usuario", value: tramite.idUsuario },
            { label: "Número de Proceso", value: tramite.numeroProceso },
          ].map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"}
            >
              <td className="border border-gray-500 px-4 py-2">{item.label}</td>
              <td className="border border-gray-500 px-4 py-2">
                {item.value || "No disponible"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
