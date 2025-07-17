<?php
require_once '../_connection.php';

$sql = "SELECT DISTINCT playlist FROM song WHERE playlist IS NOT NULL AND playlist != '' ORDER BY addedTime DESC";
$result = $conn->query($sql);

$playlists = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $playlists[] = $row['playlist'];
    }
}

header('Content-Type: application/json');
echo json_encode($playlists);
?>
