interface PermisoViajeDashboardProps {
    tramite: {
      idUsuario: string;
      tipoPermisoViaje: string;
      detalleObservacion: string;
      numeroProceso: number;
      destinoSale: string;
      destinoViaje: string;
      isRetorna: boolean;
      fechaSalida: string;
      fechaRetorno: string;
      medioTransporte: string;
      isViajeSolo: boolean;
      datoPadres: Array<{
        tipoInterviniente: string;
        tipoDocumento: string;
        numeroDocumento: string;
        email: string;
        celular: string;
        departamento: string;
        provincia: string;
        distrito: string;
        oficinaRegistral: string;
        partidaRegistral: string;
        condicion: string;
        idADocumentoIdentidadAnverso: string;
        idDocumentoIdentidadReverso: string;
      }>;
      datoMenores: Array<{
        tipoDocumento: string;
        numeroDocumento: string;
        nombreCompleto: string;
        edad: number;
        idADocumentoIdentidadAnverso: string;
        idDocumentoIdentidadReverso: string;
      }>;
      datoAcompanantes: Array<{
        tipoDocumento: string;
        numeroDocumento: string;
        nombreCompleto: string;
      }>;
    };
  }
  
export default function PermisoViajeDashboard({ tramite }: PermisoViajeDashboardProps) {
  if (!tramite) {
    return <div>No hay datos para mostrar</div>;
  }

  const { idUsuario, tipoPermisoViaje, datoPadres, datoMenores, datoAcompanantes } = tramite;

  return (
    <div className="p-6 pl-10 pb-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Detalles del Trámite: Permiso de Viaje</h2>

      {/* Información General */}
      <div className="mb-6">
        <p><strong>ID Usuario:</strong> {idUsuario}</p>
        <p><strong>Tipo de Permiso de Viaje:</strong> {tipoPermisoViaje}</p>
      </div>

      {/* Sección de Padres */}
      {datoPadres && (
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4">Datos de los Padres</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {datoPadres.map((padre, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-md bg-gray-800 text-white"
              >
                <p><strong>Interviniente:</strong> {padre.tipoInterviniente}</p>
                <p><strong>Tipo de Documento:</strong> {padre.tipoDocumento}</p>
                <p><strong>Número de Documento:</strong> {padre.numeroDocumento}</p>
                <p><strong>Email:</strong> {padre.email}</p>
                <p><strong>Celular:</strong> {padre.celular}</p>
                <p><strong>Departamento:</strong> {padre.departamento}</p>
                <p><strong>Provincia:</strong> {padre.provincia}</p>
                <p><strong>Distrito:</strong> {padre.distrito}</p>
                <p><strong>Oficina Registral:</strong> {padre.oficinaRegistral || "No encontrada"}</p>
                <p><strong>Partida Registral:</strong> {padre.partidaRegistral || "No encontrada"}</p>
                <p><strong>Condición:</strong> {padre.condicion || "No especificada"}</p>
                <p><strong>ID DNI anverso:</strong> {padre.idADocumentoIdentidadAnverso || "Falta subir"}</p>
                <p><strong>ID DNI reverso:</strong> {padre.idDocumentoIdentidadReverso || "Falta subir"}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sección de Menores */}
      {datoMenores && (
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4">Datos de los Menores</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {datoMenores.map((menor, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-md bg-gray-800 text-white"
              >
                <p><strong>Nombre Completo:</strong> {menor.nombreCompleto}</p>
                <p><strong>Tipo de Documento:</strong> {menor.tipoDocumento}</p>
                <p><strong>Número de Documento:</strong> {menor.numeroDocumento}</p>
                <p><strong>Edad:</strong> {menor.edad}</p>
                <p><strong>ID DNI anverso:</strong> {menor.idADocumentoIdentidadAnverso || "Falta subir"}</p>
                <p><strong>ID DNI reverso:</strong> {menor.idDocumentoIdentidadReverso || "Falta subir"}</p>
                <p><strong>Destino Sale:</strong> {tramite.destinoSale}</p>
                <p><strong>Destino Viaje:</strong> {tramite.destinoViaje}</p>
                <p><strong>¿Retorna?:</strong> {tramite.isRetorna ? "Sí" : "No"}</p>
                <p><strong>Fecha de Salida:</strong> {new Date(tramite.fechaSalida).toLocaleDateString()}</p>
                <p><strong>Fecha de Retorno:</strong> {new Date(tramite.fechaRetorno).toLocaleDateString()}</p>
                <p><strong>Medio de Transporte:</strong> {tramite.medioTransporte}</p>
                <p><strong>¿Viaje Solo?:</strong> {tramite.isViajeSolo ? "Sí" : "No"}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sección de Acompañantes */}
      {datoAcompanantes && (
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4">Datos de los Acompañantes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {datoAcompanantes.map((acompanante, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-md bg-gray-800 text-white"
              >
                <p><strong>Nombre Completo:</strong> {acompanante.nombreCompleto}</p>
                <p><strong>Tipo de Documento:</strong> {acompanante.tipoDocumento}</p>
                <p><strong>Número de Documento:</strong> {acompanante.numeroDocumento}</p>
                <p><strong>Detalle Observación:</strong> {tramite.detalleObservacion}</p>
                <p><strong>Número de Proceso:</strong> {tramite.numeroProceso}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
  