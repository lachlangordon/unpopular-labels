/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
 /*
 import React from 'react'
 import { ApolloProvider } from 'react-apollo'
 import { client } from './src/store/apolloClient'
 // import initApollo from './src/store/apolloClient'
 // const client = initApollo()

 export const wrapRootElement = ({ element }) => (
   <ApolloProvider client={client}>{element}</ApolloProvider>
 ) */

// m = module
 const preferDefault = m => (m && m.default) || m;
 exports.wrapRootElement = preferDefault(require(`./src/store/withData`));

 exports.onInitialClientRender = () => {
   window.___MAAS_GUIDE_INITIAL_RENDER_COMPLETE = true;
 }
