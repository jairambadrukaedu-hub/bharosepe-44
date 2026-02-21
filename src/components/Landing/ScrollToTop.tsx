import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // Prevent browser from restoring previous scroll on navigation
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      // Fallbacks for some browsers
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Run immediately, on next frame, and after microtask to avoid race conditions
    scrollToTop();
    requestAnimationFrame(scrollToTop);
    const t = setTimeout(scrollToTop, 0);
    return () => clearTimeout(t);
  }, [location.pathname, location.search, location.hash]);

  return null;
}

