<?php
    include_once "db.php";
    $mysqli = new mysqli($host, $user, $password, $dbname);

  header("Content-type: image/jpeg");
  $rysunek = imagecreate (500,500)
    or die("Biblioteka graficzna nie została zainstalowana!");
  $kolorbialy = imagecolorallocate ($rysunek, 255, 255, 255);
  $kolorczarny = imagecolorallocate ($rysunek, 0, 0, 0);
  imagefill($rysunek, 0, 0, $kolorbialy);

  $sql = "SELECT * FROM aukcje";
    $aukcje = $mysqli->query($sql);
    $i = 0;
    while($row = $aukcje->fetch_assoc())
  {
      $i++;
    $kolorslupka = imagecolorallocate ($rysunek, rand(0, 255), rand(0, 255),rand(0, 255));
    imagestring($rysunek, 10, 10, $i*20+5, $row['nazwa'], $kolorczarny);
    imagefilledrectangle($rysunek, 150, $i *20 + 5, 150 + $row['cena']/10, $i*20+20, $kolorslupka);
    imagestring($rysunek, 10, 160 + $row['cena']/10, $i*20+5, $row['cena'], $kolorczarny);
  }
    
  imagejpeg($rysunek);
?>
