<!DOCTYPE html>
<html lang="pl-PL">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Licznik odwiedzin</title>
</head>

<body>
    <?php
    try {
        $conn = @new mysqli('localhost', 'root', '', 'pgrybos');
    } catch (ErrorException $e) {
        echo ("Nie udało się połączyć z bazą!");
    }

    if ($conn->connect_error) {
        echo ("<h1 style='color: red;'>Nie udało się połączyć z bazą danych!</h1>");
    } else {
        echo ("<h1 style='color: green;'>Udało się połączyć z bazą danych!</h1>");
    }

    $rs = $conn->query("SELECT licznik FROM licznik");

    if ($rs->num_rows > 0) {
        $res = $rs->fetch_assoc();

        $licznik = $res['licznik'];

        $licznik++;

        $conn->query("UPDATE licznik SET licznik=$licznik");

        $licznik = strval($licznik);

        if ($licznik == '1')
            echo ("Tę stronę odwiedziła $licznik osoba");
        elseif (($licznik[strlen($licznik) - 1] == '2' || $licznik[strlen($licznik) - 1] == '3' || $licznik[strlen($licznik) - 1] == '4') && (intval(substr($licznik, strlen($licznik) - 2, 2)) < 12 || intval(substr($licznik, strlen($licznik) - 2, 2)) > 14))
            echo ("Tę stronę odwiedziły $licznik osoby");
        else
            echo ("Tę stronę odwiedziło $licznik osób");
    }

    $rs->close();

    ?>
</body>

</html>