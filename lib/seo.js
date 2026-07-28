import { siteContent } from "../data/site-content";

const DEFAULT_SITE_URL = "https://juniormbogning.com";
const PERSON_NAME = "Junior Mbogning";
const DEFAULT_SOCIAL_IMAGE = "/images/photo-junior-mbogning.jpg";

function normalizeSiteUrl(value) {
  if (!value) {
    return DEFAULT_SITE_URL;
  }

  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL?.trim());
export const metadataBase = new URL(siteUrl);

export function absoluteUrl(pathname = "/") {
  const rawPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const [pathWithoutHash, hashFragment] = rawPath.split("#");
  const [pathWithoutQuery, queryString] = pathWithoutHash.split("?");
  const lastSegment = pathWithoutQuery.split("/").at(-1) || "";
  const isAssetLikePath = lastSegment.includes(".");
  const normalizedPath =
    pathWithoutQuery !== "/" && !pathWithoutQuery.endsWith("/") && !isAssetLikePath
      ? `${pathWithoutQuery}/`
      : pathWithoutQuery;
  const restoredQuery = queryString ? `${normalizedPath}?${queryString}` : normalizedPath;
  const path = hashFragment ? `${restoredQuery}#${hashFragment}` : restoredQuery;

  return new URL(path, metadataBase).toString();
}

