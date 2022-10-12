import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from './Image';

// import noImage from '../../assets/images/no-img-found.svg';
const __regexPattern = /(.jpg)|(.png)|(.tif)|(.tiff)|(.webp)|(.jpeg)/i;

const ImageByPath = ({ imgClassName, path, filename }) => (
   <StaticQuery
     query={localImgQuery}
     render={data => {
       let filteredImgs, imageFound = null;

       if (path) {
         filteredImgs = data.localImages.edges.filter(image => {
           return image.node.relativeDirectory === `${ path }`;
         });
       }

       // console.log( data.localImages.edges );
       let imgname = filename.replace( __regexPattern, '' );

       if (filteredImgs) {
         imageFound = filteredImgs.find(image => {
           return image.node.name === `${imgname}`;
         });
       } else {
         imageFound = data.localImages.edges.find(image => image.node.name === `${imgname}`);
       }

       if (!imageFound) {
         // return <img alt="No image found." src={ noImage }/>;
         return "No image found.";
       }

       const { name } = imageFound.node;
       return <Image className={imgClassName || ''} imgObject={imageFound.node} title={name} />
     }}
   />
 );

 export default ImageByPath;

 export const localImgQuery = graphql`
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
           ...default_GatsbyImageSharp
         }
       }
     }
   }
 `;
