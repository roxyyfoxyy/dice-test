
//****************** B: MAX 3 WÜRFE ******************//
//****************************************************//

let wurfZaehler = 0; // Wurfzähler pro Runde (Runde = Angegriffen oder gepasst)
const maxWurf = 3;

const passenButton = document.getElementById("passen");
const wuerfelnButton = document.getElementById("wuerfeln");





//*************** WÜRFEL NUR MAX 3x und Angriff oder Pass  ;-; *****************//
//*******************************************************//


	wuerfelnButton.addEventListener("click", () => {
    if (wurfZaehler < maxWurf) {

        wuerfeln();
        wurfZaehler++; 

        // ab Wurf 3 -> Rollbutton deaktivieren
        if (wurfZaehler >= maxWurf) {
            wuerfelnButton.disabled = true;
        }
    }

   });



//*************** RUNDENRESET *****************//
//*******************************************************//

function resetRunde() {
    wurfZaehler = 0;

    // alle locks UND alle Augen entfernen
    for (let i = 0; i < 5; i++) {
        locked[i] = false;
		  
        const w = document.getElementById("wuerfel" + (i + 1))
		  
		  w.classList.remove("locked");
		  w.innerHTML = "";

		  
    }

	 


    // Rollbutton wieder releasen
    wuerfelnButton.disabled = false;
}