export function stripHtml(value) {
  return String(value || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function getLocalizedPath(lang, key) {
  const routes = {
    home: { fr: "/", en: "/en" },
    contact: { fr: "/contact", en: "/en/contact" },
    projects: { fr: "/projets", en: "/en/projects" },
    publications: { fr: "/publications", en: "/en/publications" }
  };

  return routes[key]?.[lang] ?? "/";
}

function buildAlternates({ currentPath, frPath, enPath }) {
  return {
    canonical: currentPath,
    languages: {
      "fr-FR": frPath,
      "en-US": enPath,
      "x-default": frPath
    }
  };
}

function buildSharedMetadata({ title, description, path, frPath, enPath, image = DEFAULT_SOCIAL_IMAGE, lang }) {
  const ogLocale = lang === "fr" ? "fr_FR" : "en_US";
  const alternateLocale = lang === "fr" ? ["en_US"] : ["fr_FR"];

  return {
    title,
    description,
    alternates: buildAlternates({
      currentPath: path,
      frPath,
      enPath
    }),
    robots: {
      index: true,
      follow: true
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale,
      url: path,
      title,
      description,
      siteName: PERSON_NAME,
      images: [
        {
          url: image,
          alt: title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    }
  };
}

export function buildPageMetadata({ lang, title, description, pageKey, image }) {
  const path = getLocalizedPath(lang, pageKey);

  return buildSharedMetadata({
    title,
    description,
    path,
    frPath: getLocalizedPath("fr", pageKey),
    enPath: getLocalizedPath("en", pageKey),
    image,
    lang
  });
}

export function buildRootMetadata(lang) {
  const isFrench = lang === "fr";

  return {
    metadataBase,
    title: {
      default: isFrench
        ? "Junior Mbogning | Doctorant en informatique et ingénieur DevSecOps"
        : "Junior Mbogning | PhD candidate and DevSecOps engineer",
      template: "%s | Junior Mbogning"
    },
    description: isFrench
      ? "Site officiel de Junior Mbogning, doctorant en informatique et Senior DevOps / DevSecOps Engineer, avec ses projets, articles et domaines d'expertise autour du Cloud, de Kubernetes et de la cybersécurité."
      : "Official website of Junior Mbogning, PhD candidate in Computer Science and Senior DevOps / DevSecOps Engineer, featuring projects, articles and expertise in Cloud, Kubernetes and cybersecurity.",
    applicationName: "Junior Mbogning",
    keywords: [
      "Junior Mbogning",
      "Cybersécurité",
      "Cloud",
      "Kubernetes",
      "DevOps",
      "DevSecOps",
      "Platform Engineering",
      "Université de Ngaoundéré"
    ],
    icons: {
      icon: "/images/logo-junior-mbogning.png",
      shortcut: "/images/logo-junior-mbogning.png",
      apple: "/images/logo-junior-mbogning.png"
    },
    robots: {
      index: true,
      follow: true
    },
    openGraph: {
      type: "website",
      locale: isFrench ? "fr_FR" : "en_US",
      alternateLocale: isFrench ? ["en_US"] : ["fr_FR"],
      url: isFrench ? "/" : "/en",
      siteName: "Junior Mbogning",
      title: isFrench
        ? "Junior Mbogning | Doctorant en informatique et ingénieur DevSecOps"
        : "Junior Mbogning | PhD candidate and DevSecOps engineer",
      description: isFrench
        ? "Découvrez les projets, articles et expertises de Junior Mbogning autour du Cloud, du DevSecOps, de Kubernetes et de la cybersécurité."
        : "Explore Junior Mbogning's projects, articles and expertise across Cloud, DevSecOps, Kubernetes and cybersecurity.",
      images: [
        {
          url: "/images/photo-junior-mbogning.jpg",
          alt: "Portrait of Junior Mbogning"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: isFrench
        ? "Junior Mbogning | Doctorant en informatique et ingénieur DevSecOps"
        : "Junior Mbogning | PhD candidate and DevSecOps engineer",
      description: isFrench
        ? "Découvrez les projets, articles et expertises de Junior Mbogning autour du Cloud, du DevSecOps, de Kubernetes et de la cybersécurité."
        : "Explore Junior Mbogning's projects, articles and expertise across Cloud, DevSecOps, Kubernetes and cybersecurity.",
      images: ["/images/photo-junior-mbogning.jpg"]
    }
  };
}

export function buildArticleMetadata({ lang, article, counterpart }) {
  const frPath = lang === "fr" ? article.href : counterpart?.href ?? article.href;
  const enPath = lang === "en" ? article.href : counterpart?.href ?? article.href;

  return {
    ...buildSharedMetadata({
      title: article.title,
      description: article.excerpt,
      path: article.href,
      frPath,
      enPath,
      image: article.image || DEFAULT_SOCIAL_IMAGE,
      lang
    }),
    openGraph: {
      type: "article",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      alternateLocale: lang === "fr" ? ["en_US"] : ["fr_FR"],
      url: article.href,
      title: article.title,
      description: article.excerpt,
      siteName: PERSON_NAME,
      publishedTime: article.publishedAt,
      authors: [article.author || PERSON_NAME],
      images: [
        {
          url: article.image || DEFAULT_SOCIAL_IMAGE,
          alt: article.title
        }
      ]
    }
  };
}

export function buildPersonJsonLd(lang) {
  const content = siteContent[lang];
  const sameAs = (content.socialLinks || []).map((item) => item.href).filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSON_NAME,
    url: absoluteUrl(lang === "fr" ? "/" : "/en"),
    image: absoluteUrl(siteContent.heroImage),
    jobTitle:
      lang === "fr"
        ? "Doctorant en informatique et Senior DevOps / DevSecOps Engineer"
        : "PhD candidate in Computer Science and Senior DevOps / DevSecOps Engineer",
    description: stripHtml(content.about[0]),
    sameAs,
    knowsAbout: [
      "Cloud",
      "DevOps",
      "DevSecOps",
      "Kubernetes",
      "Infrastructure as Code",
      "Cybersecurity",
      "Platform Engineering"
    ],
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Télécom Paris"
      },
      {
        "@type": "CollegeOrUniversity",
        name: "Université de Ngaoundéré"
      }
    ]
  };
}

export function buildWebsiteJsonLd(lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: PERSON_NAME,
    url: absoluteUrl(lang === "fr" ? "/" : "/en"),
    inLanguage: lang === "fr" ? "fr-FR" : "en-US"
  };
}

export function buildArticleJsonLd(lang, article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    author: {
      "@type": "Person",
      name: article.author || PERSON_NAME
    },
    publisher: {
      "@type": "Person",
      name: PERSON_NAME
    },
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    image: article.image ? [absoluteUrl(article.image)] : [absoluteUrl(DEFAULT_SOCIAL_IMAGE)],
    mainEntityOfPage: absoluteUrl(article.href),
    articleSection: article.category || undefined,
    inLanguage: lang === "fr" ? "fr-FR" : "en-US"
  };
}
