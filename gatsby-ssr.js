/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
 import React from 'react'
 import { ApolloProvider } from 'react-apollo'
 import { client } from './src/store/apolloClient'

 export const wrapRootElement = ({ element }) => (
   <ApolloProvider client={client}>{element}</ApolloProvider>
 )
