const meta = {
  // Metadata
  // Finds usage in gatsby-config, and SEO component
  siteTitle: 'Step Into Paradise',
  siteTitleAlt: 'MAAS - Step Into Paradise',
  siteShortName: 'SIP',
  siteDescription: 'Step into Paradise Gallery Guide.',
  siteHeadline: 'Digital Gallery Guide',
  siteUrl: 'https://sip-guide.maas.museum', // No trailing slash!
}

const social = {
  siteLogo: `${meta.siteUrl}/social/avatar.png`,
  siteLogoSmall: `${meta.siteUrl}/social/avatar_small.png`,
  siteBanner: `${meta.siteUrl}/social/banner_`, // Locale ending + filetype gets added in SEO component
  // siteBannerWidth: '776',
  // siteBannerHeight: '382',
  twitter: '@maasmuseum',
  instagram: '@powerhousemuseum',
  facebook: 'powerhousemuseum',
}

const website = {
  ...meta,
  ...social,
  // googleAnalyticsID: 'UA-47519312-1',

  // Manifest
  backgroundColor: '#663399',
  themeColor: '#663399',
}

module.exports = website
