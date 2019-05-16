let activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";

// console.log(`Using environment config: '${activeEnv}'`)
// const fs = require('fs');
// const { buildSchema, buildClientSchema } = require('graphql');

require('dotenv').config({
  path: '.env',
});

console.log(`Using environment config: '${ process.env.GRAPHQL_URL }'`)

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      },
    },
    // Simple config, passing URL
    {
      resolve: 'gatsby-source-graphql',
      options: {
        // This type will contain remote schema Query type
        typeName: `MaasAPI`,
        // Url to query from
        url: `${ process.env.GRAPHQL_URL }`,
        // This is field under which it's accessible
        fieldName: `maas`,
        refetchInterval: 60,

        // createSchema: async () => {
        //     const json = JSON.parse(
        //       fs.readFileSync(`${__dirname}/introspection.json`)
        //     )
        //     return buildClientSchema(json.data)
        // },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-sass',
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
