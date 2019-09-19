

$(document).ready(function(e){
  $( "#StartButton" ).click(function() {
    $( "#splashscreen" ).fadeOut(1000);
    $(".spaceShip").show();
    $("body").show();
  });

  

  $('body').on('touchstart', function() { 
    $('.spaceShip').css("transform", "rotate("+angle+"deg)")
  }); 


  var keys = {};
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

  // function fireLaser() {
  //   let laser = createLaserElement()
  //   mainPlayArea.appendChild(laser)
  //   // let laserSFX = new Audio('audio/laser-sfx.m4a')
  //   // laserSFX.play()
  //   moveLaser(laser)
  // }
  // const shooter = document.getElementsByClassName("spaceShip")
  // function createLaserElement() {
  //   let xPosition = parseInt(window.getComputedStyle(shooter).getPropertyValue('left'))
  //   let yPosition = parseInt(window.getComputedStyle(shooter).getPropertyValue('top'))
  //   let newLaser = document.createElement('img')
  //   newLaser.src = 'images/bullet.png'
  //   newLaser.classList.add('bullet')
  //   newLaser.style.left = `${xPosition}px`
  //   newLaser.style.top = `${yPosition - 10}px`
  //   return newLaser
  // }

  // function moveLaser(laser) {
  //   let laserInterval = setInterval(() => {
  //     let xPosition = parseInt(laser.style.left)
  //     // let monsters = document.querySelectorAll(".monster")
  //     // monsters.forEach(monster => {
  //     //   if (checkLaserCollision(laser, monster)) {
  //     //     // let explosion = new Audio('audio/explosion.m4a')
  //     //     // explosion.play()
  //     //     monster.src = "images/bullet.png"
  //     //     monster.classList.remove("monster")
  //     //     monster.classList.add("dead-monster")
  //     //     scoreCounter.innerText = parseInt(scoreCounter.innerText) + 100
  //     //   }
  //     // })
  //     if (xPosition === 340) {
  //       laser.remove()
  //     } else {
  //       laser.style.left = `${xPosition + 4}px`
  //     }
  //   }, 10)
  // }

  
 
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
        fireLaser();
     
      
        
       
        var i = setInterval(update ,50);
        setTimeout(function( ) { clearInterval( i );}, 5000);
       
        
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