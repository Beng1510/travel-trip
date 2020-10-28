'use strict'


import {mapServices} from './travel-service.js'



window.addEventListener('load',initMap)


function initMap() {
    mapServices.loadMap
    
    const startingPoint = { lat: 29.55036, lng: 34.95228 }
    const gMap = new google.maps.Map(document.getElementById('map'), {
        zoom: 16, 
        center: startingPoint 
    });

    const marker = new google.maps.Marker({
        position: startingPoint,
        map: gMap,
        title: 'Hello World!'
    });

}


// gMap.addListener('click', function (mapsMouseEvent) {
//     myLatlng = {
//         lat: mapsMouseEvent.latLng.lat(),
//         lng: mapsMouseEvent.latLng.lng()
//     }
// })
