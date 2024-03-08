window.onload = function() {
    
    for(radioButton of document.querySelectorAll("input[type = radio]")) radioButton.addEventListener('click', genereerUitkomst);

    function genereerUitkomst(e) {
        // genereer HTML-output
        let output = "";

        // HTML-element waar de resultaten in getoond worden
        const target = document.querySelector("#uitkomst");

        // tel de scores op
        let scores = somSecties(1, 3);

        // genereer uitkomst in tekst
        for(s=1; s<=3; s++) {
            output += `<div>${["Engage","Enhance","Extend"][s-1]}: ${scores[s]}</div>\n`;
        }
        output += `<div>TOTAAL: ${scores[0]}</div>\n`;

        // toon uitkomst
        target.innerHTML = output;
    }


    // eem functie om de waardes van de geselecteerde radio-buttons bij elkaar op te tellen
    function somSecties(startIndex, eindIndex) {
        
        let results = [];   // format: [ totaal, sectie 1, sectie 2, sectie N, ... ]

        for(i=startIndex; i<=eindIndex; i++) {
            results[i] = 0;
            // lees waarden van geselecteerde inputs en tel ze op
            let selecties = document.querySelectorAll(`#sectie${i} input[type = radio]:checked`);
            for(sel of selecties) {
                results[i] += parseInt(sel.value);
            }
        }

        results[0] = results.reduce((acc, curr) => (acc+curr));

        return results;
    }
}