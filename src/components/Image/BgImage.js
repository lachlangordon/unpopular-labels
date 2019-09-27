import React from 'react';
import PropTypes from 'prop-types';

import Image from './Image';
// import GatsbyImage from 'gatsby-image';

const BgImage = ({
   imgObject,
   title,
   height,
   mobileHeight,
   overlayColor,
   children,
   className
 }) => {

  return (
   <div className="bg-image" style={{ backgroundColor: overlayColor }}>
       <Image imgClassName="bg-image__gatsby-img" imgStyle={{
           height: `${({ height }) => height}`,
          }}
          imgObject={ imgObject }
          height={height}
          title={title}
       />
       <div className="bg-image__content">
        {children}
       </div>
     </div>
   );
}

BgImage.defaultProps = {
  height: null,
  overlayColor: 'transparent',
  children: null,
  className: null
}

BgImage.propTypes = {
  imgObject: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  height: PropTypes.string,
  overlayColor: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string
};

export default BgImage;
