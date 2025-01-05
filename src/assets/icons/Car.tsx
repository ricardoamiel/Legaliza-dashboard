import { FC, SVGProps } from "react";
export const Car: FC<SVGProps<SVGSVGElement>> = ({ ...props }) => (
  <svg
    width="81"
    height="65"
    viewBox="0 0 81 65"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask id="path-1-inside-1_278_7130" fill="currentColor">
      <path d="M15.1875 30.0006C15.8994 30.0006 16.5586 30.1308 17.165 30.3912C17.7715 30.6517 18.2988 31.0032 18.7471 31.4459C19.1953 31.8886 19.5645 32.4225 19.8545 33.0475C20.1445 33.6725 20.2764 34.3235 20.25 35.0006C20.25 35.7037 20.1182 36.3548 19.8545 36.9537C19.5908 37.5527 19.2349 38.0735 18.7866 38.5162C18.3384 38.9589 17.7979 39.3235 17.165 39.61C16.5322 39.8964 15.873 40.0267 15.1875 40.0006C14.4756 40.0006 13.8164 39.8704 13.21 39.61C12.6035 39.3496 12.0762 38.998 11.6279 38.5553C11.1797 38.1126 10.8105 37.5787 10.5205 36.9537C10.2305 36.3287 10.0986 35.6777 10.125 35.0006C10.125 34.2975 10.2568 33.6464 10.5205 33.0475C10.7842 32.4485 11.1401 31.9277 11.5884 31.485C12.0366 31.0423 12.5771 30.6777 13.21 30.3912C13.8428 30.1048 14.502 29.9746 15.1875 30.0006ZM65.8125 30.0006C66.5244 30.0006 67.1836 30.1308 67.79 30.3912C68.3965 30.6517 68.9238 31.0032 69.3721 31.4459C69.8203 31.8886 70.1895 32.4225 70.4795 33.0475C70.7695 33.6725 70.9014 34.3235 70.875 35.0006C70.875 35.7037 70.7432 36.3548 70.4795 36.9537C70.2158 37.5527 69.8599 38.0735 69.4116 38.5162C68.9634 38.9589 68.4229 39.3235 67.79 39.61C67.1572 39.8964 66.498 40.0267 65.8125 40.0006C65.1006 40.0006 64.4414 39.8704 63.835 39.61C63.2285 39.3496 62.7012 38.998 62.2529 38.5553C61.8047 38.1126 61.4355 37.5787 61.1455 36.9537C60.8555 36.3287 60.7236 35.6777 60.75 35.0006C60.75 34.2975 60.8818 33.6464 61.1455 33.0475C61.4092 32.4485 61.7651 31.9277 62.2134 31.485C62.6616 31.0423 63.2022 30.6777 63.835 30.3912C64.4678 30.1048 65.127 29.9746 65.8125 30.0006ZM79.5366 20.0006L76.9263 22.5397C76.979 22.6699 77.1108 23.0605 77.3218 23.7115C77.5327 24.3626 77.7832 25.1308 78.0732 26.0162C78.3633 26.9017 78.6929 27.8522 79.062 28.8678C79.4312 29.8834 79.7476 30.8079 80.0112 31.6412C80.2749 32.4746 80.5122 33.1777 80.7231 33.7506C80.9341 34.3235 81.0264 34.61 81 34.61V60.0006C81 60.7037 80.8682 61.3548 80.6045 61.9537C80.3408 62.5527 79.9849 63.0735 79.5366 63.5162C79.0884 63.9589 78.5479 64.3235 77.915 64.61C77.2822 64.8964 76.623 65.0267 75.9375 65.0006H70.875C70.1631 65.0006 69.5039 64.8704 68.8975 64.61C68.291 64.3496 67.7637 63.998 67.3154 63.5553C66.8672 63.1126 66.498 62.5787 66.208 61.9537C65.918 61.3287 65.7861 60.6777 65.8125 60.0006H15.1875C15.1875 60.7037 15.0557 61.3548 14.792 61.9537C14.5283 62.5527 14.1724 63.0735 13.7241 63.5162C13.2759 63.9589 12.7354 64.3235 12.1025 64.61C11.4697 64.8964 10.8105 65.0267 10.125 65.0006H5.0625C4.35059 65.0006 3.69141 64.8704 3.08496 64.61C2.47852 64.3496 1.95117 63.998 1.50293 63.5553C1.05469 63.1126 0.685547 62.5787 0.395508 61.9537C0.105469 61.3287 -0.0263672 60.6777 3.92902e-10 60.0006V34.61L0.276855 33.7897L0.98877 31.6803L1.93799 28.8678C2.28076 27.8522 2.59717 26.9017 2.88721 26.0162C3.17725 25.1308 3.44092 24.3626 3.67822 23.7115C3.91553 23.0605 4.04736 22.6699 4.07373 22.5397L1.46338 20.0006H3.92902e-10V15.0006H3.59912L5.85352 17.2662L8.78027 8.5553C9.20215 7.27926 9.80859 6.1204 10.5996 5.07874C11.3906 4.03707 12.3267 3.13863 13.4077 2.38342C14.4888 1.62821 15.6357 1.04228 16.8486 0.62561C18.0615 0.208944 19.3799 0.000610352 20.8037 0.000610352H60.1963C61.5674 0.000610352 62.8726 0.208944 64.1118 0.62561C65.3511 1.04228 66.5112 1.61519 67.5923 2.34436C68.6733 3.07353 69.5962 3.97196 70.3608 5.03967C71.1255 6.10738 71.7451 7.27926 72.2197 8.5553L75.1465 17.2662L77.4009 15.0006H81V20.0006H79.5366ZM20.8037 5.00061C19.1426 5.00061 17.666 5.46936 16.374 6.40686C15.082 7.34436 14.1592 8.58134 13.6055 10.1178L10.2437 20.0006H70.7563L67.3945 10.1178C66.8672 8.58134 65.9575 7.34436 64.6655 6.40686C63.3735 5.46936 61.8838 5.00061 60.1963 5.00061H20.8037ZM55.6875 53.0865L51.5742 45.0006H29.4258L25.3125 53.0865V55.0006H55.6875V53.0865ZM75.9375 55.0006V35.3912L75.7002 34.6881C75.542 34.2194 75.3442 33.6074 75.1069 32.8522C74.8696 32.097 74.5928 31.3027 74.2764 30.4694C73.96 29.636 73.6831 28.8157 73.4458 28.0084C73.2085 27.2011 72.9844 26.5371 72.7734 26.0162C72.5625 25.4954 72.4438 25.1569 72.4175 25.0006H8.58252C8.52978 25.1308 8.41113 25.4694 8.22656 26.0162C8.04199 26.5631 7.81787 27.2142 7.5542 27.9694C7.29053 28.7246 7.01367 29.5449 6.72363 30.4303C6.43359 31.3157 6.16992 32.123 5.93262 32.8522C5.69531 33.5813 5.48437 34.1803 5.2998 34.649C5.11523 35.1178 5.03613 35.3652 5.0625 35.3912V55.0006H20.25V51.9147L26.2617 40.0006H54.7383L60.75 51.9147V55.0006H75.9375Z" />
    </mask>
    <path
      d="M15.1875 30.0006C15.8994 30.0006 16.5586 30.1308 17.165 30.3912C17.7715 30.6517 18.2988 31.0032 18.7471 31.4459C19.1953 31.8886 19.5645 32.4225 19.8545 33.0475C20.1445 33.6725 20.2764 34.3235 20.25 35.0006C20.25 35.7037 20.1182 36.3548 19.8545 36.9537C19.5908 37.5527 19.2349 38.0735 18.7866 38.5162C18.3384 38.9589 17.7979 39.3235 17.165 39.61C16.5322 39.8964 15.873 40.0267 15.1875 40.0006C14.4756 40.0006 13.8164 39.8704 13.21 39.61C12.6035 39.3496 12.0762 38.998 11.6279 38.5553C11.1797 38.1126 10.8105 37.5787 10.5205 36.9537C10.2305 36.3287 10.0986 35.6777 10.125 35.0006C10.125 34.2975 10.2568 33.6464 10.5205 33.0475C10.7842 32.4485 11.1401 31.9277 11.5884 31.485C12.0366 31.0423 12.5771 30.6777 13.21 30.3912C13.8428 30.1048 14.502 29.9746 15.1875 30.0006ZM65.8125 30.0006C66.5244 30.0006 67.1836 30.1308 67.79 30.3912C68.3965 30.6517 68.9238 31.0032 69.3721 31.4459C69.8203 31.8886 70.1895 32.4225 70.4795 33.0475C70.7695 33.6725 70.9014 34.3235 70.875 35.0006C70.875 35.7037 70.7432 36.3548 70.4795 36.9537C70.2158 37.5527 69.8599 38.0735 69.4116 38.5162C68.9634 38.9589 68.4229 39.3235 67.79 39.61C67.1572 39.8964 66.498 40.0267 65.8125 40.0006C65.1006 40.0006 64.4414 39.8704 63.835 39.61C63.2285 39.3496 62.7012 38.998 62.2529 38.5553C61.8047 38.1126 61.4355 37.5787 61.1455 36.9537C60.8555 36.3287 60.7236 35.6777 60.75 35.0006C60.75 34.2975 60.8818 33.6464 61.1455 33.0475C61.4092 32.4485 61.7651 31.9277 62.2134 31.485C62.6616 31.0423 63.2022 30.6777 63.835 30.3912C64.4678 30.1048 65.127 29.9746 65.8125 30.0006ZM79.5366 20.0006L76.9263 22.5397C76.979 22.6699 77.1108 23.0605 77.3218 23.7115C77.5327 24.3626 77.7832 25.1308 78.0732 26.0162C78.3633 26.9017 78.6929 27.8522 79.062 28.8678C79.4312 29.8834 79.7476 30.8079 80.0112 31.6412C80.2749 32.4746 80.5122 33.1777 80.7231 33.7506C80.9341 34.3235 81.0264 34.61 81 34.61V60.0006C81 60.7037 80.8682 61.3548 80.6045 61.9537C80.3408 62.5527 79.9849 63.0735 79.5366 63.5162C79.0884 63.9589 78.5479 64.3235 77.915 64.61C77.2822 64.8964 76.623 65.0267 75.9375 65.0006H70.875C70.1631 65.0006 69.5039 64.8704 68.8975 64.61C68.291 64.3496 67.7637 63.998 67.3154 63.5553C66.8672 63.1126 66.498 62.5787 66.208 61.9537C65.918 61.3287 65.7861 60.6777 65.8125 60.0006H15.1875C15.1875 60.7037 15.0557 61.3548 14.792 61.9537C14.5283 62.5527 14.1724 63.0735 13.7241 63.5162C13.2759 63.9589 12.7354 64.3235 12.1025 64.61C11.4697 64.8964 10.8105 65.0267 10.125 65.0006H5.0625C4.35059 65.0006 3.69141 64.8704 3.08496 64.61C2.47852 64.3496 1.95117 63.998 1.50293 63.5553C1.05469 63.1126 0.685547 62.5787 0.395508 61.9537C0.105469 61.3287 -0.0263672 60.6777 3.92902e-10 60.0006V34.61L0.276855 33.7897L0.98877 31.6803L1.93799 28.8678C2.28076 27.8522 2.59717 26.9017 2.88721 26.0162C3.17725 25.1308 3.44092 24.3626 3.67822 23.7115C3.91553 23.0605 4.04736 22.6699 4.07373 22.5397L1.46338 20.0006H3.92902e-10V15.0006H3.59912L5.85352 17.2662L8.78027 8.5553C9.20215 7.27926 9.80859 6.1204 10.5996 5.07874C11.3906 4.03707 12.3267 3.13863 13.4077 2.38342C14.4888 1.62821 15.6357 1.04228 16.8486 0.62561C18.0615 0.208944 19.3799 0.000610352 20.8037 0.000610352H60.1963C61.5674 0.000610352 62.8726 0.208944 64.1118 0.62561C65.3511 1.04228 66.5112 1.61519 67.5923 2.34436C68.6733 3.07353 69.5962 3.97196 70.3608 5.03967C71.1255 6.10738 71.7451 7.27926 72.2197 8.5553L75.1465 17.2662L77.4009 15.0006H81V20.0006H79.5366ZM20.8037 5.00061C19.1426 5.00061 17.666 5.46936 16.374 6.40686C15.082 7.34436 14.1592 8.58134 13.6055 10.1178L10.2437 20.0006H70.7563L67.3945 10.1178C66.8672 8.58134 65.9575 7.34436 64.6655 6.40686C63.3735 5.46936 61.8838 5.00061 60.1963 5.00061H20.8037ZM55.6875 53.0865L51.5742 45.0006H29.4258L25.3125 53.0865V55.0006H55.6875V53.0865ZM75.9375 55.0006V35.3912L75.7002 34.6881C75.542 34.2194 75.3442 33.6074 75.1069 32.8522C74.8696 32.097 74.5928 31.3027 74.2764 30.4694C73.96 29.636 73.6831 28.8157 73.4458 28.0084C73.2085 27.2011 72.9844 26.5371 72.7734 26.0162C72.5625 25.4954 72.4438 25.1569 72.4175 25.0006H8.58252C8.52978 25.1308 8.41113 25.4694 8.22656 26.0162C8.04199 26.5631 7.81787 27.2142 7.5542 27.9694C7.29053 28.7246 7.01367 29.5449 6.72363 30.4303C6.43359 31.3157 6.16992 32.123 5.93262 32.8522C5.69531 33.5813 5.48437 34.1803 5.2998 34.649C5.11523 35.1178 5.03613 35.3652 5.0625 35.3912V55.0006H20.25V51.9147L26.2617 40.0006H54.7383L60.75 51.9147V55.0006H75.9375Z"
      fill="currentColor"
    />
    <path
      d="M15.1875 30.0006C15.8994 30.0006 16.5586 30.1308 17.165 30.3912C17.7715 30.6517 18.2988 31.0032 18.7471 31.4459C19.1953 31.8886 19.5645 32.4225 19.8545 33.0475C20.1445 33.6725 20.2764 34.3235 20.25 35.0006C20.25 35.7037 20.1182 36.3548 19.8545 36.9537C19.5908 37.5527 19.2349 38.0735 18.7866 38.5162C18.3384 38.9589 17.7979 39.3235 17.165 39.61C16.5322 39.8964 15.873 40.0267 15.1875 40.0006C14.4756 40.0006 13.8164 39.8704 13.21 39.61C12.6035 39.3496 12.0762 38.998 11.6279 38.5553C11.1797 38.1126 10.8105 37.5787 10.5205 36.9537C10.2305 36.3287 10.0986 35.6777 10.125 35.0006C10.125 34.2975 10.2568 33.6464 10.5205 33.0475C10.7842 32.4485 11.1401 31.9277 11.5884 31.485C12.0366 31.0423 12.5771 30.6777 13.21 30.3912C13.8428 30.1048 14.502 29.9746 15.1875 30.0006ZM65.8125 30.0006C66.5244 30.0006 67.1836 30.1308 67.79 30.3912C68.3965 30.6517 68.9238 31.0032 69.3721 31.4459C69.8203 31.8886 70.1895 32.4225 70.4795 33.0475C70.7695 33.6725 70.9014 34.3235 70.875 35.0006C70.875 35.7037 70.7432 36.3548 70.4795 36.9537C70.2158 37.5527 69.8599 38.0735 69.4116 38.5162C68.9634 38.9589 68.4229 39.3235 67.79 39.61C67.1572 39.8964 66.498 40.0267 65.8125 40.0006C65.1006 40.0006 64.4414 39.8704 63.835 39.61C63.2285 39.3496 62.7012 38.998 62.2529 38.5553C61.8047 38.1126 61.4355 37.5787 61.1455 36.9537C60.8555 36.3287 60.7236 35.6777 60.75 35.0006C60.75 34.2975 60.8818 33.6464 61.1455 33.0475C61.4092 32.4485 61.7651 31.9277 62.2134 31.485C62.6616 31.0423 63.2022 30.6777 63.835 30.3912C64.4678 30.1048 65.127 29.9746 65.8125 30.0006ZM79.5366 20.0006L76.9263 22.5397C76.979 22.6699 77.1108 23.0605 77.3218 23.7115C77.5327 24.3626 77.7832 25.1308 78.0732 26.0162C78.3633 26.9017 78.6929 27.8522 79.062 28.8678C79.4312 29.8834 79.7476 30.8079 80.0112 31.6412C80.2749 32.4746 80.5122 33.1777 80.7231 33.7506C80.9341 34.3235 81.0264 34.61 81 34.61V60.0006C81 60.7037 80.8682 61.3548 80.6045 61.9537C80.3408 62.5527 79.9849 63.0735 79.5366 63.5162C79.0884 63.9589 78.5479 64.3235 77.915 64.61C77.2822 64.8964 76.623 65.0267 75.9375 65.0006H70.875C70.1631 65.0006 69.5039 64.8704 68.8975 64.61C68.291 64.3496 67.7637 63.998 67.3154 63.5553C66.8672 63.1126 66.498 62.5787 66.208 61.9537C65.918 61.3287 65.7861 60.6777 65.8125 60.0006H15.1875C15.1875 60.7037 15.0557 61.3548 14.792 61.9537C14.5283 62.5527 14.1724 63.0735 13.7241 63.5162C13.2759 63.9589 12.7354 64.3235 12.1025 64.61C11.4697 64.8964 10.8105 65.0267 10.125 65.0006H5.0625C4.35059 65.0006 3.69141 64.8704 3.08496 64.61C2.47852 64.3496 1.95117 63.998 1.50293 63.5553C1.05469 63.1126 0.685547 62.5787 0.395508 61.9537C0.105469 61.3287 -0.0263672 60.6777 3.92902e-10 60.0006V34.61L0.276855 33.7897L0.98877 31.6803L1.93799 28.8678C2.28076 27.8522 2.59717 26.9017 2.88721 26.0162C3.17725 25.1308 3.44092 24.3626 3.67822 23.7115C3.91553 23.0605 4.04736 22.6699 4.07373 22.5397L1.46338 20.0006H3.92902e-10V15.0006H3.59912L5.85352 17.2662L8.78027 8.5553C9.20215 7.27926 9.80859 6.1204 10.5996 5.07874C11.3906 4.03707 12.3267 3.13863 13.4077 2.38342C14.4888 1.62821 15.6357 1.04228 16.8486 0.62561C18.0615 0.208944 19.3799 0.000610352 20.8037 0.000610352H60.1963C61.5674 0.000610352 62.8726 0.208944 64.1118 0.62561C65.3511 1.04228 66.5112 1.61519 67.5923 2.34436C68.6733 3.07353 69.5962 3.97196 70.3608 5.03967C71.1255 6.10738 71.7451 7.27926 72.2197 8.5553L75.1465 17.2662L77.4009 15.0006H81V20.0006H79.5366ZM20.8037 5.00061C19.1426 5.00061 17.666 5.46936 16.374 6.40686C15.082 7.34436 14.1592 8.58134 13.6055 10.1178L10.2437 20.0006H70.7563L67.3945 10.1178C66.8672 8.58134 65.9575 7.34436 64.6655 6.40686C63.3735 5.46936 61.8838 5.00061 60.1963 5.00061H20.8037ZM55.6875 53.0865L51.5742 45.0006H29.4258L25.3125 53.0865V55.0006H55.6875V53.0865ZM75.9375 55.0006V35.3912L75.7002 34.6881C75.542 34.2194 75.3442 33.6074 75.1069 32.8522C74.8696 32.097 74.5928 31.3027 74.2764 30.4694C73.96 29.636 73.6831 28.8157 73.4458 28.0084C73.2085 27.2011 72.9844 26.5371 72.7734 26.0162C72.5625 25.4954 72.4438 25.1569 72.4175 25.0006H8.58252C8.52978 25.1308 8.41113 25.4694 8.22656 26.0162C8.04199 26.5631 7.81787 27.2142 7.5542 27.9694C7.29053 28.7246 7.01367 29.5449 6.72363 30.4303C6.43359 31.3157 6.16992 32.123 5.93262 32.8522C5.69531 33.5813 5.48437 34.1803 5.2998 34.649C5.11523 35.1178 5.03613 35.3652 5.0625 35.3912V55.0006H20.25V51.9147L26.2617 40.0006H54.7383L60.75 51.9147V55.0006H75.9375Z"
      stroke="black"
      strokeWidth="2"
      mask="url(#path-1-inside-1_278_7130)"
    />
    <path
      d="M15.1875 30.0006C15.8994 30.0006 16.5586 30.1308 17.165 30.3912C17.7715 30.6517 18.2988 31.0032 18.7471 31.4459C19.1953 31.8886 19.5645 32.4225 19.8545 33.0475C20.1445 33.6725 20.2764 34.3235 20.25 35.0006C20.25 35.7037 20.1182 36.3548 19.8545 36.9537C19.5908 37.5527 19.2349 38.0735 18.7866 38.5162C18.3384 38.9589 17.7979 39.3235 17.165 39.61C16.5322 39.8964 15.873 40.0267 15.1875 40.0006C14.4756 40.0006 13.8164 39.8704 13.21 39.61C12.6035 39.3496 12.0762 38.998 11.6279 38.5553C11.1797 38.1126 10.8105 37.5787 10.5205 36.9537C10.2305 36.3287 10.0986 35.6777 10.125 35.0006C10.125 34.2975 10.2568 33.6464 10.5205 33.0475C10.7842 32.4485 11.1401 31.9277 11.5884 31.485C12.0366 31.0423 12.5771 30.6777 13.21 30.3912C13.8428 30.1048 14.502 29.9746 15.1875 30.0006ZM65.8125 30.0006C66.5244 30.0006 67.1836 30.1308 67.79 30.3912C68.3965 30.6517 68.9238 31.0032 69.3721 31.4459C69.8203 31.8886 70.1895 32.4225 70.4795 33.0475C70.7695 33.6725 70.9014 34.3235 70.875 35.0006C70.875 35.7037 70.7432 36.3548 70.4795 36.9537C70.2158 37.5527 69.8599 38.0735 69.4116 38.5162C68.9634 38.9589 68.4229 39.3235 67.79 39.61C67.1572 39.8964 66.498 40.0267 65.8125 40.0006C65.1006 40.0006 64.4414 39.8704 63.835 39.61C63.2285 39.3496 62.7012 38.998 62.2529 38.5553C61.8047 38.1126 61.4355 37.5787 61.1455 36.9537C60.8555 36.3287 60.7236 35.6777 60.75 35.0006C60.75 34.2975 60.8818 33.6464 61.1455 33.0475C61.4092 32.4485 61.7651 31.9277 62.2134 31.485C62.6616 31.0423 63.2022 30.6777 63.835 30.3912C64.4678 30.1048 65.127 29.9746 65.8125 30.0006ZM79.5366 20.0006L76.9263 22.5397C76.979 22.6699 77.1108 23.0605 77.3218 23.7115C77.5327 24.3626 77.7832 25.1308 78.0732 26.0162C78.3633 26.9017 78.6929 27.8522 79.062 28.8678C79.4312 29.8834 79.7476 30.8079 80.0112 31.6412C80.2749 32.4746 80.5122 33.1777 80.7231 33.7506C80.9341 34.3235 81.0264 34.61 81 34.61V60.0006C81 60.7037 80.8682 61.3548 80.6045 61.9537C80.3408 62.5527 79.9849 63.0735 79.5366 63.5162C79.0884 63.9589 78.5479 64.3235 77.915 64.61C77.2822 64.8964 76.623 65.0267 75.9375 65.0006H70.875C70.1631 65.0006 69.5039 64.8704 68.8975 64.61C68.291 64.3496 67.7637 63.998 67.3154 63.5553C66.8672 63.1126 66.498 62.5787 66.208 61.9537C65.918 61.3287 65.7861 60.6777 65.8125 60.0006H15.1875C15.1875 60.7037 15.0557 61.3548 14.792 61.9537C14.5283 62.5527 14.1724 63.0735 13.7241 63.5162C13.2759 63.9589 12.7354 64.3235 12.1025 64.61C11.4697 64.8964 10.8105 65.0267 10.125 65.0006H5.0625C4.35059 65.0006 3.69141 64.8704 3.08496 64.61C2.47852 64.3496 1.95117 63.998 1.50293 63.5553C1.05469 63.1126 0.685547 62.5787 0.395508 61.9537C0.105469 61.3287 -0.0263672 60.6777 3.92902e-10 60.0006V34.61L0.276855 33.7897L0.98877 31.6803L1.93799 28.8678C2.28076 27.8522 2.59717 26.9017 2.88721 26.0162C3.17725 25.1308 3.44092 24.3626 3.67822 23.7115C3.91553 23.0605 4.04736 22.6699 4.07373 22.5397L1.46338 20.0006H3.92902e-10V15.0006H3.59912L5.85352 17.2662L8.78027 8.5553C9.20215 7.27926 9.80859 6.1204 10.5996 5.07874C11.3906 4.03707 12.3267 3.13863 13.4077 2.38342C14.4888 1.62821 15.6357 1.04228 16.8486 0.62561C18.0615 0.208944 19.3799 0.000610352 20.8037 0.000610352H60.1963C61.5674 0.000610352 62.8726 0.208944 64.1118 0.62561C65.3511 1.04228 66.5112 1.61519 67.5923 2.34436C68.6733 3.07353 69.5962 3.97196 70.3608 5.03967C71.1255 6.10738 71.7451 7.27926 72.2197 8.5553L75.1465 17.2662L77.4009 15.0006H81V20.0006H79.5366ZM20.8037 5.00061C19.1426 5.00061 17.666 5.46936 16.374 6.40686C15.082 7.34436 14.1592 8.58134 13.6055 10.1178L10.2437 20.0006H70.7563L67.3945 10.1178C66.8672 8.58134 65.9575 7.34436 64.6655 6.40686C63.3735 5.46936 61.8838 5.00061 60.1963 5.00061H20.8037ZM55.6875 53.0865L51.5742 45.0006H29.4258L25.3125 53.0865V55.0006H55.6875V53.0865ZM75.9375 55.0006V35.3912L75.7002 34.6881C75.542 34.2194 75.3442 33.6074 75.1069 32.8522C74.8696 32.097 74.5928 31.3027 74.2764 30.4694C73.96 29.636 73.6831 28.8157 73.4458 28.0084C73.2085 27.2011 72.9844 26.5371 72.7734 26.0162C72.5625 25.4954 72.4438 25.1569 72.4175 25.0006H8.58252C8.52978 25.1308 8.41113 25.4694 8.22656 26.0162C8.04199 26.5631 7.81787 27.2142 7.5542 27.9694C7.29053 28.7246 7.01367 29.5449 6.72363 30.4303C6.43359 31.3157 6.16992 32.123 5.93262 32.8522C5.69531 33.5813 5.48437 34.1803 5.2998 34.649C5.11523 35.1178 5.03613 35.3652 5.0625 35.3912V55.0006H20.25V51.9147L26.2617 40.0006H54.7383L60.75 51.9147V55.0006H75.9375Z"
      stroke="black"
      strokeOpacity="0.2"
      strokeWidth="2"
      mask="url(#path-1-inside-1_278_7130)"
    />
  </svg>
);
