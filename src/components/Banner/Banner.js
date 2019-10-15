import React from 'react';
import ImageByPath from '../Image/ImageByPath';
import PropTypes from 'prop-types';

// two types of banner image: ribbon or themes
const Banner = ({ size, type, themeId, style }) => {

  const className =  ( type === 'themes' ? 'banner-img' : 'ribbon-img' );
  const path = `images/${type}/${size}`;
	return themeId ? (
    <div className={`${className} ${className}__image-holder`} style={style}>
        <ImageByPath path={path} filename={themeId} />
    </div>
	) : null;
}

/*
Banner.propTypes = {
  title: PropTypes.string,
  summary: PropTypes.string,
  subtitle: PropTypes.string,
  url: PropTypes.string,
  imageUrl: PropTypes.string,
  type: PropTypes.string,
  isBreakout: PropTypes.bool, // NOTE: WIP, may just create a new component
  className: PropTypes.string,
  imageTag: PropTypes.string,
};
*/

Banner.defaultProps = {
  type: 'themes',
  size: 'hi-res',
}

export default Banner;
