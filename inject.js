(() => {
  "use strict";

  const TARGET_SELECTOR = ".siteMap-aboutUs-container";
  const ARTICLE_SELECTOR = "#pgbet222-article";
  const SOURCE_SELECTOR = "pre";
  const CONTENT_HOST_SELECTORS = [
    ".sitemap-aboutUs-description-pre",
    ".sitemap-aboutUs-description",
    ".expand-collapse-container",
  ];
  const STYLE_ID = "pgbet222-inject-layout";
  const INJECTED_ATTRIBUTE = "data-pgbet222-article-injected";

  const COMPACT_LAYOUT_CSS = `
    .siteMap-aboutUs-container .sitemap-aboutUs-description-pre {
      margin: 0;
      white-space: normal;
      font: inherit;
    }

    .siteMap-aboutUs-container #pgbet222-article {
      box-sizing: border-box;
      width: 100%;
      max-width: none;
      margin: 0;
      padding: 16px 0;
      background: #ffffff !important;
      color: #1f2937 !important;
      line-height: 1.65;
      white-space: normal !important;
    }

    .siteMap-aboutUs-container #pgbet222-article h1,
    .siteMap-aboutUs-container #pgbet222-article h2,
    .siteMap-aboutUs-container #pgbet222-article h3,
    .siteMap-aboutUs-container #pgbet222-article p,
    .siteMap-aboutUs-container #pgbet222-article li,
    .siteMap-aboutUs-container #pgbet222-article th,
    .siteMap-aboutUs-container #pgbet222-article td,
    .siteMap-aboutUs-container #pgbet222-article summary,
    .siteMap-aboutUs-container #pgbet222-article strong {
      color: #1f2937 !important;
    }

    .siteMap-aboutUs-container #pgbet222-article a {
      color: #174ea6 !important;
    }

    .siteMap-aboutUs-container #pgbet222-article h1 {
      margin: 0 0 14px;
      font-size: clamp(24px, 3vw, 34px);
      line-height: 1.35;
    }

    .siteMap-aboutUs-container #pgbet222-article h2 {
      margin: 0 0 10px;
      font-size: clamp(20px, 2.4vw, 26px);
      line-height: 1.4;
    }

    .siteMap-aboutUs-container #pgbet222-article h3 {
      margin: 18px 0 8px;
      line-height: 1.45;
    }

    .siteMap-aboutUs-container #pgbet222-article p {
      margin: 0 0 12px;
    }

    .siteMap-aboutUs-container #pgbet222-article ul,
    .siteMap-aboutUs-container #pgbet222-article ol {
      margin: 10px 0 16px;
      padding-inline-start: 24px;
    }

    .siteMap-aboutUs-container #pgbet222-article li {
      margin-bottom: 6px;
    }

    .siteMap-aboutUs-container #pgbet222-article .pgbet222-section {
      margin-top: 24px;
    }

    .siteMap-aboutUs-container #pgbet222-article .pgbet222-toc {
      margin: 20px 0 24px;
      padding: 16px 18px;
    }

    .siteMap-aboutUs-container #pgbet222-article .pgbet222-toc ol,
    .siteMap-aboutUs-container #pgbet222-article .pgbet222-toc ul {
      margin-bottom: 8px;
    }

    .siteMap-aboutUs-container #pgbet222-article .pgbet222-table-wrap {
      margin: 12px 0 20px;
    }

    .siteMap-aboutUs-container #pgbet222-article th,
    .siteMap-aboutUs-container #pgbet222-article td {
      padding: 10px 12px;
    }

    .siteMap-aboutUs-container #pgbet222-article .pgbet222-faq-item {
      margin: 10px 0;
      padding: 12px 14px;
    }

    .siteMap-aboutUs-container #pgbet222-article .pgbet222-faq-item p {
      margin: 8px 0 0;
    }

    .siteMap-aboutUs-container #pgbet222-article > :last-child,
    .siteMap-aboutUs-container #pgbet222-article > :last-child > :last-child {
      margin-bottom: 0;
    }

    @media (max-width: 640px) {
      .siteMap-aboutUs-container #pgbet222-article {
        padding: 12px 0;
        font-size: 15px;
        line-height: 1.6;
      }

      .siteMap-aboutUs-container #pgbet222-article .pgbet222-section {
        margin-top: 20px;
      }

      .siteMap-aboutUs-container #pgbet222-article .pgbet222-toc {
        margin: 16px 0 20px;
        padding: 14px;
      }
    }
  `;

  let articleMarkup = "";
  let scheduled = false;

  function findArticleMarkup() {
    for (const source of document.querySelectorAll(SOURCE_SELECTOR)) {
      const renderedArticle = source.querySelector(ARTICLE_SELECTOR);

      if (renderedArticle) {
        return renderedArticle.outerHTML;
      }

      const markup = source.textContent?.trim() ?? "";
      const template = document.createElement("template");
      template.innerHTML = markup;

      const article = template.content.querySelector(ARTICLE_SELECTOR);

      if (article) {
        // Simpan seluruh artikel, termasuk semua section, tabel, list, dan FAQ.
        return article.outerHTML;
      }
    }

    return "";
  }

  function createArticle() {
    if (!articleMarkup) {
      articleMarkup = findArticleMarkup();
    }

    if (!articleMarkup) {
      return null;
    }

    const template = document.createElement("template");
    template.innerHTML = articleMarkup;
    return template.content.querySelector(ARTICLE_SELECTOR);
  }

  function ensureCompactLayout() {
    let style = document.getElementById(STYLE_ID);

    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      document.head.append(style);
    }

    // Timpa versi CSS lama ketika injector dijalankan ulang tanpa refresh.
    style.textContent = COMPACT_LAYOUT_CSS;
  }

  function injectArticle() {
    const target = document.querySelector(TARGET_SELECTOR);

    if (!target) {
      return false;
    }

    const currentArticle = target.querySelector(ARTICLE_SELECTOR);

    if (currentArticle) {
      target.setAttribute(INJECTED_ATTRIBUTE, "true");
      return true;
    }

    const article = createArticle();

    if (!article) {
      console.warn(
        `[PGBET222 injector] Artikel ${ARTICLE_SELECTOR} tidak ditemukan di elemen <pre>.`,
      );
      return false;
    }

    const contentHost = CONTENT_HOST_SELECTORS.map((selector) =>
      target.querySelector(selector),
    ).find(Boolean);

    if (contentHost) {
      // Hanya ubah blok deskripsi. .sitemap-subheader-row tetap utuh.
      contentHost.replaceChildren(article);
    } else {
      // Fallback non-destruktif: jangan pernah mengganti seluruh container.
      target.append(article);
    }

    target.setAttribute(INJECTED_ATTRIBUTE, "true");
    return true;
  }

  function scheduleInjection() {
    if (scheduled) {
      return;
    }

    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      injectArticle();
    });
  }

  function start() {
    // Simpan markup sebelum aplikasi SPA berpotensi mengubah DOM awal.
    articleMarkup = findArticleMarkup();
    ensureCompactLayout();
    injectArticle();

    // Container dibuat oleh React dan dapat dibuat ulang saat navigasi/rerender.
    const observer = new MutationObserver(scheduleInjection);
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
