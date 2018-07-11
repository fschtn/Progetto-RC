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

    // Riempio la coda tramite "create_queue.php"

    $result = file_get_contents('http://localhost/queue/create_queue.php');

    // Definico l'array con tutti gli elementi in coda

    $aggiornamenti = array();

    // Conto il numero di messaggi presenti in coda

    list($queue, $messageCount, $consumerCount) = $channel->queue_declare(RABBITMQ_QUEUE_NAME, true);
    $numero_aggiornamenti = $messageCount;

    // Definisco la funzione da eseguire ogni volta che ricevo un nuovo messaggio

    $callback = function($msg){
        array_push($GLOBALS['aggiornamenti'], $msg->body);
        // echo $msg->body."<br />";
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

    // Scarico tutti i messaggi all'interno della coda

    while ($numero_aggiornamenti > 0) {
        $channel->wait();
        $numero_aggiornamenti--;
    }

    // Chiudo il canale di trasmissione

    echo json_encode($aggiornamenti);

?>