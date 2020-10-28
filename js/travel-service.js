
const APIkey = 'AIzaSyD_E_dcrekWZNXaKc2mSKc3dnN31bk_L2Y'
const PLACES_DB = "locationDB"

var gPlaces =[]

export const mapService = {
    getLocs,
    makeNewLocation,
    addLocation,
    _createPlace,
    getLocationsForDisplay

}

import {storageService} from './storage-service.js'


var locs = [{ lat: 11.22, lng: 22.11 }]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}


function makeNewLocation(lat, lng) {
    console.log('lat', lat);
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyD_E_dcrekWZNXaKc2mSKc3dnN31bk_L2Y`)
        .then(res => res.data)
        .then(data => data.results)

}

function addLocation(results) {
    console.log('results???', results);

    var newPlace = _createPlace(results);

    console.log('newPlace', newPlace);
    gPlaces.push(newPlace);

    console.log('gPlaces', gPlaces);

    storageService.saveToStorage(PLACES_DB, gPlaces);
    // onAddPlace();
}

function _createPlace(results) {
    // console.log('res',results[0]);

    return {
        id: results[0].place_id,
        name: results[0].formatted_address,
        lat: results[0].geometry.location.lat,
        lng: results[0].geometry.location.lng
    }
}


function getLocationsForDisplay() {
    return gPlaces
}