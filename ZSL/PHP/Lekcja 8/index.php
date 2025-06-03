<?php

    function Zadanie1(){
        for($i=0; $i<10; $i++)
            { $liczby[$i] = rand()%10; }
        header("Content-type: image/jpeg");
        $rysunek = imagecreate (100,100)
            or die("Biblioteka graficzna nie została zainstalowana!");
        $kolorbialy = imagecolorallocate ($rysunek, 255, 255, 255);
        $kolorczarny = imagecolorallocate ($rysunek, 0, 0, 0);
        imagefill($rysunek, 0, 0, $kolorbialy);
        for( $i=0; $i<10; $i++)
        {
            $kolorslupka = imagecolorallocate ($rysunek, 25*$i, 25*$i,0);
            imagefilledrectangle ($rysunek, $i*10+3, 90-$liczby[$i]*10, $i*10+7, 90, $kolorslupka);
            imagestring ($rysunek, 1, 3+$i*10, 91, $i, $kolorczarny);
        }
        imagejpeg($rysunek);
    }

    function Zadanie2($liczby){
        for($i=0; $i<10; $i++)
            { $liczby[$i] = rand()%1000; }
        $width = 1040;
        $height = 1040;

        header("Content-type: image/jpeg");
        $rysunek = imagecreate ($width, $height)
            or die("Biblioteka graficzna nie została zainstalowana!");
        $kolorbialy = imagecolorallocate ($rysunek, 255, 255, 255);
        $kolorczarny = imagecolorallocate ($rysunek, 0, 0, 0);
        imagefill($rysunek, 0, 0, $kolorbialy);
        for( $i=0; $i<10; $i++)
        {
            imagestring ($rysunek, 10, 15,$i * $height/sizeof($liczby) + $height/sizeof($liczby)/2, $i, $kolorczarny);
            //R: 255 -$i*25
            //G: 1 + 25 * $i
            //B: 0
            $kolorslupka = imagecolorallocate($rysunek, 255 -$i*25, 1 + 25 * $i,0);
            imagefilledrectangle($rysunek,40,$i * $height/sizeof($liczby) + $height/sizeof($liczby)/2,$liczby[$i],$i * $height/sizeof($liczby) + $height/sizeof($liczby)/2 +10,$kolorslupka);
            imagestring($rysunek,10,$liczby[$i] + 15,$i * $height/sizeof($liczby) + $height/sizeof($liczby)/2,$liczby[$i],$kolorczarny);
        }
        imagejpeg($rysunek);
    }

    Zadanie2($liczby)
    
    ?>
    
    <!-- Wybrane polecenia graficzne języka PHP
    1.	header(typ) – przesłanie nagłówka określającego typ danych, np.:
    header(„Content-type: image/jpeg”)
    2.	imagecreate(x,y) – utworzenie rysunku o wskazanej wielkości (w pikselach) i podanie jego identyfikatora
    3.	imagecolorallocate(id_rys,R,G,B) – definiowanie koloru dla rysunku
    4.	imagefill(id_rys,x,y,id_koloru) – wypełnienie obszaru ograniczonego podanym kolorem, współrzędne x i y wyznaczają dowolny punkt wewnątrz tego obszaru
    5.	imageline(id_rys,xp,yp,xk,yk,kolor) – rysuje na wskazanym rysunku linię między podanymi punktami o zadanym kolorze
    6.	imagejpeg(id_rys) – wyświetla przygotowany rysunek w formacie JPG
    7.	imagegif(id_rys) – wyświetla rysunek w formacie GIF
    8.	imagesetpixel(id_rys,x,y,kolor) – ustawia kolor pixela o wskazanych współrzędnych na wybranym rysunku
    9.	imagearc(id_rys,x,y,szer,wys,kąt_początkowy,kąt_końcowy,kolor) – rysuje łuk
    10.	imagefilledrectangle(id_rys,x1,y1,x2,y2,kolor) – rysuje prostokąt wypełniony kolorem, x1,y1 – współrzędne lewego górnego narożnika, x2,y2 – współrzędne prawego dolnego narożnika
    11.	imagestring(id_rys,nr_czcionki,x,y,tekst,kolor) – umieszcza tekst na rysunku
    12.	imagecreatefromgif(plik) – tworzy rysunek na podstawie pliku
    13.	imagecolortransparent(id_rys,kolor) – ustala kolor przezroczystości rysunku
    14.	imagesizex(id_rys) – zwraca szerokość rysunku
    15.	imagesizey(id_rys) – zwraca wysokość rysunku
    16.	getimagesize(id_rys) – zwraca czteroelementową tablicę z informacjami o rysunku -->

    