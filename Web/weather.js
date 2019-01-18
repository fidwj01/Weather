/* code that runs when Web page is first loaded and rendered by the browser */
LEFT = 0;
POSITION_COUNT = 0;

function init() {
	var range = document.getElementById("range");
	var rangeWidth = range.clientWidth;
	var steppers = document.getElementsByClassName("stepper");

	var n = steppers.length;
	for (i = 0; i < n; i++) {
		steppers[i].style.left = 0 + "px";
	}
	document.getElementById("inputBox").value = "95618";
	submitNew();
	document.getElementById("inputBox").value = "";
}

/* functions defined when Web page is loaded, but run when button is pushed. */
function rightArrow() {
	var range = document.getElementById("range");
	var rangeWidth = range.clientWidth;
	var steppers = range.getElementsByClassName("stepper");

	if (POSITION_COUNT < 5) {
		LEFT = LEFT - 148;
		for (i = 0; i < steppers.length; i++) {
			steppers[i].style.left = LEFT + "px";
		}
		POSITION_COUNT = POSITION_COUNT + 1;
	}
}

function leftArrow() {
	var range = document.getElementById("range");
	var rangeWidth = range.clientWidth;
	var steppers = range.getElementsByClassName("stepper");
	if (POSITION_COUNT > 0) {
		LEFT = LEFT + 148;
		for (i = 0; i < steppers.length; i++) {
			steppers[i].style.left = LEFT + "px";
		}
		POSITION_COUNT = POSITION_COUNT - 1;
	}
}

function submitNew() {
	// get what the user put into the textbox
	var newPlace = document.getElementById("inputBox").value;

	// make a new script element
	var script = document.createElement('script');

	// start making the complicated URL
	script.src = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + newPlace + "')&format=json&callback=callbackFunction"
	script.id = "jsonpCall";

	// remove old script
	var oldScript = document.getElementById("jsonpCall");
	if (oldScript != null) {
		document.body.removeChild(oldScript);
	}

	// put new script into DOM at bottom of body
	document.body.appendChild(script);
}

function submitNewMobile() {
	// get what the user put into the textbox
	var newPlace = document.getElementById("inputBoxMobile").value;

	// make a new script element
	var script = document.createElement('script');

	// start making the complicated URL
	script.src = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + newPlace + "')&format=json&callback=callbackFunction"
	script.id = "jsonpCall";

	// remove old script
	var oldScript = document.getElementById("jsonpCall");
	if (oldScript != null) {
		document.body.removeChild(oldScript);
	}

	// put new script into DOM at bottom of body
	document.body.appendChild(script);
}

function getMonthName(shortMonth) {
	var month;
	switch(shortMonth.toLowerCase()) {
		case "jan":
		month = "January";
		break;
		case "feb":
		month = "February";
		break;
		case "mar":
		month = "March";
		break;
		case "apr":
		month = "April";
		break;
		case "may":
		month = "May";
		break;
		case "jun":
		month = "June";
		break;
		case "jul":
		month = "July";
		break;
		case "aug":
		month = "August";
		break;
		case "sep":
		month = "September";
		break;
		case "oct":
		month = "October";
		break;
		case "nov":
		month = "November";
		break;
		case "dec":
		month = "December";
		break;
		default:
		month = "";
	}
	return month;
}

function getIcon(nowCode) {
	var iconSrc = "";
	if (nowCode == 3 || nowCode == 4 || nowCode == 37 || nowCode == 38 || nowCode == 39 || nowCode == 45 || nowCode == 47) {
		iconSrc = "../WeatherApp%203/thunder.png"
	} else if (nowCode == 30 || nowCode == 33 || nowCode == 34 || nowCode == 44) {
		iconSrc = "../WeatherApp%203/part-sun.png"
	} else if (nowCode == 26 || nowCode == 27 || nowCode == 28|| nowCode == 29) {
		iconSrc = "../WeatherApp%203/cloudy.png"
	} else if (nowCode == 31 || nowCode == 32 || nowCode == 36) {
		iconSrc = "../WeatherApp%203/sunny.png"
	} else if (nowCode == 10 || nowCode == 11 || nowCode == 12 || nowCode == 14 || nowCode == 40) {
		iconSrc = "../WeatherApp%203/rain.png"
	} else if (nowCode == 5 || nowCode == 7 || nowCode == 13 || nowCode == 14 || nowCode == 15 || nowCode == 16 || nowCode == 41 || nowCode == 42 || nowCode == 43 || nowCode == 46) {
		iconSrc = "../WeatherApp%203/snow.png"
	}
	return iconSrc;
}

function callbackFunction(data) {
	// data contains object returned from server
	var lastDate = data.query.results.channel.lastBuildDate;
	var dateArray = lastDate.split(' ');
	var nowTime = "Today " + dateArray[4] + (dateArray[5]).toLowerCase();
	var nowDate = getMonthName(dateArray[2]) + " " + dateArray[1] + ", " + dateArray[3];
	var city = data.query.results.channel.location.city;
	var region = data.query.results.channel.location.region;
	var location = city + ", " + region;
	var nowTemp = data.query.results.channel.item.condition.temp;
	var degreeUnit = data.query.results.channel.units.temperature;
	var nowText = data.query.results.channel.item.condition.text.toLowerCase();
	var nowCode = data.query.results.channel.item.condition.code;
	var nowHumidity = data.query.results.channel.atmosphere.humidity + "%";
	var nowWind = data.query.results.channel.wind.speed;
	var speedUnit = data.query.results.channel.units.speed;
	var forecastInfo = data.query.results.channel.item.forecast;

	// dump it to the Web page
	document.getElementById("nowTime").textContent = nowTime;
	document.getElementById("mobileNowTime").textContent = nowTime;
	document.getElementById("nowDate").textContent = nowDate;
	document.getElementById("locationName").textContent = location;
	document.getElementById("mobileLocationName").textContent = location;
	document.getElementById("nowIcon").src = getIcon(nowCode);
	document.getElementById("nowTemp").textContent = nowTemp;
	document.getElementById("degreeUnit").textContent = degreeUnit;
	document.getElementById("nowText").textContent = nowText;
	document.getElementById("nowHumidity").textContent = nowHumidity;
	document.getElementById("nowWind").textContent = nowWind + speedUnit;
	for (var i = 0; i < forecastInfo.length; i++) {
		document.getElementsByClassName("forecastDay")[i].textContent = forecastInfo[i].day;
		document.getElementsByClassName("forecastIcon")[i].src = getIcon(forecastInfo[i].code);
		document.getElementsByClassName("forecastText")[i].textContent = forecastInfo[i].text.toLowerCase();
		document.getElementsByClassName("highTemp")[i].textContent = forecastInfo[i].high + "°";
		document.getElementsByClassName("lowTemp")[i].textContent = forecastInfo[i].low + "°";
	}
}
