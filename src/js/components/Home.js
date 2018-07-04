import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../scss/components/Home.scss';
import HomeVideo from './HomeVideo';
import Logo from '../../img/commonage_logo_full.svg';
import Isvg from 'react-inlinesvg';

class Home extends Component {

	componentDidMount() {
		document.body.classList.add('start')
	}

	componentWillUnmount() {
		// remove the start class form the body when we're unmounting
		document.body.classList.remove('start')
	}

	render() {
		return (
			<div className="home">
				<HomeVideo />
				<div className="info">
					<span className="logo">
						<Isvg src={Logo} />
					</span>
					<Link className="btn" to='/explore'>EXPLORE</Link>
				</div>
			</div>
		);
	}
}

export default Home;