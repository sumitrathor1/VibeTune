<?php
require_once '../_connection.php';

$filter = $_POST['filter'] ?? 'all';
$filter = trim($filter);

if ($filter === 'favorites') {
    $sql = "SELECT * FROM song WHERE favorite = 1 ORDER BY addedTime DESC";
} elseif ($filter === 'all') {
    $sql = "SELECT * FROM song ORDER BY addedTime DESC";
} else {
    // Playlist filter
    $stmt = $conn->prepare("SELECT * FROM song WHERE playlist = ? ORDER BY addedTime DESC");
    $stmt->bind_param("s", $filter);
    $stmt->execute();
    $result = $stmt->get_result();
}

$songs = [];
if (!isset($result)) {
    $result = $conn->query($sql);
}

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $songs[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($songs);
?>
