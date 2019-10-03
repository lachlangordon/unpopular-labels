
import React, { Component } from 'react';
import { Link } from 'gatsby';

// https://github.com/akiran/react-slick
// import Slider from 'react-slick';

import Slider from 'react-multi-carousel';
import ImageById from '../Image/ImageById';
import SeenIcon from '../SeenIcon/SeenIcon';
import {isObjectSeen, shouldShowSeenIcon} from "../../lib/session";

const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024
    },
    items: 5,
    slidesToSlide: 1,
    partialVisibilityGutter: 40
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 768
    },
    items: 4,
    slidesToSlide: 1,
    partialVisibilityGutter: 30
  },
  mobile: {
    breakpoint: {
      max: 320,
      min: 0
    },
    items: 3,
    slidesToSlide: 1,
    partialVisibilityGutter: 30
  }
};

const ItemSwipe = ({ className, deviceType, relatedItems }) => {
  const handleOnDragStart = e => e.preventDefault();

  const clsName = className || 'item-swipe__slider';
  let sliderEl;
  return (
      <Slider
          infinite
          swipeable
          draggable
          partialVisbile
          slidesToSlide={1}
          deviceType={deviceType}
          responsive={responsive}
          containerClass="object-page__related-slider"
      >
				{
					relatedItems.map((object, j) => {
						if (object.object) {
							 return object.object.mainImage && (
								 <div key={`item-tile-${j}`} className="item-tile__image-holder">
									 <Link to={'/object/' + object.id}>
									 	 <ImageById size="thumbnail" imageId={object.object.mainImage.id} />
									 	 {/* <img size="thumbnail" src={object.object.mainImage.thumbnailURL} width="70" height="70"/> */}
                     { shouldShowSeenIcon() && isObjectSeen(object.id.toString()) && <SeenIcon/> }
									 </Link>
								 </div>
							 )
						}
					})
				}
      </Slider>
  );
};
/*

ItemTile.propTypes = {
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

ItemTile.default = {
  isBreakout: false,
}*/

export default ItemSwipe;
