import React from 'react';
import GatsbyImage from 'gatsby-image';
import PropTypes from 'prop-types';

const BgImage = ({
   fluid,
   title,
   height,
   mobileHeight,
   overlayColor,
   children,
   className
 }) => {

  return (
   <div className="bg-image" style={{ backgroundColor: overlayColor }}>
       <GatsbyImage className="bg-image__gatsby-img" style={{
           height: `${({ height }) => height}`,
          }}
         fluid={fluid}
         title={title}
         height={height}
       />
       <div className="bg-image__content">
        {children}
       </div>
     </div>
   );
}

BgImage.defaultProps = {
  height: null,
  mobileHeight: null,
  overlayColor: 'transparent',
  children: null,
  className: null
}

BgImage.propTypes = {
  fluid: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  height: PropTypes.string,
  mobileHeight: PropTypes.string,
  overlayColor: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string
};

export default BgImage;
