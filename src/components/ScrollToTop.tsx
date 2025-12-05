import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop
 * It scrolls the viewport to the top whenever the location (route) changes.
 */
export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // instant jump to top. If you prefer a smooth scroll, change `behavior` to "smooth"
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        // also reset any element-level scroll containers if needed here
    }, [pathname]);

    return null;
}
