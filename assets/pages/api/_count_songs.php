<?php
header('Content-Type: application/json');
include "../_connection.php";

$response = [];

if ($_POST['type'] == 'all') {
    $sql = "SELECT COUNT(*) AS total FROM song";
    $result = $conn->query($sql);
    $response['total'] = ($result) ? (int)$result->fetch_assoc()['total'] : 0;
}

if ($_POST['type'] == 'favorite') {
    $sql = "SELECT COUNT(*) AS total_favorites FROM song WHERE favorite = 1";
    $result = $conn->query($sql);
    $response['total_favorites'] = ($result) ? (int)$result->fetch_assoc()['total_favorites'] : 0;
}

if ($_POST['type'] == 'playlists') {
    $sql = "SELECT playlist, COUNT(*) as count FROM song WHERE playlist IS NOT NULL AND playlist != '' GROUP BY playlist ORDER BY MAX(addedTime) DESC";
    $result = $conn->query($sql);
    $playlists = [];

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $playlists[] = [
                'name' => $row['playlist'],
                'count' => (int)$row['count']
            ];
        }
    }

    $response['playlists'] = $playlists;
}

echo json_encode($response);
?>
