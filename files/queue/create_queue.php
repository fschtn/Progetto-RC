<?php

// Se esiste, e se riesco ad aprire il file con l'elenco dei libri in lettura, li inserisco tutti quanti all'interno della coda di RabbitMQ

if ($file = fopen("../info_utenti/libri_in_lettura.csv", "r")) {
    while(!feof($file)) {
        $line = fgets($file);
        $messaggio = trim(preg_replace('/\s+/', ' ', $line));
        $data = array('messaggio' => $messaggio);
        $options = array(
            'http' => array(
                'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
                'method'  => 'POST',
                'content' => http_build_query($data)
            )
        );
        $url = 'http://localhost/queue/add_to_queue.php';
        $context  = stream_context_create($options);
        $result = file_get_contents($url, false, $context);
    }
    fclose($file);
}

?>