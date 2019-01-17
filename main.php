<?php
error_reporting(0);
mb_language("ja");
mb_internal_encoding('UTF-8');

if($_POST['command']=="regist"){
    $file=file("ranking.csv");
    array_push($file,htmlspecialchars_decode($_POST['name']).",".$_POST['score']."\n");
    file_put_contents("ranking.csv",$file);
    print("success");
}else{
    print("error");
}
?>