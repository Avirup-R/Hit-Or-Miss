function setAttributes(el, attrs) {
    for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }
// ## THE CODE FOR IMPLEMENTING OBJECTS 
document.addEventListener('DOMContentLoaded', function() {
    var scene = document.querySelector('a-scene');
    var frame = document.createElement('a-entity');
    frame.setAttribute('gltf-model', "#p_asteroid");
    frame.setAttribute("position", {x: -10, y: -3, z: 0});
    frame.setAttribute('scale', {x: 0.7, y: 0.7, z: 0.7});
    // frame.setAttribute('gltf-model', {x: 1, y: 2, z: -3});
    scene.appendChild(frame);
  });


