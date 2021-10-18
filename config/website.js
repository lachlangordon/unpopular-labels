const meta = {
  // Metadata
  // Finds usage in gatsby-config, and SEO component
  siteTitle: 'Robert Rosen: Glitterati',
  siteTitleAlt: 'Powerhouse - Robert Rosen: Glitterati',
  siteShortName: 'Robert Rosen',
  siteDescription: 'Robert Rosen Exhibition Gallery Guide.',
  siteHeadline: 'Digital Gallery Guide',
  siteUrl: 'https://ma.as/rosen', // No trailing slash!
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
  themeColor: '#fff',
};

module.exports = website;
