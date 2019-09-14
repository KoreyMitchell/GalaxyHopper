$(document).ready(function(e){
  var keys = {};

  $(document).keydown(function(event){
    keys[event.which] = true;
  }).keyup(function(event){
    delete keys[event.which];
  });

  var $d = $(".ball");
  var angle = 0

  var theElement = document.getElementById("body");

  theElement.addEventListener("touchstart", handlerFunction, false);
  
  function handlerFunction(event) {
  alert(e.xloc + ", " + e.yloc);
  }

  

  function gameLoop() {
    /////
    document.querySelector('document.body').addEventListener('touchstart', f);
    document.querySelector('document.body').addEventListener('touchend', f);
    document.querySelector('document.body').addEventListener('touchmove', f);
    
    function f(ev){
        console.alert( ev.touches, ev.type );

        var xloc = parseFloat($d.css('left'));
        var yloc = parseFloat($d.css('top'));
        angle = Math.atan2(ev.touches.yloc, ev.touches.xloc)
        xloc += 4*Math.cos(4.8+ angle * Math.PI/180)
        yloc += 4*Math.sin(4.8+ angle * Math.PI/180)
        $d.css("top", yloc + "px");
        $d.css("left", xloc + "px");
    }



 
    if (angle >= 360){
      angle = 0
    }
    else if (angle <= 0){
      angle = 359
    }

    if (keys[39]) {     //right
        angle+=5
        $d.css("transform", "rotate("+angle+"deg)")
    }
    else if (keys[37]) { //left
        angle-=5
        $d.css("transform", "rotate("+angle+"deg)")
    }
    if (keys[40]) { //down
        // var xloc = parseFloat($d.css('left'));
        // var yloc = parseFloat($d.css('top'));
        // xloc += Math.cos(angle)
        // yloc += Math.sin(angle)
        // $d.css("top", yloc + 'px');
        // $d.css("left", xloc + 'px');
    }
    else if (keys[38]) { //up
      var xloc = parseFloat($d.css('left'));
      var yloc = parseFloat($d.css('top'));
      xloc += 4*Math.cos(4.8+ angle * Math.PI/180)
      yloc += 4*Math.sin(4.8+ angle * Math.PI/180)
      $d.css("top", yloc + "px");
      $d.css("left", xloc + "px");
    }
 

    setTimeout(gameLoop, 20);
  }
  gameLoop();
    
  $(document).focus();
});