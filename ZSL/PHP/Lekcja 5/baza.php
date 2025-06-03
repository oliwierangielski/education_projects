<!DOCTYPE html>
<html lang="pl-PL">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="">
    <link rel="stylesheet" href="">
    <title>Baza</title>
</head>

<body>
    <?php
    // próba utworzenia połączenia
    try {
        $conn = new mysqli('localhost', 'root', '', 'pracownicy');
    } catch (Exception $e) {
        echo ("Nie udało się połączyć z bazą danych!");
        exit();
    }
    if ($conn->connect_errno) {
        echo "<h3 style='color:red;'>Brak połączenia z bazą danych</h3>";
        exit();
    } else {
        echo "<h3 style='color:green;'>Jest połączenie z bazą danych</h3>";

        $conn->query('SET NAMES UTF8'); // ustawienie standardu tekstu
        $rs = $conn->query('SELECT imię as name,nazwisko as surname FROM pracownicy WHERE pensja > 2000'); // pobieranie recordów imienia i nazwiska z bazy danych i utworzenie czegoś ala tablicy z nich

        /*
        $rec = $rs->fetch_assoc();  // pobiera pojedyńczy rekord z tych już pobranych
        echo $rec['name']." ".$rec['surname']."<br>";  // wyświetlenie danych z pobranego rekordu
        // */

        /* 
            Sprawdzamy, czy liczba rekordów nie jest pusta.
        */
        if ($rs->num_rows > 0) 
            while ($rec = $rs->fetch_assoc()) {
                echo $rec['name'] . " " . $rec['surname'] . "<br>";
            }

        $rs->close();   // usunięcie pobranych rekordów
    }
    ?>
</body>

</html>