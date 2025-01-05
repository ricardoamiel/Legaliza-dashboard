import { CheckedIcon } from "@/assets/icons/CheckedIcon";
import { ExclamationIcon } from "@/assets/icons/Exclamation";
import { EstadoProcesoEnum } from "@/interfaces/Enum";
import cx from "@/libs/cx";
import React from "react";

export default function Status({ status }: { status: string }) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={cx(
          "flex gap-x-4 rounded-lg px-2 py-2",
          status === EstadoProcesoEnum.Pendiente &&
            "bg-yellow-200 text-yellow-600",
          status === EstadoProcesoEnum.Completo &&
            "bg-green-200 text-green-600",
        )}
      >
        {status === EstadoProcesoEnum.Pendiente ? (
          <ExclamationIcon className="h-4 w-4" />
        ) : (
          status === EstadoProcesoEnum.Completo && (
            <CheckedIcon className="h-4 w-4" />
          )
        )}
        <p className="text-xs font-bold">
          Tramite{" "}
          {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}{" "}
        </p>
      </div>
    </div>
  );
}

{
  /* <div className="flex items-center justify-center">
<div className="flex gap-x-4 rounded-lg  ">
  <ExclamationIcon className="h-4 w-4" />
  <p className="text-xs font-bold">Tramite Completo</p>
</div>
</div> */
}
