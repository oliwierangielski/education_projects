<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Oliwier Angielski 4IB">
    <title>Oliwier Angielski 4IB - Sprawdzian</title>
    <style>
        td, th {
            width: 30px;
            text-align: center;
        }
    </style>
</head>
<body>
    <?php
    
    echo "<table>";
        for($i = 1; $i <= 5; $i++){
            echo "<tr>";
            for($y = 1; $y <= 8; $y++){
                if($i == 1 or $y == 1){
                    echo "<th>".$i*$y."</th>";
                } else {
                    echo "<td>".$i*$y."</td>";
                }
                
            }
            echo"</tr>";
        }
    echo "</table>";

    ?>
</body>
</html>