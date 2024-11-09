<?php
include_once "./db.php";
function ec($conn, $query, $p = []) {
    $stmt = $conn->prepare($query);
    $stmt->execute($p);
}
switch ($_POST["m"]) {
    case "am":
        ec($conn, "INSERT INTO `message`(`name`, `email`, `telephone`, `message_serial_number`, `content`, `image`)
                   VALUES (?, ?, ?, ?, ?, ?)",
                   [$_POST["name"], $_POST["email"], $_POST["telephone"], $_POST["message-serial-number"], $_POST["content"], $_POST["image"]]);
        break;
    case "em":
        $showEmail = $_POST["show-email"] ?? NULL;
        $showTelephone = $_POST["show-telephone"] ?? NULL;
        ec($conn, "UPDATE `message`
                   SET `name` = ?, `email` = ?, `telephone` = ?, `content` = ?, `edit_time` = NOW(), `show_email` = ?, `show_telephone` = ?
                   WHERE `id` = ?",
                   [$_POST["name"], $_POST["email"], $_POST["telephone"], $_POST["content"], $showEmail, $showTelephone, $_POST["id"]]);
        break;
    case "udm":
        ec($conn, "UPDATE `message`
                   SET `delete_time` = NOW()
                   WHERE `id` = ?",
                   [$_POST["id"]]);
        break;
    case "dm":
        ec($conn, "DELETE FROM `message`
                   WHERE `id` = ?",
                   [$_POST["id"]]);
        break;
    case "pm":
        ec($conn, "UPDATE `message`
                   SET `pin` = true
                   WHERE `id` = ?",
                   [$_POST["id"]]);
        break;
    case "unpm":
        ec($conn, "UPDATE `message`
                   SET `pin` = NULL
                   WHERE `id` = ?",
                   [$_POST["id"]]);
        break;
    case "hm":
        ec($conn, "UPDATE `message`
                   SET `hide` = true
                   WHERE `id` = ?",
                   [$_POST["id"]]);
        break;
    case "unhm":
        ec($conn, "UPDATE `message`
                   SET `hide` = NULL
                   WHERE `id` = ?",
                   [$_POST["id"]]);
        break;
    case "rm":
        ec($conn, "UPDATE `message`
                   SET `reply` = ?
                   WHERE `id` = ?",
                   [$_POST["reply"], $_POST["id"]]);
        break;
}