import React from 'react';
// import GatsbyImage from 'gatsby-image';
// import PropTypes from 'prop-types';

import Image from './Image';

const ImgGallery = edges => {

  return (
    <div className="img-gallery">
      <div className="img-gallery__col-grid">
        {
          edges.images.map((image, index) => {
            const imageObject = image.node.fields.localFile;
            return (
              <div className="img-gallery__col-grid--item" key={index}>
                <Image
                  className="img-gallery__col-grid--item-image"
                  // imageUrl={cropCenter.resize.src || ''}
                  imgObject={imageObject}
                  title="image-title"
                />
              </div>
            )
        })
      }
      </div>
    </div>
   );
}

export default ImgGallery;
