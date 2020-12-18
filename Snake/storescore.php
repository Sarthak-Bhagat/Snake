<?php
/* Attempt MySQL server connection. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
$link = mysqli_connect("localhost", "root", "", "snake");

$name=$_POST['Name'];
$score=$_POST['Score'];

// Check connection
if($link === false){
	die("ERROR: Could not connect. " . mysqli_connect_error());
}

$sql = "INSERT INTO `highscore` VALUES('$name','$score')";
mysqli_query($link, $sql);
?>