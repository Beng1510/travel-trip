

export const mapServices = {
    loadMap
}


function loadMap() {
    return axios.get('https://maps.googleapis.com/maps/api/js?key=AIzaSyD_E_dcrekWZNXaKc2mSKc3dnN31bk_L2Y&callback=mapReady')
        .then(res => res.data)
}

