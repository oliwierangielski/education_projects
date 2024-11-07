<?php
//phpinfo();
// $_POST    $_GET   $_REQUEST
// print_r($_POST);
// print_r($_GET);
// print_r($_REQUEST);
include("hidden.php"); //require
$mysqli = new mysqli($host, $user, $passwd, $dbname);
$mysqli->query("set names utf8");

if(isset($_POST['acc']) && $_POST['acc']=='add'){
    $sql = "insert into data(data_country, data_currency, data_category, data_material, data_year) values(?,?,?,?,?)";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("issii", rawurldecode($_POST['country']), rawurldecode($_POST['currency']), rawurldecode($_POST['category']), rawurldecode($_POST['material']), rawurldecode($_POST['year']));
    $stmt->execute();
}else if(isset($_POST['acc']) && $_POST['acc']=='get'){
    $sql = "select data.data_id, countries.country_name, data.data_currency, data.data_category, materials.material_name, data.data_year, data.data_country, data.data_material from data INNER JOIN countries ON data.data_country = countries.country_id INNER JOIN materials ON data.data_material = materials.material_id";
    $result = $mysqli->query($sql);
    $all = $result->fetch_all();
    echo json_encode($all);
} else if(isset($_POST['acc']) && $_POST['acc']=='select'){
    $sql = "select * from ".$_POST['table'];
    $result = $mysqli->query($sql);
    $all = $result->fetch_all();
    echo json_encode($all);
} else if(isset($_POST['acc']) && $_POST['acc']=='delete'){
    $sql = "delete FROM data WHERE data.data_id = ? ";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("i", rawurldecode($_POST['id']));
    $stmt->execute();
} else if(isset($_POST['acc']) && $_POST['acc']=='update'){
    $sql = "update data SET data_country = ?, data_currency = ?, data_category = ?, data_material = ?, data_year = ? WHERE data.data_id = ?";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("issiii", rawurldecode($_POST['country']), rawurldecode($_POST['currency']), rawurldecode($_POST['category']), rawurldecode($_POST['material']), rawurldecode($_POST['year']), rawurldecode($_POST['id']));
    $stmt->execute();
}

// select count(*) from users where login='".$_POST['user']"' and passwd='".$_POST['passwd']."'
// select count(*) from users where login='    ' or 1=1 --     ' and passwd='".$_POST['passwd']."'
// binduj!!!
?>