import { useState, useEffect, useMemo } from "react";
import { throttle } from "lodash";

type ResponsiveValue<T> = {
  sm?: T;
  md?: T;
  lg?: T;
};

interface UseResponsiveSpacingProps {
  p?: number | ResponsiveValue<number>;
  px?: number | ResponsiveValue<number>;
  py?: number | ResponsiveValue<number>;
  pt?: number | ResponsiveValue<number>;
  pr?: number | ResponsiveValue<number>;
  pb?: number | ResponsiveValue<number>;
  pl?: number | ResponsiveValue<number>;
  m?: number | ResponsiveValue<number>;
  mx?: number | ResponsiveValue<number>;
  my?: number | ResponsiveValue<number>;
  mt?: number | ResponsiveValue<number>;
  mr?: number | ResponsiveValue<number>;
  mb?: number | ResponsiveValue<number>;
  ml?: number | ResponsiveValue<number>;
}

export function useResponsiveSpacing(props: UseResponsiveSpacingProps) {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = throttle(() => setWindowWidth(window.innerWidth), 100);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getValue = (value: number | ResponsiveValue<number> | undefined) => {
    if (value === undefined) return undefined;
    if (typeof value === "number") return value;
    if (windowWidth < 640) return value.sm ?? value.md ?? value.lg ?? 0;
    if (windowWidth < 768) return value.md ?? value.sm ?? value.lg ?? 0;
    return value.lg ?? value.md ?? value.sm ?? 0;
  };

  return useMemo(() => {
    const classes: string[] = [];

    const spacingProps = [
      "p",
      "px",
      "py",
      "pt",
      "pr",
      "pb",
      "pl",
      "m",
      "mx",
      "my",
      "mt",
      "mr",
      "mb",
      "ml",
    ] as const;

    spacingProps.forEach((key) => {
      const val = getValue(props[key]);
      if (val !== undefined) classes.push(`${key}-${val}`);
    });

    return classes.join(" ");
  }, [props, windowWidth]);
}
