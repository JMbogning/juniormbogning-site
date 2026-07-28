import { getPublicationIndex } from "../lib/publications";
import { absoluteUrl } from "../lib/seo";

export const dynamic = "force-static";

export default async function sitemap() {
  const [frPublications, enPublications] = await Promise.all([
    getPublicationIndex("fr"),
    getPublicationIndex("en")
  ]);
  const enPublicationsByTranslationKey = new Map(enPublications.map((article) => [article.translationKey, article]));
  const frPublicationsByTranslationKey = new Map(frPublications.map((article) => [article.translationKey, article]));

  const staticEntries = [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      alternates: {
        languages: {
          "fr-FR": absoluteUrl("/"),
          "en-US": absoluteUrl("/en")
        }
      }
    },
    {
      url: absoluteUrl("/en"),
      lastModified: new Date(),
      alternates: {
        languages: {
          "fr-FR": absoluteUrl("/"),
          "en-US": absoluteUrl("/en")
        }
      }
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: new Date(),
      alternates: {
        languages: {
          "fr-FR": absoluteUrl("/contact"),
          "en-US": absoluteUrl("/en/contact")
        }
      }
    },
    {
      url: absoluteUrl("/en/contact"),
      lastModified: new Date(),
      alternates: {
        languages: {
          "fr-FR": absoluteUrl("/contact"),
          "en-US": absoluteUrl("/en/contact")
        }
      }
    },
    {
      url: absoluteUrl("/projets"),
      lastModified: new Date(),
      alternates: {
        languages: {
          "fr-FR": absoluteUrl("/projets"),
          "en-US": absoluteUrl("/en/projects")
        }
      }
    },
    {
      url: absoluteUrl("/en/projects"),
      lastModified: new Date(),
      alternates: {
        languages: {
          "fr-FR": absoluteUrl("/projets"),
          "en-US": absoluteUrl("/en/projects")
        }
      }
    },
    {
      url: absoluteUrl("/publications"),
      lastModified: new Date(),
      alternates: {
        languages: {
          "fr-FR": absoluteUrl("/publications"),
          "en-US": absoluteUrl("/en/publications")
        }
      }
    },
    {
      url: absoluteUrl("/en/publications"),
      lastModified: new Date(),
      alternates: {
        languages: {
          "fr-FR": absoluteUrl("/publications"),
          "en-US": absoluteUrl("/en/publications")
        }
      }
    }
  ];

  const frPublicationEntries = frPublications.map((article) => {
    const counterpart = enPublicationsByTranslationKey.get(article.translationKey);

    return {
      url: absoluteUrl(article.href),
      lastModified: article.publishedAt,
      alternates: {
        languages: {
          "fr-FR": absoluteUrl(article.href),
          "en-US": absoluteUrl(counterpart?.href || "/en/publications")
        }
      }
    };
  });

  const enPublicationEntries = enPublications.map((article) => {
    const counterpart = frPublicationsByTranslationKey.get(article.translationKey);

    return {
      url: absoluteUrl(article.href),
      lastModified: article.publishedAt,
      alternates: {
        languages: {
          "fr-FR": absoluteUrl(counterpart?.href || "/publications"),
          "en-US": absoluteUrl(article.href)
        }
      }
    };
  });

  return [...staticEntries, ...frPublicationEntries, ...enPublicationEntries];
}