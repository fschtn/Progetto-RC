var accesso_facebook;
var facebook_access_token;
var facebook_loaded;
var google_api_key = "AIzaSyBFzl0QHgg6tPybSNW0DMxAQF40oQFFKqA";
var id_libreria;
var limite;

function ottieni_parametri_url(url) {
    var queryStart = url.indexOf("#") + 1,
        queryEnd   = url.indexOf("?") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

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
            update_user_info("facebook_token", response.authResponse.accessToken);
            update_user_info("facebook_id", response.authResponse.userID);
        }else{
            accesso_facebook = false;
        }
    });
    return accesso_facebook;
}

function controllaAccessoGoogle() {
    if(get_user_info("google_token") != undefined)
        if(get_user_info("google_token").length > 0) {
            timestamp = Math.floor(Date.now()/1000);
            if (timestamp < get_user_info('google_scadenza'))
                return true;
            else
                return false;
        }else
            return false;
    else
        return false;
}

function ottieniInfoUtente() {
    if(get_user_info("nome_utente") == "" || get_user_info("immagine_utente") == "") {
        $.get("https://graph.facebook.com/me?fields=first_name,picture&access_token="+get_user_info("facebook_token"), function(response) {
            update_user_info("nome_utente", response.first_name);
            update_user_info("immagine_utente", response.picture.data.url);
        }).then(function() {
            $('nav a span').text(get_user_info("nome_utente"));
            $('nav a img').attr("src", get_user_info("immagine_utente"));
        });
    }else{
        $('nav a span').text(get_user_info("nome_utente"));
        $('nav a img').attr("src", get_user_info("immagine_utente"));
    }
}

function update_user_info(chiave, valore) {
    if(localStorage.UserInfo == 'undefined' || localStorage.UserInfo == undefined || localStorage.UserInfo == "undefined") {
        user_info = {};
        localStorage.UserInfo = JSON.stringify(user_info);
    }else{
        user_info = JSON.parse(localStorage.UserInfo);
        user_info[chiave] = valore;
        localStorage.UserInfo = JSON.stringify(user_info);
    }
}

function get_user_info(chiave) {
    if(localStorage.UserInfo != 'undefined' && localStorage.UserInfo != undefined && localStorage.UserInfo != "undefined") {
        user_info = JSON.parse(localStorage.UserInfo);
        if(chiave in user_info)
            return user_info[chiave];
        else
            return false;
    }
}

function getList(type, limit=999999999) {
    window.limite = limit;
    nomi = {"past":"Have read", "present": "Reading now", "future":"To read"};
    carica_libreria(nomi[type]);
}

function carica_libreria(nome) {
    $.get("https://www.googleapis.com/books/v1/mylibrary/bookshelves/?key="+google_api_key+"&access_token="+get_user_info("google_token"), function(res) {
        if(res.hasOwnProperty('items')) {
            if(res.items.length > 0) {
                res.items.forEach(function(item) {
                    if(item.title == nome) {
                        $.get("https://www.googleapis.com/books/v1/mylibrary/bookshelves/"+item.id+"/volumes?key="+google_api_key+"&access_token="+get_user_info("google_token"), function(res) {
                            if(res.hasOwnProperty('items')) {
                                if(res.items.length > 0) {
                                    categoria_libro = nome;
                                    res.items.forEach(function(item) {
                                        conversione_id = {"Have read":"past", "Reading now":"present", "To read":"future"};
                                        id = conversione_id[categoria_libro];
                                        if($('#'+id+' .cover').length < window.limite) {
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
                                            // console.log("proviamo i libri");
                                            $('#'+id).append(libro);
                                        }
                                    });
                                }else{
                                    $('#'+window.categoria_libro).append("<span>Nella libreria attuale non c'è ancora nessun libro</span>");
                                }
                            }else{
                                $('#'+window.categoria_libro).append("<span>Nella libreria attuale non c'è ancora nessun libro</span>");
                            }
                        });
                    }
                });
            }else{
                $('#'+window.categoria_libro).append("<span>Impossibile ottenere la libreria attuale</span>");
            }
        }else{
            $('#'+window.categoria_libro).append("<span>L'utente attuale non ha nessuna libreria da mostrare</span>");
        }
    });
}

function get_queue() {
    $.get("/queue/get_queue.php", function(res) {
        localStorage.setItem('coda_libri', res);
        return localStorage.getItem('coda_libri');
    });
}

function get_current_page(id_facebook, id_libro){
    current_page = 0;
    JSON.parse(localStorage.getItem('coda_libri')).forEach(function(aggiornamento) {
        aggiornamento = JSON.parse(aggiornamento);
        if(aggiornamento.id_facebook == id_facebook && aggiornamento.id_libro == id_libro) {
            if(document.location.pathname == "/reading.html" || document.location.pathname == '/book.html') {
                $("#"+id_libro+" span input").val(aggiornamento.pagina_nuova);
            }else{
                $('#'+id_facebook+' #'+id_libro+' span input').val(aggiornamento.pagina_nuova);
            }
            current_page = aggiornamento.pagina_nuova;
        }
    });
    return current_page;
}

function page_update(id_libro) {
    maxpage = $("#"+id_libro+" span input").attr("max");
    pagina_attuale = $("#"+id_libro+" span input").val();
    if(parseInt(pagina_attuale) >= parseInt(maxpage)) {
        $("#"+id_libro+" span input").val(maxpage);
        pagina_attuale = maxpage;
    }
    aggiornaPagina(pagina_attuale,id_libro);
}

