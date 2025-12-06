import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop
 * - Scrolls to top whenever the location changes,
 *   including when navigating to the SAME pathname (e.g., clicking "Home" while on Home).
 */
export default function ScrollToTop() {
    const location = useLocation();
    const { pathname, search, hash, key } = location;

    useEffect(() => {
        // instant jump to top. If you prefer smooth scroll, change `behavior` to "smooth"
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        // also reset any element-level scroll containers if needed here
    }, [pathname, search, hash, key]); // key changes even if pathname is same

    return null;
}
