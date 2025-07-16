<?php
header('Content-Type: application/json');  // <- REQUIRED for correct JSON response

include "../_connection.php";

$sql = "SELECT COUNT(*) AS total FROM song WHERE favorite = 1";
$result = $conn->query($sql);

if ($result) {
    $row = $result->fetch_assoc();
    echo json_encode(['total' => (int)$row['total']]); // Cast to int (optional but safer)
} else {
    echo json_encode(['total' => 0]);
}
?>