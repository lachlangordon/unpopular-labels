import React, { PropTypes, Component } from 'react';
// import classNames from 'classnames';

// import ErrorScreen from '../ErrorScreen';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import './Loader.scss';

class Loader extends Component {

	constructor(props) {
		super(props);

		this.state = {
			showError: false,
			timerOn: false,
		}
	}

	componentDidMount() {
		let timer;
		let count = 0;

		const startTimeout = () => {
			timer = setTimeout(() => {
				if (this.props.isLoading === false) {
					// If not isLoading, clear timer
					clearTimeout(timer);
					this.setState({timerOn: false});
				} else {
					if (count > 5) {
						// Show error after 5 seconds of isLoading
						this.setState({showError: true});
						clearTimeout(timer);
					} else {
						startTimeout();
					}
				}

				count++;
			}, 1000);
		}

		if (!this.props.isLoading) {
			this.setState({ timerOn: true });
			startTimeout();
		}
	}

	render() {
		let  loadingContent = null;

		if (this.state.showError) {
       console.log(' this is error ');
       /*
			 loadingContent = (
				<ErrorScreen
					message={this.props.error && this.props.error.message}
					redirectUrl={this.props.redirectUrl}
					redirectUrlText={this.props.redirectUrlText}
				/>
			); */
		} else if (this.props.isLoading || this.props.isLoading === undefined) {
			 loadingContent = (
				<div className="loading-screen is-active">
					<i className="loading-screen__icon fa fa-circle-o-notch fa-spin fa-2x"></i>
				</div>
			)
		}

		return (
			<div>
				{loadingContent}
			</div>
		);
	}
}

/*
Loader.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  redirectUrl: PropTypes.string,
  redirectUrlText: PropTypes.string,
}; */

export default Loader;
