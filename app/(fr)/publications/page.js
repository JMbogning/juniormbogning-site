import { PublicationsPage } from "../../../components/site-pages";
import { getPublicationIndex } from "../../../lib/publications";
import { buildPageMetadata } from "../../../lib/seo";

export const metadata = buildPageMetadata({
  lang: "fr",
  pageKey: "publications",
  title: "Articles Cloud, Kubernetes et DevSecOps",
  description:
    "Retrouvez les publications de Junior Mbogning sur l'architecture Cloud, Kubernetes, la sécurité des plateformes et les pratiques DevSecOps."
});

export default async function PublicationsRoute() {
  const publications = await getPublicationIndex("fr");

  return <PublicationsPage lang="fr" publications={publications} />;
}
