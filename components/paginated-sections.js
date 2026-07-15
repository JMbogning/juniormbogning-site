"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function shouldShowAuthor(author, source) {
  return Boolean(author) && author !== source;
}

function clampPage(page, totalPages) {
  return Math.min(Math.max(page, 1), totalPages);
}

function chunkItems(items, size) {
  const pages = [];

  for (let index = 0; index < items.length; index += size) {
    pages.push(items.slice(index, index + size));
  }

  return pages;
}

function PaginationControls({ page, totalPages, labels, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination">
      <button
        type="button"
        className="pagination__button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        {labels.previous}
      </button>
      <p className="pagination__status">
        {labels.page} {page} {labels.of} {totalPages}
      </p>
      <button
        type="button"
        className="pagination__button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        {labels.next}
      </button>
    </div>
  );
}

function SectionToolbar({ count, page, totalPages, labels, onPageChange }) {
  return (
    <div className="collection-toolbar" data-animate="fade-up">
      <div className="collection-toolbar__summary">
        <p className="collection-toolbar__eyebrow">{labels.browse}</p>
        <h2>
          {count} {labels.results}
        </h2>
      </div>
      <PaginationControls page={page} totalPages={totalPages} labels={labels} onPageChange={onPageChange} />
    </div>
  );
}

function CategoryFilters({ categories, activeCategory, labels, onChange }) {
  if (categories.length <= 1) {
    return null;
  }

  return (
    <div className="publication-filters" data-animate="fade-up">
      <p className="publication-filters__label">{labels.categoriesLabel}</p>
      <div className="publication-filters__list">
        {categories.map((category) => {
          const isActive = category === activeCategory;

          return (
            <button
              key={category}
              type="button"
              className={`publication-filter${isActive ? " is-active" : ""}`}
              onClick={() => onChange(category)}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PublicationAnchor({ href, className, children }) {
  if (href?.startsWith("http")) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}

export function PaginatedPublications({ content }) {
  const categories = [content.publicationLayout.allCategories];
  const uniqueCategories = Array.from(new Set(content.publications.map((item) => item.category).filter(Boolean)));
  categories.push(...uniqueCategories);

  const [activeCategory, setActiveCategory] = useState(content.publicationLayout.allCategories);
  const [page, setPage] = useState(1);
  const filteredPublications =
    activeCategory === content.publicationLayout.allCategories
      ? content.publications
      : content.publications.filter((item) => item.category === activeCategory);
  const [featuredArticle, ...remainingArticles] = filteredPublications;
  const pages = chunkItems(remainingArticles, 4);
  const totalPages = pages.length;
  const currentItems = pages[page - 1] ?? [];

  useEffect(() => {
    setPage(1);
  }, [activeCategory]);

  return (
    <section className="section">
      <div className="container">
        <CategoryFilters
          categories={categories}
          activeCategory={activeCategory}
          labels={content.publicationLayout}
          onChange={setActiveCategory}
        />
        {featuredArticle ? (
          <article className="publication-feature" data-animate="fade-up">
            <PublicationAnchor className="publication-feature__media" href={featuredArticle.href ?? featuredArticle.link}>
              <img src={featuredArticle.image} alt={featuredArticle.title} />
            </PublicationAnchor>
            <div className="publication-feature__body">
              <p className="page-hero__eyebrow">{content.publicationLayout.featured}</p>
              <div className="publication-card__meta">
                {featuredArticle.category ? <span className="publication-chip">{featuredArticle.category}</span> : null}
                <span>{featuredArticle.source}</span>
                <span>{featuredArticle.date}</span>
                {featuredArticle.readingTime ? <span>{featuredArticle.readingTime}</span> : null}
                {shouldShowAuthor(featuredArticle.author, featuredArticle.source) ? <span>{featuredArticle.author}</span> : null}
              </div>
              <h2>{featuredArticle.title}</h2>
              <p>{featuredArticle.excerpt}</p>
              <PublicationAnchor className="button button--primary publication-link" href={featuredArticle.href ?? featuredArticle.link}>
                {content.publicationLayout.readArticle}
              </PublicationAnchor>
            </div>
          </article>
        ) : null}
        {remainingArticles.length ? (
          <>
            <SectionToolbar
              count={remainingArticles.length}
              page={page}
              totalPages={totalPages}
              labels={content.pagination}
              onPageChange={(nextPage) => setPage(clampPage(nextPage, totalPages))}
            />
            <div className="publications-grid">
              {currentItems.map((item) => (
                <article className="publication-card" key={item.title} data-animate="fade-up">
                  <PublicationAnchor className="publication-card__media" href={item.href ?? item.link}>
                    <img src={item.image} alt={item.title} />
                  </PublicationAnchor>
                  <div className="publication-card__body">
                    <div className="publication-card__meta">
                      {item.category ? <span className="publication-chip">{item.category}</span> : null}
                      <span>{item.source}</span>
                      <span>{item.date}</span>
                      {item.readingTime ? <span>{item.readingTime}</span> : null}
                      {shouldShowAuthor(item.author, item.source) ? <span>{item.author}</span> : null}
                    </div>
                    <h2>{item.title}</h2>
                    <p>{item.excerpt}</p>
                    <PublicationAnchor className="text-link" href={item.href ?? item.link}>
                      {content.publicationLayout.readArticle}
                    </PublicationAnchor>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : null}
        {!featuredArticle ? (
          <div className="publication-empty" data-animate="fade-up">
            <p>{content.publicationLayout.empty}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}