
import React from 'react';
import { Link } from 'gatsby';

// https://github.com/voronianski/react-swipe
// import ReactSwipe from 'react-swipe';

// https://github.com/akiran/react-slick
import Slider from 'react-slick';

// import ItemTile from '../ItemTile/ItemTile';
import ImageById from '../Image/ImageById';

const ItemSwipe = ({ relatedItems }) => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1
  };

  let sliderEl;
  return (
    <div>
      <Slider { ...settings }
      >
				{
					relatedItems.map((object, j) => {
						if (object.object) {
								// console.log(object.object.displayTitle);
							 return object.object.mainImage && (
								 <div key={`item-tile-${j}`} >
									 <Link to={'/object/' + object.id}>
									 	 <ImageById size="thumbnail" imageId={object.object.mainImage.id} />
									 	 {/* <img size="thumbnail" src={object.object.mainImage.thumbnailURL} width="70" height="70"/> */}

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
