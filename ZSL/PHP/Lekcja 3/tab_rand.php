<?php 
    for ($i = 0; $i < 10; $i++) { 
        $tab[$i] = rand(0,100); // Generuje liczby losowe z zakresu 0 do 100 włącznie
        echo($tab[$i].'<br>');
    }
    sort($tab); // Nawet przy tablicy od 1 do 10 numerowanej. Po posortowaniu mamy od 0. Trzeba na to uważać.
    echo('Po sortowaniu:<br>');
    $suma = 0;
    for ($i = 0; $i < 10; $i++) { 
        echo($tab[$i].'<br>');
        $suma += $tab[$i];
    }
    echo("Suma elementów z tablicy: $suma");
?>