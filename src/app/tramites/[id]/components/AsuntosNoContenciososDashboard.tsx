interface AsuntosNoContenciososDashboardProps {
    tramite: {
      idUsuario: string;
      numeroProceso: number;
      tipoActo: string;
      motivo: string;
      file1: string;
      file2: string;
      file3: string;
      file4: string;
      dataContratantes: Array<{
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
      }>;
    };
  }
  
export default function AsuntosNoContenciososDashboard({
  tramite,
}: AsuntosNoContenciososDashboardProps) {
  if (!tramite) {
    return <div>No hay datos para mostrar</div>;
  }

  const { idUsuario, numeroProceso, tipoActo, dataContratantes } = tramite;

  return (
    <div className="p-6 pl-10 pb-10">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Detalles del Trámite: Asuntos No Contenciosos
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
          <strong>Tipo de Acto:</strong> {tipoActo || "No disponible"}
        </p>
      </div>

      {/* Sección de Contratantes */}
      {dataContratantes && (
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4">Datos de los Contratantes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dataContratantes.map((contratante, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-md bg-gray-800 text-white"
              >
                <p>
                  <strong>Condición:</strong> {contratante.tipoCondicion || "No disponible"}
                </p>
                <p>
                  <strong>Tipo de Documento:</strong> {contratante.tipoDocumento || "No disponible"}
                </p>
                <p>
                  <strong>Número de Documento:</strong>{" "}
                  {contratante.numeroDocumento || "No disponible"}
                </p>
                <p>
                  <strong>Apellido Paterno:</strong>{" "}
                  {contratante.apellidoPaterno || "No disponible"}
                </p>
                <p>
                  <strong>Apellido Materno:</strong>{" "}
                  {contratante.apellidoMaterno || "No disponible"}
                </p>
                <p>
                  <strong>Nombres:</strong> {contratante.nombres || "No disponible"}
                </p>
                <p>
                  <strong>Estado Civil:</strong> {contratante.estadoCivil || "No disponible"}
                </p>
                <p>
                  <strong>Dirección:</strong> {contratante.direccion || "No disponible"}
                </p>
                <p>
                  <strong>Correo:</strong> {contratante.correo || "No disponible"}
                </p>
                <p>
                  <strong>Ocupación:</strong> {contratante.ocupacion || "No disponible"}
                </p>
                <p>
                  <strong>Motivo:</strong> {tramite.motivo || "No especificado"}
                </p>
                <p>
                  <strong>Archivo 1:</strong> {tramite.file1 || "Falta subir"}
                </p>
                <p>
                  <strong>Archivo 2:</strong> {tramite.file2 || "Falta subir"}
                </p>
                <p>
                  <strong>Archivo 3:</strong> {tramite.file3 || "Falta subir"}
                </p>
                <p>
                  <strong>Archivo 4:</strong> {tramite.file4 || "Falta subir"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}