import { notFound } from "next/navigation";
import { PublicationArticlePage } from "../../../../components/site-pages";
import { getPublicationBySlug, getPublicationByTranslationKey, getPublicationSlugs } from "../../../../lib/publications";
import { buildArticleMetadata } from "../../../../lib/seo";

export async function generateStaticParams() {
  const slugs = await getPublicationSlugs("fr");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const article = await getPublicationBySlug("fr", resolvedParams.slug);

  if (!article) {
    return {};
  }

  const counterpart = await getPublicationByTranslationKey("en", article.translationKey);
  return buildArticleMetadata({ lang: "fr", article, counterpart });
}

export default async function PublicationArticleRoute({ params }) {
  const resolvedParams = await params;
  const article = await getPublicationBySlug("fr", resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const counterpart = await getPublicationByTranslationKey("en", article.translationKey);

  return <PublicationArticlePage lang="fr" article={article} counterpart={counterpart} />;
}