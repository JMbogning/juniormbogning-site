import { notFound } from "next/navigation";
import { PublicationArticlePage } from "../../../../../components/site-pages";
import {
  getPublicationBySlug,
  getPublicationByTranslationKey,
  getPublicationSlugs
} from "../../../../../lib/publications";
import { buildArticleMetadata } from "../../../../../lib/seo";

export async function generateStaticParams() {
  const slugs = await getPublicationSlugs("en");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const article = await getPublicationBySlug("en", resolvedParams.slug);

  if (!article) {
    return {};
  }

  const counterpart = await getPublicationByTranslationKey("fr", article.translationKey);
  return buildArticleMetadata({ lang: "en", article, counterpart });
}

export default async function PublicationArticleEnglishRoute({ params }) {
  const resolvedParams = await params;
  const article = await getPublicationBySlug("en", resolvedParams.slug);

  if (!article) {
    notFound();
  }

  return <PublicationArticlePage lang="en" article={article} />;
}
