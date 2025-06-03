<!DOCTYPE html>
<html lang="pl-PL">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zmienne i operatory</title>
</head>
<body>
    <?php 
        define("PI", pi()); // Definiujemy stałą, używamy funkcji zwracającej pi
        $r = 3; // Definiujemy zmienną
        echo(PI*$r**2); // Lepiej nie mnożyć tekstów i liczyć na tekstach mimo, że to działa
        ?>
</body>
</html>