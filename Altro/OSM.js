export default function fquery(lat, lng) {
    let query = `
        [out:json];
        (
          node["leisure"="park"](around:1000, ${lat}, ${lng});
          way["leisure"="park"](around:1000, ${lat}, ${lng});
          relation["leisure"="park"](around:1000, ${lat}, ${lng});
        );
        out body;
    `;
    let url = "https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(query);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let geojson = osmtogeojson(data);
            L.geoJSON(geojson).addTo(map);
        })
        .catch(error => console.error("Errore nel recupero dati:", error));
}
