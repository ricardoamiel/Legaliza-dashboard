interface CartaNotarialDashboardProps {
  tramite: any;
}

export default function CartaNotarialDashboard({ tramite }: CartaNotarialDashboardProps) {
  if (!tramite) {
    return <div>No hay datos para mostrar</div>;
  }

  const { datoRemitentes, datoDestinatarios, datoEntregaCarta, datoEnviador } = tramite;

  return (
    <div className="p-6 pl-10 pb-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Detalles de la Carta Notarial</h2>

      {/* Sección de Remitentes */}
      {datoRemitentes && (
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Remitentes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {datoRemitentes.map((remitente: any, index: number) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-md bg-gray-800 text-white"
              >
                <p><strong>ID:</strong> {tramite.idUsuario}</p>
                <p><strong>Nombre:</strong> {remitente.nombre}</p>
                <p><strong>Dirección:</strong> {remitente.direccion}</p>
                <p><strong>Tipo de Documento:</strong> {remitente.tipoDocumento}</p>
                <p><strong>Número de Documento:</strong> {remitente.numeroDocumento}</p>
                <p><strong>Nacionalidad:</strong> {remitente.nacionalidad || "No requerida"}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sección de Destinatarios */}
      {datoDestinatarios && (
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Destinatarios</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {datoDestinatarios.map((destinatario: any, index: number) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-md bg-gray-800 text-white"
              >
                <p><strong>Nombre:</strong> {destinatario.nombre}</p>
                <p><strong>Dirección:</strong> {destinatario.direccion}</p>
                <p><strong>Tipo de Documento:</strong> {destinatario.tipoDocumento}</p>
                <p><strong>Número de Documento:</strong> {destinatario.numeroDocumento}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sección de Entrega de Carta */}
      {datoEntregaCarta && (
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Entrega de Carta</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {datoEntregaCarta.map((entrega: any, index: number) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-md bg-gray-800 text-white"
              >
                <p><strong>Lugar de Entrega:</strong> {entrega.lugarEntrega}</p>
                <p><strong>Provincia:</strong> {entrega.provincia}</p>
                <p><strong>Departamento:</strong> {entrega.departamento}</p>
                <p><strong>Distrito:</strong> {entrega.distrito}</p>
                <p><strong>Notaría:</strong> {entrega.notaria || "No registrada"}</p>
                <p><strong>Dirección de Notaría:</strong> {entrega.direccionNotaria || "No registrada"}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sección de Enviador */}
      {datoEnviador && (
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Enviador</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {datoEnviador.map((enviador: any, index: number) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-md bg-gray-800 text-white"
              >
                <p><strong>Nombre:</strong> {enviador.nombre}</p>
                <p><strong>Correo:</strong> {enviador.correo}</p>
                <p><strong>Celular:</strong> {enviador.celular}</p>
                <p><strong>Carta Puerta:</strong> {enviador.cartaPuerta ? "Sí" : "No"}</p>
                <p><strong>Servicio Express:</strong> {enviador.servicioExpress ? "Sí" : "No"}</p>
                <p>
                  <strong>Observaciones:</strong>{" "}
                  {enviador.observaciones || "Sin observaciones"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
