<?php
/* Attempt MySQL server connection. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
$link = mysqli_connect("localhost", "root", "", "snake");

// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

// Attempt select query execution
$sql = "SELECT * FROM highscore ORDER BY Score DESC LIMIT 19;";
$result = mysqli_query($link, $sql);

$data = array();
while($enr = mysqli_fetch_assoc($result)){
    $a = array($enr['Score'], $enr['Name']);
    array_push($data, $a);
}

echo json_encode($data);
mysqli_close($link);
?>