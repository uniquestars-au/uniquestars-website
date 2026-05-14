// src/components/SEO.tsx
import { useEffect } from "react";

type OpenGraph = {
    title?: string;
    description?: string;
    url?: string;
    image?: string;
    type?: string;
};

type SEOProps = {
    title: string;
    description?: string;
    keywords?: string;
    canonical?: string;
    openGraph?: OpenGraph;
    twitterCard?: boolean;
    jsonLd?: object | null;
    faviconHref?: string; // e.g. '/favicon.ico' (public folder) or imported path
};

function setMeta(nameOrProp: string, value: string, useProperty = false) {
    if (!value) return;
    const selector = useProperty ? `meta[property="${nameOrProp}"]` : `meta[name="${nameOrProp}"]`;
    let el = document.head.querySelector(selector) as HTMLMetaElement | null;
    if (!el) {
        el = document.createElement("meta");
        if (useProperty) el.setAttribute("property", nameOrProp);
        else el.setAttribute("name", nameOrProp);
        // mark as managed for easier debug
        el.setAttribute("data-managed-by", "SEO");
        document.head.appendChild(el);
    }
    el.setAttribute("content", value);
}

function setOrCreateLink(rel: string, href: string) {
    if (!href) return;
    let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
    if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        el.setAttribute("data-managed-by", "SEO");
        document.head.appendChild(el);
    }
    el.setAttribute("href", href);
}

function setOrCreateMetaProp(prop: string, content: string) {
    if (!content) return;
    let el = document.head.querySelector(`meta[property="${prop}"]`) as HTMLMetaElement | null;
    if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", prop);
        el.setAttribute("data-managed-by", "SEO");
        document.head.appendChild(el);
    }
    el.setAttribute("content", content);
}

export default function SEO({
    title,
    description = "",
    keywords,
    canonical,
    openGraph,
    twitterCard = true,
    jsonLd,
    faviconHref,
}: SEOProps) {
    useEffect(() => {
        // guard for SSR / non-browser environment
        if (typeof document === "undefined" || !document.head) return;

        const prevTitle = document.title;
        document.title = title;

        // Standard meta
        setMeta("description", description || "");
        if (keywords) setMeta("keywords", keywords);

        // canonical
        if (canonical) setOrCreateLink("canonical", canonical);

        // Open Graph
        setOrCreateMetaProp("og:site_name", "Unique Stars");
        setOrCreateMetaProp("og:title", openGraph?.title ?? title);
        setOrCreateMetaProp("og:description", openGraph?.description ?? description ?? "");
        if (openGraph?.url) setOrCreateMetaProp("og:url", openGraph.url);
        setOrCreateMetaProp("og:type", openGraph?.type ?? "website");
        if (openGraph?.image) setOrCreateMetaProp("og:image", openGraph.image);

        // Twitter card
        if (twitterCard) setMeta("twitter:card", "summary_large_image");
        setMeta("twitter:title", openGraph?.title ?? title);
        setMeta("twitter:description", openGraph?.description ?? description ?? "");
        if (openGraph?.image) setMeta("twitter:image", openGraph.image);

        // favicon
        if (faviconHref) setOrCreateLink("icon", faviconHref);

        // JSON-LD: put into a single script tag with id so we can update/replace reliably
        const jsonLdId = "seo-json-ld";
        if (jsonLd) {
            // remove existing if any, then add updated
            const existing = document.head.querySelector(`#${jsonLdId}`) as HTMLScriptElement | null;
            if (existing && existing.parentNode) existing.parentNode.removeChild(existing);

            const jsonLdEl = document.createElement("script");
            jsonLdEl.type = "application/ld+json";
            jsonLdEl.id = jsonLdId;
            try {
                jsonLdEl.text = JSON.stringify(jsonLd);
            } catch (err) {
                // fallback: stringify safely by removing circulars — best effort
                try {
                    jsonLdEl.text = JSON.stringify(JSON.parse(JSON.stringify(jsonLd)));
                } catch (e) {
                    console.warn("SEO: failed to stringify jsonLd", e);
                    jsonLdEl.text = "{}";
                }
            }
            document.head.appendChild(jsonLdEl);
        } else {
            // if no jsonLd provided, ensure we don't leave an orphaned script from a prior mount
            const existing = document.head.querySelector(`#${jsonLdId}`) as HTMLScriptElement | null;
            if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
        }

        return () => {
            // restore previous title
            document.title = prevTitle;
            // intentionally NOT removing other meta tags (they are updated/overwritten by other pages' SEO components).
            // remove the JSON-LD we created so SPA navigation doesn't leave stale script
            const existing = document.head.querySelector(`#${jsonLdId}`) as HTMLScriptElement | null;
            if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        title,
        description,
        keywords,
        canonical,
        JSON.stringify(openGraph || {}),
        twitterCard,
        JSON.stringify(jsonLd || {}),
        faviconHref,
    ]);

    return null;
}
