import React, { Component } from 'react';
import Slider from './Slider';
import Render from './Render';
import '../../scss/components/Tabs.scss';

class Tabs extends Component {

	constructor(props) {
		super(props);
		this.state = { 
			plans: 'show',
			gallery: null,
			render: null,
		};
	}

	plans() {
		this.setState({
			plans: 'show',
			gallery: null,
			render: null,
		});
	}

	gallery() {
		this.setState({
			plans: null,
			gallery: 'show',
			render: null,
		});
	}

	showcase() {
		this.setState({
			plans: null,
			gallery: null,
			render: 'show',
		});
	}
	
	render() {

		// active states are a bit greasy here. Couldn't figure out how to update the state based on prop, so we have this mess...

		let content,
			renderLink,
			galleryLink,
			floorPlanLink;

		if (this.props.render) {
			if(this.state.render === 'show') { 
				content = <Render embed_code={this.props.render} />
				renderLink = <li className="active" onClick={(e) => this.showcase(e)}><div className="container"><i className="icon-cube"></i><span>3D SHOWCASE</span></div></li>
			} else {
				renderLink = <li onClick={(e) => this.showcase(e)}><div className="container"><i className="icon-cube"></i><span>3D SHOWCASE</span></div></li>
			}
		}

		if (this.props.slides) {
			if(this.state.gallery === 'show') { 
				content = <Slider slides={this.props.slides} />
				galleryLink = <li className="active "onClick={(e) => this.gallery(e)}><div className="container"><i className="icon-image"></i><span>GALLERY</span></div></li>
	        } else {
	        	galleryLink = <li onClick={(e) => this.gallery(e)}><div className="container"><i className="icon-image"></i><span>GALLERY</span></div></li>
	        }
	    }

        if (this.props.floorPlans) {
 			if(this.state.plans === 'show') { 
				content = <Slider slides={this.props.floorPlans} isPlans="yes" />
				floorPlanLink = <li className="active" onClick={(e) => this.plans(e)}><div className="container"><i className="icon-floor-plan"></i><span>PLANS</span></div></li>
	        } else {
	        	floorPlanLink = <li onClick={(e) => this.plans(e)}><div className="container"><i className="icon-floor-plan"></i><span>PLANS</span></div></li>
	        }
	    }

	    // if we have a gallery, but no floorplans or a 3d render force the gallery content
		if (this.props.slides && !this.props.floorPlans && !this.props.render) {
				content = <Slider slides={this.props.slides} />
				galleryLink = <li className="active " onClick={(e) => this.gallery(e)}><div className="container"><i className="icon-image"></i><span>GALLERY</span></div></li>
	    }

		return (
			<div className="content">
				<ul className="tabs">
					{floorPlanLink}
					{galleryLink}
					{renderLink}
				</ul>
				
				{content}

			</div>


		);
	}

}

export default Tabs;