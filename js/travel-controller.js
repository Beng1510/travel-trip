'use strict'


import {mapService} from './travel-service.js'

var gPlaces;
var gMap;

console.log('Main!');

mapService.getLocs()
    .then(locs => console.log('locs', locs))

window.onload = () => {
    initMap()
        .then(() => {

            addMarker({ lat: 32.0749831, lng: 34.9120554 });
        })
        .catch(console.log('INIT MAP ERROR'));

    getPosition()
        .then(pos => {

            console.log('User position is:', pos.coords);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

document.querySelector('.btn').addEventListener('click', (ev) => {
    console.log('Aha!', ev.target);
    panTo(35.6895, 139.6917);
})


export function initMap() {

var myLatlng = {lat: 32.0749831, lng: 34.9120554}

    console.log('InitMap');

    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: myLatlng,
                zoom: 15
            })
            // console.log('Map!', gMap);
            
           
        })


}

document.querySelector('#map').addEventListener('click',getNewLocation)



function getNewLocation() {

    gMap.addListener('click', function (mapsMouseEvent) {
        console.log('mapsMouseEvent',mapsMouseEvent);
        myLatlng = {
            lat: mapsMouseEvent.latLng.lat(),
            lng: mapsMouseEvent.latLng.lng()
        }
        
        console.log('myLatlng',myLatlng);

        var name = prompt('Enter place name:');

        addLocation(name, myLatlng);
        gMap.setCenter(myLatlng);
    });
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}

function getPosition() {
    console.log('Getting Pos');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = '';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD_E_dcrekWZNXaKc2mSKc3dnN31bk_L2Y&callback=mapReady`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}


function addLocation(name, latLng){
    var newPlace = _createPlace(name, latLng);
    gPlaces.push(newPlace);
    // saveToStorage(PLACES_DB,gPlaces);
    onAddPlace();
}

function _createPlace(name, latLng){
    return {
        id: makeId(),
        name,
        latLng
    }
}