$(document).ready(function() {

	//EventEmitter implementation
	var events = {
		events: {},
		on: function(eventName, fn) {
			this.events[eventName] = this.events[eventName] || [];
			this.events[eventName].push(fn);
		},
		off: function(eventName, fn) {
			if (this.events[eventName]) {
				for (var i = 0; i < this.events[eventName].length; i++) {
					if (this.events[eventName][i] === fn) {
						this.events[eventName].splice(i, 1);
						break;
					}
				}
			}
		},
		emit: function(eventName, data) {
			if (this.events[eventName]) {
				this.events[eventName].forEach(function(fn) {
					fn(data);
				});
			}
		}
	}; 
	
	//keypad UI register
	var keypad = {
		'one': $('#one'),
		'two': $('#two'),
		'three': $('#three'),
		'four': $('#four'),
		'five': $('#five'),
		'six': $('#six'),
		'seven': $('#seven'),
		'eight': $('#eight'),
		'nine': $('#nine'),
		'zero': $('#zero'),
		'ac': $('#ac'),
		'ce': $('#ce'),
		'percent': $('#percent'),
		'divide': $('#divide'),
		'multiply': $('#multiply'),
		'subtract': $('#subtract'),
		'add': $('#add'),
		'equals': $('#equals'),
		'decimal': $('#decimal')
	}; 
	
	var currNum = "";	//tracks current number being entered
	currNum.init = true; //tracks if currNum is initalized to zero
	
	var $screen = $('.screen'); //jQuery reference to screen UI
	var operands = []; //register of numbers to operate on in sequence
	
  updateScreen('0'); //initalizes screen to "0" to start
	
	/* iterates through keypad object and attaches click handlers */
	for (var key in keypad) {
		keypad[key].click(key, function(event) {
			events.emit('click', event.data);
			console.log("Button clicked:", event.data);
		});
	}
	
	//catches click events and passes data to parser
	events.on('click', function(data){
		parseKeyPress(data);
	});
	
	//logic for handling updating of currNum & screen
	function updateCurrNum(value) {
		if (currNum.init) {
			currNum = value;
			currNum.init = false;
			//need to fix logic for preventing leading zeros
		} else if (currNum != '0') {			
			currNum += value;
		}
		updateScreen(currNum);
			
	}

	function parseKeyPress(key){
		switch (key) {
			case 'zero': 
				updateCurrNum('0');
				break;
			case 'one':
				updateCurrNum('1');
				break;
			case 'two':
				updateCurrNum('2');
				break;
			case 'three':
				updateCurrNum('3');
				break;
			case 'four':
				updateCurrNum('4');
				break;
			case 'five':
				updateCurrNum('5');
				break;
			case 'six': 
				updateCurrNum('6');
				break;
			case 'seven':
				updateCurrNum('7');
				break;
			case 'eight':
				updateCurrNum('8');
				break;
			case 'nine':
				currNum += '9';
				updateCurrNum('9');
				break;
			case 'plus':
				operands.push(currNum);
				currOp('plus');
				break;
			case 'ce': 
				currNum.init = true;
				updateCurrNum("");
				break;
				
		}
	}

	

	function updateScreen(value) {
		$screen.html(value.toString());
	}

	var currOp = (function() {
		
		var op = "";
		return function() {
			if (arguments[0]) {
				op = arguments[0];				
			} else {
				return op;
			}
		}
	})();

});