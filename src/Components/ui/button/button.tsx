import cx from "@/libs/cx";
import React, { forwardRef } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = (
  { children, ...props }: Props,
  ref: React.ForwardedRef<HTMLButtonElement> | null,
) => {
  return (
    <button
      {...props}
      ref={ref}
      className={cx(
        "bg-primary h-[48px] w-full rounded px-4 py-2 text-white disabled:bg-[#A0A7AF]",
        props.className,
      )}
    >
      {children}
    </button>
  );
};

export default forwardRef(Button);
