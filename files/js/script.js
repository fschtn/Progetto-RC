// Funzioni da realizzare:
//
//     pageLoad()
//     richiamata al caricamento della pagina, ottiene nome dell'utente attualmente loggato (tramite getUserName()) e la sua immagine del profilo (tramite getUserImage()), e le mostra all'interno del menu
//
//
//
//     checkLogin()
//     Se ci si trova in "index.html"
//         Se sono stati eseguiti entrambi gli accessi
//             Reindirizza l'utente a "profile.html"
//         Altrimenti
//             Sostituisce il tasto di accesso già fatto con un "check" verde
//     Altrimenti
//         Se NON sono stati eseguiti entrambi gli accessi
//             Reindirizza l'utente a "index"
//
//
//
//     getUserName()
//     ottiene l'id dell'utente attualmente connesso e, poi,
//     tramite le API, il Nome dell'utente corrispondente, e lo restituisce
//
//     getUserImage()
//     ottiene l'id dell'utente attualmente connesso e, poi,
//     tramite le API, l'URL dell'immagine del profilo dell'utente corrispondente, e lo restituisce
//
//
//
//     addToLibrary(id, library)
//         id = id del libro
//         library = [past,present,future]
//     Aggiunge il libro avente <id> all'interno della libreria <library>
//
//
//
//     getBookInfo(id)
//         id = id del libro
//     Restituisce le informazioni del libro che ha <id>
//
//
//
//     getList(type, limit)
//         type = [past,present,future]
//         limit = (1,100)
//     Ottiene i primi <limit> libri della lista <type>
//
//
//
//     searchBook(title)
//         title = stringa, titolo del libro da cercare
//     Cerca, tramite le API di Google, il libro con titolo uguale a <title>