import { useState, useEffect } from "react";

/**
 * Returns the current height of the header element with id "app-header"
 */
export function useHeaderHeight() {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.getElementById("app-header");
    if (!header) return;

    const updateHeight = () => setHeaderHeight(header.offsetHeight);
    updateHeight();

    // Optional: listen for resize if header height changes on responsive layouts
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return headerHeight;
}
