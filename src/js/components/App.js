import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Navbar from './Navbar';
import Main from './Main';
import Timer from './Timer';

class Back extends Component {

	componentWillMount	() {
		this.setState({
			path: this.props.history.location.pathname
		})
	}

	render() {
		/**
		 *	Get the current path and add it as the wrapper id
		 */
		var locationID = this.state.path.substr(1);

		if (!locationID)  {
			locationID = 'home';
		}

		return (
			/**
			 *	Add a "location ID" to each main wrappper
			 */
			<div className="main" id={locationID}>
				<Navbar />
				<Main />
				<Timer />
			</div>
		);
	}
}

export default withRouter(Back);