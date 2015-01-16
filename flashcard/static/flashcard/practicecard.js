
var troublewords = [];
var wordnumber = 0;
var remaining = vocab.length;
var randarray = [];
var sets_until_complete = 1;
var type_flag = false;
var both_right = true;

//creates array of random uniques
var randomarray = function(){
 randarray = [];

	while(randarray.length < vocab.length){
  	  	var randomnumber=Math.floor(Math.random() * vocab.length)
   	 	var found=false;
   	 	for(var i=0;i<randarray.length;i++){
        	if(randarray[i]==randomnumber){
        		found=true;break
        }
  	  }
  	  if(!found)randarray[randarray.length]=randomnumber;
	
	};
	// console.log("this is the randarray " + randarray);
}

//generates new center card
var startpage = function(){
	type_flag = false;
	randomarray();
	var randvocabword = vocab[randarray[wordnumber]];
	try {
		vocab[randarray[1]].word
		var vocab_word = vocab[randarray[1]].word
	}catch(err){
		var vocab_word = "finish"
	};
	// initial_cards = '<div id = "center">';
	initial_cards = "";
	// initial_cards += "hello";
	initial_cards += "<div id = 'cardhold1' class = 'cardhold'>";            
	initial_cards +=			'<div id = "word1" class = "answerbox mini left">';
	initial_cards +=				'<div class = "flipper">';
	initial_cards +=					'<div id = "front1"class = "front mini2"><div>' + vocab[randarray[1]].word + '</div></div>';
	// initial_cards +=					'<div id = "back1" class = "back mini2">' + vocab[randarray[1]].hiragana + '</div>';
	initial_cards +=				'</div>';
	initial_cards +=			'</div>';
	initial_cards +=	    '</div>';
	initial_cards +=		'<div id = "cardhold2" class = "cardhold">';
	initial_cards +=			'<div id = "word0" class = "answerbox left">';
	initial_cards +=				'<div class = "flipper">';
	initial_cards +=					'<div id = "front0" class = "front">';
	initial_cards +=						'<div>' + vocab[randarray[0]].word + '</div>';
	// initial_cards +=						'<div>' + vocab[randarray[0]].hiragana + '</div>';
	// initial_cards +=						'<div>' + vocab[randarray[0]].meaning + '</div>';
	initial_cards +=					'</div>';
	initial_cards +=					'<div id = "back0" class = "back">' + vocab[randarray[0]].hiragana + '</div>';
	initial_cards +=				'</div>';
	initial_cards +=			'</div>';
	initial_cards +=	'</div>'	;
	
	document.getElementById('center').innerHTML = initial_cards;
	
	// for(var i = 0; i<2; i++){
// 		document.getElementById('front' + i).innerHTML = vocab[randarray[i]].word;
// 		document.getElementById('back' + i).innerHTML = vocab[randarray[i]].hiragana;
// 	}
}


