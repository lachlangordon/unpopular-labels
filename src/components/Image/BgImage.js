import React from 'react';
import PropTypes from 'prop-types';

import Image from './Image';
// import GatsbyImage from 'gatsby-image';

const BgImage = ({
   imgObject,
   title,
   height,
   isMobile,
   overlayColor,
   children,
   className
 }) => {
  console.log(className);
  console.log(height);

  return (
   <div className={ className } style={{ backgroundColor: overlayColor }}>
       <Image isThumb={ !!isMobile }
          imgObject={ imgObject }
          title={title}
       />
       <div className="bg-image__content">
        {children}
       </div>
     </div>
   );
}

BgImage.defaultProps = {
  overlayColor: 'transparent',
  className: 'bg-image',
  isMobile: false,
  children: null,
  height: null,
}

BgImage.propTypes = {
  imgObject: PropTypes.object.isRequired,
  overlayColor: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  height: PropTypes.number,
  title: PropTypes.string,
};

export default BgImage;
