
import React from 'react';
import { Link } from 'gatsby';

// https://github.com/voronianski/react-swipe
// import ReactSwipe from 'react-swipe';

// https://github.com/akiran/react-slick
import Slider from 'react-slick';

// import ItemTile from '../ItemTile/ItemTile';
import ImageById from '../Image/ImageById';
import SeenIcon from '../SeenIcon/SeenIcon';
import QuoteIcon from '../QuoteIcon/QuoteIcon';
import {isObjectSeen, shouldShowSeenIcon} from "../../lib/session";

const ItemSwipe = ({ relatedItems }) => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  let sliderEl;
  return (
    <div>
      <Slider { ...settings }
      >
				{
					relatedItems.map((object, j) => {
						if (object.object) {
							 return object.object.mainImage && (
								 <div key={`item-tile-${j}`} className="item-tile__image-holder">
									 <Link to={'/object/' + object.id}>
									 	 <ImageById size="thumbnail" imageId={object.object.mainImage.id} />
									 	 {/* <img size="thumbnail" src={object.object.mainImage.thumbnailURL} width="70" height="70"/> */}
                     <div className="item-tile__icon-holder">
                       { shouldShowSeenIcon() && isObjectSeen(object.id.toString()) && <SeenIcon/> }
                       { object.notes3 !== null && <QuoteIcon/>}
                     </div>
									 </Link>
								 </div>
							 )
						}
					})
				}

      </Slider>
      {/*
        <button onClick={() => sliderEl.prev()}>Previous</button>
        <button onClick={() => sliderEl.next()}>Next</button>
      */}
    </div>
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
