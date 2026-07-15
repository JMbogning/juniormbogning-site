import { HomePage } from "../../../components/site-pages";
import { buildPageMetadata } from "../../../lib/seo";

export const metadata = buildPageMetadata({
  lang: "en",
  pageKey: "home",
  title: "PhD candidate and DevSecOps engineer",
  description:
    "Junior Mbogning shares his profile, projects and articles focused on Cloud, Kubernetes, DevSecOps and secure platform engineering."
});

export default function HomeEnglishRoute() {
  return <HomePage lang="en" />;
}
