'use strict'


import { mapService } from './travel-service.js'



var gMap;

// console.log('Main!');

mapService.getLocs()
// .then(locs => console.log('locs', locs))

window.onload = () => {
    initMap()
        .then(() => {

            addMarker({ lat: 32.0749831, lng: 34.9120554 });
        })
    // .catch(console.log('INIT MAP ERROR'));

    getPosition()
        .then(pos => {

            // console.log('User position is:', pos.coords);
        })
        .catch(err => {
            // console.log('err!!!', err);
        })
}

// document.querySelector('.btn').addEventListener('click', (ev) => {
// console.log('Aha!', ev.target);
// panTo(35.6895, 139.6917);
// })


export function initMap() {

    var myLatlng = { lat: 32.0749831, lng: 34.9120554 }

    // console.log('InitMap');

    return _connectGoogleApi()
        .then(() => {
            // console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: myLatlng,
                zoom: 15
            })
            
            gMap.addListener('click', getNewLocation)

            const geocoder = new google.maps.Geocoder();

            document.getElementById("submit").addEventListener("click", () => {
                searchAddress(geocoder, gMap);
            });
            
            // document.getElementById("submit").addEventListener("click", searchLoc)

        })


}

// document.querySelector('#map').addEventListener('click', getNewLocation)
// gMap.addListener('click', getNewLocation)



function getNewLocation(event) {
    console.log('event', event);

    // gMap.addListener('click', function (event) {

    console.log('event2', event);
    var myLatlng = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
    }
    // var name = prompt('Enter place name:');

    console.log('myLatlng', myLatlng);

    mapService.makeNewLocation(myLatlng.lat, myLatlng.lng)
        .then(onAddLocation)
    // addLocation(name, myLatlng);
    // gMap.setCenter(myLatlng);
    // });
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}



function getPosition() {
    // console.log('Getting Pos');

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


function onAddLocation(results) {
    mapService.addLocation(results)
    renderLocationList()
}


function renderLocationList() {

    var locations = mapService.getLocationsForDisplay()
    console.log('loations', locations);

    var strHTML = ''
    locations.forEach(location => {
        strHTML +=
            `<tr>
            <td>${location.name} </td>
            <td>${location.id}</td>
            <td>${location.lat}</td>
            <td>${location.lng}</td>
            <td>
            <button id="${location.id}" class="go-to">
            Go to location
            </button>
            <button id="${location.id}" class="delete-btn">
            Delete Location
            </button>
            </td>
            </tr>`
    })
    document.querySelector('.location-body').innerHTML = strHTML

    var locBtns = document.querySelectorAll('.go-to')

    locBtns.forEach(locBtn => {
        locBtn.addEventListener('click', panTo)
    })
    var delBtns = document.querySelectorAll('.delete-btn')
    delBtns.forEach(delBtn => {
        delBtn.addEventListener('click', onDeleteLoc)
    })
}


function panTo(ev) {
    var place = mapService.getCoordsById(ev)
    // console.log('newplace', place);

    var laLatLng = new google.maps.LatLng(place.lat, place.lng);
    gMap.panTo(laLatLng);
}


function onDeleteLoc(ev) {
    mapService.deleteLoc(ev)
    renderLocationList()
}


document.querySelector('.btn').addEventListener('click', getCurrLocation)

function getCurrLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
        var currLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        gMap.setCenter(currLoc);
    });
}



function searchAddress(geocoder, resultsMap) {
    const address = document.getElementById("address").value;
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK") {
        resultsMap.setCenter(results[0].geometry.location);
        new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location,
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }



