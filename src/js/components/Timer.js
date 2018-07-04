/**
 *	Since this app will be running non stop in a sales center, we wanted a way to reset
 *	the app after a certain amount of time of inactivity.
 *
 *	This listens for mousemovements, which appear to be coincide with touch events on their device.
 *	If we don't hear an event, we push the history state back to the root.
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Timer extends Component {

	constructor(props) {
		super(props);
		this.state = {idleTime: 0};
		this.body = document.body;
		this.inactiveTime = 5; // set the inactive time in minutes;
	}

	componentDidMount() {
		this.timerIncrement = setInterval(
			() => this.incrementTimer(),
			60000 // 1 minute
			
		);

		// listen for mouse move, reset timer
		document.addEventListener('mousemove', this.mouseMove.bind(this), false);
	}

	mouseMove() {
		// reset idletimer on mousemovement
		this.setState({idleTime: 0});
	}

	incrementTimer() {
		// don't count if we're on the homepage
		if (this.props.location.pathname !== '/') {

			// if not on the homepage, begin ideltime counter
		    this.setState({
		    	idleTime: this.state.idleTime + 1
		    });

		    // head to top level page idletime reaches defined inactiveTime var
		    if (this.state.idleTime > this.inactiveTime ) {

		        this.props.history.push('/');
		    }

	    }
	}

	render() {
		return (
			<div className="timer"></div>
		);
	}
}

export default withRouter(Timer);