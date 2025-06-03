<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Oliwier Angielski 4IB">
    <title>Oliwier Angielski 4IB - Sprawdzian</title>
	<style>
		td {
			width: 20px;
			text-align:right;
		}
	</style>
</head>
<body>
    <?php
        echo "<table>";
    $array = [];
        for($i = 0; $i < 30; $i++){
            $randomNumber = rand(-20, 20);
            array_push($array, $randomNumber);
            echo "<tr><td>".$randomNumber."</td></tr>";
        }
        echo "</table>";


        sort($array);
        //var_dump($array);
        echo "<hr>";
        $repeatingNumbers = 0;
        $lastRepeatingNumber = -21;
        for($i = 0; $i < sizeof($array)-1; $i++){
            if($array[$i] == $array[$i+1] and $array[$i] != $lastRepeatingNumber){
                $repeatingNumbers++;
                $lastRepeatingNumber = $array[$i];
            } 
        }
        echo "Więcej niż raz występuje: ".$repeatingNumbers." liczb";
    ?>
</body>
</html>