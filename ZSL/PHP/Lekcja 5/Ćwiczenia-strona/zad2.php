<!DOCTYPE html>
<html lang="pl-PL">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="">
    <link rel="stylesheet" href="">
    <title>Nauczyciele</title>
    <style>
        table {
            border: 1px solid black;
            border-collapse: collapse;
        }

        th,
        td {
            border: 1px solid black;
        }
    </style>
</head>

<body>
    <?php
    $dbhost = "localhost";
    $dbname = "dziennik";
    $dbuser = "root";
    $dbpass = "";

    $baza = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
    if ($baza->errno)
        exit();

    $query = "SELECT imie, nazwisko, data_urodzenia FROM nauczyciel ORDER BY data_urodzenia DESC;";

    $result = $baza->query($query);

    $headers = array("Imię", "Nazwisko", "Data urodzenia");

    if ($result->num_rows > 0) {
        echo ("<table><tr>");

        for ($i = 0; $i < count($headers); $i++) {
            echo ("<th>" . $headers[$i] . "</th>");
        }

        echo ("</tr>");
        while ($row = $result->fetch_row()) {
            echo ("<tr>");
            for ($i = 0; $i < count($row); $i++) {
                echo ("<td>" . $row[$i] . "</td>");
            }
            echo ("</tr>");
        }
        echo ("</table>");
    }

    $baza->close();
    ?>
</body>

</html>