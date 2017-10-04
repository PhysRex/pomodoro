var clock = {
	clicks: 0,
	count: 0,
	startTime: 0,
	padZero: function(num) {
		num = parseInt(num);
    if (num < 10) {
			num = "0" + num;
    }
    return num;
	},
	countDown: function() {
		
		// get session and break times from button elements
		var sessionTime = document.querySelector("#timeSL").textContent;
		var breakTime = document.querySelector("#timeBL").textContent;
		
		minutes = (this.clicks !== 0) ? this.startTime : (this.clicks%2) ?  (breakTime+":00") : (sessionTime+":00");
		this.clicks += 1;
		var mins = (/^\d+/g.test(minutes) ? minutes.match(/^\d+/g)[0] : "0");
		var secs = (/\D+/g.test(minutes) ? minutes.match(/\d+$/g)[0] : "00");
		var result;
		
		if (parseInt(mins) === 0 && parseInt(secs) === 0) {
			result = (this.count%2) ? "START!" : "BREAK!";
			document.body.classList.toggle("white");
			setTimeout(function() {document.body.classList.toggle("white");}, 500);
			var snd = new Audio("http://soundbible.com/mp3/sms-alert-5-daniel_simon.mp3"); 
			snd.play();
			snd.currentTime = 0;
			
			this.startTime = (this.count%2) ? (breakTime+":00") : (sessionTime+":00");
			this.count++;
			
		} else {
			
			if (secs>0) {
				result = mins + ":" + this.padZero(secs-1);
			} else {
				result = (mins-1) + ":59";
			}
			
			this.startTime = result;
		}
		
		return result;
	},
	time: function() {
		// returns current time in hrs:min:sec (24-hour format)
		
    var date = new Date();
    var hrs = this.padZero(date.getHours());
    var min = this.padZero(date.getMinutes());
    var sec = this.padZero(date.getSeconds());
		
		var currentTime = hrs + ":" + min + ":" + sec;
    return currentTime;
	}
}

var timer = 0;

var display = {
	digitalElem: document.querySelector(".digital"),
	analogElem: document.querySelector(".analog"),
	runClock: function() {
		// [this.digitalClock, this.analogClock].forEach( function(clock) {
		// 	setInterval(clock, 1000);
		// });
		setInterval(this.digitalClock, 1000);
	},
	digitalClock: function() {
		// display.digitalElem.textContent = clock.time();
	},
	runTimer:	function() {
		timer =  setInterval(this.digitalTimer,1000);
	},
	digitalTimer: function() {
		display.digitalElem.textContent = clock.countDown();
		// console.log(Date());
	},
	resetBtn: function () {
		clock.clicks = 0;
		display.digitalElem.textContent = "0:00";
		handler.timerSwitch = 0;
		clearInterval(timer);
	},
	incrementBtn: function(btnID) {
		
		var btnSL = document.getElementById("timeSL");
		var btnBL = document.getElementById("timeBL");
		
		// Button press if/then
		switch (btnID) {
			case "upSL":
			case "upSL-FA":
				btnSL.textContent = parseInt(btnSL.textContent) +  1;
				break;
			case "downSL":
			case "downSL-FA":
				btnSL.textContent = (parseInt(btnSL.textContent)===1) ? 1 : parseInt(btnSL.textContent) -  1;
				break;
			case "upBL":
			case "upBL-FA":
				btnBL.textContent = parseInt(btnBL.textContent) +  1;
				break;
			case "downBL":
			case "downBL-FA":
				btnBL.textContent = (parseInt(btnBL.textContent)===1) ? 1 : parseInt(btnBL.textContent) -  1;
				break;
			default:
				break;
		 }
	},
}

var handler = {
	timerSwitch: 0,
		// handle button presses
	listeners: function() {
		// Event listeners for buttons clicked		
		window.addEventListener( "click", this.btnPress );
	},
	btnPress: function() {
		// get element that was clicked on as an event		
		
		var elementClicked = event.target;		
		var elementPressed = event.keyCode;
		
		// set btnID as ID of the button clicked
		var btnID = elementClicked.id;
		
		// console.log(...)
		console.log("element:", elementClicked);
		
		if (elementClicked.classList.contains("btn") || elementClicked.classList.contains("fa")){
			display.incrementBtn(btnID);
		}
		
		if (elementClicked.classList.contains("analog")) {
			// Run timer
			elementClicked.classList.toggle("red");
			
			if (handler.timerSwitch === 0) {
				document.querySelector(".digital").style.backgroundColor = "#5cb85c";
				setTimeout( function() {document.querySelector(".digital").style.backgroundColor = "#FF0";}, 200);
				setTimeout( function() {document.querySelector(".digital").style.backgroundColor = "#000";}, 500);

				display.runTimer();				
			} else {
				clearInterval(timer);
			}
			
			handler.timerSwitch = (handler.timerSwitch===0) ? 1 : 0;
		}
		
		if (elementClicked.classList.contains("reset")) {
			display.resetBtn();
			document.querySelector(".analog").classList.remove("red");
			// document.body.style.backgroundColor = "#FFF";
			// setTimeout( function() {document.body.style.backgroundColor = "#000";}, 100);

		}
		
		if (elementClicked.classList.contains("explain-title")) {
			var explainSection = document.querySelector(".explain-section");
			var explainTitle = document.querySelector(".explain-title");
			explainSection.classList.toggle("hide");
			explainSection.classList.toggle("border-show");
			explainTitle.classList.toggle("explain-active");
		}
		
		elementClicked.blur();
		
	}
}

// run listeners
handler.listeners();

