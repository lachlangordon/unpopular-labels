import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from './Image';
// import { Image as Img } from 'maas-react-components/dist/Image';

const ImageById = ({ imageId }) => (
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

       const { id, filename, caption } = imgFound.node;
       const imgObject = imgFound.node.fields.localFile;
       const cropCenter = imgFound.node.fields.localFile.cropCenter;
       return <Image
                  imgObject={imgObject}
                  // src={cropCenter.resize.src || ''}
                  title={caption || filename} />
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
               cropCenter: childImageSharp {
                 resize(width: 300, height: 300, cropFocus: CENTER) {
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