//animates cards to the right
var nextset = function(){
	
	if(both_right == false){
		
		console.log(randarray.length);
		if(randarray.length - wordnumber > 5){
			randarray.splice(wordnumber + 5, 0,card_user_is_on)
		}else{
			randarray.push(card_user_is_on)
		};
		
	}else{
		remaining -= 1;
		document.getElementById('highscore').innerHTML = remaining;
	};
	
	
	var addone = wordnumber + 1;
	var addtwo = wordnumber + 2;
	
	$(".cardhold").animate({
		"left":"33.3%"
	},300);

	$("#word" + wordnumber).animate({
		"height":"133px",
		"width":"45%",
		"margin-top":"40px",
	},300);
	
	$("#front" + wordnumber).animate({
		"line-height":"133px",
		"font-size":"20px"
	},300);
	
//animate to the middle card
	$("#word" +addone).animate({
		"height":"200px",
		"width":"90%",
		"margin-top":"0px",
	},300);
	
	$("#front" +addone).animate({
		"line-height":"200px",
		"font-size":"60px"
	},300);
	
	
	if(wordnumber+1 == randarray.length){ 
		document.getElementById('answerinput').value = 'finished';
		document.getElementById('answerinput').style.color = "grey";
		reset();
	}else{
		document.getElementById('answerinput').value = '';
		document.getElementById('answerinput').style.color = "grey";
	}
	
	// console.log(wordnumber+2);
	// console.log(randarray.length);
	var rewritecards = '';
	if(wordnumber+2 < randarray.length){
		rewritecards += "<div id = 'cardhold" + addtwo + "' class = 'cardhold'>";	
		rewritecards += "<div id = 'word" + addtwo + "' class = 'answerbox mini left'>";
		rewritecards += "<div class = 'flipper'>";
		rewritecards += "<div id = 'front" + addtwo + "' class = 'front mini2'>" + vocab[randarray[addtwo]].word + "</div>";
		rewritecards += "<div id = 'back" + addtwo + "' class = 'back mini2'></div>";
		rewritecards += "</div></div></div>";
		rewritecards += "<div id = 'cardhold" + addone + "' class = 'cardhold'>";	
		rewritecards += "<div id = 'word" + addone + "' class = 'answerbox left'>";
		rewritecards += "<div class = 'flipper'>";
		rewritecards += "<div id = 'front" + addone + "' class = 'front'>" + vocab[randarray[addone]].word + "</div>";
		rewritecards += "<div id = 'back" + addone + "' class = 'back'>" + vocab[randarray[addone]].hiragana + "</div>";
		rewritecards += "</div></div></div>";
		rewritecards += "<div id = 'cardhold" + wordnumber + "' class = 'cardhold'>";	
		rewritecards += "<div id = 'word" + wordnumber + "' class = 'answerbox mini left'>";
		rewritecards += "<div class = 'flipper'>";
		rewritecards += "<div id = 'front" + wordnumber + "' class = 'front mini2'>" + vocab[randarray[wordnumber]].word + "</div>";
		rewritecards += "<div id = 'back" + wordnumber + "' class = 'back mini2'></div>";
		rewritecards += "</div></div></div>";
	}else{
		rewritecards += "<div id = 'cardhold" + addtwo + "' class = 'cardhold'>";	
		rewritecards += "<div id = 'word" + addtwo + "' class = 'answerbox mini left'>";
		rewritecards += "<div class = 'flipper'>";
		rewritecards += "<div id = 'front" + addtwo + "' class = 'front mini2'> 2 more</div>";
		rewritecards += "<div id = 'back" + addtwo + "' class = 'back mini2'></div>";
		rewritecards += "</div></div></div>";
		rewritecards += "<div id = 'cardhold" + addone + "' class = 'cardhold'>";	
		rewritecards += "<div id = 'word" + addone + "' class = 'answerbox left'>";
		rewritecards += "<div class = 'flipper'>";
		rewritecards += "<div id = 'front" + addone + "' class = 'front'>" + vocab[randarray[addone]].word + "</div>";
		rewritecards += "<div id = 'back" + addone + "' class = 'back'>" + vocab[randarray[addone]].hiragana + "</div>";
		rewritecards += "</div></div></div>";
		rewritecards += "<div id = 'cardhold" + wordnumber + "' class = 'cardhold'>";	
		rewritecards += "<div id = 'word" + wordnumber + "' class = 'answerbox mini left'>";
		rewritecards += "<div class = 'flipper'>";
		rewritecards += "<div id = 'front" + wordnumber + "' class = 'front mini2'>" + vocab[randarray[wordnumber]].word + "</div>";
		rewritecards += "<div id = 'back" + wordnumber + "' class = 'back mini2'></div>";
		rewritecards += "</div></div></div>";
		
		
	};
	
	wordnumber += 1;
	type_flag = false;
	
	both_right = true;
	
	window.setTimeout(function(){
		document.getElementById('center').innerHTML = rewritecards;
		$("#cardhold"+addtwo).hide().fadeIn();
	},500);
	
		
	
};





var levenshteinenator = (function () {

	/**
	 * @param String a
	 * @param String b
	 * @return Array
	 */
	function levenshteinenator(a, b) {
		var cost;
		var m = a.length;
		var n = b.length;

		// make sure a.length >= b.length to use O(min(n,m)) space, whatever that is
		if (m < n) {
			var c = a; a = b; b = c;
			var o = m; m = n; n = o;
		}

		var r = []; r[0] = [];
		for (var c = 0; c < n + 1; ++c) {
			r[0][c] = c;
		}

		for (var i = 1; i < m + 1; ++i) {
			r[i] = []; r[i][0] = i;
			for ( var j = 1; j < n + 1; ++j ) {
				cost = a.charAt( i - 1 ) === b.charAt( j - 1 ) ? 0 : 1;
				r[i][j] = minimator( r[i-1][j] + 1, r[i][j-1] + 1, r[i-1][j-1] + cost );
			}
		}

		return r[r.length-1][r[r.length-1].length-1];
	}

	/**
	 * Return the smallest of the three numbers passed in
	 * @param Number x
	 * @param Number y
	 * @param Number z
	 * @return Number
	 */
	function minimator(x, y, z) {
		if (x < y && x < z) return x;
		if (y < x && y < z) return y;
		return z;
	}

	return levenshteinenator;

}());

