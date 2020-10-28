

export const mapService = {
    getLocs,
    makeNewLocation
}


var locs = [{ lat: 11.22, lng: 22.11 }]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}


function makeNewLocation(lat, lng){
    console.log('lat',lat);
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyD_E_dcrekWZNXaKc2mSKc3dnN31bk_L2Y`)
    .then(res => console.log(res)) 
    // .then(data => console.log('newlocation',data))
}

// https://maps.googleapis.com/maps/api/js?key=AIzaSyD_E_dcrekWZNXaKc2mSKc3dnN31bk_L2Y&callback=initMap&libraries=&v=weekly
