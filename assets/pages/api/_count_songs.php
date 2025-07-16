<?php
header('Content-Type: application/json');  // <- REQUIRED for correct JSON response

include "../_connection.php";

if($_POST['type'] == 'all') {
    $sql = "SELECT COUNT(*) AS total FROM song";
    $result = $conn->query($sql);

    if ($result) {
        $row = $result->fetch_assoc();
        echo json_encode(['total' => (int)$row['total']]); 
        exit();
    } else {
        echo json_encode(['total' => 0]);
        exit();
    }
}

if($_POST['type'] == 'favorite') {
    $sql = "SELECT COUNT(*) AS total_favorites FROM song WHERE favorite = 1";
    $result = $conn->query($sql);

    if ($result) {
        $row = $result->fetch_assoc();
        echo json_encode(['total_favorites' => (int)$row['total_favorites']]); 
        exit();
    } else {
        echo json_encode(['total' => 0]);
        exit(); 
    }
}
?>