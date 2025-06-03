<!DOCTYPE html>
<html lang="pl-PL">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="">
    <link rel="stylesheet" href="">
    <title>Usuwanie nauczycieli</title>
</head>

<body>
    <?php
    $dbhost = "localhost";
    $dbname = "dziennik";
    $dbuser = "root";
    $dbpass = "";

    $baza = @mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

    if (mysqli_errno($baza)) {
        exit();
    }

    $query = "DELETE FROM nauczyciel WHERE data_urodzenia < '1950-01-01';";

    $result = mysqli_query($baza, $query);

    if ($result) {
        if (mysqli_affected_rows($baza) == 0)
            echo ("Nie było co usuwać");
        else
            echo ("Usunięto: " . mysqli_affected_rows($baza));
    } else
        echo ("Błąd: " . $query . " " . mysqli_error($baza));

    mysqli_close($baza);
    ?>
</body>

</html>