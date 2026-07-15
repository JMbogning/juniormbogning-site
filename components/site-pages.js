import Link from "next/link";
import { ContactForm } from "./contact-form";
import { PaginatedPublications } from "./paginated-sections";
import { siteContent } from "../data/site-content";
import { GiscusComments } from "./giscus-comments";
import { LanguageSwitcher } from "./language-switcher";
import { buildArticleJsonLd, buildPersonJsonLd, buildWebsiteJsonLd } from "../lib/seo";

function pageKeyFromPath(pathname) {
  if (pathname === "/" || pathname === "/en") return "home";
  if (pathname.includes("projets") || pathname.includes("/projects")) return "projects";
  if (pathname.includes("publications")) return "publications";
  if (pathname.includes("contact")) return "contact";
  return "home";
}

function Header({ lang, pathname, content }) {
  const current = pageKeyFromPath(pathname);
  const contactAnchor = lang === "fr" ? "/#contact" : "/en#contact";

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link className="site-logo" href={lang === "fr" ? "/" : "/en"} aria-label="Junior Mbogning">
          <img src={siteContent.logo} alt="Junior Mbogning logo" />
        </Link>
        <nav className="site-nav" aria-label="Primary">
          {content.nav.map((item) => (
            <Link key={item.href} href={item.href} className={`nav-link${item.key === current ? " is-current" : ""}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="site-header__actions">
          <LanguageSwitcher lang={lang} pathname={pathname} labels={content.switcher} />
          <Link className="header-cta" href={contactAnchor}>
            <span className="header-cta__plus">+</span>
            <span className="header-cta__label">{content.cta}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

function Footer({ content }) {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p>{content.footer}</p>
      </div>
    </footer>
  );
}

function Shell({ lang, pathname, children }) {
  const content = siteContent[lang];

  return (
    <>
      <Header lang={lang} pathname={pathname} content={content} />
      <main>{children}</main>
      <Footer content={content} />
    </>
  );
}

function shouldShowAuthor(author, source) {
  return Boolean(author) && author !== source;
}

function SocialIcon({ platform }) {
  if (platform === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M6.94 8.5A1.56 1.56 0 1 1 6.93 5.4a1.56 1.56 0 0 1 .01 3.1ZM5.6 9.74h2.67V18H5.6V9.74Zm4.34 0h2.56v1.13h.04c.36-.68 1.23-1.4 2.53-1.4 2.7 0 3.2 1.78 3.2 4.09V18H15.6v-3.94c0-.94-.02-2.15-1.31-2.15-1.31 0-1.51 1.02-1.51 2.08V18H9.94V9.74Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M18.9 3H22l-6.8 7.8L23 21h-6.1l-4.8-6.3L6.6 21H3.5l7.3-8.3L3.4 3h6.3l4.4 5.9L18.9 3Zm-1.1 16h1.7L8.8 4.9H7l10.8 14.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

function HomeHero({ content }) {
  return (
    <section className="hero" data-animate="hero">
      <div className="container hero__grid">
        <div className="hero__photo-wrap">
          <img className="hero__photo" src={siteContent.heroImage} alt="Junior Mbogning portrait" />
          <p className="hero__credit">{content.photoCredit}</p>
        </div>
        <div className="hero__statement">
          <h1>{content.heroTitle}</h1>
          <div className="hero__mark" aria-hidden="true">
            <svg viewBox="0 0 180 132">
              <path d="M0 132c3.3-14.3 6.4-29 9-44s6.4-28.7 11.8-41.2c5.3-12.4 12.8-23 22.8-31.5S67.2 1.6 84.9 0l-5.1 24.6C73 25.7 67.4 27.8 62.9 31c-4.5 3.3-8.1 7.2-11 11.8-2.9 4.6-5.2 9.8-6.9 15.3-1.7 5.6-3.3 11.7-4.6 17.5h28.7L56.9 132H0zm93.1 0c3.4-14.3 6.4-29 9-44 2.6-15 6.5-28.7 11.8-41.2 5.3-12.4 12.8-23 22.8-31.5C146.6 6.8 160.4 1.6 178.1 0l-5.2 24.6c-6.8 1.1-12.4 3.2-16.9 6.4-4.4 3.3-8 7.2-11 11.8-2.9 4.6-5.2 9.8-6.9 15.3-1.7 5.6-3.3 11.7-4.6 17.5H162L149.8 132H93.1z" fill="currentColor" />
            </svg>
          </div>
          <p>{content.heroSubtitle}</p>
          {content.socialLinks?.length ? (
            <div className="hero__socials" aria-label={content.socialTitle}>
              {content.socialLinks
                .filter((item) => item.href)
                .map((item) => (
                  <a
                    key={item.label}
                    className="hero__social"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    title={item.label}
                  >
                    <SocialIcon platform={item.platform} />
                    <span>{item.label}</span>
                  </a>
                ))}
            </div>
          ) : null}
          <a className="hero__arrow" href="#about" aria-label="Scroll to content">
            <svg viewBox="0 0 160 82">
              <path d="M156 1.5 79.7 77.5 4 1.8a2.2 2.2 0 0 0-3 0 2.1 2.1 0 0 0 0 3l77.4 77.4a2.2 2.2 0 0 0 3 0v-.3h.3l77.4-77.4a2.4 2.4 0 0 0 .6-1.5c0-.6-.3-1.2-.6-1.6a2.2 2.2 0 0 0-3 .1Z" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

function AboutSection({ content }) {
  return (
    <section className="about-section" id="about">
      <div className="container home-content-shell">
        <div data-animate="fade-up">
          <h2 className="section-title">{content.aboutTitle}</h2>
          <div className="about-prose">
            {content.about.map((paragraph) => (
              <p key={paragraph} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PageHero({ title, intro }) {
  return (
    <section className="page-hero" data-animate="hero">
      <div className="container page-hero__inner">
        <h1>{title}</h1>
        {intro ? <p className="page-hero__intro">{intro}</p> : null}
      </div>
    </section>
  );
}

function PublicationsGrid({ content }) {
  return <PaginatedPublications content={content} />;
}

function ProjectsIntro({ content }) {
  return (
    <section className="section">
      <div className="container">
        <div className="project-placeholder" data-animate="fade-up">
          <h2>{content.projectsSectionTitle}</h2>
          <p>{content.projectsSectionText}</p>
        </div>
      </div>
    </section>
  );
}

function ContactLayout({ content }) {
  return (
    <section className="section">
      <div className="container contact-layout">
        <div className="contact-layout__intro" data-animate="fade-up">
          <h2>{content.contactAsideTitle}</h2>
          <p>{content.contactAsideText}</p>
        </div>
        <div data-animate="fade-up">
          <ContactForm labels={content.form} />
        </div>
      </div>
    </section>
  );
}

function HomeContactSection({ content }) {
  return (
    <section className="section section--contact-home" id="contact">
      <div className="container">
        <div className="section__narrow" data-animate="fade-up">
          <h2 className="section-title">{content.contactTitle}</h2>
          <p className="page-hero__intro page-hero__intro--home">{content.contactIntro}</p>
        </div>
      </div>
      <ContactLayout content={content} />
    </section>
  );
}

export function HomePage({ lang }) {
  const content = siteContent[lang];
  const pathname = lang === "fr" ? "/" : "/en";
  const personJsonLd = buildPersonJsonLd(lang);
  const websiteJsonLd = buildWebsiteJsonLd(lang);

  return (
    <Shell lang={lang} pathname={pathname}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <HomeHero content={content} />
      <AboutSection content={content} />
      <HomeContactSection content={content} />
    </Shell>
  );
}

export function PublicationsPage({ lang, publications }) {
  const content = { ...siteContent[lang], publications };
  const pathname = lang === "fr" ? "/publications" : "/en/publications";
  return (
    <Shell lang={lang} pathname={pathname}>
      <PageHero title={content.publicationsTitle} intro={content.publicationsIntro} />
      <PublicationsGrid content={content} />
    </Shell>
  );
}

export function ProjectsPage({ lang }) {
  const content = siteContent[lang];
  const pathname = lang === "fr" ? "/projets" : "/en/projects";

  return (
    <Shell lang={lang} pathname={pathname}>
      <PageHero title={content.projectsTitle} intro={content.projectsIntro} />
      <ProjectsIntro content={content} />
    </Shell>
  );
}

export function PublicationArticlePage({ lang, article }) {
  const content = siteContent[lang];
  const pathname = article.href;
  const backHref = lang === "fr" ? "/publications" : "/en/publications";
  const articleJsonLd = buildArticleJsonLd(lang, article);

  return (
    <Shell lang={lang} pathname={pathname}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <section className="page-hero page-hero--article" data-animate="hero">
        <div className="container article-hero-shell">
          <Link className="article-back article-back--hero" href={backHref}>
            {content.publicationLayout.back}
          </Link>
          <div className="article-hero article-hero--main">
            <p className="page-hero__eyebrow">{content.publicationLayout.article}</p>
            <div className="publication-card__meta article-hero__meta">
              {article.category ? <span className="publication-chip">{article.category}</span> : null}
              <span>{article.source}</span>
              <span>{article.date}</span>
              <span>{article.readingTime}</span>
              {shouldShowAuthor(article.author, article.source) ? <span>{article.author}</span> : null}
            </div>
            <h1>{article.title}</h1>
            <p className="page-hero__intro article-hero__intro">{article.excerpt}</p>
          </div>
        </div>
      </section>
      <section className="section article-stage">
        <div className="container article-layout">
          {article.image ? (
            <div className="article-cover" data-animate="fade-up">
              <img src={article.image} alt={article.title} />
            </div>
          ) : null}
          <div className="article-content-grid">
            <aside className="article-sidebar" data-animate="fade-up">
              <div className="article-sidebar__card">
                <h2>{content.publicationLayout.sidebarTitle}</h2>
                <p>{content.publicationLayout.sidebarText}</p>
              </div>
              <div className="article-sidebar__card article-sidebar__card--ghost">
                <Link className="article-sidebar__link" href={backHref}>
                  {content.publicationLayout.back}
                </Link>
              </div>
            </aside>
            <div className="article-main-column">
              <article className="article-prose" data-animate="fade-up" dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
              <GiscusComments lang={lang} labels={content.publicationLayout.comments} />
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}

export function ContactPage({ lang }) {
  const content = siteContent[lang];
  const pathname = lang === "fr" ? "/contact" : "/en/contact";
  return (
    <Shell lang={lang} pathname={pathname}>
      <PageHero title={content.contactTitle} intro={content.contactIntro} />
      <ContactLayout content={content} />
    </Shell>
  );
}