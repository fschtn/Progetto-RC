<?php

require_once('./vendor/autoload.php');

use \PhpAmqpLib\Connection\AMQPStreamConnection;


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


/*
    Leggo il file /info_utenti/libri_in_lettura.csv
    Per ogni riga
        Invio una POST a write.php, così da inserire tutto in coda
    Quando finisco, scarico tutti i messaggi
    Per ogni messaggi inviato
        Lo inserisco nell'array completo
    Restituisco l'array completo in JSON
*/



$callback = function($msg){
    echo " [x] Ho ricevuto ", $msg->body, "\n";
    $msg->delivery_info['channel']->basic_ack($msg->delivery_info['delivery_tag']);
};

$channel->basic_consume(
    $queue = RABBITMQ_QUEUE_NAME,
    $consumer_tag = '',
    $no_local = false,
    $no_ack = false,
    $exclusive = false,
    $nowait = false,
    $callback
);

while (count($channel->callbacks)) {
    $channel->wait();
}

$channel->close();
$connection->close();

?>