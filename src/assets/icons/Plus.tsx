import { FC, SVGProps } from "react";
export const Plus: FC<SVGProps<SVGSVGElement>> = ({ ...props }) => (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M21 14.2164H13.2857V21.9307H10.7143V14.2164H3V11.645H10.7143V3.93066H13.2857V11.645H21V14.2164Z"
      fill="currentColor"
    />
  </svg>
);
