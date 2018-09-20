<?php

// Ottengo il messaggio da inserire all'interno del file

$messaggio = $_POST['messaggio'];

// Apro il file su cui scrivere ad aggiungo il messaggio appena ricevuto su una nuova riga

$file = fopen("../info_utenti/libri_in_lettura.csv", "a+");
fwrite($file, "\n".$messaggio);

// Chiudo il file

fclose($file);

?>