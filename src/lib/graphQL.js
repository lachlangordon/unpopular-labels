const { GraphQLClient } = require(`graphql-request`);

require('dotenv').config({
  path: '.env',
});

/**
 * Request a query from a Gatsby GraphQL Server.
 */
const GQLGatsbyWrapper = promise =>
  promise.then( result => {
    if ( result.errors ) {
      throw result.errors;
    }
    return result;
  });


/**
 * Request a query from a client.
 */
const GQLClientWrapper = async ( query ) => {
  // used to populate node narrative data on starters
  const client = process.env.GRAPHQL_URL
    ? new GraphQLClient(`${ process.env.GRAPHQL_URL }`)
    : null ;

  return await client.request(query);
}

/**
 * Print an error from a GraphQL client
 * check errors because graphql doesn't throw an error
 */
const printGraphQLError = e => {
  if (e.response && e.response.errors)
    console.error(e.response.errors);

  if (e.request) console.error(e.request);
}

module.exports = { GQLGatsbyWrapper, GQLClientWrapper, printGraphQLError };
