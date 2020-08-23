// MapQuest PlaceSearch.js instances
p1 = placeSearch({
  key: '5DgsFQ1mnXNCoEBSGq1GJPdMnDxcsxUy',
  container: document.querySelector('#place-search-input-1')
});
p2 = placeSearch({
  key: '5DgsFQ1mnXNCoEBSGq1GJPdMnDxcsxUy',
  container: document.querySelector('#place-search-input-2')
});

// Leaflet Routing Tool
var map = L.map('mapid').setView([40.724, -73.99], 12);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoic3BjbGFyayIsImEiOiJja2U3ZTY1MzQxZnFhMndxZ2p0ZG1pY21zIn0.O3xM9l0kiuO7SzGwHJ_xKw'
}).addTo(map);

// Assigns coordinates to be used in routing
var pointA, pointB;
p1.on('change', (e) => {
  pointA = e.result.latlng;
});
p2.on('change', (e) => {
  pointB = e.result.latlng;
});

// NavBar functionality
function openNav() {
  navBar = document.getElementById('navBar');
  navBar.style.height = '48vh';
  navBar.style.width = '30vh';
  navBar.style.boxShadow = '1.2vh 1.2vh 0px rgba(204,204,204,0.8)';
  document.getElementById('top').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="clickable icon icon-tabler icon-tabler-x" onclick="closeNav()" width="6vh" height="6vh" viewBox="0 0 24 24" stroke-width="1.5" stroke="#555" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>'
  document.getElementById('top').style.justifyContent = 'flex-start';
}

function closeNav() {
  navBar = document.getElementById('navBar');
  navBar.style.height = '8vh';
  navBar.style.width = '8vh';
  navBar.style.boxShadow = '0.6vh 0.6vh 0px rgba(204,204,204,0.8)';
  document.getElementById('top').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="clickable icon icon-tabler icon-tabler-align-justified" onclick="openNav()" width="6vh" height="6vh" viewBox="0 0 24 24" stroke-width="1.5" stroke="#555" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" /></svg>';
  document.getElementById('top').style.justifyContent = 'center';
  document.getElementById('top').style.width = navBar.style.width;
  document.getElementById('top').style.height = navBar.style.height;
}

var openPanes = []; //Array of all open side panes (lists of options) within the NavBar

function expand(pane) {
  resetPanes();
  openPanes.push(pane);
  pane.style.height = '48vh';
  pane.style.width = '30vh';
  if (0.3*screen.height > 0.5*screen.width) {
    pane.style.left = '48vw';
  }
  pane.style.visibility = 'visible';
}

function close(pane) {
  pane.style.height = '0';
  pane.style.width = '0';
  pane.style.visibility = 'hidden';
}

function resetPanes() {
  for (i in openPanes) {
    close(openPanes[i]);
  }
}

// Contains the lists of all options use can select from
var bigOlContainer = {
  transportList: [],
  timeList: [],
  distanceList: [],
  random: function(list) {
    return list[Math.floor(Math.random() * list.length)];
  }
};

// Modes of transport
var modeOfTransport = function(name, output, quip, speed) {this.name = name; this.output = output; this.quip = quip; this.speed = speed;}
var randomTransport = new modeOfTransport('randomTransport', 'random', 'random', -1);
var bear = new modeOfTransport('bear', 'bear crawling', '', 4.87);
var hangGlider = new modeOfTransport('hangGlider', 'hang gliding', '(Consider starting from really high up)', 35);
var firebolt = new modeOfTransport('firebolt', 'flying on a broomstick', '(Watch out for bludgers)', 150);
var sickAF = new modeOfTransport('sickAF', 'Heelying', '', 5);
var horse = new modeOfTransport('horse', 'riding horseback', '(Bring a cushion for your saddle)', 37);
var heehee = new modeOfTransport('heehee', 'moonwalking', "(Watch out for oncoming traffic)", 5.89);
var boing = new modeOfTransport('boing', 'riding a pogo stick', '', 7.82);
var skate4 = new modeOfTransport('skate4', 'skateboarding', '', 8);
var abra = new modeOfTransport('abra', 'teleporting', '', Infinity);
var unicycle = new modeOfTransport('unicycle', 'riding a unicycle', '(Consider practicing your juggling along the way)', 15);
bigOlContainer.transportList.push(randomTransport, bear, hangGlider, firebolt, sickAF, horse, heehee, boing, skate4, abra, unicycle);

// Units of time
var unitOfTime = function(name, output, duration) {this.name = name; this.output = output; this.duration = duration;}
var randomTime = new unitOfTime('randomTime', 'random', -1);
var popcorn = new unitOfTime('popcorn', 'Bags of Popcorn', 4);
var dogYear = new unitOfTime('dogYear', 'Dog Years', 1314000);
var lotr = new unitOfTime('lotr', 'Lord of the Rings Trilogies', 681);
var martian = new unitOfTime('martian', 'Martian Hours', 61.62);
var millenia = new unitOfTime('millenia', 'Millenia', 5.256e+8);
var seconds = new unitOfTime('seconds', 'Seconds', 0.017);
var slapBass = new unitOfTime('slapBass', 'Episodes of Seinfeld', 22);
var fusRoDah = new unitOfTime('fusRoDah', 'Playthroughs of Skyrim', 2203);
bigOlContainer.timeList.push(randomTime, popcorn, dogYear, lotr, martian, millenia, seconds, slapBass, fusRoDah);

