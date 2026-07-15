import { ProjectsPage } from "../../../../components/site-pages";
import { buildPageMetadata } from "../../../../lib/seo";

export const metadata = buildPageMetadata({
  lang: "en",
  pageKey: "projects",
  title: "Cloud and DevSecOps projects",
  description:
    "Explore Junior Mbogning's work in platform engineering, Kubernetes, Infrastructure as Code and cloud-native security."
});

export default function ProjectsEnglishRoute() {
  return <ProjectsPage lang="en" />;
}
