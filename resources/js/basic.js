document.addEventListener('keyup', doc_keyUp, false);

function wait()
{
  setTimeout(() => {alert('Are you sure you want this date? ')}, 3000 );
}

function checking()
{
  var date = localStorage.getItem('inpdate')
  var json = JSON.parse(JSON.parse(localStorage.getItem('jsondata')))
  
}
function reset()
{
  console.log('reset camera')
  var cam = document.getElementById('rig')
  console.log(cam.getAttribute('position'))
  var earth =document.getElementById('earth').getAttribute('position')
  // cam.setAttribute('animation',"property: rotation; to:"+earth.x+" "+earth.y+ ' '+earth.z+"; loop: true; dur: 30000")
  cam.setAttribute('position',{
    x:earth.x,
    y:earth.y,
    z:earth.z
  })
    console.log(cam.getAttribute('position'))
}
function pause()
{
  if(document.getElementById('innerrig').getAttribute('animation').dur >50000)
      {
      console.log('pause rotation')
      // document.getElementById('innerrig').setAttribute('animation','dur',4000)
      document.getElementById('innerrig').setAttribute('animation','property: rotation; dur: 40000; to: 0 360 0; loop: true; fill:forward;')
      }
      else
      {
        console.log('start rotation')
        // document.getElementById('innerrig').setAttribute('animation','dur',10000000)
        document.getElementById('innerrig').setAttribute('animation','property: rotation; dur: 400000; to: 0 360 0; loop: true; fill:forward;')
      }
}
function back()
{
  var count = localStorage.getItem('count')
    for(var i=0;i<count;i++)
    {
      document.getElementById(i).setAttribute('visible',true);
    }
    document.getElementById('orbit').setAttribute('radius-outer',0.4500)
    document.getElementById('det').setAttribute('text','value','')
    document.getElementById('info').setAttribute('text','value','')
    document.getElementById('innerrig').setAttribute('animation',"")
    document.getElementById('asteroid').setAttribute('visible',false);
}
function hide()
{
  if(document.getElementById('cursor').getAttribute('text').opacity ==0.2)
      document.getElementById('cursor').setAttribute('text','opacity:0')
    else
      document.getElementById('cursor').setAttribute('text','opacity:0.2')
}

function doc_keyUp(e) {
  if (e.key === 'r') 
  {
    reset();
  }
  if (e.key === 'p') 
  {
      pause();
  }
  else if (e.key ==='b')
  {
    back();
  }
  else if (e.key ==='h')
  {
    hide();
  }
}


function details()
{
    var id = localStorage.getItem('id');
    var asteroid_details = fetchobj(id);
    var det = document.getElementById('det');
    var x = det.getAttribute('text')
  console.log(asteroid_details)
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
  var id = localStorage.getItem('id');
  
  
  if (id >= 6)
  {
    id -= 6;
    if (id >=6)
      id -= 6

  } 

  // Asteroids
  var asteroid_model = './resources/images/asteroid';
  if (id == 1)
  document.getElementById('asteroid').setAttribute('gltf-model', "./resources/images/p_asteroid.glb")
  else
  {
    console.log(document.getElementById('asteroid'))
  document.getElementById('asteroid').setAttribute('gltf-model', asteroid_model + Number(Number(id)+1) + '.gltf');
  }

  // Earth
  var earth_model = './resources/images/earth'
  document.getElementById('earth').setAttribute('src',earth_model+ Number(Number(id)+1) +'.jpg');

  //Camera
  if (id==0 || id==3)
    document.getElementById('camera').setAttribute('position',{x:4,y:0,z:0})
  else if (id==1 || id==4)
    document.getElementById('camera').setAttribute('position',{x:0,y:4,z:0})
  else
    document.getElementById('camera').setAttribute('position',{x:0,y:0,z:4})

  // Orbits
  var ring_scale = [14,16,18,20,22,24,26];
  var asteroid_scale = 0.45 * ring_scale[id];
  document.getElementById('orbit').setAttribute('scale',{x : ring_scale[id],
    y : ring_scale[id],
    z : ring_scale[id]
  })
  document.getElementById('asteroid').setAttribute('position',{x : 0,
    y : asteroid_scale,
    z : 0
  })
}
function fetchobj(id)
{
  id = Number(id);
  let date = localStorage.getItem('inpdate');
  let totdata = JSON.parse(JSON.parse(localStorage.jsondata)).near_earth_objects[date][id];
  return totdata;
}