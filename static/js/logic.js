// Create map object
var myMap = L.map("map", {
  center: [37.888275, -78.464827],
  zoom: 13
});

// Create base layers
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap'
});

var satelliteStreets = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/satellite-streets-v11",
  accessToken: API_KEY
}).addTo(myMap);


// Create basemaps object
var baseMaps = {
  "OpenStreetMap": osm,
  "Satellite streets": satelliteStreets
};

// Add layers control. Source: https://leafletjs.com/examples/layers-control/
var layerControl = L.control.layers(baseMaps).addTo(myMap);

// Get the geojson data.
var link = "static/data/pv.geojson";

d3.json(link).then(function(data) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Add pop-ups
      layer.bindPopup("<h1>" + "Array name: " + feature.properties.Array_name + "</h1> <hr> <h2>" + "Rated power: " + feature.properties.Rated_power + "</h2>");
    }
  }).addTo(myMap);
});