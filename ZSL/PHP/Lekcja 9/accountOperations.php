<?php
    include_once "db.php";
    if(isset($_POST['registerBtn'])){
        $username = $_POST['login'];
        $password = hash("sha512", $_POST['password']);
        $phone_number = $_POST['telephone'];
        if($doesUserExist = $mysqli -> query("SELECT * FROM users WHERE username='$username'")){
            if($doesUserExist -> num_rows == 0){
                $result = $mysqli -> query("INSERT INTO users (username, password, phone_number) VALUES ('$username', '$password', '$phone_number')");
                header("Location: index.php");
                die();
            } else {
                header("Location: error.php");
            }
        }
    }
    if(isset($_POST['loginBtn'])){
        $username = $_POST['login'];
        $password = hash("sha512", $_POST['password']);
        if($result = $mysqli -> query("SELECT * FROM users WHERE username='$username' AND password='$password' LIMIT 1")){
            if($result -> num_rows == 1){
                $userInfo = $result -> fetch_array(MYSQLI_ASSOC);
                session_start();
                $_SESSION['login'] = $userInfo['username'];
                $_SESSION['id'] = $userInfo['user_id'];
                header("Location: index.php");
                die();
            } else {
                header("Location: error.php");
            }
        }
    }

    $mysqli -> close();
?>