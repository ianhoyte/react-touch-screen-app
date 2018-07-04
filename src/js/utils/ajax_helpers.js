var axios = require('axios');

// Set function to get all the listings from the C5 API response
function getListings(){
  return axios.get('https://www.predatorridge.com/tools/ajax/?get_listings=true' );
}

// Set function to get a single listing from the C5 API response
function getListing(listing){
  return axios.get('https://www.predatorridge.com/tools/ajax/?get_listing=' + listing );
}


var helpers = {
  // grab all the listing info from a single listing
  getListingInfo: function(listing){
    return axios.all( [getListing(listing)] )
      .then(function (response) {
        return {
            id: response[0]['data']['id'],
            listing_name: response[0]['data']['listing_name'],
            acres: response[0]['data']['acres'],
            square_footage: response[0]['data']['square_footage'],
            den: response[0]['data']['den'],
            price: response[0]['data']['price'],
            bathrooms: response[0]['data']['bathrooms'],
            bedrooms: response[0]['data']['bedrooms'],
            description: response[0]['data']['description'],
            fDesc: response[0]['data']['fDesc'],
            files: response[0]['data']['files'],
            html_embed: response[0]['data']['html_embed'],
            name: response[0]['data']['name'],
            status: response[0]['data']['status'],
            plans: response[0]['data']['plans'],
        }
      })
  },
  // grab a list of all the listings
  getAllListingInfo: function(){
    return axios.all( [getListings()] )
      .then(function (response) {
        return {
          res: response[0]['data']
        }
      })
  },
}

module.exports = helpers;