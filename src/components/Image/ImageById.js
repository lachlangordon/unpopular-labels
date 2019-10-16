import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from './Image';

const ImageById = ({ imageId, size, alt }) => (
   <StaticQuery
     query={allSetImages}
     render={data => {
       const imgFound = data.allSetImage.edges.find(
         image => {
           return ( parseInt(image.node.id) === parseInt(imageId) );
         }
       )

       if (!imgFound) {
         return null;
       }

       try {
         const { id, filename, caption } = imgFound.node;
         const imgProp = {
           imgObject: imgFound.node.fields.localFile,
           isThumb: size === 'thumbnail' ? true : false,
           // src: imgFound.node.serverCropSrc,
           name: caption || filename,
           alt: alt,
         }
         return <Image { ...imgProp } />;
       } catch (e) {
         console.log(e);
       }

     }}
   />
 );

 export default ImageById;

// query with thumbnails
// ...default_GatsbyImageSharpWithThumb
 export const allSetImages = graphql`
   query {
     allSetImage {
       edges {
         node {
           id
           caption
           filename
           thumbnailSrc
           serverCropSrc
           fields {
             localFile {
               ...default_GatsbyImageSharp
             }
           }
         }
       }
     }
   }
 `;
