<!DOCTYPE html>
<html lang="pl-PL">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dodawanie napisów</title>
</head>
<body>
    <?php 
        $napis = "";
        for ($i = 0; $i < 10; $i++)
        {
            $napis .= $i; # Tylko tym można tworzyć napisy
        }
        echo($napis);
    ?>
</body>
</html>