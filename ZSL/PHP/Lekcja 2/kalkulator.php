<!DOCTYPE html>
<html lang="pl-PL">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kalkulator</title>
</head>
<body>
    <?php 
        define('LICZBA1', 3);
        define('LICZBA2', 7);
        define('OPERATOR', '+');
        $isError = 0;
		
        switch (OPERATOR) {
            case '+':
                $wynik = LICZBA1 + LICZBA2;
                break;
            case '-':
                $wynik = LICZBA1 - LICZBA2;
                break;
            case '*':
                $wynik = LICZBA1 * LICZBA2;
                break;
            case '/':
            {
                if (LICZBA2 == 0)
                    $isError = 1;
                else
                    $wynik = LICZBA1 / LICZBA2;
                break;
            } 
            default:
                $isError = 2;
                break;      
        }
		if ($isError == 1)
			echo("Nie można dzielić przez 0!!!");
        elseif ($isError == 2)
            echo("Wpisano inny operator!!!");
		else
			echo("Wynik to $wynik");

        # Skrócony if: coś(np.: echo, zmienna = ) (warunek) ? jeżeli_prawda : jeżeli_fałsz;
    ?>
</body>
</html>