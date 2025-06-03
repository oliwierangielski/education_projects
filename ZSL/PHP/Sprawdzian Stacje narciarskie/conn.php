<?php
    $user = "root";
    $password = "";
    $db = "stacje_narciarskie";
    $host = "localhost";
    $conn = new mysqli($host, $user, $password, $db);

    if ($conn -> connect_errno) {
        echo "Failed to connect to MySQL: " . $conn -> connect_error;
        exit();
    }

    if (!$conn->set_charset("utf8")) {
        echo 'err';
        exit();
      }
    
?>