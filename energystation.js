/*jslint browser: true, sloppy: true*/

var tempStartseite = true;
var minBild = 1;
var maxBild = 193;
var tempSprache;
  //
var myInterval = setInterval(clickOnDocument, 10000)
function clickOnDocument() {
	var btn_klickbereich = document.getElementById('klickbereich');
	btn_klickbereich.click();        
	clearInterval(myInterval);  
	myInterval = setInterval(clickOnDocument, 20000);      
  }
;
  


//energieanzeigen
var btn_klickbereich = document.getElementById('klickbereich');
btn_klickbereich.addEventListener('click', function(){
	energieJetztAnzeigen(false);
	clearInterval(myInterval);  
	myInterval = setInterval(clickOnDocument, 20000);
})
var mc_klickbereich = new Hammer(btn_klickbereich);
mc_klickbereich.get('pan').set({});
// listen to events...
mc_klickbereich.on("tap press", function (ev) {
	//alert("neu..");
	energieJetztAnzeigen(false);
	clearInterval(myInterval); 
	myInterval = setInterval(clickOnDocument, 20000); 
});

//for all swipe
mc_klickbereich.on("swipe", function (ev) {
	//alert("neu..");
	energieJetztAnzeigen(false);
	clearInterval(myInterval);  
	myInterval = setInterval(clickOnDocument, 20000);
});

//btn_german
var btn_german = document.getElementById('btn_deutsch');
var mc_german = new Hammer(btn_german);
mc_german.get('pan').set({
	direction: Hammer.DIRECTION_ALL
});
// listen to events...
mc_german.on("panleft panright panup pandown tap press", function (ev) {
	document.getElementById("text1").innerHTML = "Energietankstelle";
	document.getElementById("text2").innerHTML = "klick mich...";
	tempSprache = "de";
	localStorage.setItem("langEnergie", "de");
	localStorage.setItem("langEnergieText1", "Energietankstelle");
	localStorage.setItem("langEnergieText2", "klick mich...");
});
//btn_english
var btn_english = document.getElementById('btn_englisch');
var mc_english = new Hammer(btn_english);
mc_english.get('pan').set({
	direction: Hammer.DIRECTION_ALL
});
// listen to events...
mc_english.on("panleft panright panup pandown tap press", function (ev) {
	document.getElementById("text1").innerHTML = "Energy station";
	document.getElementById("text2").innerHTML = "click me...";
	tempSprache = "en";
	localStorage.setItem("langEnergie", "en");
	localStorage.setItem("langEnergieText1", "Energy station");
	localStorage.setItem("langEnergieText2", "click me...");
});
//btn_spanish
var btn_spanish = document.getElementById('btn_spanisch');
var mc_spanish = new Hammer(btn_spanish);
mc_spanish.get('pan').set({
	direction: Hammer.DIRECTION_ALL
});
// listen to events...
mc_spanish.on("panleft panright panup pandown tap press", function (ev) {
	document.getElementById("text1").innerHTML = "Fuente de Energia";
	document.getElementById("text2").innerHTML = "haz clic...";
	tempSprache = "es";
	localStorage.setItem("langEnergie", "es");
	localStorage.setItem("langEnergieText1", "Fuente de Energia");
	localStorage.setItem("langEnergieText2", "haz clic...");
});
//end language

var meinBild;
var meinBildVorher;

var zahl;
var zahl1;
//motivationText is from language.js
var sprachArray = motivationText;
var countText = sprachArray.length;

var buttonstyle = ["alert alert-success", "alert alert-danger", "alert alert-info"];
var countbutton = buttonstyle.length;
var schriftstyle = ["Tangerine", "Dancing Script", "Roboto"];
var countschrift = schriftstyle.length;

var tempSatzOld;

