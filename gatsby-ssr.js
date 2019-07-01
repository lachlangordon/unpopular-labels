/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
 /*
 import React from 'react'
 import { ApolloProvider } from 'react-apollo'
 import { client } from './src/store/apolloClient'
 // import initApollo from './src/store/apolloClient'
 // const client = initApollo()

 export const wrapRootElement = ({ element }) => (
   <ApolloProvider client={client}>{element}</ApolloProvider>
 )*/

 require(`isomorphic-fetch`)

 const preferDefault = m => (m && m.default) || m
 exports.wrapRootElement = preferDefault(require(`./src/store/withData`))
