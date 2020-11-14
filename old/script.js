/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log("hi");


/*
$('#bgopacity').on('input', function (value) {
    $('.background-color').css({
        opacity: $(this).val() * '.01'
    });
});
*/

// Access instructions ---------------------------------------------------------------------

var isFirstTime = sessionStorage.getItem("isFirstTime");

if(isFirstTime == null){
  console.log("First Time");
  rulesGuide();
  sessionStorage.setItem("isFirstTime", false);
  
} else {
  console.log("Not the first Time");
}


function rulesGuide(){

  let volumeRule = document.querySelector('#ruleVolume');
  let opacityRule1 = document.querySelector('#ruleOpacity1');
  let opacityRule2 = document.querySelector('#ruleOpacity2');
  let sceneRule = document.querySelector('#ruleScene');


  

  var firstStep = function (e){
    volumeRule.style.display = "none";
    opacityRule1.style.display = "block";
    document.querySelector('#vidPanner').removeEventListener('change', firstStep, false);
  };
  var secondStep = function (e){
    opacityRule1.style.display = "none";
    opacityRule2.style.display = "block";
    document.querySelector('#bgopacity').removeEventListener('change', secondStep, false);
  };
  var thirdStep = function (e){
    opacityRule2.style.display = "none";
    sceneRule.style.display = "block";
    document.querySelector('#bgopacity').removeEventListener('zeroOpacity', thirdStep, false);
  };

  volumeRule.style.display = "block";
  document.querySelector('#vidPanner').addEventListener('change', firstStep, false);
  document.querySelector('#bgopacity').addEventListener('change', secondStep, false);
  document.querySelector('#bgopacity').addEventListener('zeroOpacity', thirdStep, false);

};

// Welcome page ---------------------------------------------------------------------

document.querySelector('#enterButton').addEventListener('click', () => {
  let welcome = document.querySelector('#welcome');
  let loadingText = document.querySelector('#loadingText');

  welcome.classList.toggle('welcomeFade');
  welcome.addEventListener('transitionend', function(){
    console.log("welcome ended!");
    welcome.style.display = "none";
    loadingText.style.display = "block";
  });

})

/*var text = document.querySelector(".splitText");

var split = new SplitText(text);

function random(min, max){
	return (Math.random() * (max - min)) + min;
}

$(split.chars).each(function(i){
	TweenMax.from($(this), 2.5, {
		opacity: 0,
		x: random(-500, 500),
		y: random(-500, 500),
		z: random(-500, 500),
		scale: .1,
		delay: i * .02,
		yoyo: true,
		repeat: -1,
		repeatDelay: 10
	});
});*/


// Loading page ---------------------------------------------------------------------

document.querySelector('a-scene').addEventListener('loaded', function(){
  let vid = document.querySelectorAll('.video');
  let loadPage = document.querySelector('#loading-wrapper');
  let content = document.querySelector('.frontcontainer');

  content.style.display = "flex";

  loadPage.classList.toggle("loadingFade");
  loadPage.addEventListener('transitionend', function(){
    console.log("transition ended!");
    //loadPage.style.display = "none";
    loadPage.remove();
    vid.forEach(video => {
      video.play();
    });
  });
  
  //loadPage.style.display = "none";

  

  console.log("page loaded!");

});

// Sliders ---------------------------------------------------------------------

document.querySelector('#bgopacity').addEventListener('input', function (value) {
  let vid = document.querySelectorAll('.video');
  let vidContainer = document.querySelector('#videocontainer');

  if (this.value == 0){

    console.log("value 0");
    vidContainer.style.display = "none";
    var eventZero = new CustomEvent("zeroOpacity");
    document.querySelector('#bgopacity').dispatchEvent(eventZero);


  } else{

    vid.forEach((video) => {
      console.log("opacity changed");
      video.style.opacity = this.value * .01;
      vidContainer.style.display = "flex";
    })
  }
  
    
  //document.querySelector('.video').style.display = "none";
  
});

document.querySelector('#vidPanner').addEventListener('input', function (value) {
  //document.querySelector('.video').style.opacity = this.value * .01;
  let val = this.value * .01;

  //bro
  document.querySelector('#vid0').volume = Math.min(1, Math.max(0, -val - 0.3));
  //let opacity = Math.min(1, Math.max(0, -val - 0.3));
  //document.querySelector('#bro').setAttribute('pointcloud', 'opacity', opacity);

  //dad
  document.querySelector('#vid2').volume = Math.min(1, Math.max(0, val + 0.1));


  //mum
  if (val >= 0) {
    document.querySelector('#vid1').volume = 1 - val;
  }
  else { document.querySelector('#vid1').volume = 1 + val};
  
  
});

