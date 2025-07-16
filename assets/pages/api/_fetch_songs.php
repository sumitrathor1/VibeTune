<?php
require_once '../_connection.php';

$filter = $_POST['filter'] ?? 'all'; // Default to 'all' if not sent

// Build query based on filter
if ($filter === 'favorites') {
    $sql = "SELECT * FROM song WHERE favorite = 1 ORDER BY addedTime DESC";
} else {
    $sql = "SELECT * FROM song ORDER BY addedTime DESC";
}

$result = $conn->query($sql);
$songs = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $songs[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($songs);
?>
