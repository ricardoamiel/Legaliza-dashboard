interface TransferenciaVehicularDashboardProps {
  tramite: {
    idUsuario: string;
    tipoActo: string;
    numeroProceso: number;
    datosVehiculo: Array<{
      placa: string;
      oficinaRegistral: string;
      tipoMonedaOperacion: string;
      precioVenta: string;
      soatVigente: string;
      tarjetaPropiedad: string;
      medioPago: string;
    }>;
    datosVendedor: Array<{
      tipoDocumento: string;
      nroDocumento: string;
      ocupacion: string;
      correo: string;
      celular: string;
      estadoCivil: string;
      copiaLiteral: string;
      ruc: string;
    }>;
    datosCompradores: Array<{
      tipoDocumento: string;
      nroDocumento: string;
      ocupacion: string;
      correo: string;
      celular: string;
      estadoCivil: string;
    }>;
  };
}

export default function TransferenciaVehicularDashboard({
  tramite,
}: TransferenciaVehicularDashboardProps) {
  if (!tramite) {
    return <div>No hay datos para mostrar</div>;
  }

  const {
    idUsuario,
    tipoActo,
    numeroProceso,
    datosVehiculo,
    datosVendedor,
    datosCompradores,
  } = tramite;

  return (
    <div className="p-6 pl-10 pb-10">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Detalles del Trámite: Transferencia Vehicular
      </h2>

      {/* Información General */}
      <div className="mb-6">
        <p>
          <strong>ID Usuario:</strong> {idUsuario || "No disponible"}
        </p>
        <p>
          <strong>Tipo de Acto:</strong> {tipoActo || "No disponible"}
        </p>
        <p>
          <strong>Número de Proceso:</strong> {numeroProceso || "No disponible"}
        </p>
      </div>

      {/* Datos del Vehículo */}
      {datosVehiculo && (
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4">Datos del Vehículo</h3>
          {datosVehiculo.map((vehiculo, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg shadow-md bg-gray-800 text-white"
            >
              <p><strong>Placa:</strong> {vehiculo.placa || "No disponible"}</p>
              <p><strong>Oficina Registral:</strong> {vehiculo.oficinaRegistral || "No disponible"}</p>
              <p><strong>Tipo de Moneda de Operación:</strong> {vehiculo.tipoMonedaOperacion || "No disponible"}</p>
              <p><strong>Precio de Venta:</strong> {vehiculo.precioVenta || "No disponible"}</p>
              <p><strong>SOAT Vigente:</strong> {vehiculo.soatVigente || "No disponible"}</p>
              <p><strong>Tarjeta de Propiedad:</strong> {vehiculo.tarjetaPropiedad || "No disponible"}</p>
              <p><strong>Medio de Pago:</strong> {vehiculo.medioPago || "No disponible"}</p>
            </div>
          ))}
        </div>
      )}

      {/* Datos de los Vendedores */}
      {datosVendedor && (
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4">Datos de los Vendedores</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {datosVendedor.map((vendedor, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-md bg-gray-800 text-white"
              >
                <p><strong>Tipo de Documento:</strong> {vendedor.tipoDocumento || "No disponible"}</p>
                <p><strong>Número de Documento:</strong> {vendedor.nroDocumento || "No disponible"}</p>
                <p><strong>Ocupación:</strong> {vendedor.ocupacion || "No disponible"}</p>
                <p><strong>Correo:</strong> {vendedor.correo || "No disponible"}</p>
                <p><strong>Celular:</strong> {vendedor.celular || "No disponible"}</p>
                <p><strong>Estado Civil:</strong> {vendedor.estadoCivil || "No disponible"}</p>
                <p><strong>Copia Literal:</strong> {vendedor.copiaLiteral || "No disponible"}</p>
                <p><strong>RUC:</strong> {vendedor.ruc || "No disponible"}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Datos de los Compradores */}
      {datosCompradores && (
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4">Datos de los Compradores</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {datosCompradores.map((comprador, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-md bg-gray-800 text-white"
              >
                <p><strong>Tipo de Documento:</strong> {comprador.tipoDocumento || "No disponible"}</p>
                <p><strong>Número de Documento:</strong> {comprador.nroDocumento || "No disponible"}</p>
                <p><strong>Ocupación:</strong> {comprador.ocupacion || "No disponible"}</p>
                <p><strong>Correo:</strong> {comprador.correo || "No disponible"}</p>
                <p><strong>Celular:</strong> {comprador.celular || "No disponible"}</p>
                <p><strong>Estado Civil:</strong> {comprador.estadoCivil || "No disponible"}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
