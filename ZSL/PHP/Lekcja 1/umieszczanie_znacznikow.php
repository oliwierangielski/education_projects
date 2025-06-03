<!DOCTYPE html>
<html lang="pl-PL">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Znaczniki</title>
</head>
<body>
    <?php 
        /* 
            Obie wypisują tekst (nieznaczne różnice).
        */
        print('Tekst ze znacznikami <b>HTML</b><br>');
        echo('Konkatenacja'.' tekstów<br>');
        echo 'Argumenty nie muszą być w nawiasie, ale po spacji<br>';
        echo("<img src=\"obrazek.jpg\" alt=\"obrazek:)\">"); # \ robi ucieczkę, czyli np można użyć " w "
    ?>
</body>
</html>