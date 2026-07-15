"use client";

import Link from "next/link";

const LANGUAGE_PREFERENCE_KEY = "jm-language-preference";

export function LanguageSwitcher({ lang, pathname, labels }) {
  const frPath = pathname.startsWith("/en") ? pathname.replace("/en", "") || "/" : pathname;
  const enPath = pathname.startsWith("/en") ? pathname : pathname === "/" ? "/en" : `/en${pathname}`;

  const rememberLanguageChoice = (nextLang) => {
    window.localStorage.setItem(LANGUAGE_PREFERENCE_KEY, nextLang);
  };

  return (
    <div className="language-switcher">
      <Link className={lang === "fr" ? "is-active" : ""} href={frPath} onClick={() => rememberLanguageChoice("fr")}>
        <span className="language-switcher__flag language-switcher__flag--fr" aria-hidden="true" />
        <span>{labels.fr}</span>
      </Link>
      <span className="language-switcher__divider" aria-hidden="true" />
      <Link className={lang === "en" ? "is-active" : ""} href={enPath} onClick={() => rememberLanguageChoice("en")}>
        <span className="language-switcher__flag language-switcher__flag--en" aria-hidden="true" />
        <span>{labels.en}</span>
      </Link>
    </div>
  );
}