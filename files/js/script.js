var accesso_facebook;
var facebook_access_token;

function pageLoad() {
    // Richiamo la funzione checkLogin() per controllare che l'utente abbia fatto l'accesso
    checkLogin();
    // Ottengo l'immagine dell'utente e la mostro sulla barra di navigazione
    $('nav a img').attr("src", getUserImage());
    // Ottengo nome e cognome dell'utente e lo mostro sulla barra di navigazione
    inserisciNomeNelMenu();
}

function checkLogin() {
    if(document.location.pathname == "/") {
        // console.log("Mi trovo sulla pagina iniziale. Controllo gli accessi.");
        if(controllaAccessoGoogle() && controllaAccessoFacebook()) {
            // console.log("L'utente è loggato ad entrambi i servizi, reindirizzo a profile.html");
            window.location.href = '/profile.html';
        }else{
            if(controllaAccessoGoogle()){
                // console.log("L'utente è loggato a Google, metto la spunta");
                if(!$('#login_buttons > .google').hasClass("logged")){
                    $('#login_buttons > .google').addClass("logged");
                }
            }
            if(controllaAccessoFacebook()) {
                // console.log("L'utente è loggato a Facebook, metto la spunta");
                if(!$('#login_buttons > .fb').hasClass("logged")){
                    $('#login_buttons > .fb').addClass("logged");
                }
            }
        }
    }else{
        // console.log("Mi trovo su una pagina interna al sito, controllo gli accessi.");
        if(!controllaAccessoGoogle() || !controllaAccessoFacebook()) {
            // console.log("L'utente non ha fatto l'accesso a qualcosa, reindirizzo alla pagina iniziale");
            window.location.href = '/';
        }
    }
}

function controllaAccessoFacebook() {
    // console.log("Controllo l'accesso con Facebook");
    FB.getLoginStatus(function(response) {
        if(response.status == 'connected') {
            // console.log("L'utente è loggato in Facebook");
            accesso_facebook = true;
            facebook_access_token = response.authResponse.accessToken;
        }else{
            // console.log("L'utente non è loggato in Facebook");
            accesso_facebook = false;
        }
    });
    return accesso_facebook;
}

function controllaAccessoGoogle() {
    // Se l'utente ha fatto l'accesso, restituisce "true", altrimenti restituisce "false"
    // gapi.auth.checkSessionState({client_id:'522551011728-ce79m2ejilk61ffeie38unbh7mdpo5cl.apps.googleusercontent.com'}, signinCallback);
    // gapi.auth2.getAuthInstance().isSignedIn.get();
    return true;
}

function inserisciNomeNelMenu() {
    $.get('https://graph.facebook.com/me?fields=first_name&access_token='+facebook_access_token,function(response) {
        $('nav a span').text(response.first_name);
    });
}

function inserisciNomeNelTitolo() {
    $.get('https://graph.facebook.com/me?fields=first_name&access_token='+facebook_access_token,function(response) {
        document.title = response.first_name+" - Book time";
    });
}



//
//
//
// DA FARE
//
//
//



function getUserImage() {
//     ottiene l'id dell'utente attualmente connesso e, poi,
//     tramite le API, l'URL dell'immagine del profilo dell'utente corrispondente, e lo restituisce
    return "https://www.okday.it/wp-content/uploads/2017/03/15085454_1168655113219089_4600400730997347072_n.jpg";
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