// Units of distance
var unitOfDistance = function(name, output, length) {this.name = name; this.output = output; this.length = length;}
var randomLength = new unitOfDistance('randomLength', 'random', -1);
var boeing = new unitOfDistance('boeing', 'Boeing 747s', 250.17);
var burjKhalifa = new unitOfDistance('burjKhalifa', 'Burj Khalifas', 2722);
var deathStar = new unitOfDistance('deathStar', 'Death Stars', 393701);
var eiffel = new unitOfDistance('eiffel', 'Eiffel Towers', 1063);
var football = new unitOfDistance('football', 'Football Fields', 300);
var furlong = new unitOfDistance('furlong', 'Furlongs', 660);
var yeezy = new unitOfDistance('yeezy', 'Kanyes', 5.58);
var league = new unitOfDistance('league', 'Leagues', 13123.4);
var lightYear = new unitOfDistance('lightYear', 'Light-years', 3.104e+16);
var rhodeIsland = new unitOfDistance('rhodeIsland', 'Rhode Islands', 253440);
var bigRig = new unitOfDistance('bigRig', 'Semi-trucks', 72);
var smoot = new unitOfDistance('smoot', 'Smoots', 5.48);
var subway1 = new unitOfDistance('subway1', 'Pre-2013 $5 Footlongs', 0.92);
var subway2 = new unitOfDistance('subway2', 'Post-2013 $5 Footlongs', 1);
bigOlContainer.distanceList.push(randomLength, boeing, burjKhalifa, deathStar, eiffel, football, furlong, yeezy, league, lightYear, rhodeIsland, bigRig, smoot, subway1, subway2);

// Option selection (random by default)
var transportChoice = bigOlContainer.transportList[0];
var timeChoice = bigOlContainer.timeList[0];
var lengthChoice = bigOlContainer.distanceList[0];

function checkBox(box, choiceType) {
  switch (choiceType) {
    case 'transport':
        document.getElementById(transportChoice.name).innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square" width="4vh" height="4vh" viewBox="0 0 24 24" stroke-width="1.5" stroke="#555555" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><rect x="4" y="4" width="16" height="16" rx="2" /></svg>';
        transportChoice = bigOlContainer.transportList.find(item => item.name == box.id);
      break;
    case 'time':
        document.getElementById(timeChoice.name).innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square" width="4vh" height="4vh" viewBox="0 0 24 24" stroke-width="1.5" stroke="#555555" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><rect x="4" y="4" width="16" height="16" rx="2" /></svg>';
        timeChoice = bigOlContainer.timeList.find(item => item.name == box.id);
      break;
    case 'length':
        document.getElementById(lengthChoice.name).innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square" width="4vh" height="4vh" viewBox="0 0 24 24" stroke-width="1.5" stroke="#555555" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><rect x="4" y="4" width="16" height="16" rx="2" /></svg>';
        lengthChoice = bigOlContainer.distanceList.find(item => item.name == box.id);
      break;
    default: break;
  }
  box.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-check" width="4vh" height="4vh" viewBox="0 0 24 24" stroke-width="1.5" stroke="#555555" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 12l2 2l4 -4" /></svg>'
}

// Routing
var usersRoute;
function createRoute() {
  document.getElementById('summary').style.visibility = 'visible';
  if (usersRoute != null) usersRoute.remove();
  usersRoute = L.Routing.control({
    routeWhileDragging: false,
    show: false,
    collapsible: false,
    waypoints: [pointA, pointB],
    draggableWaypoints: false
  })
  .on('routeselected', function(x) {
    var transport, length, duration; // Properties of units of measurement
    if (transportChoice.name == 'randomTransport') {
      transport = bigOlContainer.random(bigOlContainer.transportList);
      while (transport.name == 'randomTransport') transport = bigOlContainer.random(bigOlContainer.transportList);
    }
    else transport = transportChoice;
    if (lengthChoice.name == 'randomLength') {
      length = bigOlContainer.random(bigOlContainer.distanceList);
      while (length.name == 'randomLength') length = bigOlContainer.random(bigOlContainer.distanceList);
    }
    else length = lengthChoice;
    if (timeChoice.name == 'randomTime') {
      duration = bigOlContainer.random(bigOlContainer.timeList);
      while (duration.name == 'randomTime') duration = bigOlContainer.random(bigOlContainer.timeList);
    }
    else duration = timeChoice;
    var distance = (x.route.summary.totalDistance * 3.281) / length.length; // Route distance in chosen unit
    var time = ((x.route.summary.totalDistance / 1609.34) / transport.speed) * 60/duration.duration;  // Converts time based on car to time based on chosen mode of transport
    if (length.name == 'lightYear') distance = distance.toExponential(2); // Accommodates for larger units of distance
    else distance = distance.toFixed(2);
    if (duration.name == 'dogYear' || duration.name == 'millenia') time = time.toExponential(2); // Accommodates for larger units of time
    else time = time.toFixed(2);
    document.getElementById('distance').innerHTML = distance + ' ' + length.output;
    document.getElementById('time').innerHTML = time + ' ' + duration.output;
    document.getElementById('transport').innerHTML = transport.output;
    document.getElementById('quip').innerHTML = transport.quip;
  })
  .addTo(map);
  document.getElementsByClassName('leaflet-routing-container leaflet-bar leaflet-routing-container-hide leaflet-control')[0].style.visibility = 'hidden'; // Removes unused routing control button
}

// Glossary tabs
function toggleTab(tab) {
  if (tab.style.visibility == 'visible') {
    tab.style.visibility = 'hidden';
    tab.style.position = 'absolute';
  }
  else {
    tab.style.visibility = 'visible';
    tab.style.position = 'static';
  }
}
