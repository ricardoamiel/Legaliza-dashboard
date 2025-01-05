import { cva, type VariantProps } from "class-variance-authority";
import { ReactNode, ComponentPropsWithoutRef } from "react";
import cx from "@/libs/cx";

export type variantTypography = "h1" | "h2" | "h3" | "h4" | "p" | "span";

const typography = cva("text-primary-800", {
  variants: {
    text: {
      h1: "text-[32px] xl:text-[64px] leading-[120%]",
      h2: "text-[32px] xl:text-[48px] leading-[120%]",
      h3: "text-[32px] xl:text-[32px] leading-[120%]",
      h4: "text-[18px] xl:text-[24px] leading-[120%]",
      paragraph: "text-[18px] xl:text-[20px] leading-[120%]",
      span: "text-[16px] leading-[120%]",
    },
    font: {
      gloock: "gloockFont",
      outfit: "outfitFont",
    },
  },
  defaultVariants: {
    text: "paragraph",
    font: "gloock",
  },
});

type TextProps<C extends variantTypography> = {
  as?: C;
  children?: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<C> &
  VariantProps<typeof typography>;

export const Typography = <C extends variantTypography>({
  as,
  text,
  className,
  children,
  font,
  ...restProps
}: TextProps<C>) => {
  const Component = as || "p";
  return (
    <Component
      {...restProps}
      className={cx(typography({ text, font }), className)}
    >
      {children}
    </Component>
  );
};
