import React, { Component } from 'react';
import Isvg from 'react-inlinesvg';
import { withRouter } from 'react-router-dom';
import '../../scss/components/Explore.scss';
import ExploreSvg from '../../img/explore.svg';
import { Link } from 'react-router-dom';

/**
 *	Icons
 */
import Lavender from '../../img/explore/icons/lavender.svg';
import TennisRacket from '../../img/explore/icons/tennis-racket.svg';
import Forest from '../../img/explore/icons/forest.svg';
import Yoga from '../../img/explore/icons/yoga.svg';
import Hike from '../../img/explore/icons/hike.svg';
import Dog from '../../img/explore/icons/dog.svg';
import MapIcon from '../../img/explore/icons/map.svg';

/**
 *	Lightbox
 */
import Commons from '../../img/explore/slides/commons_park.jpg';
import LavenderMeadow from '../../img/explore/slides/lavender_meadow.jpg';
import OrchardGreen from '../../img/explore/slides/orchard_green.jpg';
import YogaPlatform from '../../img/explore/slides/yoga_platform.jpg';
import DogPark from '../../img/explore/slides/dog_park.jpg';
import RanchTrail from '../../img/explore/slides/ranch_trail.jpg';

class Explore extends Component {

	openLightBox(e) {
		let imgSrc = e.target.parentNode.getAttribute('data-img'),
			imgTitle = e.target.parentNode.getAttribute('data-title'),
			imgDesc = e.target.parentNode.getAttribute('data-desc'),
			wrapper = document.querySelector('.fade-container > div > div'),
			lightbox = document.createElement('div');

		lightbox.classList.add('lightbox');
		lightbox.innerHTML = '<div class="inner"><div class="close">×</div><img src="'+imgSrc+'" /><h2>'+imgTitle+'</h2><p>'+imgDesc+'</p></div>';

		wrapper.appendChild(lightbox);

	}

	componentWillMount() {

		// Since this is the first page the user sees with a nav bar,
		// remove the start class from the body to show nav bar
		document.body.classList.remove('start');		

	}

	render() {

		document.body.addEventListener("click", function(e) {
			let target = e.target;
		    if ( target.classList.contains('close') ) {
		    	if (target.parentNode.parentNode.parentNode) {
		    		target.parentNode.parentNode.parentNode.removeChild(target.parentNode.parentNode);
		    	}
		    }
		});
		

    	return (
    		<div>
	    		<div className="explore-svg">
	    			{/* Should probably just cycle through an array of values here, or make a component */}
	    			<Link to='/sitemap' className="siteplan-hotspot">
	    				<div className="hotspot">
	    					<img alt="Site Map" src={MapIcon} />
							<span className="pulse"></span>
							<span className="title">Siteplan</span>
	    				</div>
	    			</Link>

	    			<div className="hotspot lavender" 
	    				 data-img={LavenderMeadow}
	    				 data-title="Lavender Meadow"
	    				 data-desc="With over 2,000 lavender plants flanking the Lavender Meadow trail, this living laboratory in partnership with UBC Okanagan is a focal point on the Commonage hillside." 
	    				 onClick={(e) => this.openLightBox(e)}>
	    				<img alt="Lavender Meadow" src={Lavender} />
	    				<span className="pulse"></span>
	    				<span className="title">Lavender Meadows</span>
	    			</div>

					<div className="hotspot tennis-racket"
						  data-img={Commons}
						  data-title="Commons Park"
						  data-desc="Soon to be the social heart of the neighbourhood, Commons Park has four tennis and four pickle ball courts set in a stunning three-acre park adjacent to the entrance to The Commonage." 
						  onClick={(e) => this.openLightBox(e)}>
	    				<img alt="Commons Park" src={TennisRacket} />
	    				<span className="pulse"></span>
	    				<span className="title">Commons Park</span>
	    			</div>

					<div className="hotspot forest" 
						 data-img={OrchardGreen}
						 data-title="Orchard Green"
						 data-desc="Paying homage to this strong fruit-producing region, Orchard Green features fruit producing apple and pear trees and is located across from Commons Park at the entrance to The Commonage." 
						 onClick={(e) => this.openLightBox(e)}>
	    				<img alt="Orchard Green" src={Forest} />
	    				<span className="pulse"></span>
	    				<span className="title">Orchard Green</span>
	    			</div>

					<div className="hotspot yoga" 
						 data-img={YogaPlatform}
						 data-title="Lavender Yoga Platform"
						 data-desc="Featuring incredible views of Predator Ridge, Kalamalka Lake and the valley, the Lavender Yoga Platform in The Commonage is the perfect place to relax and enjoy a glass of wine or take part in an outdoor Yoga class." 
						 onClick={(e) => this.openLightBox(e)}>
	    				<img alt="Yoga Platform" src={Yoga} />
	    				<span className="pulse"></span>
	    				<span className="title">Lavender Yoga Platform</span>
	    			</div>

					<div className="hotspot dog" 
						 data-img={DogPark}
						 data-title="The Dog Park"
						 data-desc="Building on Predator’s Ridge’s reputation as a pet-friendly community. The Dog Park will be located at the top of the Commonage and provides acres of space for our canine friends to run and play." 
						 onClick={(e) => this.openLightBox(e)}>
	    				<img alt="Dog Park" src={Dog} />
	    				<span className="pulse"></span>
	    				<span className="title">The Dog Park</span>
	    			</div>

					<div className="hotspot hike" 
						 data-img={RanchTrail}
						 data-title="The Ranch Trail"
						 data-desc="Circling the perimeter of The Commonage, the Ranch Trail is part of over 35 kilometres of multi-use trails throughout Predator Ridge." 
						 onClick={(e) => this.openLightBox(e)}>
	    				<img alt="Ranch Trail" src={Hike} />
	    				<span className="pulse"></span>
	    				<span className="title">The Ranch Trail</span>
	    			</div>

	    			<Isvg className="map" src={ExploreSvg} />

	    		</div> 
			</div>
	    );
    }
}
export default withRouter(Explore);