<?php
    $host = "localhost";
    $db = "cinema";
    $user = "root";
    $password = "";

    $mysqli = new mysqli($host, $user, $password, $db);
    $mysqli->query("set names utf8");
    if($mysqli -> connect_errno){
        echo "Failed to connect to MySQL: ".$mysqli -> connect_error;
        exit();
    }
?>