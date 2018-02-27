var accesso_facebook;
var facebook_access_token;
var google_auth;
var facebook_loaded;
var google_loaded;

function pageLoad() {
    checkLogin();
    ottieniInfoUtente();



    // Aggiungere funzione che mostra la pagina, in modo da nasconderla prima che tutte le info siano caricate


}

function checkLogin() {
    if(document.location.pathname == "/") {
        if(controllaAccessoGoogle() && controllaAccessoFacebook()) {
            window.location.href = '/profile.html';
        }else{
            if(controllaAccessoGoogle())
                if(!$('#login_buttons > .google').hasClass("logged"))
                    $('#login_buttons > .google').addClass("logged");
            if(controllaAccessoFacebook())
                if(!$('#login_buttons > .fb').hasClass("logged"))
                    $('#login_buttons > .fb').addClass("logged");
        }
    }else{
        if(!controllaAccessoGoogle() || !controllaAccessoFacebook())
            window.location.href = '/';
    }
}

function controllaAccessoFacebook() {
    FB.getLoginStatus(function(response) {
        if(response.status == 'connected') {
            accesso_facebook = true;
            facebook_access_token = response.authResponse.accessToken;
        }else{
            accesso_facebook = false;
        }
    });
    return accesso_facebook;
}

function controllaAccessoGoogle() {
    return google_auth.isSignedIn.get();
}

function ottieniInfoUtente() {
    $.get("https://graph.facebook.com/me?fields=first_name,picture&access_token="+facebook_access_token, function(response) {
        if(document.location.pathname == "/profile.html")
            document.title = response.first_name+" - Book time";
        if(document.location.pathname != "/") {
            $('nav a span').text(response.first_name);
            $('nav a img').attr("src", response.picture.data.url);
        }
    });
}





//
//
//
// DA FARE
//
//
//






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
