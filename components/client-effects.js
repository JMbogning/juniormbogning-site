"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const LANGUAGE_PREFERENCE_KEY = "jm-language-preference";

function getPathLanguage(pathname) {
  return pathname.startsWith("/en") ? "en" : "fr";
}

function toLocalizedPath(pathname, targetLang) {
  if (targetLang === "en") {
    return pathname.startsWith("/en") ? pathname : pathname === "/" ? "/en" : `/en${pathname}`;
  }

  if (!pathname.startsWith("/en")) {
    return pathname;
  }

  return pathname.replace("/en", "") || "/";
}

function detectBrowserLanguage() {
  if (typeof window === "undefined") {
    return "fr";
  }

  const languages = window.navigator.languages?.length ? window.navigator.languages : [window.navigator.language];

  for (const language of languages) {
    const normalizedLanguage = String(language || "").toLowerCase();

    if (normalizedLanguage.startsWith("fr")) {
      return "fr";
    }

    if (normalizedLanguage.startsWith("en")) {
      return "en";
    }
  }

  return "fr";
}

export function ClientEffects() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const currentLanguage = getPathLanguage(pathname);
    document.documentElement.lang = currentLanguage;

    const savedLanguage = window.localStorage.getItem(LANGUAGE_PREFERENCE_KEY);
    const hasSavedLanguage = savedLanguage === "fr" || savedLanguage === "en";

    if (hasSavedLanguage || (pathname !== "/" && pathname !== "/en")) {
      return;
    }

    const targetLanguage = detectBrowserLanguage();
    window.localStorage.setItem(LANGUAGE_PREFERENCE_KEY, targetLanguage);

    if (targetLanguage === currentLanguage) {
      return;
    }

    const queryString = window.location.search || "";
    const hash = window.location.hash || "";
    const localizedPath = toLocalizedPath(pathname, targetLanguage);
    const nextUrl = `${localizedPath}${queryString}${hash}`;

    router.replace(nextUrl);
  }, [pathname, router]);

  useEffect(() => {
    document.body.classList.add("js-ready");

    const animatedNodes = document.querySelectorAll("[data-animate]");
    const staggerGroups = document.querySelectorAll("[data-stagger-group]");

    const reveal = (element) => {
      element.classList.add("is-visible");
    };

    const revealIfInView = (element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.92) {
        reveal(element);
        return true;
      }
      return false;
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }
            reveal(entry.target);
            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.16,
          rootMargin: "0px 0px -10% 0px"
        }
      );

      animatedNodes.forEach((node) => {
        if (node.dataset.animate === "hero") {
          reveal(node);
          return;
        }
        if (!revealIfInView(node)) {
          observer.observe(node);
        }
      });

      staggerGroups.forEach((group) => {
        if (!revealIfInView(group)) {
          observer.observe(group);
        }
      });

      return () => {
        observer.disconnect();
      };
    }

    animatedNodes.forEach(reveal);
    staggerGroups.forEach(reveal);
  }, [pathname]);

  useEffect(() => {
    const setScrolledState = () => {
      document.body.classList.toggle("is-scrolled", window.scrollY > 12);
    };

    setScrolledState();
    window.addEventListener("scroll", setScrolledState, { passive: true });
    return () => window.removeEventListener("scroll", setScrolledState);
  }, []);

  return null;
}