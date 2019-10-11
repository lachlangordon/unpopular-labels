let activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";

// const { buildSchema, buildClientSchema } = require('graphql');
// const fs = require('fs');

require('dotenv').config({
  path: '.env',
});

// load website config
const config = require('./config/website');
const postCSSPlugins = require('./postcss-config.js');

module.exports = {
  siteMetadata: {
    title: config.siteTitle,
    siteUrl: config.siteUrl,
    headline: config.siteHeadline,
    description: config.siteDescription,
    twitter: config.twitter,
    instagram: config.instagram,
    facebook: config.facebook,
    author: config.author,
  },
  plugins: [
    /*
     * Gatsby's data processing layer:
     * data from filesystem
     */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      },
    },
    // site manifest
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.siteTitle,
        short_name: config.siteShortName,
        description: config.siteDescription,
        theme_color: config.themeColor,
        background_color: config.backgroundColor,
        start_url: `/`,
        display: `minimal-ui`,
        // This path is relative to the root of the site.
        icon: `src/assets/favicons/MAAS_logo-512x512.png`,
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/lib/typography.js',
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        // postCSS plugin to load lostgrid.css
        // http://lostgrid.org/docs.html
        postCssPlugins: [...postCSSPlugins],
        cssLoaderOptions: {
          camelCase: false,
        }
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: config.googleAnalyticsID,
      }
    },
  ],
};
