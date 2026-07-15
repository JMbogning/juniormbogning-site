import { ProjectsPage } from "../../../components/site-pages";
import { buildPageMetadata } from "../../../lib/seo";

export const metadata = buildPageMetadata({
  lang: "fr",
  pageKey: "projects",
  title: "Projets Cloud et DevSecOps",
  description:
    "Découvrez les projets de Junior Mbogning autour du Platform Engineering, de Kubernetes, de l'Infrastructure as Code et de la sécurité Cloud native."
});

export default function ProjectsRoute() {
  return <ProjectsPage lang="fr" />;
}