//on enter of text checks if correct answer, currently must be exact match but should change
$('#answerinput').keyup(function(event){
	if(event.keyCode == 13){
		
		var textinput = document.getElementById('answerinput');
		var hiragana_reading = vocab[randarray[wordnumber]].hiragana;
		var english_def = vocab[randarray[wordnumber]].meaning;
		card_user_is_on = randarray[wordnumber];
		
		var correct_check = '';
		
			
		if(type_flag == false){
			thing_to_check = hiragana_reading;
			wanakana.unbind(inputIME);
			correct_check = textinput.value.toLowerCase() != thing_to_check.toLowerCase();
			document.getElementById('answerinput').placeholder = "meaning";
		} else{
			thing_to_check = english_def;
			
			var clean_thing_to_check = thing_to_check.replace(/ *\([^)]*\) */g, "");
			
			wanakana.bind(inputIME)
			document.getElementById('answerinput').placeholder = "ひらがな";
			var levenshteinenator_value = levenshteinenator(textinput.value.toLowerCase(), clean_thing_to_check.toLowerCase());
			var levenshteinenator_value_compare = levenshteinenator_value / clean_thing_to_check.length;
			console.log(levenshteinenator_value_compare);
			console.log(levenshteinenator_value);
			correct_check = levenshteinenator_value_compare > .32;
		};
		
		
		
		//checks entered word equals the english meaning
		
		
		if(correct_check){
			
			if(type_flag == true){
				
				document.getElementById('back' + wordnumber).innerHTML = vocab[randarray[wordnumber]].meaning
			}
			
			$("#word" + wordnumber).toggleClass("answerbox2");
			textinput.style.color = "red";
			
			
			
			window.setTimeout(function(){
				$("#word" + wordnumber).toggleClass("answerbox2")
				
				document.getElementById('answerinput').value = '';
				document.getElementById('answerinput').style.color = "grey";
			},3000);
			
			
			console.log("wronglasdf");
		
			both_right = false;		
			textinput.style.color = "red";
		
			if(type_flag == false){
				type_flag = true;
			}else{
				window.setTimeout(function(){nextset()},3200);
			};
			
			
			if(wordnumber+1 != randarray.length){
				
	
				
				// both_right = false;
// 				textinput.style.color = "red";
//
// 				if(type_flag == false){
// 					type_flag = true;
// 				}else{
// 					window.setTimeout(function(){nextset()},3200);
// 				};
			}
			
		}else {
			// console.log("this is correct");
			textinput.style.color = "rgba(66,235,89,1)";
			
			if(type_flag == false){
				type_flag = true;
				window.setTimeout(function(){
				document.getElementById('answerinput').placeholder = "meaning";
				document.getElementById('answerinput').value = '';
				document.getElementById('answerinput').style.color = "grey";
				},1000);
			}else{
			window.setTimeout(function(){nextset()},100);
			
				
			};		
			
		}	
		// console.log(randarray);
	};
});





var reset = function(){
	
	
	if(sets_until_complete == 0){
		update_words();
		alert("you did it!");
		
		
	} else {
		sets_until_complete = sets_until_complete - 1;
		remaining = vocab.length;
		wordnumber = 0;
		document.getElementById('answerinput').value = '';
		document.getElementById('answerinput').style.color = "grey"
		document.getElementById('highscore').innerHTML = remaining;
		startpage();
	}
}





var update_words = function(signal){
	set_name = document.getElementById('set-name').value
	user_name = document.getElementById('user-name').value
	console.log(set_name, user_name)
	$.ajax({
		// need to pass variable to template that I can grab with javascript to replace this url
		// will not work on other profiles
		url:'/profile/' + user_name + '/' + set_name + '/complete-stack',
		type:'POST',
		data:{wordlist: JSON.stringify(vocab), csrfmiddlewaretoken: csrftoken, set_name: set_name},
		success: update_words_success, 
		failure: function(data){
			alert("Sorry got an error on the AJAX")
		}
	});
};


var update_words_success = function(data){
	console.log(data);
};




var csrftoken = $.cookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});





//on page load
startpage();
document.getElementById('highscore').innerHTML = remaining;


document.getElementById('highscore').onclick = function(){
	reset();
};









