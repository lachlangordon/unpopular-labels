import React from 'react';
import ImageByPath from '../Image/ImageByPath';
import PropTypes from 'prop-types';

// two types of banner image: ribbon or themes
// size is the path for different versions banner used - (getBannerSize in lib/utils.js)
const Banner = ({ size, type, themeId, style }) => {
  const className =  ( type === 'themes' ? 'banner-img' : 'ribbon-img' );
  const path = `images/${type}/${size}`;
	return themeId ? (
    <div className={`${className} ${className}__image-holder`} style={style}>
        <ImageByPath path={path} filename={themeId} />
    </div>
	) : null;
}

Banner.propTypes = {
  size: PropTypes.string,
  type: PropTypes.string,
  themeId: PropTypes.number,
  style: PropTypes.object,
};

Banner.defaultProps = {
  type: 'themes',
  size: 'hi-res',
}

export default Banner;
