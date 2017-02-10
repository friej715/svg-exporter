"use strict";

require("babel-polyfill");
var _ = require("lodash")

var express = require('express');
var router = express.Router();
var fs = require('fs');
var jsdom = require('jsdom');

var d3 = require('d3');
var XMLHttpRequest = require('xhr2')

// use key saved in config file if there is a config file in same directory
if (fs.existsSync( __dirname + '/config.js')) {
  var config = require('./config.js')
}

var Promise = require('promise/lib/es6-extensions');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Let's make map" });
});


router.get('/request-map', function(req, res, next) {
  res.redirect('/', { title: "Let's make map" });
});

function setupJson(dKinds) {
  var formattedJson = {};
  // var dataKind = dKinds.join(',');
  // console.log(dKinds)

  for (let i = 0; i < dKinds.length; i++) {
    let layerName = dKinds[i]["source-layer"];
    if (layerName == dKinds[i].id && dKinds[i].id.indexOf("temp") == -1) {
      // that means that All is checked;
      if(layerName === 'roads') {
        formattedJson[layerName] = {
          major_road: {
            features: []
          },
          minor_road: {
            features: []
          },
          highway: {
            features:[]
          },
          aerialway: {
            features: []
          },
          rail: {
            features:[]
          },
          path: {
            features:[]
          },
          ferry: {
            features:[]
          },
          etc: {
            features: []
          }
        }
      } else if (layerName === 'boundaries') {
        formattedJson[layerName] = {
          country: {
            features: []
          },
          county: {
            features: []
          },
          disputed: {
            features: []
          },
          indefinite: {
            features: []
          },
          interminate: {
            features: []
          },
          lease_limit: {
            features: []
          },
          line_of_control: {
            features: []
          },
          locality: {
            features: []
          },
          microregion: {
            features: []
          },
          map_unit: {
            features: []
          },
          region: {
            features: []
          },
          etc: {
            features: []
          }
        }
      } 
      else if (layerName === 'buildings') {
        formattedJson[layerName] = {
          abandoned: {
            features: []
          },
          administrative: {
                  features: []
          },
          agricultural: {
                  features: []
          },
          airport: {
                  features: []
          },
          allotment_house: {
                  features: []
          },
          apartments: {
                  features: []
          },
          arbour: {
                  features: []
          },
          bank: {
                  features: []
          },
          barn: {
                  features: []
          },
          basilica: {
                  features: []
          },
          beach_hut: {
                  features: []
          },
          bell_tower: {
                  features: []
          },
          boathouse: {
                  features: []
          },
          brewery: {
                  features: []
          },
          bridge: {
                  features: []
          },
          bungalow: {
                  features: []
          },
          bunker: {
                  features: []
          },
          cabin: {
                  features: []
          },
          carport: {
                  features: []
          },
          castle: {
                  features: []
          },
          cathedral: {
                  features: []
          },
          chapel: {
                  features: []
          },
          chimney: {
                  features: []
          },
          church: {
                  features: []
          },
          civic: {
                  features: []
          },
          clinic: {
                  features: []
          },
          closed: {
                  features: []
          },
          clubhouse: {
                  features: []
          },
          collapsed: {
                  features: []
          },
          college: {
                  features: []
          },
          commercial: {
                  features: []
          },
          construction: {
                  features: []
          },
          container: {
                  features: []
          },
          convent: {
                  features: []
          },
          cowshed: {
                  features: []
          },
          dam: {
                  features: []
          },
          damaged: {
                  features: []
          },
          depot: {
                  features: []
          },
          destroyed: {
                  features: []
          },
          detached: {
                  features: []
          },
          disused: {
                  features: []
          },
          dormitory: {
                  features: []
          },
          duplex: {
                  features: []
          },
          factory: {
                  features: []
          },
          farm: {
                  features: []
          },
          farm_auxiliary: {
                  features: []
          },
          fire_station: {
                  features: []
          },
          garage: {
                  features: []
          },
          garages: {
                  features: []
          },
          gazebo: {
                  features: []
          },
          ger: {
                  features: []
          },
          glasshouse: {
                  features: []
          },
          government: {
                  features: []
          },
          grandstand: {
                  features: []
          },
          greenhouse: {
                  features: []
          },
          hangar: {
                  features: []
          },
          healthcare: {
                  features: []
          },
          hermitage: {
                  features: []
          },
          historical: {
                  features: []
          },
          hospital: {
                  features: []
          },
          hotel: {
                  features: []
          },
          house: {
                  features: []
          },
          houseboat: {
                  features: []
          },
          hut: {
                  features: []
          },
          industrial: {
                  features: []
          },
          kindergarten: {
                  features: []
          },
          kiosk: {
                  features: []
          },
          library: {
                  features: []
          },
          mall: {
                  features: []
          },
          manor: {
                  features: []
          },
          manufacture: {
                  features: []
          },
          mixed_use: {
                  features: []
          },
          mobile_home: {
                  features: []
          },
          monastery: {
                  features: []
          },
          mortuary: {
                  features: []
          },
          mosque: {
                  features: []
          },
          museum: {
                  features: []
          },
          office: {
                  features: []
          },
          outbuilding: {
                  features: []
          },
          parking: {
                  features: []
          },
          pavilion: {
                  features: []
          },
          power: {
                  features: []
          },
          prison: {
                  features: []
          },
          proposed: {
                  features: []
          },
          pub: {
                  features: []
          },
          public: {
                  features: []
          },
          residential: {
                  features: []
          },
          restaurant: {
                  features: []
          },
          retail: {
                  features: []
          },
          roof: {
                  features: []
          },
          ruin: {
                  features: []
          },
          ruins: {
                  features: []
          },
          school: {
                  features: []
          },
          semidetached_house: {
                  features: []
          },
          service: {
                  features: []
          },
          shed: {
                  features: []
          },
          shelter: {
                  features: []
          },
          shop: {
                  features: []
          },
          shrine: {
                  features: []
          },
          silo: {
                  features: []
          },
          slurry_tank: {
                  features: []
          },
          stable: {
                  features: []
          },
          stadium: {
                  features: []
          },
          static_caravan: {
                  features: []
          },
          storage: {
                  features: []
          },
          storage_tank: {
                  features: []
          },
          store: {
                  features: []
          },
          substation: {
                  features: []
          },
          summer_cottage: {
                  features: []
          },
          summer_house: {
                  features: []
          },
          supermarket: {
                  features: []
          },
          synagogue: {
                  features: []
          },
          tank: {
                  features: []
          },
          temple: {
                  features: []
          },
          terrace: {
                  features: []
          },
          tower: {
                  features: []
          },
          train_station: {
                  features: []
          },
          transformer_tower: {
                  features: []
          },
          transportation: {
                  features: []
          },
          university: {
                  features: []
          },
          utility: {
                  features: []
          },
          veranda: {
                  features: []
          },
          warehouse: {
                  features: []
          },
          wayside_shrine: {
                  features: []
          },
          works: {
                  features: []
          },
        }
      }
      else if (layerName === 'water') {
        formattedJson[layerName] = {
          basin: {
            features: []
          },
          bay: {
            features: []
          },
          dock: {
            features: []
          },
          lake: {
            features: []
          },
          ocean: {
            features: []
          },
          river: {
            features: []
          },
          riverbank: {
            features: []
          },
          swimming_pool: {
            features: []
          },
          etc: {
            features: []
          }
        }
      }
      else
        formattedJson[layerName] = {
          etc: {
            features: []
          }
        }
    } 
    else {
      let subLayer = dKinds[i]["id"];
      if (formattedJson[layerName]) {
        formattedJson[layerName][subLayer] = {features: []}
      } else {
        formattedJson[layerName] = {};
        formattedJson[layerName][subLayer] = {features: []}
      }

    }
    
  }
  console.log(formattedJson)
  return formattedJson;
}


