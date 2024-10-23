<?php

include_once "./db.php";

function executeChange($conn, $query, $params = []) {
    $stmt = $conn->prepare($query);
    $stmt->execute($params);
}

switch ($_POST["mode"]) {
    case "addMessageForm":
        executeChange($conn, "INSERT INTO `message`(`name`, `email`, `telephone`, `message-serial-number`, `content`, `image`)
                              VALUE (?, ?, ?, ?, ?, ?)",
                              [$_POST["name"], $_POST["email"], $_POST["telephone"], $_POST["message-serial-number"], $_POST["content"], $_POST["image"]]);
        break;

    case "editMessageForm":
        $showEmail = $_POST["showEmail"] ?? NULL;
        $showTelephone = $_POST["showTelephone"] ?? NULL;
        executeChange($conn, "UPDATE `message`
                              SET `name` = ?, `email` = ?, `telephone` = ?, `content` = ?, `edit-time` = NOW(), `show-email` = ?, `show-telephone` = ?
                              WHERE `id` = ?",
                              [$_POST["name"], $_POST["email"], $_POST["telephone"], $_POST["content"], $showEmail, $showTelephone, $_POST["id"]]);
        break;

    case "visitorDeleteMessage":
        executeChange($conn, "UPDATE `message`
                              SET `delete-time` = NOW()
                              WHERE `id` = ?",
                              [$_POST["id"]]);
        break;

    case "managerDeleteMessageForm":
        executeChange($conn, "DELETE FROM `message`
                              WHERE `id` = ?",
                              [$_POST["id"]]);
        break;

    case "pinMessage":
        executeChange($conn, "UPDATE `message`
                              SET `pin` = true
                              WHERE `id` = ?",
                              [$_POST["id"]]);
        break;

    case "unpinMessage":
        executeChange($conn, "UPDATE `message`
                              SET `pin` = NULL
                              WHERE `id` = ?",
                              [$_POST["id"]]);
        break;

    case "hideMessage":
        executeChange($conn, "UPDATE `message`
                              SET `hide` = true
                              WHERE `id` = ?",
                              [$_POST["id"]]);
        break;

    case "unhideMessage":
        executeChange($conn, "UPDATE `message`
                              SET `hide` = NULL
                              WHERE `id` = ?",
                              [$_POST["id"]]);
        break;

    case "replyVisitorMessage":
        executeChange($conn, "UPDATE `message`
                              SET `reply` = ?
                              WHERE `id` = ?",
                              [$_POST["reply"], $_POST["id"]]);
        break;
}