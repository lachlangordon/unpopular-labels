import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MaasImage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoaded: false,
			isImageError: !this.props.src ? true : false,
		}
	}

	componentDidMount() {
		// Client side script may load after image loads, therefore it won't trigger
		// handleImageLoad, so we gotta add a check here.
		// http://stackoverflow.com/questions/39777833/image-onload-event-in-isomorphic-react-register-event-after-image-is-loaded
    if (this.props.src && this.node.complete) {
      this.handleImageLoad();
    }
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.src !== nextProps.src) {
			this.setState({
				isLoaded: false,
			})
		}
	}

	handleImageLoad = () => {
		// TODO: Chrome doesn't seem to update this onLoad.
		this.setState({
			isLoaded: true,
		});
	}

	handleImageError = (event) => {
		event.target.src = '';
		this.setState({
			isImageError: true,
		})
	}

	render() {
		let imageStyle = {
			paddingTop: this.props.aspectRatio && `${100/this.props.aspectRatio}%`,
			...this.props.style,
		}

		let pictureSource = this.props.sources && this.props.sources.map((source, i) => {
			return (
				<source
					key={`pictureSource-${i}`}
					media={source.media}
					srcSet={source.srcSet}
				/>
			)
		});
		let image = (
			<img
				src={this.props.src}
				alt={this.props.alt}
				onClick={this.props.onClick}
				onLoad={this.handleImageLoad}
				onError={this.props.isHandleImageError && this.handleImageError}
				width={this.props.width}
				height={this.props.height}
				srcSet={this.props.srcSet}
				sizes={this.props.sizes}
				ref={node => this.node = node}
			/>
		);

    let classNames = ['maas-image'];
    if (this.state.isLoaded) { classNames.push('is-loaded'); }
    if (!this.state.isLoaded) { classNames.push('is-loading'); }
    if (this.state.isImageError) { classNames.push('is-image-error'); }
    if (this.props.aspectRatio) { classNames.push('has-aspect-ratio'); }

		return (
			<div
				className={classNames.join(' ')}
				style={imageStyle}
				role={this.props.role}
				tabIndex={this.props.tabIndex}
			>
				{ this.props.src && (
          pictureSource ? (
            <picture>
              {pictureSource}
              {image}
            </picture>
          ) : image
				)

				}
				{
					this.state.isImageError && (
						<div className="maas-image__status">
							{this.props.noImageContent}
						</div>
					)
				}
				{
					this.props.showLoader && !this.state.isLoaded && !this.state.isImageError && (
						<div className="maas-image__status">
							{this.props.loadingContent}
						</div>
					)
				}
   		</div>
		);
	}

}

MaasImage.defaultProps = {
  showLoader: false,
  noImageContent: (<i className="fa fa-picture-o"></i>),
  loadingContent: (<i className="fa fa-circle-o-notch fa-spin"></i>),
  isHandleImageError: true,
}

MaasImage.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  aspectRatio: PropTypes.number, // Width / Height
  srcSet: PropTypes.string,
  sizes: PropTypes.string,
  showLoader: PropTypes.bool,
  // sources: PropTypes.array(PropTypes.shape({
  // 	media: PropTypes.string,
  // 	srcSet: PropTypes.string,
  // })),
  noImageContent: PropTypes.object || PropTypes.string,
  loadingContent: PropTypes.object || PropTypes.string,
  onClick: PropTypes.func,
  isHandleImageError: PropTypes.bool,
};

export default MaasImage;