function getTilesToFetch(startLat, endLat, startLon, endLon) {
  const tilesToFetch = [];
  // for(let i = startLon; i <= endLon; i++) lonArr.push(i);
  for(let j = startLat; j <= endLat; j++) {
    const coords = [];
    for(let i = startLon; i <= endLon; i++) {
      coords.push({
        lat: j,
        lon: i
      });
    }
    tilesToFetch.push(coords);
  }
  return tilesToFetch;
}

router.post('/request-map', function(req, res, next) {
  var startLat, endLat, startLon, endLon;

  // -74.0059700, 40.7142700
  // 74.0059700 W, 40.7142700 N
  var zoom = parseInt(req.body.zoomLevel);

  var lat1 = lat2tile(parseFloat(req.body.startLat), zoom)
  var lat2 = lat2tile(parseFloat(req.body.endLat), zoom)

  var lon1 = long2tile(parseFloat(req.body.startLon), zoom)
  var lon2 = long2tile(parseFloat(req.body.endLon), zoom)

  if(lat1 > lat2) {
    startLat = lat2;
    endLat = lat1;
  } else {
    startLat = lat1;
    endLat = lat2;
  }

  if(lon1 > lon2) {
    startLon = lon2;
    endLon = lon1;
  } else {
    startLon = lon1;
    endLon = lon2;
  }

  var tileWidth = 100;

  // "boundaries, buildings, earth, landuse, places, pois, roads, transit, water"
  // need uis for datakind, zoom

  var dKinds = [];
  let style = JSON.parse(req.body.curStyle)
  dKinds = style.map(function(v) {
    return {
      id: v.id,
      source: v["source-layer"]
    }
  })

  var tilesToFetch = getTilesToFetch(startLat, endLat, startLon, endLon);

  var key = req.body.apikey || config.key;

  var delayTime = 1000;

  var outputLocation = 'svgmap'+ tilesToFetch[0][0].lon +'-'+tilesToFetch[0][0].lat +'-'+zoom +'.svg';

  var data;

  var xCount = tilesToFetch.length-1;//latArr.length - 1;
  var yCount = tilesToFetch[0].length-1;//lonArr.length - 1;
  var originalYCount = yCount;


  function getURL(x, y) {
    var xc = x;
    var yc = y;
    if (x < 0) xc = 0;
    if (y < 0) yc = 0;

    return "https://tile.mapzen.com/mapzen/vector/v1/all/"+zoom+"/"+tilesToFetch[xc][yc].lon + "/" + tilesToFetch[xc][yc].lat + ".json?api_key="+key;
  }

  var jsonArray = [];

  function makeCall() {
    var request = new XMLHttpRequest();
    var url = getURL(xCount, yCount);
    console.log(url);
    request.open('GET', url, true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        jsonArray.push(data);
        console.log(jsonArray)

        if (xCount > 0) {
          if (yCount > 0) {
            yCount--;
          } else {
            xCount--;
            yCount = originalYCount;
          }
          setTimeout(makeCall, delayTime);
        } else {
          if (xCount === 0) {
            if (yCount > 0) {
              yCount--;
              setTimeout(makeCall, delayTime);
            } else {
              bakeJson(jsonArray);
            }
          }
        }
      } else {
        console.log('We reached our target server, but it returned an error')
      }
    };

    request.onerror = function() {
      console.log('There was a connection error of some sort');
      // There was a connection error of some sort
    };
    request.send();
  }


  function bakeJson(resultArray) {  // response geojson array
  var geojsonToReform = setupJson(style);

  for (let layer of dKinds) {
    for (let result of resultArray) {
      for (let response in result) {
        if (layer.id == response || layer.source == response) {
          let responseResult = result[response]
          
          for (let feature of responseResult.features) {
            console.log(feature)
            let dataKindTitle = (layer.source == "buildings") ? feature.properties.kind_detail : feature.properties.kind
            if (geojsonToReform[response]) {
              if (geojsonToReform[response].hasOwnProperty(dataKindTitle)) {
                geojsonToReform[response][dataKindTitle].features.push(feature);
              } else {
                geojsonToReform[response]
              }
            }
          }
        } 
      }
    }

  }
  console.log(geojsonToReform)
  writeSVGFile(geojsonToReform);
}

  function writeSVGFile(reformedJson) {
    //d3 needs query selector from dom
    jsdom.env({
      html: '',
      features: { QuerySelector: true }, //you need query selector for D3 to work
      done: function(errors, window) {
        window.d3 = d3.select(window.document);

        var svg = window.d3.select('body')
              .append('div').attr('class','container') //make a container div to ease the saving process
              .append('svg')
              .attr({
                xmlns: 'http://www.w3.org/2000/svg',
                width: tileWidth * tilesToFetch[0].length,
                height: tileWidth* tilesToFetch.length
              })

        var previewProjection = d3.geo.mercator()
                        .center([tile2Lon(startLon, zoom), tile2Lat(startLat, zoom)])
                        //this are carved based on zoom 16, fit into 100px * 100px rect
                        .scale(600000* tileWidth/57.5 * Math.pow(2,(zoom-16)))
                        .precision(.0)
                        . translate([0, 0])

        var previewPath = d3.geo.path().projection(previewProjection);

        for (let dataK in reformedJson) {
          let oneDataKind = reformedJson[dataK];
          let g = svg.append('g')
          g.attr('id',dataK)

          for(let subKinds in oneDataKind) {
            let tempSubK = oneDataKind[subKinds]
            let subG = g.append('g')
            subG.attr('id',subKinds)
            for(let f in tempSubK.features) {
              let geoFeature = tempSubK.features[f]
              let previewFeature = previewPath(geoFeature);

              if(previewFeature && previewFeature.indexOf('a') > 0) ;
              else {
                subG.append('path')
                  .attr('d', previewFeature)
                  .attr('fill','none')
                  .attr('stroke','black')
              }
            }
          }
        }

        fs.writeFile(outputLocation, window.d3.select('.container').html(),(err)=> {
          if(err) throw err;
          console.log('yess svg is there')
        })

      //jsdom done function done
      }
    })
  }

  // render response page first
  res.send(startLon + ' ' + startLat + 'request submitted, waiting for a file to be written');
  makeCall();
});


// here all maps spells are!
// convert lat/lon to mercator style number or reverse.
function long2tile(lon,zoom) {
  return (Math.floor((lon+180)/360*Math.pow(2,zoom)));
}
function lat2tile(lat,zoom)  {
  return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom)));
}

function tile2Lon(tileLon, zoom) {
  return (tileLon*360/Math.pow(2,zoom)-180).toFixed(10);
}

function tile2Lat(tileLat, zoom) {
  return ((360/Math.PI) * Math.atan(Math.pow( Math.E, (Math.PI - 2*Math.PI*tileLat/(Math.pow(2,zoom)))))-90).toFixed(10);
}

module.exports = router;