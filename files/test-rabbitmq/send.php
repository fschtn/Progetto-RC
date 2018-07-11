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



$messaggio = rand(1000000,9999999);

$msg = new AMQPMessage(
    $messaggio,
    array('delivery_mode' => 2) #persistente
);

$channel->basic_publish($msg, '', RABBITMQ_QUEUE_NAME);

print ' [x] Ho inviato '. $messaggio . PHP_EOL;

?>