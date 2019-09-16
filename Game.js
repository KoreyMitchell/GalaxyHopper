$(document).ready(function(e){
  var keys = {};
  var forward;
  $(document).keydown(function(event){
    keys[event.which] = true;
  }).keyup(function(event){
    delete keys[event.which];
  });

  var $d = $(".spaceShip");
  var angle = 0
  $(window).height();
  $(window).width();
  var checkTime = 0;
  var currentTime = new Date()

  function areaCheck(){
    var screeny = $(window).height();
    var screenx = $(window).width();
    var xloc = parseFloat($d.css('left'));
    var yloc = parseFloat($d.css('top'));
    
    if(xloc > screenx){
       $d.css("left", 0 + "px");
    }
    if(yloc > screeny){
       $d.css("top", 0 + "px");
    }
    if(xloc < 0){
      $d.css("left", screenx + "px");
   }
   if(yloc < 0){
      $d.css("top", screeny + "px");
   }
  }

  function angleCheck(angle){ // Check to keep 0 <= angle <= 360
    if (angle >= 360){
      angle = 0
    }
    else if (angle <= 0){
      angle = 359
    }
  }

 

  function fireBullet(xloc,yloc) {
    var bulletCount = 1;
    $("body").append($("<div>").addClass("bullet").css({ "left" : xloc + 60, 'top' : yloc + 20 }));
    }

  function update() {
    $(".bullet").each(function() {
        var bulletAngle = angle;
        var oldLeft = $(this).offset().left;
        var oldTop = $(this).offset().top;
        oldLeft += 7*Math.cos(4.8+ angle * Math.PI/180)
        oldTop += 7*Math.sin(4.8+ angle * Math.PI/180)
        $(this).css("left", oldLeft);
        $(this).css("top", oldTop);
        
      
    });
  }

  var locked = false;
 
  function gameLoop() {
    areaCheck();
    angleCheck(angle);
    if (keys[39]) {     //right
        angle+=5
        $d.css("transform", "rotate("+angle+"deg)")
    }
    else if (keys[37]) { //left
        angle-=5
        $d.css("transform", "rotate("+angle+"deg)")
    }

    if (keys[40]) { //down
        if(!locked){
          
        locked = true;
        
        var xloc = parseFloat($d.css('left'));
        var yloc = parseFloat($d.css('top'));
        
        fireBullet(xloc,yloc);
       
        var i = setInterval(update ,50);
        setTimeout(function( ) { clearInterval( i );}, 5000);
        setTimeout(function( ) { locked = false;}, 250);
        }
  }
    else if (keys[38]) { //up
      forward = true;
      var xloc = parseFloat($d.css('left'));
      var yloc = parseFloat($d.css('top'));
      xloc += 7*Math.cos(4.8+ angle * Math.PI/180)
      yloc += 7*Math.sin(4.8+ angle * Math.PI/180)
      $d.css("top", yloc + "px");
      $d.css("left", xloc + "px");
    }
    
    setTimeout(gameLoop, 15);

  }
  


  gameLoop();
    
  $(document).focus();
});