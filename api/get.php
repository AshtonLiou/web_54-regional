<?php

include_once "./db.php";

header("Content-Type: application/json");

session_start();

function executeQuery($conn, $query, $params = []) {
    $stmt = $conn->prepare($query);
    $stmt->execute($params);
    return $stmt->fetchAll(2);
}

switch ($_GET["mode"]) {
    case "verificationLoginData":
        $resultAccount = executeQuery($conn, "SELECT * FROM `admin`
                                              WHERE `account` = ?", [$_GET["account"]]);
        $resultPassword = executeQuery($conn, "SELECT * FROM `admin`
                                               WHERE `password` = ?", [$_GET["password"]]);

        echo empty($resultAccount) && empty($resultPassword) ? "帳號和密碼有誤" :
            (empty($resultAccount) ? "帳號有誤" :
            (empty($resultPassword) ? "密碼有誤" : "登入成功"));
        break;
    
    case "verificationCaptchaNumber":
        echo $_SESSION["captchaNumber"] == $_GET["number"] ? 1 : 0;
        break;

    case "getVisitorMessageData":
        $result = executeQuery($conn, "SELECT * FROM `message`
                                       ORDER BY
                                       CASE WHEN `pin` = true THEN 0 ELSE 1 END,
                                       `id` DESC");
        echo json_encode($result);
        break;

    case "getBookingData":
        $result = executeQuery($conn, "SELECT * FROM `booking-date`");
        echo json_encode($result);
        break;

    case "getBookingDayData":
        $result = executeQuery($conn, "SELECT `room` FROM `booking-date`
                                       WHERE `date` = ?",
                                       [$_GET["date"]]);
        $lastChars = array_map(fn($room) => substr($room, -1), array_column($result, "room"));
        echo json_encode(array_values(array_diff(range(1, 8), $lastChars)));
        break;
}