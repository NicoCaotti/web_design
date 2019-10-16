var keywords;
function loadData() {

    var url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSzDQmtFbLOILjqDfABeq-_UNd7OmOlJvNnJ53nZ4ceybukq-CeI2-b-USteMoipdjdnRtzuS2rNCcF/pub?output=csv"; //a questo indirizzo e' contenuto un file in formato csv con tutte le parole 
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            //con questa istruzione prendo il contenuto del file csv, il contenuto e' una stringa con le varie parole divise da una virgola
            var response= xmlhttp.responseText; 
            
            // la funzione plit prende una stringa e la scorre completamente, carattere per carattere, ogni volte che incontra il carattere passato alla funzione, in questo caso la virgola ",", prende i caratteri precedenti e li mette in una cella di un array, questo procedimento continua fino alla fine della stringa  
            keywords=response.split(",");
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send(null);
}
function search(){
    var br="<br>";
    var i;
    var termFound=false;
    var term;
    var result=""; 
    term=document.getElementById("searchText").value; //vado a prendere il valore del campo dato in input da cercare, lo cerco con la funzione getElementById() 

    term=term.toLowerCase(); // per evitare di dover cercare stringhe con caratteri maiuscoli e minuscoli li rendo tutti minuscoli a prescindereterm=term.toLowerCase();
    if (term == "") //se viene dato qualcosa in input di sbagliato esco dal ciclo //|| (term == "undefined")
       result+="Wrong input";//debugMessage=debugMessage+" wrong input";
    else  
        // faccio un ciclo per controllare tutte le parole dentro l'array
        for(i=0; i<keywords.length;i++) {
            //uso la funzione includes() che va a controllare se una sottostringa e' contenuta in una stringa, se la risposta e' positiva vado ad aggiungere quella parola all'array dei risultati
            if (keywords[i]==term) 
                termFound=true; 
            else
                if(keywords[i].includes(term)) 
                    result+=keywords[i]+br;
        }
    //se l'array dei risultati non contiene alcun elemento significa che la parola non e' presente tra quelle memorizzate, e quindi e' safe to use
    if(!termFound && result.length==0) 
        result+="This term seems safe!";
    else    
        if(termFound && result.length!=0) 
            result="The term "+term+" will probably demonetize your video. You may be interested in these other terms:"+br+result;
        else
            if(termFound && result.length==0)
                result="The term "+term+" will probably demonetize your video."+br+result;
            else
                result="The term you were looking for is not in our system, you may be interested in these other terms:"+br+result;
    //aggiungo i risultati al div results nella homepage
    document.getElementById("results").innerHTML=result;
}