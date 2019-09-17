import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from './Image';
// import GatsbyImage from 'gatsby-image';
// import { Image as Img } from 'maas-react-components/dist/Image';

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
         if (size == 'thumbnail') {
           const thumbnail = imgFound.node.fields.localFile.thumbnail;
           console.log(thumbnail);
           return <img alt={thumbnail.resize.originalName} src={thumbnail.resize.src} />;
         } else {
           const imgObject = imgFound.node.fields.localFile;
           // const cropCenter = imgFound.node.fields.localFile.cropCenter;
           return <Image imgObject={imgObject} title={caption || filename} />;
         }
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
           fields {
             localFile {
               sourceInstanceName
               publicURL
               name
               absolutePath
               thumbnail: childImageSharp {
                 resize(width: 100, height: 100, cropFocus: CENTER) {
                   src
                 }
               }
               childImageSharp {
                 fluid(maxHeight: 740) {
                   ...GatsbyImageSharpFluid
                 }
               }
             }
           }
         }
       }
     }
   }
 `;
