import React, { Component } from 'react';
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
       const setImg = data.allSetImage.edges.find(
         edge => {
           return ( parseInt(edge.node.id) === parseInt(imageId) );
         }
       )
       if (!setImg) {
         return null;
       }
       const { id, filename, caption } = setImg.node;
       const imgObject = setImg.node.fields.localFile;
       return <Image imgObject={imgObject}
                     title={caption || filename} />
     }}
   />
 );

 export default ImageById;
