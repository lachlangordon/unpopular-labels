const { GraphQLClient } = require(`graphql-request`)

require('dotenv').config({
  path: '.env',
});

/**
 * Request a query from a client.
 */
const GQLClientWrapper = async ( query ) => {
  console.log('inside GQL wrapper')
  // used to populate node narrative data on starters
  const client = process.env.GRAPHQL_URL
    ? new GraphQLClient(`${ process.env.GRAPHQL_URL }`)
    : null

  return await client.request(query)

  // return new Promise((resolve, reject) => {
  //     client.request(query, function(error, response, data) {
  //           console.log(query)
  //            // check errors because graphql doesn't throw an error
  //           if (error) {
  //             console.log('hey error')
  //             throw error
  //             reject(error)
  //           }
  //
  //           console.log(data && 'hey not error')
  //
  //           const content = JSON.parse(data)
  //           resolve(content)
  //         })
  //    })
}

/**
 * Request a query from a Gatsby GraphQL Server.
 */
const GQLServerWrapper = promise =>
  promise.then( result => {
    if ( result.errors ) {
      throw result.errors
    }
    return result
  })

/**
 * Print an error from a GraphQL client
 * check errors because graphql doesn't throw an error
 */
const printGraphQLError = e => {
  if (e.response && e.response.errors)
    console.error(e.response.errors)

  if (e.request) console.error(e.request)
}

module.exports = { GQLClientWrapper, GQLServerWrapper, printGraphQLError }
