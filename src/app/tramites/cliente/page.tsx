"use client";
import { ExclamationIcon } from "@/assets/icons/Exclamation";
import { EyeIcon } from "@/assets/icons/EyeIcon";
import Status from "@/Components/layout/Status/Status";
import Button from "@/Components/ui/button/button";
import InputDate from "@/Components/ui/InputDate";
import Select from "@/Components/ui/Select";
import Table from "@/Components/ui/table";
import useGet from "@/hooks/useGet";
import { TiposTramite } from "@/interfaces/Enum";
import { Filters, ResponseData } from "@/interfaces/types";
import { parsedDate } from "@/libs/parsedDate";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { authConfig } from "@/context/auth.context";
import ApiDataFetcher from "../[id]/components/ApiDataFetcher";

export default function Home() {
  const [params, setParams] = useState<Record<string, string>>({
    page: "1", // Página inicial
    limit: "10", // Límite de resultados por página
    sentidoOrden: "asc",
  });

  const [values, setValues] = useState<Filters>({
    date: "",
    type: "",
    status: "",
  });
  
  const token = Cookies.get(authConfig.storageTokenKeyName);
  if (!token) {
    console.error("No se encontró un token de autenticación");
  }
  const userId = Cookies.get(authConfig.storageUserId);
  if (!userId) {
    console.error("No se encontró un ID de usuario");
  }
  console.log("token", token);
  console.log("userId", userId);

  const { data, loading } = useGet<ResponseData>({
    url: `tramites/user/${userId}`,
    body: params,
    arrayDependencies: [params, values],
  });

  const [hasNextPage, setHasNextPage] = useState(true);
  const [selectedTramite, setSelectedTramite] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (data?.data?.length < parseInt(params.limit, 10)) {
      setHasNextPage(false); // No hay más datos.
    } else {
      setHasNextPage(true); // Hay más datos disponibles.
    }
  }, [data, params.limit]);

  const handleNextPage = () => {
    setParams((prev) => ({
      ...prev,
      page: (parseInt(prev.page) + 1).toString(),
    }));
  };

  const handlePreviousPage = () => {
    setParams((prev) => ({
      ...prev,
      page: Math.max(1, parseInt(prev.page) - 1).toString(),
    }));
  };

  const handleModify = () => {
    if (!selectedTramite) return;

    const tramite = data?.data.find((item) => item._id === selectedTramite);
    if (!tramite) {
      alert("No se encontró el trámite seleccionado");
      return;
    }

    const numeroTramite = tramite.numeroTramite;
    router.push(`/tramites/${numeroTramite}/modificar`);
  };

  const handleDelete = async () => {
    if (!selectedTramite) return;

    const tramite = data?.data.find((item) => item._id === selectedTramite);
    if (!tramite) {
      alert("No se encontró el trámite seleccionado");
      return;
    }

    const type = tramite.tipoTramite;
    const numeroProceso = tramite.numeroProceso;

    if (!type || !numeroProceso) {
      alert("No se encontraron los datos necesarios (tipo de trámite o número de proceso) para el ID seleccionado");
      return;
    }

    try {
      await ApiDataFetcher.deleteTramite(numeroProceso.toString(), type);
      console.log("Trámite eliminado con éxito");
      alert("Trámite eliminado con éxito");
      setParams((prev) => ({ ...prev, page: "1" }));
    } catch (error) {
      console.error(error);
      alert("Hubo un error al eliminar el trámite");
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="text-white bg-gray-900 h-full overflow-auto">
      <h3 className="text-4xl font-bold mb-8 pt-4 text-center">Mis Trámites</h3>
      <div className="mt-4 rounded-lg bg-[#111827] p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="pl-10 w-full">
            <InputDate
              label="Fecha"
              value={values.date}
              onChange={(date) => {
                if (date.split("/")[0] != "undefined") {
                  const newDate = date
                    .split("/")
                    .reverse()
                    .map((e) => e.padStart(2, "0"))
                    .join("-");
                  if (date) {
                    setValues((prev) => ({ ...prev, date }));
                    setParams((prev) => ({ ...prev, fecha: newDate }));
                  }
                }
              }}
            />
          </div>
          <div className="pl-10 w-full">
            <Select
              label="Por Tipo"
              options={Object.entries(TiposTramite).map(([value, label]) => ({
                value,
                label,
              }))}
              value={values.type}
              onChange={(e) => {
                setValues((prev) => ({ ...prev, type: e.value }));
                setParams((prev) => ({ ...prev, tipoTramite: e.value }));
              }}
            />
          </div>
          <div className="pl-10 w-full">
            <Select
              label="Por Estado"
              options={[
                { label: "Completo", value: "COMPLETO" },
                { label: "Pendiente", value: "PENDIENTE" },
              ]}
              value={values.status}
              onChange={(e) => {
                setValues((prev) => ({ ...prev, status: e.value }));
                setParams((prev) => ({ ...prev, estado: e.value }));
              }}
            />
          </div>
          <div className="pl-10 w-full">
            <Button
              className="w-full px-4 py-2 bg-primary-500 text-white font-bold rounded-lg"
              onClick={() => {
                setParams((prev) => ({
                  page: "1",
                  limit: "10",
                  sentidoOrden: "asc",
                }));
                setValues({ date: "", status: "", type: "" });
              }}
            >
              Limpiar Filtros
            </Button>
          </div>
          <div className="pl-10 w-full">
            <Button
              className="w-full px-4 py-2 bg-primary-800 text-white font-bold rounded-lg"
              onClick={handleModify}
              disabled={!selectedTramite}
            >
              Modificar
            </Button>
          </div>
          <div className="pl-10 w-full">
            <Button
              className="w-full px-4 py-2 bg-primary-500 text-white font-bold rounded-lg"
              onClick={handleDelete}
              disabled={!selectedTramite}
            >
              Eliminar
            </Button>
          </div>
        </div>
        <div className="flex flex-col h-[calc(100vh-300px)] overflow-y-auto">
          <Table
            data={Array.isArray(data?.data) ? data.data : []}
            columns={[
              {
                header: "Seleccionar",
                cell(props) {
                  return (
                    <span className="flex w-full justify-center">
                      <input
                        type="checkbox"
                        checked={selectedTramite === props.row.original._id}
                        onChange={(e) => {
                          if (selectedTramite === props.row.original._id) {
                            setSelectedTramite(null); // Desmarcar si ya estaba seleccionado
                          } else {
                            setSelectedTramite(props.row.original._id); // Seleccionar el nuevo ID
                          }
                        }}
                      />
                    </span>
                  );
                },
              },
              {
                header: "Numero de Tramite",
                cell(props) {
                  return (
                    <span className="flex w-full justify-center">
                      <p>
                        {props.row.original.numeroTramite
                          .toString()
                          .padStart(10, "0")}
                      </p>
                    </span>
                  );
                },
              },
              {
                header: "Fecha / Hora",
                cell(props) {
                  return (
                    <span className="flex w-full justify-center">
                      <p>{parsedDate(props.row.original.createdAt)}</p>
                    </span>
                  );
                },
              },
              {
                header: "Tipo de Tramite",
                cell(props) {
                  const tipo = TiposTramite[props.row.original.tipoTramite];

                  return (
                    <span className="flex w-full justify-center">
                      <p>{tipo}</p>
                    </span>
                  );
                },
              },
              {
                header: "Estado",
                cell(props) {
                  const estado = props.row.original.estado;
                  return <Status status={estado} />;
                },
              },
              {
                header: "Detalles",
                cell(props) {
                  return (
                    <div className="flex items-center justify-center gap-4">
                      <Link
                        href={`/tramites/${props.row.original.numeroTramite}`}
                      >
                        <EyeIcon className="h-6 w-6 text-primary-500" />
                      </Link>
                    </div>
                  );
                },
              },
            ]}
          />
          <div className="mt-4 flex justify-between items-center">
            <Button
              className="bg-primary-500 disabled:bg-gray-500"
              onClick={() => setParams((prev) => (handlePreviousPage(), prev))}
              disabled={params.page === "1"}
            >
              Anterior
            </Button>
            <Button
              className="bg-primary-500 disabled:bg-gray-500"
              onClick={() => setParams((prev) => (handleNextPage(), prev))}
              disabled={!hasNextPage}
            >
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}