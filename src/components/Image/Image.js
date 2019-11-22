import React, { Component } from 'react';
import GatsbyImage from 'gatsby-image';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
// import { Image as Img } from 'maas-react-components/dist/Image';

const hasThumb = _img =>
  _img.hasOwnProperty('thumbnail');

const isValidImage = _img =>
  _img.hasOwnProperty('src') && _img.src !== '';

const getFluid = _img =>
  _img.hasOwnProperty('childImageSharp') ? _img.childImageSharp.fluid : _img.fluid;

const getFixed = _img =>
  _img.hasOwnProperty('childImageSharp') ? _img.childImageSharp.fixed : _img.fixed;

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 */

class Image extends Component {

  // _image = gatsby imageNode
  getImage = (_image, _props) => {
    const { defImgMode, noImageContent } = this.props;
    const { imgClassName, imgStyle, name, alt, width, height } = _props;

    // When there is only src no GatsbyImage
    // MAAS image doesn't work, use std img
    if ( isEmpty(_image) && isValidImage(_props) ) {
      return <img {..._props} />
    }

    // GatsbyImage
    let GatsbyImgProp = null;
    if ( defImgMode === 'fluid' && !isEmpty( getFluid(_image) )) {
      GatsbyImgProp = {
        name,
        width,
        height,
        title: alt,
        alt,
        style: imgStyle,
        className: imgClassName,
        fluid: getFluid(_image),
      };
    } else if ( defImgMode === 'fixed' && !isEmpty( getFixed(_image) )) {
      GatsbyImgProp = {
        name,
        width,
        height,
        title: alt,
        alt,
        style: imgStyle,
        className: imgClassName,
        fixed: getFixed(_image),
      };
    }
    
    if (GatsbyImgProp) {

      return (
          <GatsbyImage {...GatsbyImgProp} Tag="div"/>
      )
    }

    return noImageContent;
	}

  render() {
    const { isThumb, imgObject } = this.props;

    // dont forget to append props
    let imgProps = {
      imgStyle:  this.props.imgStyle || {},
      imgClassName:  this.props.imgClassName || '',
      name: imgObject ? imgObject.id : this.props.name,
      src: imgObject ? imgObject.url : this.props.src, // get valid local url
      alt : this.props.alt,
      width: this.props.width,
      height: this.props.height,
    };

    // todo: for thumbnail - set default width & height
    return (
          this.getImage( !!isThumb && hasThumb(imgObject) ? imgObject.thumbnail : imgObject, imgProps)
    );
  }
}

Image.defaultProps = {
  // def gatsby image mode: 'fluid' or 'fixed'
  defImgMode: 'fluid',
  noImageContent: (<i className='fa fa-picture-o'></i>),
}

Image.propTypes = {
	imgClassName: PropTypes.string,
  imgStyle: PropTypes.object,
	className: PropTypes.string,
	src: PropTypes.string,
	alt: PropTypes.string,
	width: PropTypes.number,
	height: PropTypes.number,
  // gatsby image mode
	defImgMode: PropTypes.string,
	noImageContent: PropTypes.object || PropTypes.string,
};

export default Image;
