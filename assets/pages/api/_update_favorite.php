<?php
include "../_connection.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $sno = $_POST['sno'] ?? null;
    $favorite = $_POST['favorite'] ?? null;

    if ($sno !== null && $favorite !== null) {
        $favorite = $favorite == 1 ? 1 : 0;

        $stmt = $conn->prepare("UPDATE song SET favorite = ? WHERE sno = ?");
        $stmt->bind_param("ii", $favorite, $sno);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Update failed"]);
        }

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid input"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
}
?>
