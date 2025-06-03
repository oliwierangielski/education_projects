<?php
session_start();
include_once "db.php";
    if(isset($_POST['submit'])){
        $title = $_POST['title'];
        $description = $_POST['description'];
        $premiere = $_POST['premiere'];
        $length = $_POST['length'];
        $director = $_POST['director'];
        $cast = $_POST['cast'];
        $sql =  "INSERT INTO `movies` (`title`, `image`, `description`, `premiere`, `length`, `director`, `cast`) VALUES (NULL, '1', '1', '1', '2023-03-01', '1', '1', '1')";
        $mysqli->query($sql);
    }
?>