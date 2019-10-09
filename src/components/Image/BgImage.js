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

  // if it's mobile minus -4rem, for iPadPros & desktop minus -2rem
  let heightModifier = isMobile ? '4rem' : '2rem';
  return (
   <div className={ className } style={{ backgroundColor: overlayColor }}>
       <Image isThumb={ !!isMobile }
              imgStyle={{ objectFit: 'contain', height: `calc(${height}px - ${heightModifier})` }}
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
