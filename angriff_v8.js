//*************** C: ALLES RUND UM ANGRIFFSLOGIK ***************//
//*********** Karten anklicken, Erfolg/Failure-Check ***********//
//**************************************************************//



//************* KONSTANTEN: WURF & BUTTON *************//
//****************************************************//

	//Alles, was .karten auswählen
	const karten = document.querySelectorAll('.karten');




//************* EVENT: ANGREIFEN/GEGNER WÄHLEN *************//
//***** klick erkennen + angreifen, wenn mind. 1 Wurf *****//
//*********************************************************//

	// 1. Gehe alle karten durch und wenn karten Klick wahrnimmt:
	karten.forEach(kartenElement => {
		kartenElement.addEventListener('click', () => {

			// 2. Prüfung, ob überhaupt schon gewürfelt
			if (wurfZaehler > 0) { 

				// 3. führe Angriff aus
				angreifen(kartenElement);
			}
		});
	});





//************* FUNKTION: ANGREIFEN *************//
//******** Erfolg- & Misserfolg-Aktionen ********//
//***********************************************//

	function angreifen(gegnerKarte) {
		console.log(`Angriff auf ${gegnerKarte.id}!`);

		const treffer = checkGegnerTreffer(gegnerKarte.id);


		// Treffer
		if (treffer) {
			console.log("Treffer! Gegner wird besiegt!");

			// Gegner wurde im gegner_v6.js bereits ersetzt
			// Jetzt Runde beenden (wie beim Passen)
			resetRunde();
			return; 
		}

		// Kein Treffer
		console.log("Keine passende Würfelkombination.");
		resetRunde();


		//ÄNDERN SPÄTER: KEIN reset, nur Meldung, dass KEIN MATCH
}

