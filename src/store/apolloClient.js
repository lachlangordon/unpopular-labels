/**
 * Apollo client to handle client (dynamic) queries and local state
 *
 */

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { CachePersistor } from 'apollo-cache-persist';
import { withClientState } from 'apollo-link-state';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

// import fetch from 'isomorphic-fetch'
import gql from 'graphql-tag'

// import defaults from './defaults'

// if ( !process.browser ) {
//   global.fetch = fetch
// }

const debug = process.env.NODE_ENV === 'development' ? true : false ;

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
})

// { dataIdFromObject: o => (o.id ? `${o.__typename}:${o.id}` : null) }
const cache = new InMemoryCache();

if (process.browser) {
  const persistor = new CachePersistor({
    cache,
    storage: global.window.localStorage,
    debug: debug,
  });
  persistor.restore();
}

const resolvers = {
  Mutation: {
    toggleMenu: (_, args, { cache }) => {
      const query = gql`
        {
          showMenu @client
        }
      `;
      const current = cache.readQuery({ query });
      const data = {
        showMenu: !current.showMenu,
      };
      cache.writeData({ data });
      return null;
    },
    toggleDarkMode: (_, args, { cache }) => {
      const query = gql`
        {
          darkMode @client
        }
      `;
      const current = cache.readQuery({ query });
      const data = {
        darkMode: !current.darkMode,
      };
      cache.writeData({ data });
      return null;
    },
    updateNetworkStatus: (_, { isConnected }, { cache }) => {
      const data = {
        networkStatus: {
          __typename: 'NetworkStatus',
          isConnected
        },
      };
      cache.writeData({ data });
      return null;
    },
  },
}

const defaults = {
  fontSize: 1,
  fontContrast: false,
  showMenu: false,
  darkMode: false,
  NetworkStatus: false,
  currentAlbum: [],
};

const stateLink = withClientState({
  cache,
  resolvers,
  defaults,
});

const httpLink = new HttpLink({
  uri: process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000/___graphql'
      : '/graphql',
  credentials: 'same-origin'
});

export const client = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    stateLink,
    httpLink,
  ]),
  cache,
  connectToDevTools: true,
});

// Purge persistor when the store was reset.
// client.onResetStore((); => persistor.purge())
// persistor.purge(); // clear local storage
// AsyncStorage.clear(); // clear local storage
