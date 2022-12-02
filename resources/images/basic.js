// function setAttributes(el, attrs) {
//     for(var key in attrs) {
//       el.setAttribute(key, attrs[key]);
//     }
//   }
// ## THE CODE FOR IMPLEMENTING OBJECTS 
// document.addEventListener('DOMContentLoaded', function() {
//     var scene = document.querySelector('a-scene');
//     var frame = document.createElement('a-entity');
//     // frame.setAttribute('gltf-model', "#p_asteroid");
//     frame.setAttribute("position", {x: -10, y: -3, z: 0});
//     frame.setAttribute('scale', {x: 0.7, y: 0.7, z: 0.7});
//     // frame.setAttribute('gltf-model', {x: 1, y: 2, z: -3});
//     scene.appendChild(frame);
//   });

document.addEventListener('keyup', doc_keyUp, false);

function doc_keyUp(e) {

  if (e.key === 'r') 
  {
    console.log('reset camera')
    // location.reload()
    var cam = document.getElementById('camera')
    console.log(cam.getAttribute('position'))
    cam.setAttribute('position',{
      x:0,
      y:0,
      z:4
    },
    'rotation',{
        x:0,
        y:0,
        z:0
      })
      console.log(cam.getAttribute('position'))
    // var rot = document.getElementById('checking');
    // console.log('before rotation:' +rot.getAttribute('rotation'))
    // rot.setAttribute('rotation',{
    //   x:0,
    //   y:0,
    //   z:0
    // })
    // console.log('After rotation:' + rot.getAttribute('rotation'))
  }
  if (e.key === 'p') 
  {
    console.log('pause rotation')
    // location.reload()
    var cam = document.getElementById('camera')
    console.log(cam.getAttribute('position'))
    cam.setAttribute('position',{
      x:0,
      y:0,
      z:4
    },
    'rotation',{
        x:0,
        y:0,
        z:0
      })
      console.log(cam.getAttribute('position'))
    // var rot = document.getElementById('checking');
    // console.log('before rotation:' +rot.getAttribute('rotation'))
    // rot.setAttribute('rotation',{
    //   x:0,
    //   y:0,
    //   z:0
    // })
    // console.log('After rotation:' + rot.getAttribute('rotation'))
  }
}


var asteroid_details = {
  "links": {
    "self": "http://api.nasa.gov/neo/rest/v1/neo/3177204?api_key=jKjtLEaaGUQa4WrI25UFp5d3cKaTEAoJJNmh737B"
  },
  "id": "3177204",
  "neo_reference_id": "3177204",
  "name": "(2004 FW1)",
  "nasa_jpl_url": "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3177204",
  "absolute_magnitude_h": 20.9,
  "estimated_diameter": {
    "kilometers": {
      "estimated_diameter_min": 0.1756123185,
      "estimated_diameter_max": 0.3926810818
    },
    "meters": {
      "estimated_diameter_min": 175.6123184804,
      "estimated_diameter_max": 392.6810818086
    },
    "miles": {
      "estimated_diameter_min": 0.1091204019,
      "estimated_diameter_max": 0.2440006365
    },
    "feet": {
      "estimated_diameter_min": 576.1559189633,
      "estimated_diameter_max": 1288.3238004408
    }
  },
  "is_potentially_hazardous_asteroid": true,
  "close_approach_data": [
    {
      "close_approach_date": "2022-11-18",
      "close_approach_date_full": "2022-Nov-18 08:19",
      "epoch_date_close_approach": 1668759540000,
      "relative_velocity": {
        "kilometers_per_second": "39.6185641413",
        "kilometers_per_hour": "142626.8309087225",
        "miles_per_hour": "88622.7661277004"
      },
      "miss_distance": {
        "astronomical": "0.4988774257",
        "lunar": "194.0633185973",
        "kilometers": "74631000.275803259",
        "miles": "46373553.2011486142"
      },
      "orbiting_body": "Earth"
    }
  ],
  "is_sentry_object": false
};



function details()
{
  
    var det = document.getElementById('det');
    var x = det.getAttribute('text')

    x.value += 'Name: \t';
    x.value += '\nNeo reference ID:\t ';
    x.value += '\nPotentially hazardous: \t';
    x.value += '\nSentry object: \t';
    x.value += '\nSize:\n Min diameter: '+'\n Max diameter: \t';
    x.value += '\nTime of closest approach: \t';
    x.value += '\nEpoch date of close approach: \t';
    x.value += '\nPrimary orbiting body:\t';
    x.value += '\nRelative velocity(in kmph):\t';
    x.value += '\nMiss distance:\t';

    var info =document.getElementById('info');
    var y = info.getAttribute('text')
    y.value +=  asteroid_details.name+ '\n';
    y.value +=  asteroid_details.neo_reference_id+ '\n';
    y.value +=  (asteroid_details.is_potentially_hazardous_asteroid?'Yes':'No') + '\n';
    y.value +=  (asteroid_details.is_sentry_object?'Yes':'No')+ '\n\n';
    y.value += Number(asteroid_details.estimated_diameter.meters.estimated_diameter_min).toFixed(3)+' m\n'
    y.value += Number(asteroid_details.estimated_diameter.meters.estimated_diameter_max).toFixed(3)+' m\n';
    y.value += asteroid_details.close_approach_data[0].close_approach_date_full+ '\n';
    y.value += asteroid_details.close_approach_data[0].epoch_date_close_approach+ '\n';
    y.value += asteroid_details.close_approach_data[0].orbiting_body +'\n';
    y.value += Number(asteroid_details.close_approach_data[0].relative_velocity.kilometers_per_hour).toFixed(2)+'\n';
    y.value += Number((asteroid_details.close_approach_data[0].miss_distance.kilometers)/1000000).toFixed(2)+' M km';
}
function models()
{
  var id = 2;
  // Asteroids
  var asteroid_model = './asteroid';
  document.getElementById('asteroid').setAttribute('gltf-model', asteroid_model + id + '.gltf');

  // Earth
  var earth_model = './earth'
  document.getElementById('earth').setAttribute('src',earth_model+'2'+'.jpg')

  // Orbits
  var ring_scale = [14,16,18,20,22,24,26];
  var asteroid_scale = 0.45 * ring_scale[id];
  if (id%2 ==0)
  {
    document.getElementById('camera').setAttribute('position',{x: 0, y: 0, z: 6})
    

  }
  
}
