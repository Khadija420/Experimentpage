// This isn't necessary but it keeps the editor from thinking L and carto are typos
/* global L, carto */

var map = L.map('tmap', {
  zoomControl: false
}).setView([31.5204, 74.3587,], 11);

L.control.zoom({ position: 'bottomright' }).addTo(map);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
  maxZoom: 18
}).addTo(map);

// Initialize Carto
var client = new carto.Client({
  apiKey: 'default_public',
  username: 'munik056'
});

/*
 * Begin layer one
 */

// Initialze source data
var t1source = new carto.source.Dataset('urban_edge_t1_1991');

// Create style for the data
var t1style = new carto.style.CartoCSS(`
#layer {
  polygon-fill: #6950a9;
  polygon-opacity: 0.9;
}
#layer::outline {
  line-width: 1;
  line-color: #FFFFFF;
  line-opacity: 0.5;
}
`);

// Add style to the data
var t1layer = new carto.layer.Layer(t1source, t1style);

/*
 * Begin layer two
 */

// Initialze source data
var t2source = new carto.source.Dataset('urban_edge_t2_2000');

// Create style for the data
var t2style = new carto.style.CartoCSS(`
#layer {
  polygon-fill: #ba6d82;
  polygon-opacity: 0.9;
}
#layer::outline {
  line-width: 1;
  line-color: #FFFFFF;
  line-opacity: 0.5;
}
`);

// Add style to the data
var t2layer = new carto.layer.Layer(t2source, t2style);

/*
 * Begin layer three
 */

// Initialze source data
var t3source = new carto.source.Dataset('urban_edge_t3_2013');

// Create style for the data
var t3style = new carto.style.CartoCSS(`
#layer {
  polygon-fill: #5d8478;
  polygon-opacity: 0.9;
}
#layer::outline {
  line-width: 1;
  line-color: #FFFFFF;
  line-opacity: 0.5;
}
`);

// Add style to the data
var t3layer = new carto.layer.Layer(t3source, t3style);

/*
 * Begin layer four
 */

// Initialze source data
var t4source = new carto.source.Dataset('study_area');

// Create style for the data
var t4style = new carto.style.CartoCSS(`
#layer {
  polygon-fill: #b3b3b4;
  polygon-opacity: 0.9;
}
#layer::outline {
  line-width: 1;
  line-color: #FFFFFF;
  line-opacity: 0.5;
}
`);

// Add style to the data
var t4layer = new carto.layer.Layer(t4source, t4style);

/*
 * Begin layer five
 */

// Initialze source data
var t5source = new carto.source.Dataset('private_developments_lhr');

// Create style for the data
var t5style = new carto.style.CartoCSS(`
#layer {
  polygon-fill: #f20040;
  polygon-opacity: 0.9;
}
#layer::outline {
  line-width: 1;
  line-color: #FFFFFF;
  line-opacity: 0.5;
}
`);

// Add style to the data
var t5layer = new carto.layer.Layer(t5source, t5style);



// Add the data to the map as multiple layers. Order matters here--first one goes on the bottom
client.addLayers([t4layer,t5layer,t3layer,t2layer,t1layer]);
client.getLeafletLayer().addTo(map);