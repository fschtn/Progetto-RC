function pageLoad() {
//     richiamata al caricamento della pagina, ottiene nome dell'utente attualmente loggato (tramite getUserName()) e la sua immagine del profilo (tramite getUserImage()), e le mostra all'interno del menu. Richiama poi checkLogin()
}

function controllaAccessoGoogle() {
    // Se l'utente ha fatto l'accesso, restituisce "true", altrimenti restituisce "false"
}

function controllaAccessoFacebook() {
    // Se l'utente ha fatto l'accesso, restituisce "true", altrimenti restituisce "false"
}

function checkLogin() {
    // Se ci si trova nella pagina iniziale
    if(document.location.pathname == "/") {
        // Se sono stati eseguiti entrambi gli accessi
        if(controllaAccessoGoogle() && controllaAccessoFacebook()) {
            // Reindirizza l'utente a "profile.html"
            window.location.href = '/profile.html';
        }else{
            // Sostituisce l'accesso "già fatto" con un "check"
            if(controllaAccessoGoogle()){
                console.log("L'accesso con Google è stato fatto, metti il check");
            }
            if(controllaAccessoFacebook()) {
                console.log("L'accesso con Facebook è stato fatto, metti il check");
            }
        }
//     Altrimenti
    }else{
//         Se NON sono stati eseguiti entrambi gli accessi
//             Reindirizza l'utente a "index"
    }
}

function getUserName() {
//     ottiene l'id dell'utente attualmente connesso e, poi,
//     tramite le API, il Nome dell'utente corrispondente, e lo restituisce
}

function getUserImage() {
//     ottiene l'id dell'utente attualmente connesso e, poi,
//     tramite le API, l'URL dell'immagine del profilo dell'utente corrispondente, e lo restituisce
}

function addToLibrary(id, library) {
//         id = id del libro
//         library = [past,present,future]
//     Aggiunge il libro avente <id> all'interno della libreria <library>
}

function getBookInfo(id) {
//         id = id del libro
//     Restituisce le informazioni del libro che ha <id>
}

function getList(type, limit) {
//         type = [past,present,future]
//         limit = (1,100)
//     Ottiene i primi <limit> libri della lista <type>
}

function searchBook(title) {
//         title = stringa, titolo del libro da cercare
//     Cerca, tramite le API di Google, il libro con titolo uguale a <title>
}