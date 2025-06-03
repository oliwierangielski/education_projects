<!DOCTYPE html>
<html lang="pl-PL">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tablice</title>
</head>
<body>
    <?php 
        // Wpisywanie do zwykłej tablicy, deklaracja zwykłej tablicy
        $tab = array(); // Deklaracja
        print_r($tab); // Wypisanie tablicy (echo nie może)
        $tab[0] = 'Wartość1';
        $tab[1] = 5;
        echo($tab[0]);
        print_r($tab);

        // Tablice asocjacyjne
        $tab_assoc = array('pole1' => 5, 'pole2' => 'Tekst');
        print_r($tab_assoc);
        echo($tab_assoc['pole2']);

        /* 
            Funkcje sortujące: 
            - sort() - sortowanie zwykłych tablic rosnąco po wartościach,
            - rsort() - sortowanie malejąco,
            - asort() - sortowanie asocjacyjnych po wartościach rosnąco,
            - arsort() - sortowanie asocjacyjnych po wartościach malejąco,
            - ksort() - sortowanie po kluczach rosnąco,
            - krsort() - sortowanie po kluczach malejąco.
        */
    ?>
</body>
</html>