import React from 'react';
import ImageByPath from '../Image/ImageByPath';

const Banner = ({ size, themeId, style }) => {
	return (
    <div className="banner-img" style={style}>
				<div className="banner-img__image-holder">
					<ImageByPath directory={`images/themes/` + size } filename={themeId} />
				</div>
    </div>
	);
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

Banner.default = {
  isBreakout: false,
}*/

export default Banner;
