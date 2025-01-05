import { FC, SVGProps } from "react";
export const MenuChevron: FC<SVGProps<SVGSVGElement>> = ({ ...props }) => (
  <svg
    viewBox="0 0 29 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0 19H20.9444V15.8333H0V19ZM0 11.0833H16.1111V7.91667H0V11.0833ZM0 0V3.16667H20.9444V0H0ZM29 15.1842L23.2322 9.5L29 3.81583L26.7283 1.58333L18.6728 9.5L26.7283 17.4167L29 15.1842Z"
      fill="currentColor"
    />
  </svg>
);
