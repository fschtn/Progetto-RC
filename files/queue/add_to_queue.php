<?php

// Avvio il server di RabbitMQ e mi ci connetto

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

// Ottengo i dati da inserire in coda

$messaggio = $_POST['messaggio'];

// Creo il messaggio da inviare all'interno della coda

$msg = new AMQPMessage(
    $messaggio,
    array('delivery_mode' => 2) #persistente
);

// Inserisco il messaggio nella coda dei libri letti

$pubblicazione_coda = $channel->basic_publish($msg, '', RABBITMQ_QUEUE_NAME);

?>