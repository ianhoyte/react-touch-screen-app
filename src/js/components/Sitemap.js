import React, { Component } from 'react';
import Isvg from 'react-inlinesvg';
import { withRouter } from 'react-router-dom';
import '../../scss/components/Sitemap.scss';
import SitemapSvg from '../../img/sitemap.svg';

var helpers = require('../utils/ajax_helpers');

class Sitemap extends Component {


	constructor(props) {

		super(props);
		this.state = {
			response: null
		}

	}

	componentWillMount() {

		/*
		 *  Get all sold listings ajax request, served from the predator ridge site's C5 API (utils/ajax_helpers.js)
		 *  this is in "WillMount" in an effort to populate the data quicker on load
		 */

	    helpers.getAllListingInfo()
			.then(function(data){

				this.setState({
					response: data.res
				})

				document.querySelector('.siteplan-svg').classList.add('loaded')

			}.bind(this))
	}

	/**
	 *	Handle the click events when the user selects a listing, push the history to the accompanying data-link attr
	 */
    clickHandler(e) {

        let propertyLocation = e.target.parentNode.getAttribute('data-link');

        // make sure the target has a datalink and is not sold
        if ( propertyLocation && !e.target.parentNode.classList.contains('sold') ) {
        	this.props.history.push('/property/' + propertyLocation)
        }

    }

	render() {
		
		// set sold listings
		let soldList = this.state.response;

		if (soldList){

			// get all sites and loop through
			let sites = document.getElementsByClassName("site"),
				i;
			for (i = 0; i < sites.length; i++) {
				
				// get data link
				let link = sites[i].getAttribute('data-link'),
					loc = link.replace('/', ''); // remove trailing slash

				// compare link to sold list handles
				if (soldList.indexOf(loc) !== -1) {
					// set sold class
					sites[i].classList.add('sold');
					// remove lot number
					sites[i].childNodes[2].innerHTML = '';
				} 
			}

		}
	
    	return (
    		<div>
	    		<div className="siteplan-svg" onClick={(e) => this.clickHandler(e)}>
	    			<Isvg src={SitemapSvg} />
	    		</div> 
		        <ul className="legend">
		            <li>
		                <span className="legend-item blue"></span>
		                <span className="item-title">Single Family Home</span>
		            </li>
		            <li>
		                <span className="legend-item lightBlue"></span>
		                <span className="item-title">Maverick Duplex</span>
		            </li>
		            <li>
		                <span className="legend-item lightPurple"></span>
		                <span className="item-title">Showhome</span>
		            </li>
		            <li>
		                <span className="legend-item green"></span>
		                <span className="item-title">Homesite</span>
		            </li>
		            <li>
		                <span className="legend-item dark-orange"></span>
		                <span className="item-title">Rancher Duplex</span>
		            </li>
		            <li>
		                <span className="legend-item red"></span>
		                <span className="item-title">Sold</span>
		            </li>
		        </ul>
			</div>
	    );
    }
}
export default withRouter(Sitemap);