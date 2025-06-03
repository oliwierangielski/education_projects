<!DOCTYPE html>
<html lang="pl-PL">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pętle</title>
</head>
<body>
    <?php 
        $n = 11;
        for ($i = 1; $i < $n; $i++)
            echo ($i.' '.($n-$i).'<br>');
        
        echo ('<br>');

        for ($i = 1, $j = 10; $i < 11; $i++, $j--)
            echo ($i.' '.$j.'<br>');

        /*
        for (;;) // Pętla nieskończona
            echo ('a jednak działa ...<br>');
        */

        echo ('<br>');

        $i = 1;
        while ($i < 11)
        {
            $j = 11 - $i;
            echo ("$i $j <br>");
            $i++;
        }
    ?>
</body>
</html>