function aggiornaPagina(pagina_nuova, id_libro){
    // if ("WebSocket" in window) {
    //     // console.log("Il browser supporta le websocket");
    //
    //     // Creo una connessione con il server delle socket e richiamo lo script "aggiorna_pagina"
    //
    //     var ws = new WebSocket("ws://localhost:9998/aggiorna_pagina");
    //
    //     // Specifico le azioni da eseguire quando la connessione viene aperta
    //
    //     ws.onopen = function() {
    //        ws.send("Invio questo messaggio");
    //        // console.log("Ho inviato il messaggio");
    //     };
    //
    //     // Specifico le azioni da eseguire quando viene ricevuto un messaggio
    //
    //     ws.onmessage = function (evt) {
    //        var msg_received = evt.data;
    //        // alert(msg_received);
    //        // console.log("Ho ricevuto il messaggio: "+msg_received);
    //     };
    //
    //     // Specifico le azioni da eseguire quando la connessione viene chiusa
    //
    //     ws.onclose = function() {
    //         // console.log("La connessione con la websocket è stata chiusa");
    //     };
    // }else{
        // console.log("Il browser non supporta le websocket, invio una POST con AJAX");
        id_facebook = get_user_info("facebook_id");
        $.post("/queue/update_books.php",
            {
                "pagina_nuova": pagina_nuova,
                "id_facebook": id_facebook,
                "id_libro": id_libro
            }
        ).done(function() {
            get_queue();
        });
    // }
}

function addToLibrary(id) {
    $.get("https://www.googleapis.com/books/v1/mylibrary/bookshelves?key="+google_api_key+"&access_token="+get_user_info('google_token'), function(res) {
        if(res.hasOwnProperty('items')) {
            if(res.items.length > 0) {
                res.items.forEach(function(item) {
                    if(item.title == "To read") {
                        $.ajax({
                            url:'https://www.googleapis.com/books/v1/mylibrary/bookshelves/'+item.id+'/addVolume?volumeId='+id+'&key='+google_api_key+'&access_token='+get_user_info("google_token"),
                            type:"POST",
                            contentType:"application/json",
                            success: function(res){
                                if(res == undefined) {
                                    location.reload();
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

function removeFromLibrary(id) {
    $.get("https://www.googleapis.com/books/v1/mylibrary/bookshelves?key="+google_api_key+"&access_token="+get_user_info("google_token"), function(res) {
        if(res.hasOwnProperty('items')) {
            if(res.items.length > 0) {
                $.ajax({
                    url:'https://www.googleapis.com/books/v1/mylibrary/bookshelves/2/removeVolume?volumeId='+id+'&key='+google_api_key+'&access_token='+get_user_info("google_token"),
                    type:"POST",
                    contentType:"application/json",
                    success: function(res){
                        location.reload();
                    }
                });
                $.ajax({
                    url:'https://www.googleapis.com/books/v1/mylibrary/bookshelves/3/removeVolume?volumeId='+id+'&key='+google_api_key+'&access_token='+get_user_info("google_token"),
                    type:"POST",
                    contentType:"application/json",
                    success: function(res){
                        location.reload();
                    }
                });
                $.ajax({
                    url:'https://www.googleapis.com/books/v1/mylibrary/bookshelves/4/removeVolume?volumeId='+id+'&key='+google_api_key+'&access_token='+get_user_info("google_token"),
                    type:"POST",
                    contentType:"application/json",
                    success: function(res){
                        location.reload();
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

function bookStarted(id) {
    aggiornaPagina('1',id);
    $.ajax({
        url:'https://www.googleapis.com/books/v1/mylibrary/bookshelves/2/removeVolume?volumeId='+id+'&key='+google_api_key+'&access_token='+get_user_info("google_token"),
        type:"POST",
        contentType:"application/json"
    });
    $.ajax({
        url:'https://www.googleapis.com/books/v1/mylibrary/bookshelves/3/addVolume?volumeId='+id+'&key='+google_api_key+'&access_token='+get_user_info("google_token"),
        type:"POST",
        contentType:"application/json",
        success: function(res){
            if(res == undefined) {
                location.reload();
            }else{
                alert("Errore durante l'aggiunta del libro");
            }
        }
    });
}

function bookCompleted(id) {
    $.get("https://www.googleapis.com/books/v1/mylibrary/bookshelves?key="+google_api_key+"&access_token="+get_user_info("google_token"), function(librerie) {
        if(librerie.hasOwnProperty('items')) {
            if(librerie.items.length > 0) {
                $.post({
                    url:'https://www.googleapis.com/books/v1/mylibrary/bookshelves/3/removeVolume?volumeId='+id+'&key='+google_api_key+'&access_token='+get_user_info("google_token"),
                    contentType:"application/json",
                    success: function(res){
                        location.reload();
                    }
                });
                $.post({
                    url:'https://www.googleapis.com/books/v1/mylibrary/bookshelves/4/addVolume?volumeId='+id+'&key='+google_api_key+'&access_token='+get_user_info("google_token"),
                    contentType:"application/json",
                    success: function(res){
                        location.reload();
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

$( document ).ready(function() {
    get_queue();
});