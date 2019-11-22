
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

// https://github.com/YIZHUANG/react-multi-carousel
import Slider from 'react-multi-carousel';
// import ImageById from '../Image/ImageById';
// import ImageByIdNoBase64 from '../Image/ImageByIdNoBase64';
// import MaasImage from '../Image/MaasImage';
import Image from '../Image/Image';
import SeenIcon from '../Icons/SeenIcon';
import QuoteIcon from '../Icons/QuoteIcon';
import {buildThumborImageUrl} from "../../lib/utils";
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

    const itemSwipeClass = className || 'item-swipe__slider';
    // let sliderEl;
    const goToObjectId = (id) => {
      // send to
      navigate (
        `/object/${id}`,
        { replace: false }
      )
    };

    return (
        <Slider
            infinite={objectItems.length > 1}
            swipeable
            draggable
            partialVisbile={objectItems.length > 1}
            slidesToSlide={1}
            deviceType={deviceType}
            responsive={responsive}
            containerClass={itemSwipeClass}
            beforeChange={() => this.setState({ isMoving: true })}
            afterChange={() => this.setState({ isMoving: false })}
        >
  				{
  					objectItems.map((object, j) => {
  						if (object.object && object.object.mainImage) {
               const objectId = object.id;
               const imageId = object.object.mainImage.id;
               // object.object.mainImage.serverCropURL
               const thumborSrc = buildThumborImageUrl(imageId, { width: 400, height: 400, smart: true });
               const hasQuote = object.notes3 !== null ? true : false;
               const showIconDiv = hasQuote || (shouldShowSeenIcon() && isObjectSeen(objectId));
               return (
                   <a className="item-slide__item-holder" key={`item-slide-${j}`} onClick={(e) => {
                         ( this.state.isMoving ? e.preventDefault() : goToObjectId(objectId) )
                       }}>
                     <Image className="object-swipe__image" size="thumbnail" src={thumborSrc} />
                     {
                       showIconDiv && (
                         <div className="item-slide__icon-holder">
                           { shouldShowSeenIcon() && isObjectSeen(`${objectId}`) && <SeenIcon/> }
                           { hasQuote && <QuoteIcon/> }
                         </div>
                       )
                     }
                   </a>
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
  objectItems: PropTypes.array,
};

export default ItemSwipe;
