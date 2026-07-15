import { getPublicationIndex } from "../lib/publications";
import { absoluteUrl } from "../lib/seo";

export const dynamic = "force-static";

export default async function sitemap() {
  const [frPublications, enPublications] = await Promise.all([
    getPublicationIndex("fr"),
    getPublicationIndex("en")
  ]);

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

  const publicationEntries = [...frPublications, ...enPublications].map((article) => ({
    url: absoluteUrl(article.href),
    lastModified: article.publishedAt
  }));

  return [...staticEntries, ...publicationEntries];
}