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

## Tecnologie utilizzate

- REST 1: Facebook (oAuth)
- REST 2: Google (oAuth)
- WebSocket: HTML5
- AMQP: RabbitMQ (HTML5)
- Documentazione GitHub: MarkDown

## Idea del Progetto

Applicazione che, una volta eseguito il login con Facebook e Google, mostra un profilo utente che riepiloga:

- I libri in corso di lettura
- I libri in coda di lettura
- I libri letti dall'utente

Dal profilo si può arrivare anche a una pagina dedicata alle statistiche dell'utente (che vedremo in seguito) o alla pagina degli amici, su cui viene mostrato un elenco di amici che hanno utilizzato l'applicazione e da cui è possibile raggiungere ciascun profilo.

E' anche possibile cercare nuovi libri tramite la barra di ricerca.

Tutti i libri verranno cercati su [Google Books](https://developers.google.com/books/), tramite il token ottenuto dall'account Google dell'utente al momento del login.

Tutti gli amici che hanno eseguito l'accesso all'app verranno invece ricercati tramite le [API di Facebook](https://developers.facebook.com/docs/graph-api/).

## Organizzazione pagine

L'organizzazione per la navigazione delle pagine sarà strutturata secondo la seguente logica:
![Navigazione delle pagine](https://github.com/francescosche/Progetto-RC/blob/master/img/navigazione-pagine.jpg)
In cui le pagine avranno la logica e struttura descritte nei paragrafi successivi.

### Accesso
La homepage (che è anche pagina di login) mostrerà il logo dell'applicazione, seguito da una breve spiegazione di cosa svolge il sito, con un accenno alle sue funzioni principali.
Subito sotto l'introduzione, la pagina è divisa in due sezioni, con le quali si accede rispettivamente a Facebook e Google. Ciascuna delle sezioni riporterà una breve spiegazione del motivo per cui viene richiesto l'accesso con quell'account.
![Pagina di accesso con nessun login fatto](https://github.com/francescosche/Progetto-RC/blob/master/img/accesso-nologin.jpg)
Quando si esegue l'accesso con uno dei due account, quella sezione viene bloccata (mostrando un check verde), lasciando all'utente la possibilità di eseguire l'accesso anche con l'altro account.
![Pagina di accesso con il login di sinistra già fatto](https://github.com/francescosche/Progetto-RC/blob/master/img/accesso-loginFB.jpg)
Quando l'utente avrà eseguito il login con entrambi gli account, verrà reindirizzato alla "[Home](#amici)" del sito, ovvero la pagina con le ultime attività degli amici.

### <a name="amici"></a>Home/Amici
Dopo aver eseguito il [controllo\*](#controlli), viene ottenuta la lista degli amici dell'account correntemente loggato; viene controllato quale di questi amici ha eseguito l'accesso all'applicazione e, se presente almeno un amico, viene mostrato (in ordine cronologico) lo stato di lettura degli amici per ciascun libro (_accorpando gli amici che hanno letto lo stesso libro_)
![Home page con elenco dei libri letti dagli amici](https://github.com/francescosche/Progetto-RC/blob/master/img/home-amici.jpg)
Cliccando sulla copertina o sul titolo di ciascun libro sarà poi possibile andare alla [pagina del singolo libro](#libro), in modo da scoprirne maggiori dettagli.

### Libri in lettura
Nella pagina dei libri in lettura (raggiungibile dal menù un alto), dopo aver eseguito il [controllo\*](#controlli), verrà mostrato un elenco dei libri attualmente in elenco di lettura dell'utente corrente. Di fianco a ciascun libro verrà mostrato il titolo del libro, il numero di pagine lette rispetto al numero totale di pagine e due tasti per "Segnare il libro come completato" o "Eliminare il libro dalla raccolta".
![Pagina dei libri "In lettura"](https://github.com/francescosche/Progetto-RC/blob/master/img/in-lettura.jpg)
Allo stesso modo della pagina [Home/Amici](#amici), è possibile cliccare sulla copertina del libro o sul titolo per ottenere maggiori informazioni riguardo quel testo.

### <a name="daleggere"></a>Libri da leggere o letti
Su queste pagine, dopo aver eseguito il [controllo\*](#controlli), verranno visualizzate le copertine dei libri presenti nell'elenco attulamente visualizzato ("Da leggere" o "Letti", in base alla pagina su cui ci si trova). Come le altre pagine, è possibile cliccare sulla copertina del libro o sul titolo per ottenere maggiori informazioni riguardo quel testo.
![Pagina dei libri da leggere o già letti](https://github.com/francescosche/Progetto-RC/blob/master/img/leggere-letti.jpg)

### <a name="libro"></a>Pagina del libro
Su questa pagina, dopo aver eseguito il [controllo\*](#controlli), viene ricavato l'ID del libro di cui si vogliono avere maggiori informazioni tramite l'URL (all'interno di un parametro "id"). Con questo ID, vengono scaricate le informazioni del libro da Google Books, ed inserite all'interno della pagina, in modo da mostrare (di fianco alla copertina del libro) il suo titolo, l'autore, delle informazioni generali e la trama.
Nella pagina sarà anche presente un tasto per aggiungere il libro alla propria libreria (nell'elenco dei libri [Da Leggere](#daleggere), se non già presente).
![Pagina con le informazioni del singolo libro](https://github.com/francescosche/Progetto-RC/blob/master/img/libro.jpg)

## <a name="controlli"></a>Controlli
I controlli che verranno eseguiti dalle pagine saranno:
- **\*Tutte le pagine (non "Accesso")**: Controllo che l'utente sia loggato ad entrambi i servizi (Facebook e Google)
- **Tutte le pagine (non "Accesso")**: Controllo che l'utente attualmente loggato abbia un access token valido
- **Pagine "Da leggere" e "Letti"**: Controllo che nella libreria attualmente visualizzata sia presente almeno 1 libro
- **Pagina "In lettura"**: Controllo che l'utente abbia realmente iniziato a leggere il libro (cioè abbia inserito già una pagina raggiunta all'interno del proprio profilo)
- **Pagina "Amici"**: Controllo che l'utente abbia degli amici all'interno dell'applicazione

# Aggiornamenti futuri
In futuro saranno aggiunte le seguenti funzioni:
- Possibilità di visualizzare il profilo dei propri amici e sfogliare le loro librerie
- Possibilità di visualizzare, sulla pagina di informazioni di un singolo libro, i nomi degli amici che lo hanno già letto, che lo stanno leggendo o che hanno intenzione di leggerlo
