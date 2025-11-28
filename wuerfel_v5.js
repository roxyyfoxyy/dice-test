//****************** A: ZUSTAND WÜRFEL ******************//
//****************************************************//

    // true = gelockt, false = frei
    let locked = [false, false, false, false, false];

    // Zur Speicherung des aktuellen gewürfelten Werts
    let werte = [1, 1, 1, 1, 1];






//****** A: FUNKTION: LÖSCHE/CLEANE + DESIGNE NEU ANHAND RANDOM WERT ******//
//**********************************************************************//
	function designWuerfel(wuerfelElement, value) {
	
	
		// Lösche vorigen Inhalt/Augen
	    wuerfelElement.innerHTML = "";
	
	
		// Wert zuordnen zu Position auge (a1, a2, Kombis etc.)
		// Wenn Zahl, dann schau, welche Augen dazugehören
	    const augePosition = {
	        1: ["a4"],
	        2: ["a1", "a7"],
	        3: ["a1", "a4", "a7"],
	        4: ["a1", "a2", "a6", "a7"],
	        5: ["a1", "a2", "a4", "a6", "a7"],
	        6: ["a1", "a2", "a3", "a5", "a6", "a7"]
	    };
	
	
		// Generiere die benötigten Augen
	    augePosition[value].forEach(pos => {						//wenn Zahl, dann rufe dazugehörige Augen auf
		 																		//für jedes ???
	        const auge = document.createElement("div");		//erstelle neues div für Auge
	        auge.classList.add("auge", pos);						//kreiiere zwei Klassen: auge für Aussehen, pos für Position
	        wuerfelElement.appendChild(auge);						//platziere es in .wuerfel
	    });
	
		 
	}



//************** A: FUNKTION: RANDOM WERT **************//
//***** jetzt angepasst auf NUR nicht gelocked ******//
//********** doch lieber mit for-Schleife ***********//
//**************************************************//


	// Würfeln nur für nicht gelockte
    function wuerfeln() {
	 
      for (let i = 0; i < 5; i++) {												//gehe alle 5 Würfel durch im Array locked
        if (!locked[i]) {															//bei locked einer auf NICHT true ist, dann wähle:
          werte[i] = Math.floor(Math.random() * 6) + 1;					//random Abrundwert zwischen 0...5 +1 -> 1...6
        }
        const w = document.getElementById("wuerfel" + (i + 1));		//hole jeweiligen Würfel 
		  																					// +1 weil nicht von 0-5, sondern 1-6 für ID
        designWuerfel(w, werte[i]);												//behalte Design jeweiliger Würfel
      }
		
    }




//************* A: FUNKTION: LOCK PER KLICK *************//
//******** setze true bei locked wenn Klick *********//
//**************************************************//

   // Lock-Funktion per Klick 
	// (Index = welcher Würfel gerade angeklickt wurde)
    function toggleLock(index) {
	 
      locked[index] = !locked[index];											// Invertiert: Wenn locked true, dann frei/false, sobald Klick
																							// Wenn frei/false, dann locked true, sobald Klick
      const w = document.getElementById("wuerfel" + (index + 1));		// hole jeweiligen Würfel 
		  																					// +1 weil nicht von 0-5, sondern 1-6 für ID
      w.classList.toggle("locked", locked[index]);							// vorgefertigtes toggle() 
																							// kann Klasse adden oder entfernen
																							// hier: Klasse "locked", Bedingung locked[index]
																							// wenn locked[index] true -> Klasse "locked wird hinzugefügt" --> Add-Klick
																							// wenn locked[index] false -> Klasse "locked wird entfernt" --> Remove-Klick
																						   //Design = .wuerfel .locked
		
    }










