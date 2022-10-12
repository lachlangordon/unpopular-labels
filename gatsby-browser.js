/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// m = module
 const preferDefault = m => (m && m.default) || m;
 exports.wrapRootElement = preferDefault(require(`./src/providers/currentAlbum`));

 exports.onInitialClientRender = () => {
   window.___MAAS_GUIDE_INITIAL_RENDER_COMPLETE = true;
 }
