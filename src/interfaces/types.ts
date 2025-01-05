export interface DataCartaNotarial {
  status: string;
  mesages: string;
  data: Data;
}

export interface Data {
  _id: string;
  idUsuario: string;
  datoRemitentes: DatoRemitente[];
  datoDestinatarios: DatoDestinatario[];
  datoEntregaCarta: DatoEntregaCarum[];
  datoEnviador: DatoEnviador[];
  numeroProceso: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface DatoRemitente {
  tipoDocumento: string;
  numeroDocumento: string;
  nombre: string;
  direccion: string;
  nacionalidad?: string;
}

export interface DatoDestinatario {
  tipoDocumento: string;
  numeroDocumento: string;
  nombre: string;
  direccion: string;
  nacionalidad?: string;
}

export interface DatoEntregaCarum {
  lugarEntrega: string;
  departamento: string;
  provincia: string;
  distrito: string;
  notaria?: string;
  direccion?: string;
}

export interface DatoEnviador {
  nombre: string;
  correo: string;
  celular: string;
  cartaPuerta: boolean;
  servicioExpress: boolean;
  observaciones?: string;
}

interface Usuario {
  nombres: string;
  apellidos: string;
  email: string;
}

interface Tramite {
  _id: string;
  tipoTramite: string;
  numeroProceso: number;
  estado: string;
  createdAt: string;
  numeroTramite: number;
  usuario: Usuario;
}

export interface ResponseData {
  data: Tramite[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UserRes {
  token: string;
  user: {
    _id: string;
    nombres: string;
    apellidos: string;
    tipoUsuario: string;
    email: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}
export type DateType = {
  año?: string;
  mes?: { nombre?: string; numero?: string };
  dia?: string;
};

export type Filters = {
  date?: string;
  type?: string;
  status?: string;
};


export interface UpdateUserInput {
  name: string;
  lastName: string;
  email: string;
  roles: string;
}

export interface User {
  _id: string;
  nombres: string;
  apellidos: string;
  tipoUsuario: string;
  email: string;
  password: string; // Normalmente no incluirías esto en el frontend por seguridad.
  status: string;
  createdAt: string;
  updatedAt: string;
  //fotoPerfil: string; // Aún no está en la interfaz.
  __v: number;
}

export type Users = User[]; // La respuesta del endpoint es un array de usuarios.



export interface UpdatePasswordInput {
  password: string;
}

export interface ToggleProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle?: () => void;
}

export interface CreateUserInput {
  name: string;
  lastName: string;
  email: string;
  roles: string;
  fotoPerfil?: File | null;
  password: string;
}

export interface AperturaLibroData {
  _id: string;
  tipoDocumento: string;
  numeroDocumento: string;
  correo: string;
  celular: number;
  numeroLibro: string;
  tipoLibro: string;
  tipoLegalizacion: string;
  numeroFojas: string;
  tipoFojas: string;
  detallesObservaciones: string;
  idADocumentoIdentidadAnverso?: string;
  idDocumentoIdentidadReverso?: string;
  idUsuario: string;
  numeroProceso: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export interface DatoPadres {
  tipoInterviniente: string;
  tipoDocumento: string;
  numeroDocumento: string;
  email: string;
  celular: string;
  departamento: string;
  provincia: string;
  distrito: string;
  oficinaRegistral?: string;
  partidaRegistral?: string;
  condicion?: string;
  idADocumentoIdentidadAnverso?: string;
  idDocumentoIdentidadReverso?: string;
}

export interface DatoMenores {
  tipoDocumento: string;
  numeroDocumento: string;
  nombreCompleto: string;
  edad: number;
  idADocumentoIdentidadAnverso?: string;
  idDocumentoIdentidadReverso?: string;
}

export interface Acompanante {
  tipoDocumento: string;
  numeroDocumento: string;
  nombreCompleto: string;
}

export interface PermisoDeViajeData {
  _id: string;
  idUsuario: string;
  tipoPermisoViaje: string;
  datoPadres: DatoPadres[];
  datoMenores: DatoMenores[];
  destinoSale: string;
  destinoViaje: string;
  isRetorna: boolean;
  fechaSalida: string;
  fechaRetorno: string;
  medioTransporte: string;
  isViajeSolo: boolean;
  datoAcompanantes: Acompanante[];
  detalleObservacion: string;
  numeroProceso: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Cliente {
  tipoCondicion: string;
  tipoDocumento: string;
  numeroDocumento: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombres: string;
  estadoCivil: string;
  direccion: string;
  idADocumentoIdentidadAnverso: string;
  idDocumentoIdentidadReverso: string;
}

export interface PoderFueraDeRegistroData {
  _id: string;
  idUsuario: string;
  tipoPoder: string;
  datoClientes: Cliente[];
  plazoPoder: string;
  facultadesOtorgar: string;
  opcionTomaDomicilio: string;
  fecha: string;
  horaTomaDomicilio: string;
  numeroProceso: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ConstatacionDomiciliariaData {
  _id: string;
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
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Solicitante {
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
}

export interface EscrituraPublicaData {
  _id: string;
  idUsuario: string;
  numeroProceso: number;
  tipoTramite: string;
  dataSolicitantes: Solicitante[];
  observaciones: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Contratante {
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
}

export interface AsuntoNoContenciosoData {
  _id: string;
  idUsuario: string;
  numeroProceso: number;
  tipoActo: string;
  dataContratantes: Contratante[];
  motivo: string;
  file1: string;
  file2: string;
  file3: string;
  file4: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Vehiculo {
  placa: string;
  oficinaRegistral: string;
  tipoMonedaOperacion: string;
  precioVenta: string;
  soatVigente: string;
  tarjetaPropiedad: string;
  medioPago: string;
}

export interface Persona {
  tipoDocumento: string;
  nroDocumento: string;
  ocupacion: string;
  correo: string;
  celular: string;
  estadoCivil: string;
  copiaLiteral?: string;
  ruc?: string;
}

export interface TransferenciaVehicularData {
  _id: string;
  idUsuario: string;
  tipoActo: string;
  datosVehiculo: Vehiculo[];
  datosVendedor: Persona[];
  datosCompradores: Persona[];
  numeroProceso: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export interface Socio {
  nombresSocio: string;
  apellidosSocio: string;
  correoSocio: string;
  cargoSocio: string;
}

export interface RepresentanteLegal {
  nombres: string;
  apellidos: string;
  tipoDocumento: string;
  numeroDocumento: string;
  profesion: string;
  nacionalidad: string;
  numeroContacto: string;
  departamento: string;
  provincia: string;
  distrito: string;
  direccion: string;
  estadoCivil: string;
  bienesSeparados: boolean;
  NombresConyuge: string;
  ApellidosConyuge: string;
  tipoDocumentoConyuge: string;
  numeroDocumentoConyuge: string;
  oficinaRegistral: string;
}

export interface Bien {
  cantidad: number;
  descripcion: string;
  valor: number;
  electronico: boolean;
  marcaModelo: string;
  n_serie: string;
}

export interface ConstitucionEmpresaData {
  _id: string;
  idUsuario: string;
  tipoConstitucion: string;
  nombresEmpresa: string[];
  tipoSociedad: string;
  actividadesEmpresa: string[];
  descripcionEmpresa: string;
  socios: Socio[];
  capitalSocial: number;
  tipoAportacion: string;
  cantidadEfectivo: number;
  cantidadBienes: number;
  representanteLegal: RepresentanteLegal[];
  aporteEfectivo: number;
  aporteBienes: number;
  Bienes: Bien[];
  correoEmpresa: string;
  telefonoEmpresa: string;
  direccionEmpresa: string;
  tipoDomicilio: string;
  tipoRegimen: string;
  numeroProceso: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}