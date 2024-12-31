<?php
include "_connection.php";
$sql = "SELECT * FROM `song`";
$result = $conn->query($sql);

$songs = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $songs[] = $row;
    }
}
echo json_encode($songs);
?>
