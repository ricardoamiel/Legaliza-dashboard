import { FC, SVGProps } from "react";
export const Down: FC<SVGProps<SVGSVGElement>> = ({ ...props }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.76001 9.12L11.76 14.88L17.76 9.12"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
