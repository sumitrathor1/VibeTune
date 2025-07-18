<?php
header('Content-Type: application/json');
include "../_connection.php";

// Validate request method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
    exit;
}

// Get song ID from POST
$sno = $_POST['sno'] ?? '';
if (!$sno) {
    echo json_encode(['status' => 'error', 'message' => 'Missing song ID']);
    exit;
}

// Step 1: Fetch file paths from DB
$stmt = $conn->prepare("SELECT songUrl, coverUrl FROM song WHERE sno = ?");
$stmt->bind_param("i", $sno);
$stmt->execute();
$result = $stmt->get_result();
$song = $result->fetch_assoc();

if (!$song) {
    echo json_encode(['status' => 'error', 'message' => 'Song not found']);
    exit;
}

// Step 2: Resolve file paths and delete
$songDeleted = false;
$coverDeleted = false;

$songPath = realpath($_SERVER['DOCUMENT_ROOT'] . '/VibeTune/' . $song['songUrl']);
$coverPath = realpath($_SERVER['DOCUMENT_ROOT'] . '/VibeTune/' . $song['coverUrl']);

if ($songPath && file_exists($songPath)) {
    $songDeleted = unlink($songPath);
}
if ($coverPath && file_exists($coverPath)) {
    $coverDeleted = unlink($coverPath);
}

// If any file couldn't be deleted
if (!$songDeleted || !$coverDeleted) {
    echo json_encode(['status' => 'error', 'message' => 'File deletion failed']);
    exit;
}

// Step 3: Delete song from DB
$stmt = $conn->prepare("DELETE FROM song WHERE sno = ?");
$stmt->bind_param("i", $sno);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Song deleted successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Database delete failed']);
}
?>