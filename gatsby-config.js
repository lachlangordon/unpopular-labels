let activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";

// const { buildSchema, buildClientSchema } = require('graphql');
// const fs = require('fs');

require('dotenv').config({
  path: '.env',
});

// load website config
const config = require('./config/website')

console.log(`Gatsby in : '${activeEnv}' mode.`)
console.log(`Using environment config: '${ process.env.GRAPHQL_URL }'`)

module.exports = {
  siteMetadata: {
    title: config.siteTitle,
    description: config.siteDescription,
    twitter: config.twitter,
    instagram: config.instagram,
    facebook: config.facebook,
    author: `developer@maas.museum`,
  },
  plugins: [
    /*
     * Gatsby's data processing layer:
     * data from filesystem, and MAAS API (GraphQL).
     */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        // This type will contain remote schema Query type
        typeName: `MaasAPI`,
        // Url to query from
        url: `${ process.env.GRAPHQL_URL }`,
        // This is field under which it's accessible
        fieldName: `maas`,
        // refetchInterval: 60,
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
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    'gatsby-plugin-sass',
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
