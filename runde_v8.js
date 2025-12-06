//******************* B: ALLES RUND UM RUNDENLOGIK *******************//
//******* Würfeln mit max-Würfe, Passen [mit HP-Abzug], reset *******//
//*******************************************************************//




//************* KONSTANTEN: WURF & BUTTON *************//
//****************************************************//

	let wurfZaehler = 0; // Wurfzähler pro Runde (Runde = Angegriffen oder gepasst)
	const MAX_WURF = 3;

	//Button-ID holen aus index
	const passenButton = document.getElementById("passen");
	const wuerfelnButton = document.getElementById("wuerfeln");






//*************** EVENT: WÜRFELBUTTON-LOGIK ***************//
//***** max. 3 Würfe + blockiere wenn Grenze erreicht *****//
//********************************************************//

	// Wenn wuerfelnButton (Button mit ID "wuerfeln") Klick wahrnimmt:
	wuerfelnButton.addEventListener("click", () => {

		// Prüfen, wie oft schon angeklickt
		if (wurfZaehler < MAX_WURF) {						//wenn unter 3x

			wuerfeln();											//führe aus
			wurfZaehler++;										//& inkrementiere Wurf-/Klickanzahl
		} else { 												//wenn MAX erreicht -> wurfZaehler >= MAX_WURF
				wuerfelnButton.disabled = true;			//Button-Rolle in index deaktivieren
																	//Frage: geht hier auch einfach else?
		}
	});






//********* EVENT: PASSENBUTTON-LOGIK ***********//
//************** HP-Abzug + reset **************//
//**********************************************//

	// Wenn passenButton (Button mit ID "passen") Klick wahrnimmt:
	passenButton.addEventListener("click", () => {

		// HIER später: HP-Abzug !!!

		resetRunde();
	});






//****************** FUNKTION: resetRunde() ******************//
//*********** clean alle locks, Wurfanzahl & Augen ***********//
//************************************************************//

	function resetRunde() {

		// 1. Wurfanzahl wieder 0
		wurfZaehler = 0;

		// 2. Gehe alle Würfel durch
		for (let i = 0; i < 5; i++) {

			// 3. Entferne locks
			locked[i] = false;

			// 4. Hole entsprechenden Würfel
			const w = document.getElementById("wuerfel" + (i + 1))

			// 5. Entferne lock-Klasse (und somit Design)
			w.classList.remove("locked");

			// 6. Entferne Inhalt/Augen
			w.innerHTML = "";
		}

    // 7. Button-Rolle in index wieder aktivieren
    wuerfelnButton.disabled = false;
}



