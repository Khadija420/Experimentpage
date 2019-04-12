// This isn't necessary but it keeps the editor from thinking L and carto are typos
/* global L, carto */

var map = L.map('map', {
  zoomControl: false
}).setView([31.5204, 74.3587,], 11);

L.control.zoom({ position: 'bottomright' }).addTo(map);

L.tileLayer('https://api.mapbox.com/styles/v1/khadijam/cju7owiur2a481flvy6wpkoxb/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2hhZGlqYW0iLCJhIjoiY2pudnh6YmVpMGU5djNra2pnZmM2eWZvayJ9.6SC49SCRB0lIHXEw_hLTJQ', {
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
var PDsource = new carto.source.SQL('SELECT * FROM private_developments_lhr');

// Create style for the data
var PDstyle = new carto.style.CartoCSS(`
#layer {
  polygon-fill: #00f218;
  polygon-opacity: 0.7;
}
#layer::outline {
  line-width: 1;
  line-color: #FFFFFF;
  line-opacity: 0.5;
}
`);
// Add style to the data


// Note: any column you want to show up in the popup needs to be in the list of
// featureClickColumns below
var PDlayer = new carto.layer.Layer(PDsource, PDstyle, {
  featureClickColumns: ['name', 'type','established']
});
PDlayer.hide();

PDlayer.on('featureClicked', function (event) {
  // Create the HTML that will go in the popup. event.data has all the data for 
  // the clicked feature.
  //
  // I will add the content line-by-line here to make it a little easier to read.
  var content = '<h1>' + event.data['name'] + '</h1>';
  content += 'established<div>' + event.data['established'] + ' </div>';
  content += 'type<div>' + event.data['type'] + ' </div>';
  
  // If you're not sure what data is available, log it out:
  console.log(event.data);
  
  var popup = L.popup();
  popup.setContent(content);
  
  // Place the popup and open it
  popup.setLatLng(event.latLng);
  popup.openOn(map);
});

// When the Real Estate Development button is clicked, show or hide the layer
var PDCheckbox = document.querySelector('.PD-checkbox');
var PDLegend = document.querySelector('.legend-PD');
PDCheckbox.addEventListener('click', function () {
  if (PDCheckbox.checked) {
    PDlayer.show();
    PDLegend.style.display = 'block';
  }
  else {
    PDlayer.hide();
    PDLegend.style.display = 'none';
  }
});


/*
 * Begin layer two
 */

// Initialze source data
var SRsource = new carto.source.Dataset('stations_routes');

// Create style for the data
var SRstyle = new carto.style.CartoCSS(`
#layer {
  line-width: 4;
  line-color: ramp([source], (#5275bc, #efae15, #8239ac, #f20109, #A5AA99), ("Blue Line Path", "Orange Line Path", "Purple Line path", "Red Metro Bus Station Path"), "=");
}
`);


// Add style to the data

//POPUP CODE 
// Note: any column you want to show up in the popup needs to be in the list of
// featureClickColumns below
var SRlayer = new carto.layer.Layer(SRsource, SRstyle, {
  featureClickColumns: ['source','date']
});
SRlayer.hide();

SRlayer.on('featureClicked', function (event) {
  // Create the HTML that will go in the popup. event.data has all the data for 
  // the clicked feature.
  //
  // I will add the content line-by-line here to make it a little easier to read.
  var content = '<h1>' + event.data['source'] + '</h1>';
  content += 'Expected completion date:<div>' + event.data['date'] + ' </div>';
  
  // If you're not sure what data is available, log it out:
  console.log(event.data);
  
  var popup = L.popup();
  popup.setContent(content);
  
  // Place the popup and open it
  popup.setLatLng(event.latLng);
  popup.openOn(map);
});

// When the subway route button is clicked, show or hide the layer
var routeCheckbox = document.querySelector('.route-checkbox');
var routeLegend = document.querySelector('.legend-route');
routeCheckbox.addEventListener('click', function () {
  if (routeCheckbox.checked) {
    SRlayer.show();
    routeLegend.style.display = 'block';
  }
  else {
    SRlayer.hide();
    routeLegend.style.display = 'none';
  }
});


/*
 * Begin layer three
 */

// Initialze source data
var PDSsource = new carto.source.Dataset('population_density_sq_km_');

// Create style for the data
var PDSstyle = new carto.style.CartoCSS(`
#layer {
  polygon-fill: ramp([density], (#fbe6c5, #f5ba98, #ee8a82, #dc7176, #c8586c, #9c3f5d, #70284a), quantiles);
  polygon-opacity: 0.5;
  polygon-comp-op: multiply;
}
#layer::outline {
  line-width: 0.5;
  line-color: #0e0e0e;
  line-opacity: 0.5;
}
  `);

// Add style to the data

//POPUP CODE
// Note: any column you want to show up in the popup needs to be in the list of
// featureClickColumns below
var PDSlayer = new carto.layer.Layer(PDSsource, PDSstyle, {
  featureClickColumns: ['uc','density']
});
PDSlayer.hide();

PDSlayer.on('featureClicked', function (event) {
  // Create the HTML that will go in the popup. event.data has all the data for 
  // the clicked feature.
  //
  // I will add the content line-by-line here to make it a little easier to read.
  var content = '<h1>' + event.data['uc'] + '</h1>';
  content += '<div>' + event.data['density'] + ' per sq.km.</div>';
  
  // If you're not sure what data is available, log it out:
  console.log(event.data);
  
  var popup = L.popup();
  popup.setContent(content);
  
  // Place the popup and open it
  popup.setLatLng(event.latLng);
  popup.openOn(map);
});

// When the density button is clicked, show or hide the layer
var densityCheckbox = document.querySelector('.density-checkbox');
var densityLegend = document.querySelector('.legend-density');
densityCheckbox.addEventListener('click', function () {
  if (densityCheckbox.checked) {
    PDSlayer.show();
    densityLegend.style.display = 'block';
  }
  else {
    PDSlayer.hide();
    densityLegend.style.display = 'none';
  }
});


/*
 * Begin layer four_ALL_STATIONS
 */

// Initialze source data
var STsource = new carto.source.Dataset('stations_merged_file');

// Create style for the data
var STstyle = new carto.style.CartoCSS(`
#layer {
  marker-width: 12;
  marker-fill: #f5dd00;
  marker-fill-opacity: 1;
  marker-file: url('https://s3.amazonaws.com/com.cartodb.users-assets.production/maki-icons/rail-18.svg');
  marker-allow-overlap: true;
  marker-line-width: 0;
  marker-line-color: #FFFFFF;
  marker-line-opacity: 0;
} 
`);

// Add style to the data
//POPUP CODE
// Note: any column you want to show up in the popup needs to be in the list of
// featureClickColumns below
var STlayer = new carto.layer.Layer(STsource, STstyle, {
  featureClickColumns: ['station','project_cost',]
});
STlayer.hide();

STlayer.on('featureClicked', function (event) {
  // Create the HTML that will go in the popup. event.data has all the data for 
  // the clicked feature.
  //
  // I will add the content line-by-line here to make it a little easier to read.
    var content = '<h1>' + event.data['station'] + '</h1>';
  content += '<div>' + event.data['project_cost'] + ' per sq.km.</div>';
  
  // If you're not sure what data is available, log it out:
  console.log(event.data);
  
  var popup = L.popup();
  popup.setContent(content);
  
  // Place the popup and open it
  popup.setLatLng(event.latLng);
  popup.openOn(map);
});


// When the subway station button is clicked, show or hide the layer
var stationCheckbox = document.querySelector('.station-checkbox');
var stationLegend = document.querySelector('.legend-station');
stationCheckbox.addEventListener('click', function () {
  if (stationCheckbox.checked) {
    STlayer.show();
    stationLegend.style.display = 'block';
  }
  else {
    STlayer.hide();
    stationLegend.style.display = 'none';
  }
});


/*
 * Begin layer five-EVENTS
 */

// Initialze source data
var EVsource = new carto.source.SQL('SELECT * FROM event');

// Create style for the data
var EVstyle = new carto.style.CartoCSS(`
#layer {
  marker-width: 15;
  marker-fill: #EE4D5A;
  marker-fill-opacity: 0.6;
  marker-allow-overlap: true;
  marker-line-width: 1;
  marker-line-color: #FFFFFF;
  marker-line-opacity: 0;
}
`);

// Add style to the data
//POPUP CODE
// Note: any column you want to show up in the popup needs to be in the list of
// featureClickColumns below
var EVlayer = new carto.layer.Layer(EVsource, EVstyle, {
  featureClickColumns: ['name','description', '_when','who']
});

EVlayer.on('featureClicked', function (event) {
  // Create the HTML that will go in the popup. event.data has all the data for 
  // the clicked feature.
  //
  // I will add the content line-by-line here to make it a little easier to read.
  var content = '<h1>' + event.data['name'] + '</h1>';
  content += '<div>Description:' + event.data['description'] + '</div>';
  content += '<div>When: ' + event.data['_when'] + '</div>';
  content += '<div>Who: ' + event.data['who'] + '</div>';
  
  // If you're not sure what data is available, log it out:
  console.log(event.data);
  
  var popup = L.popup();
  popup.setContent(content);
  
    var popup = L.popup();
  EVlayer.on('featureClicked', function (event) {
  // Create the HTML that will go in the popup. event.data has all the data for 
  // the clicked feature.
  //
  // I will add the content line-by-line here to make it a little easier to read.
  var content = '<h1>' + event.data['name'] + '</h1>'
  content += '<h4>' + event.data['description'] + ' <h4>';
  popup.setContent(content);
  
  var sidebar = document.querySelector('.sidebar-content');
  sidebar.style.display = 'block';
  
  var panelClose = document.querySelector('.panel-close');
  panelClose.style.display = 'block';
  
  var content = '<h3>' + event.data['name'] + '</h3>'
  content += '<h4>' + event.data['description'] + ' <h4>';
  
  if (event.data['image'] == null) {
    content += '<d>Sorry! No image available</div>';
  }
  else {
    content += '<img src="' + event.data['image'] + '"/>';
  }
    
  content += '<h5>When:' + event.data['_when'] + ' <h5>';
  content += '<div>Who: ' + event.data['who'] + ' </div>';
    
   if (event.data ['who'] == null) {
    content += '<d>Sorry! Information not available</div>';
  }
  else {
  content += '<div>who: ' + event.data['who'] + ' </div>';
  }  
  
  content += '<a href="' + event.data['url'] + '" target="_blank"> More information </a>';  
  
  
  // Then put the HTML inside the sidebar. Once you click on a feature, the HTML
  // for the sidebar will change.
  sidebar.innerHTML = content;
  
  // Place the popup and open it
  popup.setLatLng(event.latLng);
  popup.openOn(map);

  // Zoom to the latitude and longitude of the clicked feature
  map.setView([event.latLng.lat, event.latLng.lng], 15);
});
  
  // Place the popup and open it
  popup.setLatLng(event.latLng);
  popup.openOn(map);
});

/*Dropdownmenu*/
/*
 * Listen for changes on the layer picker
 */

// Step 1: Find the dropdown by class. If you are using a different class, change this.
var eventPicker = document.querySelector('.event-picker');

// Step 2: Add an event listener to the dropdown. We will run some code whenever the dropdown changes.
eventPicker.addEventListener('change', function (e) {
  // The value of the dropdown is in e.target.value when it changes
  var type_of_event = e.target.value;
  
  // Step 3: Decide on the SQL query to use and set it on the datasource
  if (type_of_event === 'all') {
    // If the value is "all" then we show all of the features, unfiltered
    EVsource.setQuery("SELECT * FROM event");
  }
  else {
    // Else the value must be set to a life stage. Use it in an SQL query that will filter to that life stage.
    EVsource.setQuery("SELECT * FROM event WHERE type_of_event = '" + type_of_event + "'");
  }
  
  // Sometimes it helps to log messages, here we log the lifestage. You can see this if you open developer tools and look at the console.
  console.log('Dropdown changed to "' + type_of_event + '"');
});

  /*Dropdownmenu*/
/*
 * Listen for changes on the layer picker
 */

// Step 1: Find the dropdown by class. If you are using a different class, change this.
var whoPicker = document.querySelector('.who-picker');

// Step 2: Add an event listener to the dropdown. We will run some code whenever the dropdown changes.
whoPicker.addEventListener('change', function (e) {
  // The value of the dropdown is in e.target.value when it changes
  var whodidit = e.target.value;
  
  // Step 3: Decide on the SQL query to use and set it on the datasource
  if (whodidit === 'all') {
    // If the value is "all" then we show all of the features, unfiltered
    EVsource.setQuery("SELECT * FROM event");
  }
  else {
    // Else the value must be set to a life stage. Use it in an SQL query that will filter to that life stage.
    EVsource.setQuery("SELECT * FROM event WHERE who = '" + whodidit + "'");
  }
  
  // Sometimes it helps to log messages, here we log the lifestage. You can see this if you open developer tools and look at the console.
  console.log('Dropdown changed to "' + whodidit + '"');
});

/*
 * Begin layer six-INFRASTRUCTURE PROJECTS
 */

// Initialze source data
var IPsource = new carto.source.SQL('SELECT * FROM infrastructure_projects');

// Create style for the data
var IPstyle = new carto.style.CartoCSS(`
#layer {
  marker-width: 15;
  marker-fill: #0000FF;
  marker-fill-opacity: 0.6;
  marker-allow-overlap: true;
  marker-line-width: 1;
  marker-line-color: #FFFFFF;
  marker-line-opacity: 0;
}
`);

// Add style to the data
//POPUP CODE
// Note: any column you want to show up in the popup needs to be in the list of
// featureClickColumns below
var IPlayer = new carto.layer.Layer(IPsource, IPstyle, {
  featureClickColumns: ['name','description', 'year','outcome']
});

IPlayer.on('featureClicked', function (event) {
  // Create the HTML that will go in the popup. event.data has all the data for 
  // the clicked feature.
  //
  // I will add the content line-by-line here to make it a little easier to read.
  var content = '<h1>' + event.data['name'] + '</h1>';
  content += '<div>Description:' + event.data['description'] + '</div>';
  content += '<div>When: ' + event.data['year'] + '</div>';
  content += '<div>Outcome: ' + event.data['outcome'] + '</div>';
  popup.setContent(content);
  console.log('featureClick');
  });
  
 
  var popup = L.popup();
  IPlayer.on('featureClicked', function (event) {
  // Create the HTML that will go in the popup. event.data has all the data for 
  // the clicked feature.
  //
  // I will add the content line-by-line here to make it a little easier to read.
  var content = '<h1>' + event.data['name'] + '</h1>'
  content += '<h4>' + event.data['description'] + ' <h4>';
  popup.setContent(content);
  
  var sidebar = document.querySelector('.sidebar-content');
  sidebar.style.display = 'block';
  
  var panelClose = document.querySelector('.panel-close');
  panelClose.style.display = 'block';
  
  var content = '<h3>' + event.data['name'] + '</h3>'
  content += '<h4>' + event.data['description'] + ' <h4>';
  
  if (event.data['image'] == null) {
    content += '<d>Sorry! No image available</div>';
  }
  else {
    content += '<img src="' + event.data['image'] + '"/>';
  }
    
  content += '<h5>When:' + event.data['year'] + ' <h5>';
  content += '<div>Project Cost: ' + event.data['project_cost'] + ' </div>';
    
   if (event.data ['project_cost'] == null) {
    content += '<d>Sorry! Information not available</div>';
  }
  else {
  content += '<div>Project Cost: ' + event.data['project_cost'] + ' </div>';
  }  
  
  content += '<a href="' + event.data['url'] + '" target="_blank"> More information </a>';  
  
  
  // Then put the HTML inside the sidebar. Once you click on a feature, the HTML
  // for the sidebar will change.
  sidebar.innerHTML = content;
  
  // Place the popup and open it
  popup.setLatLng(event.latLng);
  popup.openOn(map);

  // Zoom to the latitude and longitude of the clicked feature
  map.setView([event.latLng.lat, event.latLng.lng], 15);
});
  

/*Dropdownmenu*/
/*
 * Listen for changes on the layer picker
 */

// Step 1: Find the dropdown by class. If you are using a different class, change this.
var projectPicker = document.querySelector('.project-picker');

// Step 2: Add an event listener to the dropdown. We will run some code whenever the dropdown changes.
projectPicker.addEventListener('change', function (e) {
  // The value of the dropdown is in e.target.value when it changes
  var outcomevalue = e.target.value;
  
  // Step 3: Decide on the SQL query to use and set it on the datasource
  if (outcomevalue=== 'all') {
    // If the value is "all" then we show all of the features, unfiltered
    IPsource.setQuery("SELECT * FROM infrastructure_projects");
  }
  else {
    // Else the value must be set to a life stage. Use it in an SQL query that will filter to that life stage.
    IPsource.setQuery("SELECT * FROM infrastructure_projects WHERE outcome = '" + outcomevalue + "'");
  }
  
  // Sometimes it helps to log messages, here we log the lifestage. You can see this if you open developer tools and look at the console.
  console.log('Dropdown changed to "' + outcomevalue + '"');
});
 

/*
 * Begin layer seven-ORGANIZATIONS
 */

// Initialze source data
var ORsource = new carto.source.SQL('SELECT * FROM organizations');

// Create style for the data
var ORstyle = new carto.style.CartoCSS(`
#layer {
  marker-width: 15;
  marker-fill: #ee4de9;
  marker-fill-opacity: 0.6;
  marker-allow-overlap: true;
  marker-line-width: 1;
  marker-line-color: #FFFFFF;
  marker-line-opacity: 0;
}
`);
/*
// Add style to the data
//POPUP CODE
// Note: any column you want to show up in the popup needs to be in the list of
// featureClickColumns below
var ORlayer = new carto.layer.Layer(ORsource, ORstyle, {
  featureClickColumns: ['name','description', 'year_formed','organization_type']
});

ORlayer.on('featureClicked', function (event) {
  // Create the HTML that will go in the popup. event.data has all the data for 
  // the clicked feature.
  //
  // I will add the content line-by-line here to make it a little easier to read.
  var content = '<h1>' + event.data['name'] + '</h1>';
  content += '<div>Description:' + event.data['description'] + '</div>';
  content += '<div>When: ' + event.data['year_formed'] + '</div>';
  content += '<div>Type: ' + event.data['organization_type'] + '</div>';
  
  // If you're not sure what data is available, log it out:
  console.log(event.data);
  
  var popup = L.popup();
  popup.setContent(content);
  
  // Place the popup and open it
  popup.setLatLng(event.latLng);
  popup.openOn(map);
});
*/

// Add style to the data
//POPUP CODE
// Note: any column you want to show up in the popup needs to be in the list of
// featureClickColumns below
var ORlayer = new carto.layer.Layer(ORsource, ORstyle, {
  featureClickColumns: ['name','description','organization_type','year_formed']
});

ORlayer.on('featureClicked', function (event) {
  // Create the HTML that will go in the popup. event.data has all the data for 
  // the clicked feature.
  //
  // I will add the content line-by-line here to make it a little easier to read.
  var content = '<h1>' + event.data['name'] + '</h1>';
  content += '<div>Description:' + event.data['description'] + '</div>';
  content += '<div>When: ' + event.data['year_formed'] + '</div>';
  content += '<div>Organization type: ' + event.data['organization_type'] + '</div>';
  popup.setContent(content);
  console.log('featureClick');
  });
  
 
  var popup = L.popup();
  ORlayer.on('featureClicked', function (event) {
  // Create the HTML that will go in the popup. event.data has all the data for 
  // the clicked feature.
  //
  // I will add the content line-by-line here to make it a little easier to read.
  var content = '<h1>' + event.data['name'] + '</h1>'
  content += '<h4>' + event.data['organization_type'] + ' <h4>';
  popup.setContent(content);
  
  var sidebar = document.querySelector('.sidebar-content');
  sidebar.style.display = 'block';
  
  var panelClose = document.querySelector('.panel-close');
  panelClose.style.display = 'block';
  
  var content = '<h3>' + event.data['name'] + '</h3>'
  content += '<h4>' + event.data['description'] + ' <h4>';
  
  if (event.data['image'] == null) {
    content += '<d>Sorry! No image available</div>';
  }
  else {
    content += '<img src="' + event.data['image'] + '"/>';
  }
    
  
  content += '<h5>When:' + event.data['year_formed'] + ' <h5>';
  content += '<div>url: ' + event.data['url'] + ' </div>';
    
   if (event.data ['url'] == null) {
    content += '<d>Sorry! Information not available</div>';
  }
  else {
  content += '<a href="' + event.data['url'] + '" target="_blank"> More information </a>';  
  }  
  
  
  
  
  // Then put the HTML inside the sidebar. Once you click on a feature, the HTML
  // for the sidebar will change.
  sidebar.innerHTML = content;
  
  // Place the popup and open it
  popup.setLatLng(event.latLng);
  popup.openOn(map);

  // Zoom to the latitude and longitude of the clicked feature
  map.setView([event.latLng.lat, event.latLng.lng], 15);
});
  


/*Dropdownmenu*/
/*
 * Listen for changes on the layer picker
 */

// Step 1: Find the dropdown by class. If you are using a different class, change this.
var organizationPicker = document.querySelector('.organization-picker');

// Step 2: Add an event listener to the dropdown. We will run some code whenever the dropdown changes.
organizationPicker.addEventListener('change', function (e) {
  // The value of the dropdown is in e.target.value when it changes
  var org = e.target.value;
  
  // Step 3: Decide on the SQL query to use and set it on the datasource
  if (org=== 'all') {
    // If the value is "all" then we show all of the features, unfiltered
    ORsource.setQuery("SELECT * FROM organizations");
  }
  else {
    // Else the value must be set to a life stage. Use it in an SQL query that will filter to that life stage.
    ORsource.setQuery("SELECT * FROM organizations WHERE organization_type = '" + org + "'");
  }
  
  // Sometimes it helps to log messages, here we log the lifestage. You can see this if you open developer tools and look at the console.
  console.log('Dropdown changed to "' + org + '"');
});
 

/*
 * Begin layer eight- Existing Bus stops
 */

// Initialze source data
var BSsource = new carto.source.SQL('SELECT * FROM existing_bus_stops');

// Create style for the data
var BSstyle = new carto.style.CartoCSS(`
#layer {
  marker-width: 12;
  marker-fill: #4deeee;
  marker-fill-opacity: 0.6;
  marker-allow-overlap: true;
  marker-line-width: 1;
  marker-line-color: #FFFFFF;
  marker-line-opacity: 0;
}
`);
// Add style to the data


// Note: any column you want to show up in the popup needs to be in the list of
// featureClickColumns below
var BSlayer = new carto.layer.Layer(BSsource, BSstyle, {
  featureClickColumns: ['name','fclass']
});
BSlayer.hide();

BSlayer.on('featureClicked', function (event) {
  // Create the HTML that will go in the popup. event.data has all the data for 
  // the clicked feature.
  //
  // I will add the content line-by-line here to make it a little easier to read.
  var content = '<h1>' + event.data['fclass'] + '</h1>';
  content += 'Located at:<div>' + event.data['name'] + ' </div>';
  
  // If you're not sure what data is available, log it out:
  console.log(event.data);
  
  var popup = L.popup();
  popup.setContent(content);
  
  // Place the popup and open it
  popup.setLatLng(event.latLng);
  popup.openOn(map);
});

// When the existing infrastructure button is clicked, show or hide the layer
var busstopsCheckbox = document.querySelector('.busstops-checkbox');
var busstopsLegend = document.querySelector('.legend-busstops');
busstopsCheckbox.addEventListener('click', function () {
  if (busstopsCheckbox.checked) {
    BSlayer.show();
    busstopsLegend.style.display = 'block';
  }
  else {
    BSlayer.hide();
    busstopsLegend.style.display = 'none';
  }
});

/*
 * Begin layer nine- 1984 road network
 */

// Initialze source data
var RNOsource = new carto.source.Dataset('table_1984_road_network');

// Create style for the data
var RNOstyle = new carto.style.CartoCSS(`
#layer {
  line-width: 1.5;
  line-color: #4CC8A3;
  line-opacity: 1;
}
`);
// Add style to the data


// Note: any column you want to show up in the popup needs to be in the list of
// featureClickColumns below
var RNOlayer = new carto.layer.Layer(RNOsource, RNOstyle);
RNOlayer.hide();



// When the 1984 road network button is clicked, show or hide the layer
var RN84Checkbox = document.querySelector('.RN84-checkbox');
var RN84Legend = document.querySelector('.legend-RN84');
RN84Checkbox.addEventListener('click', function () {
  if (RN84Checkbox.checked) {
    RNOlayer.show();
    RN84Legend.style.display = 'block';
  }
  else {
    RNOlayer.hide();
    RN84Legend.style.display = 'none';
  }
});

/*
 * Begin layer ten - Landuse 
 */

// Initialze source data
var LUsource = new carto.source.Dataset('land_use_merged_file_1');

// Create style for the data
var LUstyle = new carto.style.CartoCSS(`
#layer {
  polygon-fill: ramp([fclass], (#E58606, #5D69B1, #52BCA3, #99C945, #CC61B0, #24796C, #DAA51B, #2F8AC4, #764E9F, #ED645A, #ea1700), ("park", "grass", "residential", "pitch", "cemetery", "graveyard", "bank", "restaurant", "school", "hospital"), "=");
}
#layer::outline {
  line-width: 1;
  line-color: #FFFFFF;
  line-opacity: 0.5;
}
`);
// Add style to the data


// Note: any column you want to show up in the popup needs to be in the list of
// featureClickColumns below
var LUlayer = new carto.layer.Layer(LUsource, LUstyle);
LUlayer.hide();



// When the 1984 road network button is clicked, show or hide the layer
var LUCheckbox = document.querySelector('.LU-checkbox');
var LULegend = document.querySelector('.legend-LU');
LUCheckbox.addEventListener('click', function () {
  if (LUCheckbox.checked) {
    LUlayer.show();
    LULegend.style.display = 'block';
  }
  else {
    LUlayer.hide();
    LULegend.style.display = 'none';
  }
});




// Add the data to the map as multiple layers. Order matters here--first one goes on the bottom
client.addLayers([PDSlayer,LUlayer,PDlayer,RNOlayer,BSlayer,SRlayer,STlayer,IPlayer,EVlayer,ORlayer]);
client.getLeafletLayer().addTo(map);


