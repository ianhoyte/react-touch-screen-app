import React, { Component } from 'react';
import '../../scss/components/Property.scss';
import Logo from '../../img/commonage_logo_full.svg';
import Tabs from './Tabs';

var helpers = require('../utils/ajax_helpers');

class Property extends Component {

	constructor(props) {
		super(props);
		// set default states
		this.state = {
			id: null,
			listing_name: null,
			acres: null,
			price: null,
			square_footage: null,
			den: null,
			bathrooms: null,
			bedrooms: null,
			description: null,
			files: [],
			fDesc: null,
			html_embed: null,
			name: null,
			status: null,
			plans: [],
			readMore: null
		};

	}

	/**
	 *	Format numbers to currency and remove .00
	 */	
	numberWithCommas(x) {
		if (x){
			x = x.replace('.00','');
	    	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    	}
	}

	componentDidMount() {

	    // get location from url and format, assign to variable for ajax call
		let path = this.props.location.pathname,
			loc = path.replace('/property/', ''),
			loc2 = loc.replace('/', ''), // a little greasy, we could combine the two vars (loc,loc2) here probably
			price;

		// use pathname for ajax call
	    helpers.getListingInfo( loc2 ) 
			.then(function(data){

				// change data to human redable format if no data exists
				if (data.price == null) {
					data.price = 'N/A'
				}

				if (data.name == null) {
					data.name = 'N/A'
				}

				if (!data.square_footage) {
					data.square_footage = 'Completed Square Footage: N/A'
				} else {
					data.square_footage = 'Completed Square Footage: ' + this.numberWithCommas(data.square_footage) + ' Sq. ft'
				}

				if (data.bedrooms == null) {
					data.bedrooms = 'N/A'
				}

				if (data.bathrooms == null) {
					data.bathrooms = 'N/A'
				} else if (data.bathrooms.includes('.0')) {
					data.bathrooms = data.bathrooms.replace('.0', '')
				}

				if (data.status !== 'Show Home') {
					price = 'Price: $' + this.numberWithCommas(data.price)
				}

				// set states for data display
				this.setState({
					id: data.id,
					listing_name: data.listing_name,
					acres: data.acres,
					price: price,
					square_footage: data.square_footage,
					den: data.den,
					bathrooms: 'Bathrooms: ' + data.bathrooms,
					bedrooms: 'Bedrooms: ' + data.bedrooms,
					description: data.description,
					files: data.files,
					fDesc: data.fDesc,
					html_embed: data.html_embed,
					name: 'Plan: ' + data.name,
					status: data.status,
					plans: data.plans,
				})

				// add "den" signifier to bedrooms if den is 1
				if (this.state.den === 1) {
					this.setState({
						bedrooms: this.state.bedrooms + ' + den'
					})
				}

				// show readmore button if content exceeds container's height
				var descInner = document.querySelector('.desc-inner'),
					desc = document.querySelector('.description');
				if (descInner) {
					if (descInner.offsetHeight > desc.offsetHeight) {
						this.setState({
							readMore: <span className="read-more" onClick={(e) => this.scroll_down(e)}>READ MORE<i className="icon-chevron-down"></i></span>
						})
					}
				}

			}.bind(this))

 	}

	/**
	    Smoothly scroll element to the given target (element.scrollTop)
	    for the given duration

	    Returns a promise that's fulfilled when done, or rejected if
	    interrupted

	    @link https://gist.github.com/mrtnbroder/7e640165bc6d8d89372b
	 */


 	smooth_scroll_to(element, target, duration) {

		    target = Math.round(target);
		    duration = Math.round(duration);
		    if (duration < 0) {
		        return Promise.reject("bad duration");
		    }
		    if (duration === 0) {
		        element.scrollTop = target;
		        return Promise.resolve();
		    }

		    var start_time = Date.now();
		    var end_time = start_time + duration;

		    var start_top = element.scrollTop;
		    var distance = target - start_top;

		    // based on http://en.wikipedia.org/wiki/Smoothstep
		    var smooth_step = function(start, end, point) {
		        if(point <= start) { return 0; }
		        if(point >= end) { return 1; }
		        var x = (point - start) / (end - start); // interpolation
		        return x*x*(3 - 2*x);
		    }
		    var that = this;
		    return new Promise(function(resolve, reject) {
		        // This is to keep track of where the element's scrollTop is
		        // supposed to be, based on what we're doing
		        var previous_top = element.scrollTop;
		        
		        // This is like a think function from a game loop
		        var scroll_frame = function() {
		            if(element.scrollTop !== previous_top) {
		                reject("interrupted");
		                return;
		            }

		            // set the scrollTop for this frame
		            var now = Date.now();
		            var point = smooth_step(start_time, end_time, now);
		            var frameTop = Math.round(start_top + (distance * point));
		            element.scrollTop = frameTop;

		            // check if we're done!
		            if(now >= end_time) {
		                resolve();
		                return;
		            }

		            // If we were supposed to scroll but didn't, then we
		            // probably hit the limit, so consider it done; not
		            // interrupted.
		            if(element.scrollTop === previous_top
		                && element.scrollTop !== frameTop) {
		                resolve();
		                return;
		            }
		            previous_top = element.scrollTop;

		            // schedule next frame for execution
		            setTimeout(scroll_frame, 0);
	
					var scrollPos = element.scrollTop,
						descInnerHeight = element.childNodes[0].offsetHeight,
						containerHeight = element.offsetHeight,
						finalOffset = descInnerHeight - containerHeight;

				
					if (finalOffset === scrollPos) {
						that.setState({
							readMore: <span className="read-more" onClick={(e) => that.scroll_up(e)}>TO TOP<i className="icon-chevron-down flip"></i></span>
						})
					}

		        }

		        // boostrap the animation process
		        setTimeout(scroll_frame, 0);
		    });
		}

	/**
	 *	Fire the scroll down event.
	 *	This exists because the implemented device doesn't have touch-drag functionality
	 */
	scroll_down() { //scroll down event for the description
	    var el = document.querySelector('.description');
	    this.smooth_scroll_to(el, el.scrollTop + 235, 600);
	}

	/**
	 *	Fire the scroll up event.
	 *	This exists because the implemented device doesn't have touch-drag functionality
	 */
	scroll_up() { // scroll up event for the description
		// adjust this scope
		var that = this;

		//delay to give the bottoming out check a chance to revert
		setTimeout(function(){
			that.setState({
				readMore: <span className="read-more" onClick={(e) => that.scroll_down(e)}>READ MORE<i className="icon-chevron-down"></i></span>
			})
		},500);

	    var el = document.querySelector('.description');
	    this.smooth_scroll_to(el, 0, 600);
	}


	render() {

    	return (
			<div className="property">
				<div className="header">
					<h1>{this.state.listing_name}</h1>
					<img src={Logo} alt="The Commonage" />
				</div>
				<div className="info">
					<div className="left">
						<div className="property-details">
							<h2>Property Details</h2>
							<ul>
								<li>{this.state.name}</li>
								<li>{this.state.price}</li>
								<li>{this.state.square_footage}</li>
								<li>{this.state.bedrooms}</li>
								<li>{this.state.bathrooms}</li>
							</ul>
						</div>
						<div className="desc-container">									
							<div className="description">
								<div className="desc-inner">
									<p>{this.state.description}</p>
									<p>{this.state.fDesc}</p>
								</div>
							</div>
							{this.state.readMore}
						</div>
					</div>
					<div className="right">
						<Tabs render={this.state.html_embed} slides={this.state.files} floorPlans={this.state.plans}/>
					</div>
				</div>

			</div>
	    );
    }
}

export default Property;