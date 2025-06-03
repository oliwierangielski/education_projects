<?php 
    // Definicja funkcji z parametrem
    function hello ($name)
    {
        echo("Cześć $name!<br>");
    }
    hello("Paweł");

    // Funkcja zwracająca
    function sum ($a, $b)
    {
        return $a + $b;
    }

    echo(sum(10,15));

    echo('<br>');

    function gwiazdki ()
    {
        for ($i = 0; $i < 10; $i++) { 
            echo('*');
        }
        echo('<br>');
    }

    echo('Pierwszy tekst<br>');
    gwiazdki();
    echo('Drugi tekst<br>');
    gwiazdki();

    function gwiazdkiN ($number)
    {
        for ($i = 0; $i < $number; $i++) { 
            echo('*');
        }
        echo('<br>');
    }

    echo('Pierwszy tekst<br>');
    gwiazdkiN(12);
    echo('Drugi tekst<br>');
    gwiazdkiN(10);

    function poleK ($r)
    {
        return pi()*$r**2;
    }

    $r = 4;
    echo("Pole koła o promieniu $r = " . poleK($r));

?>