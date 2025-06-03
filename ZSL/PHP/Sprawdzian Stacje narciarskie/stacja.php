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
        if(isset($_GET['id'])){
            require_once("conn.php");
            $id = $_GET['id'];
            $sql = "SELECT * FROM trasy WHERE id_stacji=$id";
            $query = $conn -> query($sql);
            if($query){
                echo "<table>";
                echo "<tr><th>Nazwa: </th><th>ID: </th><th>Długość: </th><tr>";
                while($row = mysqli_fetch_array($query, MYSQLI_ASSOC)){
                    echo "<tr>";
                    echo "<td>".$row['nazwa']."</td>";
                    echo "<td>".$row['id_trasy']."</td>";
                    echo "<td>".$row['dlugosc']."</td>";
                    echo "</tr>";
                }
                echo "</table>";

                echo "<div class=\"rating\">";
                echo "Oceń stację:";
                echo "<form action=\"rating.php\" method=\"POST\">";
                echo "<input type=\"hidden\" name=\"id\" value=\"$id\"/>";
                echo "<div>1: <input type=\"radio\" name=\"rate\" value=\"1\"/></div>";
                echo "<div>2: <input type=\"radio\" name=\"rate\" value=\"2\"/></div>";
                echo "<div>3: <input type=\"radio\" name=\"rate\" value=\"3\"/></div>";
                echo "<div>4: <input type=\"radio\" name=\"rate\" value=\"4\"/></div>";
                echo "<div>5: <input type=\"radio\" name=\"rate\" value=\"5\"/></div>";
                echo "<div>6: <input type=\"radio\" name=\"rate\" value=\"6\"/></div>";
                echo "<div><input type=\"submit\" name=\"submit\" value=\"submit\"/></div>";
                echo "</div>";
            }
        } else {
            header("Location: index.php");
        }

    ?>
    
</body>
</html>