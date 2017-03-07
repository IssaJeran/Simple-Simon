"use strict";
(function(){

$(document).ready(function() {

	var div = ["pink","green","orange","blue"];
	var lights = [];
	var	random;
	var position = 0;
	var counter = 0;
	var rightAnswer = new Audio('file:///Users/jeransmith/vagrant-lamp/sites/simplesimon.dev/public/gameover.wav');
	var wrongAnswer = new Audio('file:///Users/jeransmith/vagrant-lamp/sites/simplesimon.dev/public/gameover.wav');

	//Begins the game
	$('#begin').click(function (){
		lights = [];
		simonTurn();
		buttonAnimate();
	});

	//Simon's turn in the game (random pattern generated)
	function simonTurn(){
		randomize();
		lights.push(random);
	}

	//Keeps track of what round the user is in
	function roundTotal(){
		$('#roundTracker').html(counter);
	}

	//Flashes Simon sequence. 
	function buttonAnimate (){
		lights.forEach(function(element,index){
			var delay = 1000;
			var flash = setTimeout(function(){	
				rightAnswer.play();
				$("#" + lights[index]).animate({
					opacity: .25
				},500).animate({
					opacity: 1
				},500);
			},delay*index);
		})
	}

	//Generates random number and selects a div
	function randomize(){
		random = div[Math.floor(Math.random()* 4)];
	}

	//Resets game to Start Over If Player Desires 
	function reset(){
		position = 0;
		counter = 0;
		roundTotal(counter);
	}


	//Compares what the user clicks and the array of lights
	$('#area').click(function(event){         
		var target = $(event.target).attr('id');
		if (target == lights[position]) {
			rightAnswer.play();
			position++;  
		}   else {
			wrongAnswer.play();
			alert("Game Over But Continue Enjoying The Song! And Try Again!");
			reset(); 
		}
		if (position == lights.length) { 
			position = 0;
			var play = setTimeout(function(){
				simonTurn();
				buttonAnimate();
				counter++;
				roundTotal(counter);
			},1500);
		}
	});

});
})();



