import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { marked } from "marked";

const PUBLICATIONS_ROOT = path.join(process.cwd(), "content", "publications");
const PUBLICATION_IMAGES_ROOT = path.join(process.cwd(), "public", "images", "publications");
const COVER_IMAGE_CANDIDATES = ["cover.png", "cover.jpg", "cover.jpeg", "cover.webp", "cover.avif"];

const localeConfig = {
  fr: {
    locale: "fr-FR",
    detailBasePath: "/publications"
  },
  en: {
    locale: "en-US",
    detailBasePath: "/en/publications"
  }
};

marked.setOptions({
  gfm: true,
  breaks: false
});

function estimateReadingTime(markdown, lang) {
  const plainText = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/[#>*_\-]/g, " ");

  const words = plainText.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));

  return lang === "fr" ? `${minutes} min de lecture` : `${minutes} min read`;
}

function formatPublishedDate(publishedAt, lang) {
  return new Intl.DateTimeFormat(localeConfig[lang].locale, {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(publishedAt));
}

async function walkMarkdownFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return walkMarkdownFiles(entryPath);
      }

      if (entry.isFile() && entry.name.endsWith(".md")) {
        return [entryPath];
      }

      return [];
    })
  );

  return files.flat();
}

function getPublicationDescriptor(lang, filePath) {
  const relativePath = path.relative(path.join(PUBLICATIONS_ROOT, lang), filePath);
  const segments = relativePath.split(path.sep);
  const filename = segments.at(-1) ?? "";
  const isIndexFile = filename === "index.md";
  const slug = isIndexFile ? segments.at(-2) ?? "" : filename.replace(/\.md$/, "");
  const year = segments.find((segment) => /^\d{4}$/.test(segment)) ?? "misc";

  return {
    slug,
    year,
    relativePath,
    filePath
  };
}

async function resolvePublicationImage(year, slug, imageValue) {
  if (typeof imageValue === "string" && imageValue.trim()) {
    if (imageValue.startsWith("/") || imageValue.startsWith("http")) {
      return imageValue.trim();
    }

    return `/images/publications/${year}/${slug}/${imageValue.trim()}`;
  }

  for (const filename of COVER_IMAGE_CANDIDATES) {
    const absolutePath = path.join(PUBLICATION_IMAGES_ROOT, year, slug, filename);

    try {
      await fs.access(absolutePath);
      return `/images/publications/${year}/${slug}/${filename}`;
    } catch {}
  }

  return "";
}

async function readPublicationFile(lang, filePath) {
  const { slug, year } = getPublicationDescriptor(lang, filePath);
  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);

  if (data.draft === true) {
    return null;
  }

  const excerpt = typeof data.excerpt === "string" ? data.excerpt.trim() : "";
  const title = typeof data.title === "string" ? data.title.trim() : slug;
  const source = typeof data.source === "string" ? data.source.trim() : "Junior Mbogning";
  const author = typeof data.author === "string" ? data.author.trim() : "Junior Mbogning";
  const translationKey = typeof data.translationKey === "string" ? data.translationKey.trim() : slug;
  const image = await resolvePublicationImage(year, slug, data.image);
  const category = typeof data.category === "string" ? data.category.trim() : "";
  const publishedAt = typeof data.publishedAt === "string" ? data.publishedAt : "1970-01-01";
  const date = formatPublishedDate(publishedAt, lang);
  const readingTime = estimateReadingTime(content, lang);

  return {
    slug,
    title,
    excerpt,
    source,
    author,
    translationKey,
    image,
    category,
    publishedAt,
    date,
    readingTime,
    year,
    href: `${localeConfig[lang].detailBasePath}/${slug}`,
    contentHtml: marked.parse(content)
  };
}

const getPublicationEntries = cache(async (lang) => {
  const directory = path.join(PUBLICATIONS_ROOT, lang);
  const files = await walkMarkdownFiles(directory);
  const publications = await Promise.all(files.map((filePath) => readPublicationFile(lang, filePath)));

  return publications
    .filter(Boolean)
    .sort((left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime());
});

export async function getPublicationSlugs(lang) {
  const publications = await getPublicationEntries(lang);
  return publications.map((publication) => publication.slug);
}

export async function getPublicationIndex(lang) {
  const publications = await getPublicationEntries(lang);
  return publications.map(({ contentHtml, ...metadata }) => metadata);
}

export async function getPublicationBySlug(lang, slug) {
  const publications = await getPublicationEntries(lang);
  return publications.find((publication) => publication.slug === slug) ?? null;
}

export async function getPublicationByTranslationKey(lang, translationKey) {
  const publications = await getPublicationEntries(lang);
  return publications.find((publication) => publication.translationKey === translationKey) ?? null;
}