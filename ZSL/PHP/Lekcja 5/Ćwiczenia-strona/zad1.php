<!DOCTYPE html>
<html lang="pl-PL">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="">
    <link rel="stylesheet" href="">
    <title>Uczniowie klasy 3TI</title>
</head>

<body>
    <?php
    $dbhost = "localhost";
    $dbname = "dziennik";
    $dbuser = "root";
    $dbpass = "";

    $baza = mysqli_connect($dbhost, $dbuser, $dbpass);
    if (mysqli_connect_errno()) {
        exit();
    }

    mysqli_select_db($baza, $dbname);

    $query = 'SELECT uczen.nazwisko, uczen.imie FROM uczen INNER JOIN klasa ON uczen.id_klasa = klasa.id WHERE klasa.numer = 3 AND klasa.oznaczenie = "TI" ORDER BY uczen.nazwisko ASC';

    $result = mysqli_query($baza, $query);

    if (mysqli_num_rows($result) > 0) {
        echo ("<ol>");

        for ($i = 0; $i < mysqli_num_rows($result); $i++) {
            $row = mysqli_fetch_row($result);
            echo ("<li>" . $row[0] . " " . $row[1] . "</li>");
        }

        echo ("</ol>");
    }

    mysqli_close($baza);
    ?>
</body>

</html>