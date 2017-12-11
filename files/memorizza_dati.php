<?php

    $id_facebook = $_POST['facebook'];
    $id_google = $_POST['google'];

    $file = 'info_utenti.csv';
    $contenuto = file_get_contents($file);
    $contenuto .= "\n$id_facebook,$id_google";
    file_put_contents($file, $contenuto);

    echo "Ho memorizzato: {id_facebook: $id_facebook; id_google: $id_google}";

?>
