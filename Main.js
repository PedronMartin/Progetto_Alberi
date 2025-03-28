import fquery from './OSM.js';

//creazione mappa. fitWOrld mostra l'intero mondo sulla base dello spazio concesso nel layout della pagina
var map = L.map('map').fitWorld();
var coordinates;

//collegamento OpenStreetMaps
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//funzione che preleva le coordinate attuali dell'utente e imposta un marker e un cerchio attorno
function onLocationFound(e) {
    var radius = Math.round(e.accuracy);
    coordinates = e;

    //condizione per evitare posizioni con accuratezza troppo bassa
    if(radius > 100) {
        alert("La precisione rilevata è troppo imprecisa. Prova a migliorare il segnale o riprovare.");
        return;
    }

    //crea Marker e carica subito il popup
    L.marker(e.latlng).addTo(map)
        .bindPopup("Grazie per aver condiviso la tua posizione.\nTu sei qui!").openPopup();

    //cerchio sull'area indicata dall'accuratezza del dato prelevato
    L.circle(e.latlng, radius).addTo(map);

    //livello di zoom massimo sull'utente
    map.setView(e.latlng, 17);
}

//funzione di errore (sulla base dell'errore generato dalla localizzazione)
function onLocationError(e) {
    switch (e.code) {
        case e.PERMISSION_DENIED:
            alert("Permesso di geolocalizzazione negato.");
            break;
        case e.POSITION_UNAVAILABLE:
            alert("Informazioni sulla posizione non disponibili. Controlla segnale GPS o connessione a Internet.");
            break;
        case e.TIMEOUT:
            alert("La richiesta di geolocalizzazione ha superato il tempo limite. Prova a ricaricare la pagina.");
            break;
        default:
            alert("Errore di geolocalizzazione generico. Riprova.");
            break;
    }
}

//funzione richiamata al premere su un popup
function onMapClick(e) {
    var pos = Math.round(e.latlng);
    popup
        .setLatLng(pos)
        .setContent("Hai premuto la mappa a " + pos)
        .openOn(map);
}

navigator.geolocation.getCurrentPosition(position => {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    fquery(lat, lng);
});


//caricamento funzioni nella mappa
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);
map.on('click', onMapClick);

//setting richiesta di geolocalizzazione al dispositivo (con timeout e richiesta di alta precisione)
map.locate({setView: true, maxZoom: 17, timeout: 10000, enableenableHighAccuracy: true});