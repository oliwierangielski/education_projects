<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Sprawdzenie, czy żądanie jest typu POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  // Odczytanie danych z żądania
  $acc = $_POST['acc'];
  $pismo = $_POST['pismo'];
  $miniaturka = $_POST['miniaturka'];
  $wybraneOpcje = $_POST['wybraneOpcje'];
  $source = $_POST['source'];

  // Sprawdzenie wartości argumentu 'acc' za pomocą switcha
  switch ($acc) {
    case "add":
      // Logika dodawania danych do pliku XML
      // Implementacja dodawania danych do pliku XML
	    dodajDaneDoXML($pismo, $miniaturka, $wybraneOpcje);
      $response = array("message" => "Dane zostały dodane do pliku XML.");
      break;
    case "del":
      // Logika usuwania danych z pliku XML
      // Implementacja usuwania danych z pliku XML
      usunTagiZCzasopisma($pismo);
      $response = array("message" => "Dane zostały usunięte z pliku XML.".$pismo);
      break;
    case "exc":
      // Logika aktualizacji danych w pliku XML
      // Implementacja aktualizacji danych w pliku XML


      modifyXmlFile($pismo, $miniaturka, $wybraneOpcje, $pismo);
      $response = array("message" => "Dane zostały zaktualizowane w pliku XML.".$pismo.$miniaturka.$wybraneOpcje.$source);
      break;
    default:
      $response = array("message" => "Nieprawidłowy argument 'acc'.");
      break;
  }

  // Zwrócenie odpowiedzi jako JSON
  echo json_encode($response);
} else {
  // Zwrócenie błędu, jeśli żądanie nie jest typu POST
  $response = array("message" => "Nieprawidłowe żądanie.");
  echo json_encode($response);
}


// FUNKCJE

function dodajDaneDoXML($pismo, $miniaturka, $lata) {
  $xmlFile = 'czasopisma.xml';
  $xml = simplexml_load_file($xmlFile);
  
  // Dodawanie pola <pismo> do <zmienne>
  $zmienne = $xml->zmienne;
  $zmienne->addChild($pismo);
  $zmienne->$pismo->addChild('src', $miniaturka);
  $zmienne->$pismo->addChild('klik', $pismo);
  
  // Dodawanie pola <pismo> do <lata>
  $lataNode = $xml->lata;
  $lataNode->addChild($pismo, implode(',', $lata));
  
  // Zapisywanie zmian do pliku
  $xml->asXML($xmlFile);
}


function usunTagiZCzasopisma($pismo) {
  $file = "czasopisma.xml"; // ścieżka do pliku czasopisma.xml
  
  // Wczytaj zawartość pliku czasopisma.xml
  $xmlString = file_get_contents($file);
  $xml = new SimpleXMLElement($xmlString);
  
  // Usuń tag o nazwie podanego pisma z sekcji <zmienne>
  $tagZmienne = $xml->zmienne;
  unset($tagZmienne->$pismo);
  
  // Usuń tag o nazwie podanego pisma z sekcji <lata>
  $tagLata = $xml->lata;
  unset($tagLata->$pismo);
  
  // Zapisz zmiany do pliku
  file_put_contents($file, $xml->asXML());
}

function modifyXmlFile($pismo, $miniaturka, $lata, $source) {
  $xmlFile = 'czasopisma.xml';
  
  // Wczytaj plik XML
  $xml = simplexml_load_file($xmlFile);

  // $tagZmienne = $xml->zmienne;
  // $tagZmienne->$source;

  if($pismo != ""){
    
  } elseif($miniaturka != ""){
    $zmienneTag = $xml->zmienne;
    $tag = $zmienneTag->$source;
    $tag->src = $miniaturka;
  } elseif(!empty($lata)){
    $xml->lata->$source = implode(',', $lata);
  }
  
  // Wyszukaj tag <zmienne> dla podanego pisma
  
  // if (!empty($zmienneTag)) {
  //   // Zmiana wartości tagu <src>
  //   $zmienneTag[0]->src = $miniaturka;
    
  //   // Zmiana wartości tagu <klik>
  //   $zmienneTag[0]->klik = $pismo;
    
  //   // Zmiana nazwy tagu
  //   // $zmienneTag[0]->getName() = $pismo;
  // }
  
  // // Wyszukaj tag <lata> dla podanego pisma
  // $lataTag = $xml->xpath("//lata/$pismo");
  // if (!empty($lataTag)) {
  //   // Zmiana wartości tagu <lata>
  //   $lataTag[0][0] = implode(',', $lata);
    
  //   // Zmiana nazwy tagu
  //   // $lataTag[0]->getName() = $pismo;
  // }
  
  // Zapisz zmieniony plik XML
  $xml->asXML($xmlFile);
}




