import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from './Image';
// import { Image as Img } from 'maas-react-components/dist/Image';

const ImageById = ({ imageId }) => (
   <StaticQuery
     query={graphql`
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
     `}
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
       return <Image imgObject={imgObject}
                     title={caption || filename} />
     }}
   />
 );

 export default ImageById;
