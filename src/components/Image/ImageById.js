import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from './Image';
import GatsbyImage from 'gatsby-image';

// fragment to fetch GatsbyImageSharp
import { default_GatsbyImageSharpWithThumb } from '../../queries/fragments';

const ImageById = ({ imageId, size }) => (
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
           isThumb: size == 'thumbnail' ? true : false,
           // src: imgFound.node.serverCropSrc,
           name: caption || filename,
         }
         return <Image { ...imgProp } />;
       } catch (e) {
         console.log(e);
       }

     }}
   />
 );

 export default ImageById;

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
               ...default_GatsbyImageSharpWithThumb
             }
           }
         }
       }
     }
   }
 `;
