const meta = {
  // Metadata
  // Finds usage in gatsby-config, and SEO component
  siteTitle: process.env.SITE_TITLE,
  siteTitleAlt: `Powerhouse - ${process.env.SITE_TITLE}`,
  siteShortTitle: process.env.SHORT_TITLE,
  siteDescription: process.env.SITE_DESCRIPTION,
  siteHeadline: process.env.SITE_HEADLINE,
  siteUrl: process.env.SITE_SHORT_URL, // No trailing slash!
};

const social = {
  twitter: '@maasmuseum',
  instagram: '@powerhousemuseum',
  facebook: 'powerhousemuseum',
};

const website = {
  ...meta,
  ...social,
  googleAnalyticsID: 'UA-57161575-22',
  author: 'developer@maas.museum',
  // Manifest
  backgroundColor: '#000',
  themeColor: '#fff'
};

module.exports = website;
