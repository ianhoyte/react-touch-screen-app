import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Back from './Back';
import '../../scss/components/Navbar.scss';

import TrailMap from '../../img/ranch_trail.jpg';

class Navbar extends Component {

  /**
   *  Appends and populates a lightbox with the target's defined values
   */
  openLightBox(e) {
    let imgSrc = e.target.parentNode.getAttribute('data-img'),
        wrapper = document.querySelector('.fade-container > div > div'),
        lightbox = document.createElement('div');

      e.preventDefault();
      lightbox.classList.add('lightbox');
      lightbox.innerHTML = '<div class="inner"><div class="close">×</div><img src="'+imgSrc+'" /></div>';

      wrapper.appendChild(lightbox);

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
      <nav className="navbar">
          <span className="link back"><Back /></span>
	        <span className="link right">
                <Link to='/'>
                    <i className="icon-home"></i>
                    <span>HOME</span>
                </Link>
            </span>
	        <span className="link right">
              <Link to='/sitemap'>
                  <i className="icon-map"></i>
                  <span>SITEPLAN</span>
              </Link>
          </span>
          <span className="link right">
              <Link to='/explore'>
                  <i className="icon-compass"></i>
                  <span>EXPLORE</span>
              </Link>
          </span>
          <span className="link right">
              <Link to='#' 
                    data-img={TrailMap}
                    data-title="Ranch Trail"
                    data-desc="Description" 
                    onClick={(e) => this.openLightBox(e)}>
                  <i className="icon-hiker"></i>
                  <span>TRAIL MAP</span>
              </Link>
          </span>
      </nav>
    );
  }
}

export default Navbar;
