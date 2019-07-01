
// import ApolloClient, { InMemoryCache } from 'apollo-boost'
// import fetch from 'isomorphic-fetch'
//
// const uri =
//   process.env.NODE_ENV === 'development'
//     ? 'http://localhost:8000/___graphql'
//     : '/graphql'
//
// export const client = new ApolloClient({
//   cache: new InMemoryCache({
//     dataIdFromObject: o => (o._id ? `${o.__typename}:${o._id}` : null),
//   }),
//   fetch,
//   uri,
// })

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'

export const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        )
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }),
    new HttpLink({
      uri: process.env.NODE_ENV === 'development'
          ? 'http://localhost:8000/___graphql'
          : '/graphql',
      credentials: 'same-origin'
    })
  ]),
  cache: new InMemoryCache({
      dataIdFromObject: o => (o._id ? `${o.__typename}:${o._id}` : null)
  }),
  connectToDevTools: process.env.NODE_ENV === 'development' ? true : false,
})
