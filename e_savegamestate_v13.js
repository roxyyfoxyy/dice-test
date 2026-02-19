//********************** FUNKTION: SAVE GAME-WERTE *******************//
//****************** Punkte & HP merken bei Refresh ******************//
//********************************************************************//

    // Werte speichern
    function saveGameState() {

        // Für Gegner-Speicherung
        gameState.aktiveGegner = aktiveGegner;
        gameState.gegnerPool = gegnerPool;

        // Für Würfel-Speicherung
        gameState.werte = werte;
        gameState.locked = locked;

        // Objekt umwandeln in String
        // z.B. \"punkte\":5,\"hp\":8,\"gameOver\":false
        localStorage.setItem("gameState", JSON.stringify(gameState));
    }

    // Werte/String laden
    function loadGameState() {

        const saved = localStorage.getItem("gameState");    // unser String


        if (saved) {

            // String wieder umwandeln in Objekt
            const parsed = JSON.parse(saved);

            // Ins gameState.js schreiben
            // wenn parsed.xx undefiniert o. null, dann Wert rechts nehmen stattdessen
            gameState.punkte = parsed.punkte ?? 0;
            gameState.hp = parsed.hp ?? 10;
            gameState.gameOver = parsed.gameOver ?? false;

            gameState.wurfZaehler = parsed.wurfZaehler ?? 0;

            aktiveGegner = parsed.aktiveGegner ?? [];
            gegnerPool = parsed.gegnerPool ?? [];
            
            werte = parsed.werte ?? [1,1,1,1,1];
            locked = parsed.locked ?? [false,false,false,false,false];
        }

        // Anzeige updaten
        updatePunkte();
        updateHP();
        updateWurf();

        // Würfel-Design Anzeige updaten / neu zeichnen
        for (let i = 0; i < 5; i++) {
            const w = document.getElementById("wuerfel" + (i + 1));

            designWuerfel(w, werte[i]);
            w.classList.toggle("locked", locked[i]);
        }

    }

    // INITIALISIERUNG/Aufruf von Game-Zustand/Stats
    // loadGameState();
    // jz in main!!!