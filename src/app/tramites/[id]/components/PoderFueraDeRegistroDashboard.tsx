interface PoderFueraDeRegistroDashboardProps {
    tramite: {
      idUsuario: string;
      tipoPoder: string;
      plazoPoder: string;
      facultadesOtorgar: string;
      opcionTomaDomicilio: string;
      fecha: string;
      horaTomaDomicilio: string;
      datoClientes: Array<{
        tipoCondicion: string;
        tipoDocumento: string;
        numeroDocumento: string;
        apellidoPaterno: string;
        apellidoMaterno: string;
        nombres: string;
        estadoCivil: string;
        nacionalidad: string;
        direccion: string;
        idADocumentoIdentidadAnverso: string;
        idDocumentoIdentidadReverso: string;
      }>;
      numeroProceso: number;
    };
  }
  
export default function PoderFueraDeRegistroDashboard({ tramite }: PoderFueraDeRegistroDashboardProps) {
  if (!tramite) {
    return <div>No hay datos para mostrar</div>;
  }

  const { idUsuario, tipoPoder, datoClientes, numeroProceso } = tramite;

  return (
    <div className="p-6 pl-10 pb-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Detalles del Trámite: Poder Fuera de Registro</h2>

      {/* Información General */}
      <div className="mb-6">
        <p><strong>ID Usuario:</strong> {idUsuario}</p>
        <p><strong>Tipo de Poder:</strong> {tipoPoder}</p>
        <p><strong>Número de Proceso:</strong> {numeroProceso}</p>
      </div>

      {/* Sección de Clientes */}
      {datoClientes && (
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4">Datos de los Clientes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {datoClientes.map((cliente, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-md bg-gray-800 text-white"
              >
                <p><strong>Condición:</strong> {cliente.tipoCondicion}</p>
                <p><strong>Tipo de Documento:</strong> {cliente.tipoDocumento}</p>
                <p><strong>Número de Documento:</strong> {cliente.numeroDocumento}</p>
                <p><strong>Apellido Paterno:</strong> {cliente.apellidoPaterno}</p>
                <p><strong>Apellido Materno:</strong> {cliente.apellidoMaterno}</p>
                <p><strong>Nombres:</strong> {cliente.nombres}</p>
                <p><strong>Estado Civil:</strong> {cliente.estadoCivil}</p>
                <p><strong>Nacionalidad:</strong> {cliente.nacionalidad || "No requerida"}</p>
                <p><strong>Dirección:</strong> {cliente.direccion}</p>
                <p><strong>ID DNI Anverso:</strong> {cliente.idADocumentoIdentidadAnverso || "Falta subir"}</p>
                <p><strong>ID DNI Reverso:</strong> {cliente.idDocumentoIdentidadReverso || "Falta subir"}</p>
                <p><strong>Plazo del Poder:</strong> {tramite.plazoPoder}</p>
                <p><strong>Facultades Otorgadas:</strong> {tramite.facultadesOtorgar}</p>
                <p><strong>Opción Toma de Domicilio:</strong> {tramite.opcionTomaDomicilio}</p>
                <p><strong>Fecha:</strong> {new Date(tramite.fecha).toLocaleDateString()}</p>
                <p><strong>Horario de Toma de Domicilio:</strong> {tramite.horaTomaDomicilio}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
  