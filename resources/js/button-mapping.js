function gameloop()
{
    const gp = navigator.getGamepads()[0]
    // console.log("Entered gameloop")
    for(var i=0;i<4;i+=1)
    {
        if(gp.buttons[i].pressed && selAst)
            console.log("Button"+i+":"+gp.buttons[i].pressed+",Asteroid:"+selAst)
    }

    // window.requestAnimationFrame(gameloop)   
}

var inID, selAst;

AFRAME.registerComponent('x-button-listener', {
    init: function () {
      var el = this.el;
      el.addEventListener('xbuttondown', function (evt) {
        el.setAttribute('visible', !el.getAttribute('visible'));
        document.getElementById(selAst).setAttribute('visible', !el.getAttribute('visible'));
  
      });
      el.addEventListener('abuttondown', function (evt) {
        el.setAttribute('visible', !el.getAttribute('visible'));
        
      });
    }
  });

AFRAME.registerComponent('teleport', {

init () {
    this.el.addEventListener('click', this.click.bind(this));
    this.el.addEventListener('mouseenter',this.gamepadEnter.bind(this))
    this.el.addEventListener('mouseleave',this.gamepadLeave.bind(this))
},

click(event)
{
    console.log("Clicked!")
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




window.addEventListener("gamepadconnected", (e) => {
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
        e.gamepad.index, e.gamepad.id,
        e.gamepad.buttons.length, e.gamepad.axes.length);
    console.log(e.gamepad)
    inID = setInterval(gameloop,1)
    });

window.addEventListener("gamepaddisconnected", (e) => {
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
        e.gamepad.index, e.gamepad.id,
        e.gamepad.buttons.length, e.gamepad.axes.length);
    clearInterval(inID)
    console.log("Stop Interval")
    });