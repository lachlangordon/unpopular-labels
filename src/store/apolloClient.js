import { React } from 'react'
import ApolloClient from 'apollo-client'
import fetch from 'isomorphic-fetch'

import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { CachePersistor } from 'apollo-cache-persist'
import { withClientState } from 'apollo-link-state'

import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
// import { setContext } from 'apollo-link-context'

// import defaults from './defaults'
// import resolvers from './resolvers'
// import typeDefs from './schema'

// require('dotenv').config({
//   path: '../../.env',
// })

const cache = new InMemoryCache()

if (process.browser) {
  const persistor = new CachePersistor({
      cache,
      storage: global.window.localStorage,
      debug: true
  })
  persistor.restore()
}

// setup auth link if applicable

// const httpLink = createHttpLink({
//   uri: `${ process.env.GRAPHQL_URL }`,
// })

// const client = new ApolloClient({
//   link: ApolloLink.from([
//     onError(({ graphQErrors, networkError }) => {
//
//       console.log('onError', graphQLErrors, networkError)
//       if ( graphQLErrors ) {
//           graphQLErrors.map(( message ) => alert(message))
//       }
//
//       if ( networkError ) alert(`[Network error]: ${networkError}`)
//
//     }),
//
//     // withClientState({ resolvers, defaults, cache, schema }),
//
//     httpLink,
//   ]),
//   cache,
// })

// Purge persistor when the store was reset.
// client.onResetStore(() => persistor.purge());
// persistor.purge(); // clear local storage
// AsyncStorage.clear(); // clear local storage

export const client = new ApolloClient({
  uri: 'https://api.maas.museum/graphql',
  fetch,
});
