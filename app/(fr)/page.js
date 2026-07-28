import { HomePage } from "../../components/site-pages";
import { buildPageMetadata } from "../../lib/seo";

export const metadata = buildPageMetadata({
  lang: "fr",
  pageKey: "home",
  title: "Cloud Platform / DevSecOps Engineer",
  description:
    "Junior Mbogning partage son parcours, ses projets et ses articles sur le Cloud, Kubernetes, le DevSecOps et la sécurisation des plateformes numériques."
});

export default function HomeRoute() {
  return <HomePage lang="fr" />;
}