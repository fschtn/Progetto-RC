function array_utenti_conoscendo(str) {
    a = new Array();
    if(str!='google' && str!='facebook') {
        console.error("La funzione array_utenti_conoscendo() prende come parametro o \"google\" o \"facebook\", nient'altro.");
        return a;
    }
    $.get(
        "info_utenti.csv",
        function(response) {
            rows = response.split("\n");
            for(i=0;i<rows.length;i++) {
                info = rows[i].split(',');
                if(str=='google') {
                    a[info[1]] = info[0];
                }else{
                    a[info[0]] = info[1];
                }
            }
        }
    );
    return a;
}