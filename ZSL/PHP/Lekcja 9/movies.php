<?php
    session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Oliwier Angielski 4IB">
    <script src="https://kit.fontawesome.com/b3d4404b4e.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="css/style.css" type="text/css">
    <script defer src="js/script.js"></script>
    <title>Oliwier Angielski 4IB</title>
</head>
<body onload="loadShowings(<?php echo $_GET['id']; ?>)">
    <dialog id="loginDialog" class="dialog">
        <div class="rightDialog">
            <div close class="dialogExitBtn" onclick="this.parentElement.parentElement.close()"><i class="fa-solid fa-xmark"></i></div>
            <div class="dialogTitle">Zaloguj się</div>
                <div class="dialogInputContainer">
                <form action="accountOperations.php" method="post">
                    <div><input type="text" id="username" placeholder="Login" name="login" class="dialogInput" required></div>
                    <div><input type="password" id="password" placeholder="Hasło" name="password" class="dialogInput" required></div>
                    <div><input type="submit" value="Zaloguj się" name="loginBtn" class="dialogSubmitBtn"></div>
                    <!-- <div class="dialogAdviceHelper">Nie masz konta? Zarejestruj się</div> -->
                </form>
            </div>
        </div>
    </dialog>
    <dialog id="registerDialog" class="dialog">
        <div class="rightDialog">
            <div close class="dialogExitBtn" onclick="this.parentElement.parentElement.close()"><i class="fa-solid fa-xmark"></i></div>
            <div class="dialogTitle">Zarejestruj się</div>
                <div class="dialogInputContainer">
                <form action="accountOperations.php" method="post">
                    <div><input type="text" id="username" placeholder="Login" name="login" class="dialogInput" required></div>
                    <div><input type="password" id="password" placeholder="Hasło" name="password" class="dialogInput" required></div>
                    <div><input type="tel" id="telephone" placeholder="Numer telefonu" name="telephone" class="dialogInput" required></div>
                    <div><input type="submit" value="Zarejestruj się" name="registerBtn" class="dialogSubmitBtn"></div>
                    <!-- <div class="dialogAdviceHelper">Nie masz konta? Zarejestruj się</div> -->
                </form>
            </div>
        </div>
    </dialog>
    <dialog id="reservationDialog" class="dialog">
        <div class="reservationRightDialog">
            <div close class="dialogExitBtn" onclick="this.parentElement.parentElement.close()"><i class="fa-solid fa-xmark"></i></div>
            <?php if(isset($_SESSION['login'])): ?>
            <div id="choseShowingWindow">
            <div class="dialogTitle">Wybierz seans</div>
                <div id="showingsChoice"></div>
            </div>
            <div id="choseSeatWindow">
                <div class="dialogTitle">Wybierz miejsce</div>
                <form action="reservation.php" method="post" id="seatForm">
                <div id="seatsChoice"></div>
                <div><input type="submit" value="Rezerwuj" class="reserveBtn"/></div>
                </form>
            </div>
            <?php else: ?>
                Najpierw musisz się zalogować
            <?php endif; ?>
        </div>
    </dialog>
    <nav>
        <a href="index.php" class="logoLink"><div class="logo">KRAKÓW<br/>KINO</div></a>
        <div class="accBtnHolder">
            <?php if(!isset($_SESSION['login'])): ?>
            <div class="accBtn" onclick="document.getElementById('loginDialog').show()">Logowanie</div>
            <div class="accBtn" onclick="document.getElementById('registerDialog').show()">Rejestracja</div>
            <?php else: ?>
                <?php echo $_SESSION['login']; ?>
            <?php endif; ?>
        </div>
    </nav>
    <main>
       <div class="filmInfoContainer">
        <?php
        include_once "db.php";
            $id = $_GET['id'];
                if($result = $mysqli -> query("SELECT * FROM movies WHERE movie_id='$id' LIMIT 1")){
                    if($result -> num_rows == 1){
                        $movieInfo = $result -> fetch_array(MYSQLI_ASSOC);
                        echo "<h1>".$movieInfo['title']."</h1>";
                        echo "<div class=\"filmInformation\">".$movieInfo['description']."</div>";
                        echo "<div class=\"filmInformation\"><b>Premiera:</b> ".$movieInfo['premiere']."</div>";
                        echo "<div class=\"filmInformation\"><b>Długość:</b> ".$movieInfo['length']."</div>";
                        echo "<div class=\"filmInformation\"><b>Długość:</b> ".$movieInfo['director']."</div>";
                        echo "<div class=\"filmInformation\"><b>Długość:</b> ".$movieInfo['cast']."</div>";
                        echo "<div class=\"ticketBtn\" onclick=\"document.getElementById('reservationDialog').show()\">Kup Bilet</div>";
                        die();
                    }
                }
        ?>
       </div>
    </main>
    <footer>
    </footer>
</body>
</html>