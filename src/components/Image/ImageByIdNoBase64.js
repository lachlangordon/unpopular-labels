import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from './Image';

const ImageByIdNoBase64 = ({ imageId, size, alt }) => {
  return (
    <StaticQuery
      query={allSetImages_noBase64}
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
          const { filename, caption } = imgFound.node;
          const imgProp = {
            imgObject: imgFound.node.fields.localTileFile,
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
  )
};

export default ImageByIdNoBase64;

export const allSetImages_noBase64 = graphql`
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
                        localTileFile {
                            ...default_GatsbyImageSharpWithThumbNoBase64
                        }
                    }
                }
            }
        }
    }
`;
