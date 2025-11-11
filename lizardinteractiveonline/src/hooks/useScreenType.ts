import { useEffect, useState } from "react";

type ScreenType = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
};

export function useScreenType(): ScreenType {
  const [screen, setScreen] = useState<ScreenType>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    width: typeof window !== "undefined" ? window.innerWidth : 0,
  });

  useEffect(() => {
    const updateScreen = () => {
      const width = window.innerWidth;
      setScreen({
        width,
        isMobile: width <= 882, // < sm (tailwind small breakpoint)
        isTablet: width >= 883 && width < 1024, // sm to lg
        isDesktop: width >= 1024, // lg and above
      });
    };

    updateScreen();
    window.addEventListener("resize", updateScreen);
    return () => window.removeEventListener("resize", updateScreen);
  }, []);

  return screen;
}
