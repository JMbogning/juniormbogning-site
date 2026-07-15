import { ContactPage } from "../../../../components/site-pages";
import { buildPageMetadata } from "../../../../lib/seo";

export const metadata = buildPageMetadata({
  lang: "en",
  pageKey: "contact",
  title: "Contact",
  description:
    "Contact Junior Mbogning for speaking engagements, collaborations, technical advisory work or professional inquiries."
});

export default function ContactEnglishRoute() {
  return <ContactPage lang="en" />;
}
