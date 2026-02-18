


//*************'************** Gegner-Generierung ***************************//
//**************************************************************************//

	document.addEventListener("DOMContentLoaded", () => {
		generiereGegner();
	});

// Sobald Seite fertig geladen ist, werden die Gegnerkarten erstmals gesetzt.
// ÄNDERN? -> zu wenn Start gedrückt wurde?






//*************** DO THE LOCK *****************//
//*******************************************************//

// Gehe jeden Würfel durch - wenn Würfel angeklickt wurde, dann entsprechend toggleLock()
    for (let i = 0; i < 5; i++) {
      document.getElementById("wuerfel" + (i + 1))
        .addEventListener("click", () => toggleLock(i));
    }










