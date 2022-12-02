/* global AFRAME, THREE */

var prevAst = null
var inID, selAst;

function gameloop()
{
    const gp = navigator.getGamepads()[0]
    // console.log("Entered gameloop")

    if(gp.buttons[0].pressed && selAst)
    {
      console.log("Button"+0+":"+gp.buttons[0].pressed+",Asteroid:"+selAst)
      document.getElementById(selAst).click()
    }

    if(gp.buttons[1].pressed)
    {
      console.log("Button"+1+":"+gp.buttons[1].pressed+",Asteroid:"+selAst)
      back()
      
    }

    if(gp.buttons[2].pressed)
    {
      console.log("Button"+2+":"+gp.buttons[2].pressed+",Asteroid:"+selAst)
      reset()
      
    }
    
    if(gp.buttons[3].pressed)
    {
      console.log("Button"+3+":"+gp.buttons[3].pressed+",Asteroid:"+selAst)
      pause()
      
    }
    // for(var i=0;i<4;i+=1)
    // {
    //     if(gp.buttons[i].pressed && selAst)
    //     {
    //       console.log("Button"+i+":"+gp.buttons[i].pressed+",Asteroid:"+selAst)
    //       document.getElementById(selAst).click()
    //     }

    // }

    // window.requestAnimationFrame(gameloop)
}

// AFRAME.registerComponent('x-button-listener', {
//   init: function () {
//     var el = this.el;
//     el.addEventListener('xbuttondown', function (evt) {
//       el.setAttribute('visible', !el.getAttribute('visible'));
//       console.log("X button")
//     });
//   }
// });

AFRAME.registerComponent('teleport', {

  init () {
    this.el.addEventListener('click', this.click.bind(this));
    this.el.addEventListener('mouseenter',this.gamepadEnter.bind(this))
    this.el.addEventListener('mouseleave',this.gamepadLeave.bind(this))
    // disable right-click context menu

    window.addEventListener('contextmenu', event => event.preventDefault());
  },

  click (event) {
    console.log("Clicked!");
    console.log(this.el);
    var coor = this.el.getAttribute("position")
    console.log(this.el.getAttribute("position").x)
    // localStorage.setItem('id',coor);
    
    var curAst =this.el.getAttribute("id")
    console.log(prevAst + " " + curAst)

    if( prevAst == curAst)
    {
        // console.log(window.location.href)
        var url =  window.location.href
        console.log("Redirect mian!")
        var newUrl = url.substring(0,url.lastIndexOf('/'))+"/basic.html"
        localStorage.setItem('id',curAst)
        console.log(newUrl)
        console.log(document.getElementById(curAst))
        // window.location.href = newUrl;
        final_loading(curAst);
        console.log(curAst)
        console.log(localStorage.getItem('id',curAst))
    }
    else  
    {
        prevAst = curAst
    }
    
    var cam = document.getElementById("rig")
    cam.setAttribute("animation",'property:position; to:'+coor.x+" "+(coor.y-1)+" "+(coor.z+2)+";"+" dur:1000;")


    console.log(cam.getAttribute("rotation"))
    // cam.setAttribute("rotation",{x:0,y:0,z:0})


    // const mouseEvent = event.detail.mouseEvent;

    // if (!mouseEvent) return;

    // if (mouseEvent.button === 0) {
    //   this.r = 1 - this.r;
    // } else if (mouseEvent.button === 1) {
    //   this.g = 1 - this.g;
    // } else if (mouseEvent.button === 2) {
    //   this.b = 1 - this.b;
    // }

    // const color = new THREE.Color(this.r, this.g, this.b);
    // this.el.setAttribute('color', `#${color.getHexString()}`);
  },
  gamepadEnter(event)
{
    
    console.log("Inside Gamepad Enter!")
    // console.log(this)
    // console.log(event)
    selAst = this.el.id
    //inID = setInterval(gameloop(),100)
},

gamepadLeave(event)
{
    
    console.log("Inside Gamepad Leave!")
    // console.log(this)
    // console.log(event)
    selAst = null  
    //clearInterval(inID)
}
});

AFRAME.registerComponent('x-button-listener', {
  init: function () {
    var el = this.el;
    el.addEventListener('xbuttondown', function (evt) {
      el.setAttribute('visible', !el.getAttribute('visible'));
      // document.getElementById(selAst).setAttribute('visible', !el.getAttribute('visible'));
      reset();

    });
    el.addEventListener('abuttondown', function (evt) {
      el.setAttribute('visible', !el.getAttribute('visible'));
      pause()
      
    });
    el.addEventListener('bbuttondown', function (evt) {
      el.setAttribute('visible', !el.getAttribute('visible'));
      back()
      
    });
  }
});

window.addEventListener("gamepadconnected", (e) => {
  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
      e.gamepad.index, e.gamepad.id,
      e.gamepad.buttons.length, e.gamepad.axes.length);
  console.log(e.gamepad)
  inID = setInterval(gameloop,100)
  });

window.addEventListener("gamepaddisconnected", (e) => {
  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
      e.gamepad.index, e.gamepad.id,
      e.gamepad.buttons.length, e.gamepad.axes.length);
  clearInterval(inID)
  console.log("Stop Interval")
  });