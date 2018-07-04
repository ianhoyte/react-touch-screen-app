import React, { Component } from 'react';
import { RouteTransition } from 'react-router-transition';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Sitemap from './Sitemap';
import Property from './Property';
import Explore from './Explore';

class Main extends Component {

  render() {
    return (
    	<div className="wrapper">
			<Route render={({location, history, match}) => {
			    return (
			      <RouteTransition 
			      	/**
			      	 *	Uses the react-router-transition package
			      	 *	@link https://github.com/maisano/react-router-transition
			      	 */
			        pathname={location.pathname}
			        atEnter={{ opacity: 0 }}
			        atLeave={{ opacity: 1 }}
			        atActive={{ opacity: 1 }}
			        className={'fade-container'}
			      >
			        <Switch key={location.key} location={location}>
			          <Route exact path='/' component={Home}/>
			          <Route exact path='/sitemap' component={Sitemap}/>
			          <Route path='/property' component={Property}/>
			          <Route path='/explore' component={Explore}/>
			        </Switch>
			      </RouteTransition>
			    );
			  }} />
		</div>
    );
  }
}

export default Main;



