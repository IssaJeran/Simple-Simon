$(document).ready(function() {

	"use strict";

	var div = ["pink","green","orange","blue"];
	var lights = [];
	var	random;
	var position = 0;
	var counter = 0;
	var wrongAnswer1 = new Audio("audiocombine1.mp3");
	var kanye = new Audio("kanyejoin.mp3")
		kanye.play();

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

	//Flashes Simon sequence 
	function buttonAnimate (){
		lights.forEach(function(element,index){
			var delay = 1000;
			var flash = setTimeout(function(){	
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

	//Resets game to start over if player desires 
	function reset(){
		position = 0;
		counter = 0;
		roundTotal(counter);
	}

	//Compares what the user clicks and the array of lights [pink, green, orange, blue]
	$('#area').click(function(event){         
		var target = $(event.target).attr('id');
		if (target == lights[position]) {
			position++;  
		}   else {
			wrongAnswer1.play();
			alert("Game Over But Continue Enjoying The Song You Unlocked! And Try Again!");
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




