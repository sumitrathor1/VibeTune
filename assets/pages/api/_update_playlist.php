<?php
header('Content-Type: application/json');
include "../_connection.php";

$sno = $_POST['sno'] ?? '';
$playlist = $_POST['playlist'] ?? '';

if ($sno === '') {
    echo json_encode(['status' => 'error', 'message' => 'Missing song ID']);
    exit;
}

$stmt = $conn->prepare("UPDATE song SET playlist = ? WHERE sno = ?");
$stmt->bind_param("si", $playlist, $sno);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => $conn->error]);
}
?>
