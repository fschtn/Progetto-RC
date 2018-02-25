var logged;
$(document).ready(function () {

    FB.getLoginStatus(function(response) {
      	if(response.status == 'connected') {
            logged = true;
      	}else{
            logged = false;
        }
    });

    window.fbAsyncInit = function () {
        FB.init({
            appId: '194992524408368',
            status: true,
            cookie: true,
            xfbml: true,
            version    : 'v2.11'
        });


        // FB.getLoginStatus(function(response) {
        //     checkLogin();
        // });
    };
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/it_IT/sdk.js#xfbml=1&version=v2.12';
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    pageLoad();



});




//
//
//
// QUI SI LAVORA
//
//
//
//



function controllaAccessoGoogle() {
    // Se l'utente ha fatto l'accesso, restituisce "true", altrimenti restituisce "false"
    gapi.auth.checkSessionState({client_id:'522551011728-ce79m2ejilk61ffeie38unbh7mdpo5cl.apps.googleusercontent.com'}, signinCallback);
    gapi.auth2.getAuthInstance().isSignedIn.get();
}


function getUserName () {
    // FB.api('/me', {fields: 'first_name'}, function(response) {
    //     var name = (response.first_name);
    // });
    // return name;
}




//
//
//
// COMPLETATE
//
//
//



function pageLoad() {
    // Richiamo la funzione checkLogin() per controllare che l'utente abbia fatto l'accesso
    checkLogin();
    // Ottengo l'immagine dell'utente e la mostro sulla barra di navigazione
    $('nav a img').attr("src", getUserImage());
    // Ottengo nome e cognome dell'utente e lo mostro sulla barra di navigazione
    $('nav a span').text(getUserName());
}

function controllaAccessoFacebook() {
    // FB.getLoginStatus(function(response) {
    //   	if(response.status == 'connected') {
    //         logged = true;
    //   	}else{
    //         logged = false;
    //     }
    // });
    return logged;
}

function checkLogin() {
  console.log(controllaAccessoFacebook());
    if(document.location.pathname == "/") {
        if(controllaAccessoGoogle() && controllaAccessoFacebook()) {
            window.location.href = '/profile.html';
        }else{
            if(controllaAccessoGoogle()){
                if(!$('#login_buttons > .google').hasClass("logged")){
                    $('#login_buttons > .google').addClass("logged");
                }
            }
            if(controllaAccessoFacebook()) {
                if(!$('#login_buttons > .fb').hasClass("logged")){
                    $('#login_buttons > .fb').addClass("logged");
                }
            }
        }
    }else{
        if(!controllaAccessoGoogle() || !controllaAccessoFacebook()) {
            window.location.href = '/';
        }
    }
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