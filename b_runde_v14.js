//******************* B1: ALLES RUND UM RUNDENLOGIK ******************//
//*********** Würfeln mit max-Würfe, Passen, Angriff, reset **********//
//********************************************************************//




//***************** KONSTANTEN: WURF & BUTTON *****************//
//************************************************************//

	//gameState.wurfZaehler = 0; 				// Wurfzähler pro Runde (Runde = Angegriffen oder gepasst)
	//weg - ist jz in loadGameState() savegamestate.js
	
	const MAX_WURF = 3;

	//Button-ID holen aus index
	const passenButton = document.getElementById("passen");
	const wuerfelnButton = document.getElementById("wuerfeln");




//**************** FUNKTION: WURFANZAHL UPDATE ****************//
//************ Anzeige wie viele Würfe verbleibend ***********//
//************************************************************//

	function updateWurf() {
		const anzeige = document.getElementById("wurfZaehler");
		const verbleibend = MAX_WURF - gameState.wurfZaehler;

		if (verbleibend <= 0) {
			anzeige.textContent = "KEINE WÜRFE MEHR";
		} else {
			anzeige.textContent = verbleibend + " Würfe verbleibend";
		}
	}




//****************** EVENT: WÜRFELBUTTON-LOGIK *****************//
//******* max. 3 Würfe + blockiere wenn Grenze erreicht *******//
//************************************************************//

	// Wenn wuerfelnButton (Button mit ID "wuerfeln") Klick wahrnimmt:
	wuerfelnButton.addEventListener("click", () => {

		// Prüfen, wie oft schon angeklickt
		if (gameState.wurfZaehler < MAX_WURF) {					//wenn unter 3x

			wuerfeln();											//führe aus
			gameState.wurfZaehler++;							//& inkrementiere Wurf-/Klickanzahl

			// Wurfanzahl updaten & speichern
			updateWurf();
			saveGameState();


		} else { 												//wenn MAX erreicht -> wurfZaehler >= MAX_WURF
				wuerfelnButton.disabled = true;					//Button-Rolle in index deaktivieren
																//Frage: geht hier auch einfach else?
		}
	});






//**************** EVENT: PASSENBUTTON-LOGIK ******************//
//********************* HP-Abzug + reset *********************//
//************************************************************//

	// Wenn passenButton (Button mit ID "passen") Klick wahrnimmt:
	passenButton.addEventListener("click", () => {

		// Wenn nach Passen GameOver, dann HP=0 und somit ABBRUCH
		if (gameState.gameOver) return;

		// Wenn diese Runde noch nicht angegriffen haben -> -HP
		if (!gameState.schonAngegriffen) {
			minusHP(1);
		}

		// Würfel resetten
		resetRunde();
	});






//****************** FUNKTION: resetRunde() ******************//
//*********** clean alle locks, Wurfanzahl & Augen ***********//
//************************************************************//

	function resetRunde() {

		// 1. Wurfanzahl wieder 0 & schonAngegriffen-reset
		gameState.wurfZaehler = 0;
		gameState.schonAngegriffen = false;

		// Wurfanzahl updaten
		updateWurf();

		// 2. Gehe alle Würfel durch
		for (let i = 0; i < 5; i++) {

			// 3. Entferne locks
			locked[i] = false;

			// Würfelaufgen-Werte leeren (damit bei Refresh nicht last-saved wieder angezeigt wird)
			werte[i] = null;

			// 4. Hole entsprechenden Würfel
			const w = document.getElementById("wuerfel" + (i + 1))

			// 5. Entferne lock-Klasse (und somit Design)
			w.classList.remove("locked");

			// 6. Entferne Inhalt/Augen
			w.innerHTML = "";
		}

    // 7. Button-Rolle in index wieder aktivieren
    wuerfelnButton.disabled = false;

	// Für noDesign-Würfel & Wurfanzahl verbleibt wie bei Passen nach Refresh
	saveGameState();
}



//******************* B2: ALLES RUND UM ANGRIFFSLOGIK *****************//
//*************** Karten anklicken, Erfolg/Failure-Check **************//
//********************************************************************//

	//Alles, was .karten auswählen
	const karten = document.querySelectorAll('.karten');



//*************** EVENT: ANGREIFEN/GEGNER WÄHLEN ***************//
//******* klick erkennen + angreifen, wenn mind. 1 Wurf *******//
//************************************************************//

	// 1. Gehe alle karten durch und wenn karten Klick wahrnimmt:
	karten.forEach(kartenElement => {
		kartenElement.addEventListener('click', () => {

			// 2. Prüfung, ob überhaupt schon gewürfelt
			if (gameState.wurfZaehler > 0) { 

				// 3. führe Angriff aus
				angreifen(kartenElement);
			}
		});
	});





//******************** FUNKTION: ANGREIFEN ********************//
//*************** Treffer- & Ungültig-Aktionen ***************//
//************************************************************//

	function angreifen(gegnerKarte) {
		console.log(`Angriff auf ${gegnerKarte.id}!`);

		const treffer = checkGegnerTreffer(gegnerKarte.id);		//aus matching.js
		const popup = document.querySelector(".popup-text");


		// Treffer
		if (treffer) {
			console.log("Treffer - Gegner wird besiegt");
			popup.textContent = "TREFFER!";

			// Punkte zählen - alle 1 (SPÄTER: different je nach Gegner)
			// & Mindest-Angriff pro Runde CHECK
			plusPunkte(1);
			gameState.schonAngegriffen = true
			saveGameState();
			
			// Animation-Reset (für wenn vorher schon aktiviert)
			popup.classList.remove("animation");
			void popup.offsetWidth; // Reflow Trick (damit Browser remove auch wirklich erkennt)
			
			// Animation-Start
			popup.classList.add("animation");

			//resetRunde();	// Würfel zurücksetzen
			return; 		// dann nachruecken(true)
	
		}

		// Ungültig
		console.log("Falsche Würfelkombo - Gegner bleibt");
		popup.textContent = "Falsche Würfelkombination!";

		// Animation-Reset (für wenn vorher schon aktiviert)
		popup.classList.remove("animation");
		void popup.offsetWidth; // Reflow Trick (damit Browser remove auch wirklich erkennt)

		// Animation-Start
		popup.classList.add("animation");

}
