<?php
    session_start();
    include_once "db.php";
    if(isset($_POST['seats'])){
        $seats = $_POST['seats']; //array of seats
        // print_r($_POST['showing_id']);
        $showing_id = $_POST['showing_id'];
        $user_id = $_SESSION['id'];
        foreach($seats as $elem){
            // echo $elem;
            $decodedSeat = explode(",", $elem);
            $seat_row = $decodedSeat[0];
            $seat_column = $decodedSeat[1];
            $sql =  "INSERT INTO user_reservations (showing_id, user_id, seat_row, seat_column) VALUES ($showing_id,$user_id, $seat_row, $seat_column)";
            $mysqli->query($sql);
        }
        header("Location: index.php");
    }
?>