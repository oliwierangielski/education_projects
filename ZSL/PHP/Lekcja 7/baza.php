<!DOCTYPE html>
<html lang="pl-PL">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="">
    <link rel="stylesheet" href="">
    <title>Baza</title>
    <style>
        table {
            border: 1px solid black;
            border-collapse: collapse;
        }

        td,
        th {
            border: 1px solid black;
            padding: 10px;
        }
    </style>
</head>

<body>
    <?php
    /* 
        DECIMAL długość to: cyfry w sumie,cyfry po przecinku.
    */
    // próba utworzenia połączenia
    try {
        $conn = @new mysqli('localhost', 'root', '', 'pgrybos');
    } catch (Exception $e) {
        echo ("Nie udało się połączyć z bazą danych!");
        exit();
    }
    if ($conn->connect_errno) {
        echo "<h3 style='color:red;'>Brak połączenia z bazą danych</h3>";
        exit();
    } else {

        $id = '';
        $imie = '';
        $nazwisko = '';
        $pensja = '';
        $przycisk = 'Dodaj';

        echo "<h3 style='color:green;'>Jest połączenie z bazą danych</h3>";

        $conn->query('SET NAMES UTF8'); // ustawienie standardu tekstu

        /* 
            Jeżeli został naciśnięty przycisk.
        */
        if (isset($_GET['akcja'])) {
            switch ($_GET['akcja']) {
                case 'Dodaj': {
                        $imie = $_GET['imie'];
                        $nazwisko = $_GET['nazwisko'];
                        $pensja = $_GET['pensja'];
                        $sql = "INSERT INTO pracownicy(imie, nazwisko, pensja) VALUES ('$imie', '$nazwisko', '$pensja')";
                        /* 
                        Wykonujemy kwerendę, a w przypadku niepowodzenia, ginie.
                    */
                        $conn->query($sql) or die("Nie dodano rekordu!");
                        echo ('<script> location.replace("baza.php") </script>');
                        break;
                    }
                case 'Edytuj': {
                        $id = $_GET['id'];
                        $rs = $conn->query('SELECT imie as name, nazwisko as surname, pensja as sallary FROM pracownicy WHERE id=' . $id);

                        $rec = $rs->fetch_assoc();
                        $imie = $rec['name'];
                        $nazwisko = $rec['surname'];
                        $pensja = $rec['sallary'];
                        $przycisk = 'Zapisz';

                        $rs->close();
                        break;
                    }
                case 'Zapisz': {
                        $id = $_GET['id'];
                        $imie = $_GET['imie'];
                        $nazwisko = $_GET['nazwisko'];
                        $pensja = $_GET['pensja'];
                        $sql = "UPDATE pracownicy SET imie='$imie', nazwisko='$nazwisko', pensja=$pensja WHERE id=$id";
                        $conn->query($sql) or die("Nie udało się zaaktualizować!");
                        $id = '';
                        $imie = '';
                        $nazwisko = '';
                        $pensja = '';
                        echo ('<script> location.replace("baza.php") </script>');
                        break;
                    }
                case 'Usun': {
                        $id = $_GET['id'];
                        $sql = "DELETE FROM pracownicy WHERE id=$id";
                        $conn->query($sql) or die("Nie usunięto nic!");
                        echo ('<script> location.replace("baza.php") </script>');
                        break;
                    }
            }
        }

        $rs = $conn->query('SELECT id, imie as name, nazwisko as surname, pensja as sallary FROM pracownicy'); // pobieranie recordów imienia i nazwiska z bazy danych i utworzenie czegoś ala tablicy z nich

        /*
        $rec = $rs->fetch_assoc();  // pobiera pojedyńczy rekord z tych już pobranych
        echo $rec['name']." ".$rec['surname']."<br>";  // wyświetlenie danych z pobranego rekordu
        // */

        /* 
            Sprawdzamy, czy liczba rekordów nie jest pusta.
        */
        if ($rs->num_rows > 0) {
            echo ("<table>
                <tr>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Pensja</th>
                    <th>Usuwanie</th>
                    <th>Edycja</th>
                </tr>
            ");
            while ($rec = $rs->fetch_assoc()) {
                /* 
                    Ustawiamy id w ukrytym polu. Każdy wiersz jest teraz formularzem, który można wysłać przyciskiem, aby przesłać id do delete'a.
                */
                echo ("
                <form>
                    <input type=\"hidden\" name=\"id\" value=" . $rec['id'] . ">
                    <tr>
                        <td>" . $rec['name'] . "</td>
                        <td>" . $rec['surname'] . "</td>
                        <td>" . $rec['sallary'] . "</td>
                        <td><input type=\"submit\" value=\"Usun\" name=\"akcja\"></td>
                        <td><input type=\"submit\" value=\"Edytuj\" name=\"akcja\"></td>
                    </tr>
                </form>");
            }
            echo ("</table>");
        }

        $rs->close();   // usunięcie pobranych rekordów

        echo ("
            <br>
            <form method=\"get\">
                <fieldset>
                    <legend>Dodaj pracownika</legend>
                    <input type=\"hidden\" name=\"id\" value=\"$id\">
                    <label for=\"imie\">Imię: </label><input type=\"text\" name=\"imie\" id=\"imie\" value=\"$imie\"> <br> <br>
                    <label for=\"nazwisko\">Nazwisko: </label><input type=\"text\" name=\"nazwisko\" id=\"nazwisko\" value=\"$nazwisko\"> <br> <br>
                    <label for=\"pensja\">Pensja: </label><input type=\"text\" name=\"pensja\" id=\"pensja\" value=\"$pensja\"> <br> <br>
                    <input type=\"submit\" name=\"akcja\" value=\"$przycisk\">
                </fieldset>
            </form>
        ");
    }
    ?>
</body>

</html>