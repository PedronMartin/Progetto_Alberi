import * as model from "./Model.js";

//creazione mappa
var map = L.map('map').fitWorld();

//collegamento OpenStreetMaps
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright"datasetnStreetMap</a>'
}).addTo(map);

//popolazione lista
async function populateList() {
    var progetti = await model.getProgetti();
    const lista = document.getElementById('progetti');
    lista.innerHTML = '';
    progetti.forEach(progetto => {
        const opt = document.createElement('option');
        opt.value = progetto.id;
        opt.textContent = progetto.nome;
        lista.appendChild(opt);
    });

    lista.value = null;

    //cambiamento progetto
    lista.addEventListener("change", async function () {
        const selectedId = parseInt(lista.value);
        updateMap(selectedId);
    });

}

//aggiorna la mappa con gli alberi del progetto selezionato
async function updateMap(id_progetto) {

    const alberi = await model.getAlberi(id_progetto);

    deleteMarker();

    //aggiunge marker
    alberi.forEach(albero => {
        var marker = L.marker([albero.geometry.coordinates[0], albero.geometry.coordinates[1]], {icon: realTree})
            .addTo(map);

        //contenuto del popup
        marker.bindPopup(`<b>Albero di tipo: ${albero.id_albero}</b><br><a href="#" data-id="${albero.id}">Vedi dettagli</a>`);
        
    });

    //centro la mappa sul primo albero del progetto scelto
    map.setView([alberi[0].geometry.coordinates[0], alberi[0].geometry.coordinates[1]], 25);
}

//funzione per ripulire la mappa
function deleteMarker() {
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });
}

populateList();

/*

TODO:

//stilizzare i marker in base a se sono reali o virtuali
function getMarkerStyle(albero) {
    var bool = albero.type === "realTree" ? realTree : virtualTree;
    if(bool)
        return L.marker...;
    else
        return L.marker(...);
}

*/

//marker personalizzato - albero reale
const realTree = L.icon({
    iconUrl: "./realTreeIMG.png",
    iconSize: [15, 18],  //larghezza - altezza
    popupAnchor: [0, 0], // !!! da capire successivamente se il marker parte dal basso o dal centro delle coordinate, sfalsando la posizione!!!
    shadowUrl: null,
    shadowSize: [0, 0],
    shadowAnchor: [0, 0]
});