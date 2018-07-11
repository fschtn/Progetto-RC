<?php

$libro = $_POST['id_libro'];
$pagina = $_POST['pagina_nuova'];
$facebook = $_POST['id_facebook'];
$scrittura_su_file = $_POST['write'] == 'false' ? "false" : "true";

if($libro == '' || $pagina == '' || $facebook == '') die("Errore durante il caricamento dei libri");

$messaggio = json_encode(array('pagina_nuova'=>$pagina, 'id_facebook'=>$facebook, 'id_libro'=>$libro));
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

$url = 'http://localhost/queue/write.php';
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);

?>