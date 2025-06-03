<form>
    <input type="text" name="text1" placeholder="text1"> <br> <br>
    <input type="text" name="text2" placeholder="text2"> <br> <br>
    <input type="submit" value="Wyślij">
</form>

<?php
    /* 
        Problem przed wysłaniem, bo jest niezdefiniowana zmienna jeszcze
    
        echo($_GET['text1']);
     
        Rozwiązanie: Sprawdzenie istnienia zmiennej.
    */
    if (isset($_GET['text1'], $_GET['text2'])) // Sprawdzenie, czy istnieją te dwie zmienne
    {
        if (!empty($_GET['text1']) && !empty($_GET['text2'])) { // Sprawdza też, czy oba są niepuste
            echo($_GET['text1'] . " " . $_GET['text2']);
        }
    }
?>