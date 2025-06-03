<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Oliwier Angielski 4IB">
    <title>Oliwier Angielski 4IB - Sprawdzian</title>
</head>
<body>
    <form method="post" action="">
    <div><label for="text">Text do zamiany: </label><input type="text" name="text" id="name"></div>
    <div><input type="submit" name="submit" value="Zatwierdź"></div>
    </form>
    <?php
        if(isset($_POST["submit"])){
                $text = $_POST["text"];
                $wordsArray = explode(" ", $text);
                $text = "";
            foreach($wordsArray as $i => $val){
                $strLen = strlen($val);
                if($strLen%2!=0){
                    $val[0] = strtoupper($val[0]);
                    $val[$strLen-1] = strtoupper($val[$strLen-1]);
                }
                $wordsArray[$i] = $val;
                $text .= $val." ";
            }
            //array_pop($text);
            echo $text;
        }
        
    ?>
</body>
</html>