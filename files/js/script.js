var accesso_facebook;
var facebook_access_token;
var facebook_loaded;

function pageLoad() {
    checkLogin();
    if(document.location.pathname != "/")
        ottieniInfoUtente();
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
    if(localStorage.GoogleAccessToken != "undefined" && localStorage.GoogleAccessToken.length > 0)
        return true;
    else
        return false;
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

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.hash.substr(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};





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

function removeFromLibrary(id, library) {
//         id = id del libro
//         library = [past,present,future]
//     Aggiunge il libro avente <id> all'interno della libreria <library>
}

function getList(type, limit) {
//         type = [past,present,future]
//         limit = (1,100)
//     Ottiene i primi <limit> libri della lista <type>
}