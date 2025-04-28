import { useEffect, useState } from "react";

type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";
enum Breakpoints {
  sm = 640,
  md = 768,
  lg = 1024,
  xl = 1280,
  "2xl" = 1536,
}

type BreakpointUtils = {
  breakpoint: Breakpoint;

  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  is2Xl: boolean;

  isSmAndUp: boolean;
  isMdAndUp: boolean;
  isLgAndUp: boolean;
  isXlAndUp: boolean;
  is2XlAndUp: boolean;

  isSmAndDown: boolean;
  isMdAndDown: boolean;
  isLgAndDown: boolean;
  isXlAndDown: boolean;
};

export const useBreakpoint = (): BreakpointUtils => {
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let breakpoint: Breakpoint = "2xl";
  if (width < Breakpoints.sm) breakpoint = "sm";
  else if (width < Breakpoints.md) breakpoint = "md";
  else if (width < Breakpoints.lg) breakpoint = "lg";
  else if (width < Breakpoints.xl) breakpoint = "xl";

  return {
    breakpoint,

    isSm: breakpoint === "sm",
    isMd: breakpoint === "md",
    isLg: breakpoint === "lg",
    isXl: breakpoint === "xl",
    is2Xl: breakpoint === "2xl",

    isSmAndUp: width >= Breakpoints.sm,
    isMdAndUp: width >= Breakpoints.md,
    isLgAndUp: width >= Breakpoints.lg,
    isXlAndUp: width >= Breakpoints.xl,
    is2XlAndUp: width >= Breakpoints["2xl"],

    isSmAndDown: width < Breakpoints.md,
    isMdAndDown: width < Breakpoints.lg,
    isLgAndDown: width < Breakpoints.xl,
    isXlAndDown: width < Breakpoints["2xl"],
  };
};
