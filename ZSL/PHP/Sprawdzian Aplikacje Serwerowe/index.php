<?php
    include_once "db.php";
    $mysqli = new mysqli($host, $user, $password, $dbname);
    if(isset($_POST['submit'])){
        $radio = explode("?", $_POST['radio']);
        $id = $radio[0];
        $staraCena = $radio[1];
        $nowaCena = $_POST['newPrice'];
        $cena = $staraCena + $nowaCena;
        $sql = "UPDATE `aukcje` SET `cena` = '$cena' WHERE `aukcje`.`id` = $id;";
        $mysqli->query($sql);
    }

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Oliwier Angielski 4IB">
    <title>Oliwier Angielski 4IB Sprawdzian</title>
    <style>
        body{
            background-color: "blue";
        }
        td{
            border: 1px solid black;
        }
    </style>
</head>
<body>
    Serwis aukcyjny
    <form method="post" action="" id='form'>
    <table>
        <tr>
            <td>Przedmiot</td>
            <td>Aktualna cena</td>
            <td>Który w aukcji</td>
        </tr>
        <?php
        $acutions;
        try {
            if($mysqli->connect_errno){
                echo "Błąd: ".$mysqli -> connect_error;
                exit();
            }
            $sql = "SELECT * FROM aukcje";
            $aukcje = $mysqli->query($sql);
            while($row = $aukcje->fetch_assoc()){
                echo "<tr><td>".$row['nazwa']."</td><td>".number_format($row['cena'], 2)."</td><td><input type='radio' name='radio' form = 'form' value='".implode("?", [$row['id'], $row['cena']])."'></tr>";
            }
            echo "</table>";
        } catch (PDOException $e){
            echo "Błąd: ".$e->getMessage();
        }
        ?>
        <input type="text" name="newPrice" form="form" require>
        <input type="submit" name="submit" form="form">
        <a href="wykres.php">Zobacz wykres</a>
    
    <?php
        
    ?>
</body>
</html>