interface EscrituraPublicaDashboardProps {
    tramite: {
      idUsuario: string;
      numeroProceso: number;
      tipoTramite: string;
      observaciones: string;
      dataSolicitantes: Array<{
        tipoCondicion: string;
        tipoDocumento: string;
        numeroDocumento: string;
        apellidoPaterno: string;
        apellidoMaterno: string;
        nombres: string;
        estadoCivil: string;
        direccion: string;
        correo: string;
        ocupacion: string;
        documentoDni: string;
        documentoCopiaLiteral: string;
      }>;
    };
  }
  
export default function EscrituraPublicaDashboard({
  tramite,
}: EscrituraPublicaDashboardProps) {
  if (!tramite) {
    return <div>No hay datos para mostrar</div>;
  }

  const { idUsuario, numeroProceso, tipoTramite, dataSolicitantes } = tramite;

  return (
    <div className="p-6 pl-10 pb-10">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Detalles del Trámite: Escritura Pública
      </h2>

      {/* Información General */}
      <div className="mb-6">
        <p>
          <strong>ID Usuario:</strong> {idUsuario || "No disponible"}
        </p>
        <p>
          <strong>Número de Proceso:</strong> {numeroProceso || "No disponible"}
        </p>
        <p>
          <strong>Tipo de Trámite:</strong> {tipoTramite || "No disponible"}
        </p>
      </div>

      {/* Sección de Solicitantes */}
      {dataSolicitantes && (
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4">Datos de los Solicitantes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dataSolicitantes.map((solicitante, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-md bg-gray-800 text-white"
              >
                <p>
                  <strong>Condición:</strong> {solicitante.tipoCondicion || "No disponible"}
                </p>
                <p>
                  <strong>Tipo de Documento:</strong> {solicitante.tipoDocumento || "No disponible"}
                </p>
                <p>
                  <strong>Número de Documento:</strong> {solicitante.numeroDocumento || "No disponible"}
                </p>
                <p>
                  <strong>Apellido Paterno:</strong> {solicitante.apellidoPaterno || "No disponible"}
                </p>
                <p>
                  <strong>Apellido Materno:</strong> {solicitante.apellidoMaterno || "No disponible"}
                </p>
                <p>
                  <strong>Nombres:</strong> {solicitante.nombres || "No disponible"}
                </p>
                <p>
                  <strong>Estado Civil:</strong> {solicitante.estadoCivil || "No disponible"}
                </p>
                <p>
                  <strong>Dirección:</strong> {solicitante.direccion || "No disponible"}
                </p>
                <p>
                  <strong>Correo:</strong> {solicitante.correo || "No disponible"}
                </p>
                <p>
                  <strong>Ocupación:</strong> {solicitante.ocupacion || "No disponible"}
                </p>
                <p>
                  <strong>Documento DNI:</strong> {solicitante.documentoDni || "No disponible"}
                </p>
                <p>
                  <strong>Documento Copia Literal:</strong> {solicitante.documentoCopiaLiteral || "No disponible"}
                </p>
                <p>
                  <strong>Observaciones:</strong> {tramite.observaciones || "Sin observaciones"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
  
  