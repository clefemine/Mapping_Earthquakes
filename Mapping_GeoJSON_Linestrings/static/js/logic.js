// Add console.log to check to see if our code is working.
console.log("working");


// We create the tile layers that will be the background of our map.
let night = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'navigation-preview-night-v4',
	accessToken: API_KEY
});
let day = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'navigation-guidance-day-v4',
	accessToken: API_KEY
});
// Create a base layer that holds both maps.
let baseMaps = {
	Light: night,
	Dark: day
  };

  // Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [44.0, -80.0],
	zoom: 2,
	layers: [night]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/clefemine/Mapping_Earthquakes/master/torontoRoutes.json";

// Create a style for the lines.
let myStyle = {
	color: "#ffffa1",
	weight: 2
}

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
	  style: myStyle,
    onEachFeatPoiure: function(feature, layer) {
		console.log(layer);
		layer.bindPopup("<h2> Airline: " + feature.properties.airline + "</h2><hr><h3> Destination: " + feature.properties.dst + "</h3>")	
     }
}).addTo(map);
});

// Then we add our 'graymap' tile layer to the map.
night.addTo(map);