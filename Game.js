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
  var bulletCount = 0;
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

 

  function fireBullet(xloc,yloc,angle) {
    bulletCount++;
    var t = $("body").append($("<img src='assets/bullet.png'>").addClass("bullet").css({ "left" : xloc + 60, 'top' : yloc + 20 }));
    t.attr('id', bulletCount);
    return new bullet(xloc,yloc,angle);
  }
    
class bullet {
    constructor(xval, yval, angle) {
      this.xval = xval;
      this.yval = yval;
      this.angle = angle;
    }
  }
;

  function update(bull) {
    $(".bullet").each(function() {
        bull.angle = angle;
        bull.xval = $(this).offset().left;
        bull.yval= $(this).offset().top;
        bull.xval += 7*Math.cos((angle-90) * Math.PI/180)
        bull.yval += 7*Math.sin((angle-90) * Math.PI/180)
        $(this).css("left", bull.xval);
        $(this).css("top", bull.yval);
        // $(this).css("transform", "rotate("+angle+"deg)")
        
      
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

    if (keys[32]) { //down
        if(!locked){
          
        locked = true;
        
        var xloc = parseFloat($d.css('left'));
        var yloc = parseFloat($d.css('top'));
        
        var bull = fireBullet(xloc,yloc,angle);
       
        var i = setInterval(update(bull) ,50);
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