<?php
session_start();
include("db.php"); //require
if(isset($_POST['moviesimages']) && $_POST['moviesimages']=='get'){
    $sql = "SELECT image, movie_id FROM movies ";
    $result = $mysqli->query($sql);
    $all = $result->fetch_all();
    echo json_encode($all);
} else if(isset($_POST['seats']) && $_POST['seats']=='get'){
    $sql = "SELECT seat_row, seat_column FROM user_reservations WHERE showing_id =".$_POST['showing_id'];
    $result = $mysqli->query($sql);
    $all = $result->fetch_all();
    echo json_encode($all);
} else if(isset($_POST['showings']) && $_POST['showings']=='get'){
    $sql = "SELECT showing_type, price, showing_id FROM showings WHERE movie_id=".$_POST['movie_id'];
    $result = $mysqli->query($sql);
    $all = $result->fetch_all();
    echo json_encode($all);
} 

// select count(*) from users where login='".$_POST['user']"' and passwd='".$_POST['passwd']."'
// select count(*) from users where login='    ' or 1=1 --     ' and passwd='".$_POST['passwd']."'
// binduj!!!
?>