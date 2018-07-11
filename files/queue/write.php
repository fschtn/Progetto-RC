<?php

$messaggio = $_POST['messaggio'];

$file = fopen("../info_utenti/libri_in_lettura.csv", "a+");
fwrite($file, "\n".$messaggio);
fclose($file);

?>