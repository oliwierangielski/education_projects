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
    // header('Content-type: text/plain; charset=utf-8');
        require ("conn.php");
        $sql = "SELECT * FROM stacje";
        $query = $conn -> query($sql);
        echo "<table>";
        echo "<tr><th>id</th><th>nazwa</th><th>orczyki</th><th>krzeselka</th><th>gondole/kolejki</th><th>nazniezanie</th><th>oswietlenie</th></tr>";
        if($query){
            while($row = mysqli_fetch_array($query, MYSQLI_ASSOC)){
               echo "<tr>";
                echo "<td>".$row['id_stacji']."</td>";
                echo "<td><a href=\"stacja.php?id=".$row['id_stacji']."\">".$row['nazwa']."</a></td>";
                echo "<td>".$row['orczyki']."</td>";
                echo "<td>".$row['krzeselka']."</td>";
                echo "<td>".$row['gondole/kolejki']."</td>";
                echo "<td>".$row['nasniezanie']."</td>";
                echo "<td>".$row['oswietlenie']."</td>";
                echo "</tr>";
            }
        }
        echo "</table>";
    ?>
</body>
</html>