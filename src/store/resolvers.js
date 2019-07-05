// import fetch from 'isomorphic-fetch'
import gql from 'graphql-tag'

const clientResolvers = {
  Mutation: {
    toggleMenu: (_, args, { cache }) => {
      const query = gql`
        {
          showMenu @client
        }
      `
      const current = cache.readQuery({ query })
      const data = {
        showMenu: !current.showMenu,
      }
      cache.writeData({ data })
      return null
    },
    toggleDarkMode: (_, args, { cache }) => {
      const query = gql`
        {
          darkMode @client
        }
      `
      const current = cache.readQuery({ query })
      const data = {
        darkMode: !current.darkMode,
      }
      cache.writeData({ data })
      return null
    },
    updateNetworkStatus: (_, { isConnected }, { cache }) => {
      const data = {
        networkStatus: {
          __typename: 'NetworkStatus',
          isConnected
        },
      };
      cache.writeData({ data })
      return null
    },
  },
}

export default clientResolvers
