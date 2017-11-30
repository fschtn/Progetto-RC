# Progetto RC

Progetto per il corso 2017/18 di Reti di Calcolatori, tenuto dal prof. Andrea Vitaletti presso La Sapienza Università di Roma.

## Requisiti

I requisiti per la corretta consegna del progetto sono:
- Utilizzare almeno 2 servizi REST
  - Almeno 1 dei servizi deve essere commerciale (Facebook, Twitter, Google, ecc.)
  - Almeno 1 dei servizi deve essere acceduto con OAuth
- Utilizzare websocket per almeno 1 funzionalità
- Utilizzare AMQP (o simili) per almeno 1 funzionalità
- Sviluppare e documentare tutti i file e le API su GitHub

## Idea del Progetto

Apposto, ricapitolando il discorso di prima in aula:

Applicazione che, una volta eseguito il login con Facebook e Google, mostra un profilo utente che riepiloga:

- I libri in corso di lettura
- I libri in coda di lettura
- I libri letti dall'utente

Dal profilo si può arrivare anche a una pagina dedicata alle statistiche dell'utente (che vedremo in seguito) o alla pagina degli amici, su cui viene mostrato un elenco di amici che hanno utilizzato l'applicazione e da cui è possibile raggiungere ciascun profilo.

E' anche possibile cercare nuovi libri tramite la barra di ricerca.

Tutti i libri verranno cercati su [Google Books](https://developers.google.com/books/), tramite il token ottenuto dall'account Google dell'utente al momento del login.

Tutti gli amici che hanno eseguito l'accesso all'app verranno invece ricercati tramite le [API di Facebook](https://developers.facebook.com/docs/graph-api/).
