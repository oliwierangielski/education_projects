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
<body onload="get()">
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
       <div class="slider">
            <div class="arrowSlider" id="leftArrowSlider" onmousedown="sliderDown(this)" onmouseup="sliderRelease(this)"><</div>
            <div class="sliderInner" id="sliderInner"></div>
            <div class="arrowSlider" id="rightArrowSlider"  onmousedown="sliderDown(this, -1)" onmouseup="sliderRelease(this)">></div>
       </div>
       <?php if($_SESSION['login'] == "admin"): ?>
         <form method="adminpanel.php" method="post">
            <div><input type="text" name="title" placeholder="Tytuł"></div>
            <div><textarea name="description" placeholder="Opis"></div>
            <div><input type="file" name="image"></div>
            <div><input type="date" name="premiere"></div>
            <div><input type="text" name="length" placeholder="length"></div>
            <div><input type="text" name="director" placeholder="Rezyser"></div>
            <div><input type="text" name="cast" placeholder="Obsada"></div>
            <div><input type="submit" name="submit"></div>
        </form>
       <?php endif; ?>
    </main>
    <footer>
    </footer>
</body>
</html>