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
		const popup = document.querySelector(".popup-angriff");


		// Treffer/Erfolg
		if (treffer) {
			console.log("Treffer - Gegner wird besiegt");

			popup.textContent = "TREFFER!";
			
			// Animation resetten falls sie schon lief
			popup.classList.remove("animation");
			void popup.offsetWidth; // Reflow Trick
			
			popup.classList.add("animation");

			//resetRunde();	//Würfel zurücksetzen
			// SPÄTER: wenn noch Würfe übrig, weiter Angriff zulassen - kein Reset - nur locked-ones reset
			// aber ohne Punktabzug bei Passen am Ende
			// wenn letzter Wurf DANN reset (weil eh keine Würfe mehr übrig)


			return; 		//dann nachruecken(true)
	
		}

		// Kein Treffer/Falsche Würfelkombo
		console.log("Falsche Würfelkombo - Gegner bleibt");

		popup.textContent = "Falsche Würfelkombination!";

		popup.classList.remove("animation");
		void popup.offsetWidth;
		popup.classList.add("animation");

}

