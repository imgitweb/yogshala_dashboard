import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import seoConfig from "../../utils/seoConfig";

function SEO() {
  const location = useLocation();
  const path = location.pathname;

  const {
    defaultTitle,
    defaultDescription,
    defaultKeywords,
    defaultImage,
    baseUrl,
    pages,
  } = seoConfig;

  const meta = pages[path] || {};

  const title = meta.title || defaultTitle;
  const description = meta.description || defaultDescription;
  const keywords = meta.keywords || defaultKeywords;
  const image = meta.image || defaultImage;
  const url = `${baseUrl}${path}`;

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}

export default SEO;
