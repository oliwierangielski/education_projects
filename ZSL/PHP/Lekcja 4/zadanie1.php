<!DOCTYPE html>
<html lang="pl-PL">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zadanie 1</title>
</head>
<body>
    <form method="post">
        <label for="name">Imię: </label><input type="text" name="name" id="name"> <br>
        <label for="surname">Nazwisko: </label><input type="text" name="surname" id="surname"> <br>
        <label for="pesel">Pesel: </label><input type="text" name="pesel" id="pesel"> <br>
        <button type="submit">Wyślij</button>
    </form>
    <?php
        /* 
            Walidator pesel'a. Sprawdza długość i cyfrę kontrolną.
        */
        function peselValidate($pesel)
        {
            if (strlen($pesel) != 11)
                return false;
            $wages = array(1,3,7,9,1,3,7,9,1,3);
            $control = $pesel[10];
            $sum = 0;
            for ($i = 0; $i < count($wages); $i++)
                $sum += $pesel[$i] * $wages[$i];
            $sum += $control;
            if ($sum % 10 == 0)
                return true;
            else
                return false;
        }
        /* 
            Zadanie wyświetlające inicjały człowieka i jego płeć. 
            Najpierw sprawdzamy, czy zmienne w formularzu zostały wysłane.
        */
        if (isset($_POST['name'], $_POST['surname'], $_POST['pesel']))
        {
            /* 
                Teraz sprawdzamy, czy nie są to puste.
            */
            if (!empty($_POST['name']) && !empty($_POST['surname']) && !empty($_POST['pesel']))
            {
                /* 
                    Sprawdzamy, czy pesel jest prawidłowy.
                */
                if (!peselValidate($_POST['pesel']))
                    echo('Pesel jest nieprawidłowy');
                else
                {
                    /* 
                        Używamy substr() aby wybrać pierwsze litery imienia i nazwiska. 
                        Na wszelki wypadek zmieniamy je na wielkie za pomocą funkcji strtoupper().
                    */
                    echo('Inicjały: '.strtoupper(substr($_POST['name'], 0, 1)).'. '.strtoupper(substr($_POST['surname'], 0, 1)).'.<br>');
                    /* 
                        Szyfrujemy nazwisko szyfrem Cezara.
                    */
                    $surname = $_POST['surname'];
                    for ($i = 0; $i < strlen($surname); $i++)
                    {
                        $surname[$i] = chr(ord($surname[$i]) + 2); # Przesuwamy reprezentację ASCII o 2 w prawo i zamieniamy z powrotem na literę.
                    }
                    echo($surname.'<br>');
                    /* 
                        Sprawdzamy, czy 10 litera w pesel'u jest parzysta. 
                        Jeżeli tak, to to jest kobieta, a w przeciwnym przypadku to jest mężczyzna.
                    */
                    if ($_POST['pesel'][9] % 2 == 0)
                        echo('Płeć: kobieta');
                    else
                        echo('Płeć: mężczyzna');
                    /* 
                        Liczymy datę urodzenia na podstawie pesel'a.
                    */
                    $pesel = $_POST['pesel'];
                    # Rok i miesiąc
                    if (substr($pesel, 2, 2) > 40)
                    {
                        $year = '21';
                        $month = substr($pesel, 2, 2) - 40;
                    }
                    elseif (substr($pesel, 2, 2) > 20)
                    {
                        $year = '20';
                        $month = substr($pesel, 2, 2) - 20;
                    }
                    else
                    {
                        $year = '19';
                        $month = substr($pesel, 2, 2);
                    }
                    $year .= substr($pesel, 0, 2);
                    # Dzień
                    $day = substr($pesel, 4, 2);
                    if ($month < 10 && strlen($month) < 2)
                        $month = '0'.$month;
                    echo("<br>Data urodzenia: $day.$month.$year<br>");
                    /* 
                        Sprawdzamy, czy występuje cyfra 0. Uwaga w strpos ten znak, którego szukamy, lub tekst musi być w cudzysłowach.
                        Dodatkowo należy użyć operatora ===.
                    */
                    echo((strpos($pesel, '0') === NULL) ? "W PESELu nie występuje cyfra 0":"W PESELu występuje cyfra 0");
                }
            }
        }
    ?>
</body>
</html>