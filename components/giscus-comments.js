"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const giscusConfig = {
  repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
  repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID,
  category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
  categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
  theme: process.env.NEXT_PUBLIC_GISCUS_THEME || "light",
  strict: process.env.NEXT_PUBLIC_GISCUS_STRICT || "0",
  reactionsEnabled: process.env.NEXT_PUBLIC_GISCUS_REACTIONS_ENABLED || "1",
  emitMetadata: process.env.NEXT_PUBLIC_GISCUS_EMIT_METADATA || "0",
  inputPosition: process.env.NEXT_PUBLIC_GISCUS_INPUT_POSITION || "top"
};

function hasRequiredConfig() {
  return (
    giscusConfig.repo &&
    giscusConfig.repoId &&
    giscusConfig.category &&
    giscusConfig.categoryId
  );
}

export function GiscusComments({ lang = "fr", labels }) {
  const pathname = usePathname();
  const containerRef = useRef(null);
  const isConfigured = hasRequiredConfig();

  useEffect(() => {
    if (!isConfigured || !containerRef.current) {
      return;
    }

    const container = containerRef.current;
    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-giscus-script", "true");
    script.setAttribute("data-loading", "lazy");
    script.setAttribute("data-repo", giscusConfig.repo);
    script.setAttribute("data-repo-id", giscusConfig.repoId);
    script.setAttribute("data-category", giscusConfig.category);
    script.setAttribute("data-category-id", giscusConfig.categoryId);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", giscusConfig.strict);
    script.setAttribute("data-reactions-enabled", giscusConfig.reactionsEnabled);
    script.setAttribute("data-emit-metadata", giscusConfig.emitMetadata);
    script.setAttribute("data-input-position", giscusConfig.inputPosition);
    script.setAttribute("data-theme", giscusConfig.theme);
    script.setAttribute("data-lang", lang);

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [isConfigured, lang, pathname]);

  return (
    <section className="article-comments" data-animate="fade-up" aria-labelledby="article-comments-title">
      <div className="article-comments__header">
        <p className="page-hero__eyebrow">{labels.eyebrow}</p>
        <h2 id="article-comments-title">{labels.title}</h2>
        <p>{labels.intro}</p>
      </div>
      {isConfigured ? (
        <div className="article-comments__mount" ref={containerRef} />
      ) : (
        <div className="article-comments__placeholder">
          <p>{labels.setup}</p>
        </div>
      )}
    </section>
  );
}