/**
 *	This Renders the Matterport <iframe>
 *	The C5 API field returns an iframe html element, so we have to dangerously set the HTML here
 *
 *	@link https://zhenyong.github.io/react/tips/dangerously-set-inner-html.html
 *  @link https://matterport.com/
 */

import React, { Component } from 'react';
import '../../scss/components/Render.scss';

class Render extends Component {

	createMarkup() {
		return {__html: this.props.embed_code};
	}

	render() {
		return (
			<div className="render">
				<div dangerouslySetInnerHTML={this.createMarkup()} />
			</div>
		);
	}

}

export default Render;