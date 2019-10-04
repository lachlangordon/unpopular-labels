
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

// https://github.com/akiran/react-slick
// import Slider from 'react-slick';

import Slider from 'react-multi-carousel';
import ImageById from '../Image/ImageById';
import SeenIcon from '../SeenIcon/SeenIcon';
import {isObjectSeen, shouldShowSeenIcon} from "../../lib/session";


class ItemSwipe extends Component {

  constructor(props) {
    super(props);
    this.state = { isMoving: false };
  }

  render() {
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
          max: 480,
          min: 0
        },
        items: 3,
        slidesToSlide: 1,
        partialVisibilityGutter: 20
      }
    };
    const { className, deviceType, objectItems } = this.props;
    const clsName = className || 'item-swipe__slider';
    // let sliderEl;
    const goToObjectId = (id) => {
      // send to
      navigate (
        `/object/${id}`,
        { replace: false }
      )
    }

    return (
        <Slider
            infinite
            swipeable
            draggable
            partialVisbile
            slidesToSlide={1}
            deviceType={deviceType}
            containerClass={clsName}
            responsive={responsive}
            beforeChange={() => this.setState({ isMoving: true })}
            afterChange={() => this.setState({ isMoving: false })}
        >
  				{
  					objectItems.map((object, j) => {
  						if (object.object && object.object.mainImage) {
  							 const objectId = object.id;
  							 const imageId = object.object.mainImage.id;
  							 return (
  								 <div key={`item-slide-${j}`} className="item-slide__item-holder">
    								 <a onClick={(e) => {
    								       ( this.state.isMoving ? e.preventDefault() : goToObjectId(objectId) )
    								     }}>
    								   <ImageById size="thumbnail" imageId={imageId} />
    								   { shouldShowSeenIcon() && isObjectSeen(`${objectId}`) && <SeenIcon/> }
    								 </a>
  								 </div>
  							 )
  						}
  					})
  				}
        </Slider>
    );
  }
};

ItemSwipe.propTypes = {
  className: PropTypes.string,
  objectItems: PropTypes.object,
};

export default ItemSwipe;
