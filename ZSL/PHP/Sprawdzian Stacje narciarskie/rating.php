<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Oliwier Angielski 4IB">
    <title>Sprawdzian Stacje narciarskie Oliwier Angielski 4Ib</title>
    <link rel="stylesheet" href="style.css" type="text/css">
</head>
<body>
    <?php
        require("conn.php");
        if(isset($_POST['submit'])){
            $id = $_POST['id'];
            $rate = $_POST['rate'];
            $sql = "INSERT INTO `glosy` (`id_stacji`, `rating`) VALUES ('$id', '$rate');";
           
           if($conn -> query($sql)){
               echo "Sukces! Dodano ocenę";
           }
        }
        
        $sql = "SELECT `stacje`.`nazwa`, AVG(glosy.rating) FROM `stacje`, `glosy` WHERE stacje.id_stacji = glosy.id_stacji GROUP BY stacje.id_stacji ORDER BY AVG(glosy.rating) DESC LIMIT 3";
        $query = $conn -> query($sql);
            echo "2";
            echo "<table>";
            while($row = mysqli_fetch_array($query, MYSQLI_ASSOC)){
                echo"<tr>";
                echo "<td>".$row['nazwa']."</td>";
               echo "<td>".$row['AVG(glosy.rating)']."</td>";
               echo "</tr>";
            }
            echo "</table>"

    ?>
</body>
</html>