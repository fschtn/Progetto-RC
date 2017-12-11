function memorizza_dati_utente(id_facebook, id_google) {
    $.post(
        "memorizza_dati.php",
        {
            facebook: id_facebook,
            google: id_google
        },
        function(response) {
            console.log(response);
        }
    );
}