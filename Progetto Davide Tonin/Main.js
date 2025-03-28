//creazione mappa
var map = L.map('map').fitWorld();

//collegamento OpenStreetMaps
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


/*



TODO



*/
//recupera i parametri passati nell'URL (Ipoteticamente le coordinate dell'albero)
const params = new URLSearchParams(window.location.search);
const coordinate = params.get('nome_parametro');

map.setView(coordinate);