


//*************** DO THE LOCK *****************//
//*******************************************************//

// Gehe jeden Würfel durch - wenn Würfel angeklickt wurde, dann entsprechend toggleLock()
    for (let i = 0; i < 5; i++) {
      document.getElementById("wuerfel" + (i + 1))
        .addEventListener("click", () => toggleLock(i));
    }



/* ALTERNATIV

document.getElementById("wuerfel1").addEventListener("click", () => toggleLock(0));
document.getElementById("wuerfel2").addEventListener("click", () => toggleLock(1));
document.getElementById("wuerfel3").addEventListener("click", () => toggleLock(2));
document.getElementById("wuerfel4").addEventListener("click", () => toggleLock(3));
document.getElementById("wuerfel5").addEventListener("click", () => toggleLock(4));


*/



//*************** WÜRFEL JETZT BITTE ;-; _v2 *****************//
//*******************************************************//

	 // Wenn click auf Button, dann führe wuerfeln() aus
	//document.getElementById("wuerfeln").addEventListener("click", wuerfeln);
	// --> noch aus _v2
	//wuerfeln();



//*************** WÜRFEL JETZT BITTE _v3 mit Reset *****************//
//******************************************************************//

passenButton.addEventListener("click", () => {
    console.log("Player passes :(((");

    // HIER später: HP-Abzug, Punkte, etc.
	 //UND wenn Angriff, dann selber Effekt wie beim Passen ofc

    resetRunde();
    //wuerfeln(); // BLOß NICHT!!! weil sonst bleiben Augen nach Reset
});










//**NEU NEU NEU NEU ***//


//*************** ANGREIFEN LOGIK: Karten auswählen ***************//
//******************************************************************//

// Alle Karten-Elemente für den Angriff
const karten = document.querySelectorAll('.karten');  // Alle Karten-Elemente auswählen

karten.forEach(kartenElement => {
    kartenElement.addEventListener('click', () => {
        if (wurfZaehler > 0) {  // Nur angreifen, wenn der Spieler bereits geworfen hat
            angreifen(kartenElement);
        }
    });
});

// Angriffsfunktion
function angreifen(gegnerKarte) {
    console.log(`Angriff auf ${gegnerKarte.id}!`);

    // Platzhalter-Logik für den Angriff (zunächst geht jeder Angriff durch)
    // Zuerst zurücksetzen, wie beim Passen
    resetRunde();

    // Hier kann später die tatsächliche Logik eingebaut werden, 
    // um zu prüfen, ob der Angriff erfolgreich war:
    // Beispiel: Wenn Gegner besiegt, dann Gegner entfernen und neuen anfügen.

    // Zurücksetzen der Runde und Würfel
    console.log("Runde zurückgesetzt und Angriff beendet.");
}

// Funktion, um die Runde zurückzusetzen (Würfel und alles zurücksetzen)
function resetRunde() {
    wurfZaehler = 0;

    // Alle Würfel zurücksetzen (wir setzen hier alle Würfel auf "unlocked")
    for (let i = 0; i < 5; i++) {
        locked[i] = false;

        const w = document.getElementById("wuerfel" + (i + 1));
        w.classList.remove("locked");
        w.innerHTML = "";
    }

    // Rollbutton wieder aktivieren
    wuerfelnButton.disabled = false;

    // Wenn der Angriff abgeschlossen ist, könnte man hier noch Logik hinzufügen,
    // um den Gegner zu entfernen, falls besiegt.
}





