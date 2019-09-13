import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from './Image';
// import { Image as Img } from 'maas-react-components/dist/Image';

const ImageByPath = ({ directory, filename }) => (
   <StaticQuery
     query={graphql`
       query {
         localImages: allFile (
           filter: {
             sourceInstanceName: { ne: "__PROGRAMMATIC__" }
             extension: { regex: "/(jpg)|(png)|(tif)|(tiff)|(webp)|(jpeg)/" }
           }
           sort: { fields: name, order: ASC }
         ) {
           edges {
             node {
               id
               url
               sourceInstanceName
               publicURL
               name
               relativePath
               relativeDirectory
               absolutePath
               childImageSharp {
                 fluid(maxHeight: 740) {
                   ...GatsbyImageSharpFluid
                   originalName
                 }
               }
             }
           }
         }
       }
     `}
     render={data => {
       let filteredImgs, imageFound = null;

       if (directory) {
         filteredImgs = data.localImages.edges.filter(image => {
           // console.log(directory);
           return image.node.relativeDirectory === `${ directory }`;
         });
       }

       if (filteredImgs) {
         imageFound = filteredImgs.find(image => {
           console.log(image.node);
           return image.node.name == `${filename}`;
         });
       } else {
         imageFound = data.localImages.edges.find(image => image.node.name === `${filename}`);
       }

       if (!imageFound) {
         return null;
       }

       const { id, name, sourceInstanceName } = imageFound.node;
       return <Image imgObject={imageFound.node} title={name} />
     }}
   />
 );

 export default ImageByPath;
