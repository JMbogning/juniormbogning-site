import { ContactPage } from "../../../components/site-pages";
import { buildPageMetadata } from "../../../lib/seo";

export const metadata = buildPageMetadata({
  lang: "fr",
  pageKey: "contact",
  title: "Contact",
  description:
    "Contactez Junior Mbogning pour une prise de parole, une collaboration, une intervention technique ou un échange professionnel."
});

export default function ContactRoute() {
  return <ContactPage lang="fr" />;
}