function rand(min, max) {
	"use strict";
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function loescheElement(element) {
	"use strict";
	if (element) {
		var papa = element.parentNode;
		papa.removeChild(element);
	}
}

var myColor = ["#9e0976","#000e9e", "#009e00"];

//#f39c12

var mySelectedBack;
var textfarbe, schriftart, selected;

function energieAnzeigen(tempSelected) {

	if (tempStartseite === false) {
		document.getElementById("moti").innerHTML = tempSelected;

		//farbe

		document.getElementById("farbe").className = buttonstyle[rand(0, countbutton - 1)];
		textfarbe = myColor[rand(0, myColor.length - 1)];
		//alert(textfarbe);

		document.getElementById("farbe").style.color = textfarbe;
		document.getElementById("farbe").style.borderColor = textfarbe;

		//document.getElementById("moti").style.borderColor = textfarbe;
		//ende farbe

		document.getElementById("moti").style.fontFamily = schriftart;

		loescheElement(document.getElementById("startJetzt"));
		loescheElement(document.getElementById("startJetztBild"));
		loescheElement(document.getElementById("sprache"));
	}
	//document.getElementById("startJetzt").style.display = 'none';
}

var tempSatzOld;
var tempBildOld;

function energieJetztAnzeigen(boolAnzeige) {
	"use strict";
	if (boolAnzeige === false) {
		tempStartseite = false;
	}
	//neu...vorheriges Bild
	//mySelectedBack = selected;
	textfarbe = buttonstyle[rand(0, countbutton - 1)];
	schriftart = schriftstyle[rand(0, countschrift - 1)];

	//sprache ausw??hlen
	if (tempSprache === "de") {
		sprachArray = motivationText;
		countText = sprachArray.length;
	}

	if (tempSprache === "en") {
		sprachArray = motivationTextEn;
		countText = sprachArray.length;
	}

	if (tempSprache === "es") {
		sprachArray = motivationTextEs;
		countText = sprachArray.length;
	}

	selected = sprachArray[rand(0, countText - 1)];
	if (selected == tempSatzOld) {
		selected = sprachArray[rand(0, countText - 1)];
	} else {
		tempSatzOld = selected;
	}

	if (selected.slice(0, 2) === "no") {
		selected = selected.slice(2, selected.length);
	} else {
		//selected = selected + motivationBild[Math.random() * countBild | 0];
		zahl = rand(minBild, maxBild);
		if (zahl == tempBildOld) {
			zahl = rand(minBild, maxBild);
		} else {
			tempBildOld = zahl;
		}

		meinBild = "<img src='img/t" + zahl + ".jpg' class='img-circle'>";
		zahl1 = rand(1, 2);
		if (zahl1 === 1) {
			selected = selected + "&nbsp;" + meinBild;
		} else {
			selected = meinBild + "&nbsp;" + selected;
		}
	}

	energieAnzeigen(selected);

	//document.getElementById("info").innerHTML = textfarbe;
}

var tempInfo1;
var tempInfo2;

function startBild() {
	"use strict";
	tempStartseite = true;
	if (localStorage.getItem("langEnergie") == null) {
		localStorage.setItem("langEnergie", "de");
		localStorage.setItem("langEnergieText1", "Energietankstelle");
		localStorage.setItem("langEnergieText2", "Klick mich...");
	}
	tempSprache = localStorage.getItem("langEnergie");
	//alert(tempSprache);
	tempInfo1 = localStorage.getItem("langEnergieText1");
	//alert(tempInfo1);
	tempInfo2 = localStorage.getItem("langEnergieText2");
	//alert(tempInfo2);
	document.getElementById("text1").innerHTML = tempInfo1;
	document.getElementById("text2").innerHTML = tempInfo2;

	//zahl = rand(1, 3);
	//meinBild = "img/t" + zahl + ".jpg";
	//ocument.getElementById("startJetztBild").setAttribute("src", //meinBild);
	document.getElementById("startJetzt").style.backgroundColor = "white";
	document.getElementById("startJetzt").style.color = "#9e0976";
}
