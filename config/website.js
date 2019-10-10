const meta = {
  // Metadata
  // Finds usage in gatsby-config, and SEO component
  siteTitle: 'Step Into Paradise',
  siteTitleAlt: 'MAAS - Step Into Paradise',
  siteShortName: 'SIP',
  siteDescription: 'Step into Paradise Gallery Guide.',
  siteHeadline: 'Digital Gallery Guide',
  siteUrl: 'https://maas.museum/guide', // No trailing slash!
};

const social = {
  siteLogo: `${meta.siteUrl}/icons/icon-192x192.png`,
  siteLogoSmall: `${meta.siteUrl}/icons/icon-48x48.png`,
  twitter: '@maasmuseum',
  instagram: '@powerhousemuseum',
  facebook: 'powerhousemuseum',
};

const website = {
  ...meta,
  ...social,
  googleAnalyticsID: 'UA-57161575-20',
  author: 'developer@maas.museum',
  // Manifest
  backgroundColor: '#fff',
  themeColor: '#393939',
};

module.exports = website;
