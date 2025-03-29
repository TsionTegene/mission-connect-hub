
import { Helmet } from "react-helmet";

type SEOProps = {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  twitterCard?: "summary" | "summary_large_image";
  noIndex?: boolean;
};

const defaultDescription = "Mulu Wongel Church - Strengthening communities through faith, service, and compassion.";
const defaultOgImage = "/og-image.png";
const siteName = "Mulu Wongel Church";
const siteUrl = "https://muluwongel.org"; // Replace with your actual domain

const SEO = ({
  title,
  description = defaultDescription,
  canonical,
  ogImage = defaultOgImage,
  ogType = "website",
  twitterCard = "summary_large_image",
  noIndex = false,
}: SEOProps) => {
  const finalTitle = title ? `${title} | ${siteName}` : siteName;
  const finalCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const finalOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={finalCanonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalOgImage} />
      
      {/* Indexing control */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Structured data for organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "http://schema.org",
          "@type": "Organization",
          "name": siteName,
          "url": siteUrl,
          "logo": `${siteUrl}/logo.png`,
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-234-567-8900",
            "contactType": "customer service"
          },
          "sameAs": [
            "https://www.facebook.com/muluwongel",
            "https://twitter.com/muluwongel",
            "https://www.instagram.com/muluwongel"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
