<?php
include_once "./db.php";
function ec($conn, $query, $p = []) {
    $stmt = $conn->prepare($query);
    $stmt->execute($p);
}

switch ($_POST["m"]) {
    case "am":
        ec($conn, "INSERT INTO `message`(`name`, `email`, `telephone`, `message-serial-number`, `content`, `image`)
                   VALUES (?, ?, ?, ?, ?, ?)",
                   [$_POST["name"], $_POST["email"], $_POST["telephone"], $_POST["message-serial-number"], $_POST["content"], $_POST["image"]]);
        break;
}