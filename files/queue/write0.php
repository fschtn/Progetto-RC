<?php

require_once('./vendor/autoload.php');

use \PhpAmqpLib\Connection\AMQPStreamConnection;
use \PhpAmqpLib\Message\AMQPMessage;

define("RABBITMQ_HOST", "localhost");
define("RABBITMQ_PORT", 5672);
define("RABBITMQ_USERNAME", "guest");
define("RABBITMQ_PASSWORD", "guest");
define("RABBITMQ_QUEUE_NAME", "libri_letti");

$connection = new AMQPStreamConnection(
    RABBITMQ_HOST,
    RABBITMQ_PORT,
    RABBITMQ_USERNAME,
    RABBITMQ_PASSWORD
);

$channel = $connection->channel();

// Dichiaro la coda all'interno della quale verranno pubblicati i messaggi attuali

$channel->queue_declare(
    $queue = RABBITMQ_QUEUE_NAME,
    $passive = false,
    $durable = true,
    $exclusive = false,
    $auto_delete = false,
    $nowait = false,
    $arguments = null,
    $ticket = null
);

// Ottengo i dati tramite la post

$libro = $_POST['id_libro'];
$pagina = $_POST['pagina_nuova'];
$facebook = $_POST['id_facebook'];
$scrittura_su_file = $_POST['write'] == 'false' ? "false" : "true";

if($libro == '' || $pagina == '' || $facebook == '') die("Errore durante il caricamento dei libri");

// Genero un array da memorizzare in coda e all'interno del file permanente

$messaggio = json_encode(array('pagina_nuova'=>$pagina, 'id_facebook'=>$facebook, 'id_libro'=>$libro));

// Creo il messaggio da inviare all'interno della coda

$msg = new AMQPMessage(
    $messaggio,
    array('delivery_mode' => 2) #persistente
);

// Inserisco il messaggio nella coda dei libri letti

$pubblicazione_coda = $channel->basic_publish($msg, '', RABBITMQ_QUEUE_NAME);

// Se è abilitata la scrittura su file,

if($scrittura_su_file) {

    // Inserisco il messaggio all'interno del file permanente

    $file = fopen("../info_utenti/libri_in_lettura.csv", "a+");
    $pubblicazione_file = fwrite($file, $messaggio."\n");
    fclose($file);

    // Se il messaggio è stato pubblicato correttamente sia sulla coda che nel file, mostro il messaggio di successo

    if($pubblicazione_file)
        echo "true";
    else
        echo "false";

}

?>