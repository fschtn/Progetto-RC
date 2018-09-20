<?php

// Ottengo le informazioni da aggiungere alla coda e mostrare agli utenti futuri

$libro = $_POST['id_libro'];
$pagina = $_POST['pagina_nuova'];
$facebook = $_POST['id_facebook'];
$scrittura_su_file = $_POST['write'] == 'false' ? "false" : "true";

// Se manca qualche dato, mostro un messaggio di errore

if($libro == '' || $pagina == '' || $facebook == '') die("Errore durante il caricamento dei libri");

// Creo il messaggio da inviare in formato JSON

$messaggio = json_encode(array('pagina_nuova'=>$pagina, 'id_facebook'=>$facebook, 'id_libro'=>$libro));
$data = array('messaggio' => $messaggio);

// Creo le opzioni per poter richiamare gli script e passare le nuove informazioni come parametri

$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data)
    )
);

// Richiamo lo script che aggiunge le nuove informazioni nella coda di RabbitMQ

$url = 'http://localhost/queue/add_to_queue.php';
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);

// Richiamo lo script che scrive le nuove informazioni sul file di log CSV

$url = 'http://localhost/queue/write_on_file.php';
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);

?>