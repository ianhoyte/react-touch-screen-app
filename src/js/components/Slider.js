import React, { Component } from 'react';
import SlickSlider from 'react-slick';
import '../../scss/components/Slider.scss';
import '../../scss/vendor/slick.scss';

class Slider extends Component {

	fullScreen() {

		// add fullscreen class to body
		let body = document.body;

    	body.classList.toggle("full-screen-gallery");

    	// force component update to adjust slide sizing once fullscreen is toggled
    	this.forceUpdate();

	}

	render() {

		/**
		 * Custom navigation arrows
		 * This is kind of weird, but we're setting HTML with some JSX as an option for our 
		 * slider rendering... so here we are.
		 */
	    function PrevButton({ onClick }) {
	      return <button onClick={onClick} className="slick-prev"><i className="icon-chevron-left"></i></button>;
	    }
	    function NextButton({ onClick }) {
	      return <button onClick={onClick} className="slick-next"><i className="icon-chevron-right"></i></button>;
	    }

	    // build out slides
		let files = this.props.slides,
			fileList =	(files || []).map((image, index) => {
							var imageLink = 'https://predatorridge.com' + image;
							return (
								<div className="item" key={index} style={{backgroundImage: "url(" + imageLink + ")"}}></div>
							)
						});

		// hide slider navigation if only 1 slide
		let dots,
			arrows;

		if (!files.length) {
			fileList = <div></div>;
		} else if (files.length === 1) {
			dots = false;
			arrows = false;
		} else {
			dots = true;
			arrows = true;
		}

		// slick slider settings
		var settings = {
			dots: dots,
			arrows: arrows,
			infinite: false,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			prevArrow: <PrevButton />,
			nextArrow: <NextButton />,
	    };
	    
	    // check props if the slider will be containing "plans" and add a class
	    var plansClass;
	    if (this.props.isPlans === 'yes') {
	    	plansClass = 'isPlans'
	    }

		return (
			<div className="carousel-container">	
				<SlickSlider className={plansClass} {...settings} ref={c => this.slider = c }>{ fileList }</SlickSlider>
				<div className="carousel-fullscreen" onClick={(e) => this.fullScreen(e)}>
					<span>FULL SCREEN</span>
					<i className="icon-full-screen"></i>
				</div>
			</div>
		);
	}
}

export default Slider;