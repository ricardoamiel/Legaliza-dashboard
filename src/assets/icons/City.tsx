import { FC, SVGProps } from "react";
export const City: FC<SVGProps<SVGSVGElement>> = ({ ...props }) => (
  <svg
    viewBox="0 0 18 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.5003 3.83333H11.5003C11.2793 3.83333 11.0674 3.92113 10.9111 4.07741C10.7548 4.23369 10.667 4.44565 10.667 4.66667V7.16667H9.00033V1.33333C9.00033 1.11232 8.91253 0.900358 8.75625 0.744078C8.59997 0.587797 8.38801 0.5 8.16699 0.5H1.50033C1.27931 0.5 1.06735 0.587797 0.91107 0.744078C0.75479 0.900358 0.666992 1.11232 0.666992 1.33333V14.6667C0.666992 14.8877 0.75479 15.0996 0.91107 15.2559C1.06735 15.4122 1.27931 15.5 1.50033 15.5H16.5003C16.7213 15.5 16.9333 15.4122 17.0896 15.2559C17.2459 15.0996 17.3337 14.8877 17.3337 14.6667V4.66667C17.3337 4.44565 17.2459 4.23369 17.0896 4.07741C16.9333 3.92113 16.7213 3.83333 16.5003 3.83333ZM5.66699 3H7.33366V4.66667H5.66699V3ZM4.00033 11.3333H2.33366V9.66667H4.00033V11.3333ZM4.00033 8H2.33366V6.33333H4.00033V8ZM4.00033 4.66667H2.33366V3H4.00033V4.66667ZM7.33366 11.3333H5.66699V9.66667H7.33366V11.3333ZM7.33366 8H5.66699V6.33333H7.33366V8ZM14.8337 11.3333H13.167V9.66667H14.8337V11.3333ZM14.8337 8H13.167V6.33333H14.8337V8Z"
      fill="currentColor"
    />
  </svg>
);