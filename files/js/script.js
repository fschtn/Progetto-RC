var accesso_facebook;
var facebook_access_token;
var facebook_loaded;
var google_api_key = "AIzaSyBFzl0QHgg6tPybSNW0DMxAQF40oQFFKqA";
var google_access_token = localStorage.GoogleAccessToken;
var id_libreria;

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

// Definisco la funzione di creazione di un nuovo libro
// che verrà richiamata per ciascun risultato trovato dalla ricerca
function crea_libro(item) {
    libro = $("<div></div>");
    link = $("<a></a>");
    titolo = $("<h1></h1>");
    autore = $("<h2></h2>");
    titolo_text = item.volumeInfo.title.length > 30 ? item.volumeInfo.title.substr(0,27)+"..." : item.volumeInfo.title;
    titolo.append(titolo_text);
    if(item.volumeInfo.hasOwnProperty('authors'))
        autore.append(item.volumeInfo.authors[0]);
    link.append(titolo);
    link.append(autore);
    link.addClass("info");
    link.attr("href","book.html?id="+item.id);
    libro.append(link);
    libro.addClass("cover");
    libro.css("background-image", "url("+item.volumeInfo.imageLinks.thumbnail+")");
    $('.libri').append(libro);
}





//
//
//
// DA FARE
//
//
//

function carica_libreria(nome) {
    $.get("https://www.googleapis.com/books/v1/mylibrary/bookshelves?key="+google_api_key+"&access_token="+google_access_token, function(res) {
        if(res.hasOwnProperty('items')) {
            if(res.items.length > 0) {
                res.items.forEach(function(item) {
                    // console.log(item);
                    if(item.title == nome) {
                        $.get("https://www.googleapis.com/books/v1/mylibrary/bookshelves/"+item.id+"/volumes?key="+google_api_key+"&access_token="+google_access_token, function(res) {
                            if(res.hasOwnProperty('items')) {
                                if(res.items.length > 0) {
                                    res.items.forEach(crea_libro);
                                }else{
                                    $('.libri').append("<span>Nella libreria attuale non c'è ancora nessun libro</span>");
                                }
                            }else{
                                $('.libri').append("<span>Nella libreria attuale non c'è ancora nessun libro</span>");
                            }
                        });
                    }
                });
            }else{
                $('.libri').append("<span>Impossibile ottenere la libreria attuale</span>");
            }
        }else{
            $('.libri').append("<span>L'utente attuale non ha nessuna libreria da mostrare</span>");
        }
    });
}

function addToLibrary(id) {
    $.get("https://www.googleapis.com/books/v1/mylibrary/bookshelves?key="+google_api_key+"&access_token="+google_access_token, function(res) {
        if(res.hasOwnProperty('items')) {
            if(res.items.length > 0) {
                res.items.forEach(function(item) {
                    if(item.title == "To read") {
                        $.ajax({
                            url:'https://www.googleapis.com/books/v1/mylibrary/bookshelves/'+item.id+'/addVolume?volumeId='+id+'&key='+google_api_key+'&access_token='+google_access_token,
                            type:"POST",
                            contentType:"application/json",
                            success: function(res){
                                if(res == undefined) {







                                    // MOSTRA UN MESSAGGIO DI FELICITAAA







                                    
                                }
                            }
                        });
                    }
                });
            }else{
                console.error("L'utente attuale non ha nessuna libreria da mostrare");
            }
        }else{
            console.error("Impossibile ottenere la libreria attuale");
        }
    });
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