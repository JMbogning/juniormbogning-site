import { PublicationsPage } from "../../../../components/site-pages";
import { getPublicationIndex } from "../../../../lib/publications";
import { buildPageMetadata } from "../../../../lib/seo";

export const metadata = buildPageMetadata({
  lang: "en",
  pageKey: "publications",
  title: "Cloud, Kubernetes and DevSecOps articles",
  description:
    "Browse Junior Mbogning's technical articles on cloud architecture, Kubernetes, platform security and DevSecOps practices."
});

export default async function PublicationsEnglishRoute() {
  const publications = await getPublicationIndex("en");

  return <PublicationsPage lang="en" publications={publications} />;
}
