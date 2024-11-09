<?php
include_once "./db.php";
header("Content-Type: application/json");
session_start();
function eq($conn, $query, $p = []) {
    $stmt = $conn->prepare($query);
    $stmt->execute($p);
    return $stmt->fetchAll(2);
}
switch ($_GET["m"]) {
    case "vl":
        $ra = eq($conn, "SELECT * FROM `admin`
                         WHERE `account` = ?",
                         [$_GET["account"]]);
        $rp = eq($conn, "SELECT * FROM `admin`
                         WHERE `password` = ?",
                         [$_GET["password"]]);
        echo $_SESSION["cn"] != $_GET["captcha"] ? "驗證碼錯誤" :
            (empty($ra) && empty($rp) ? "帳號和密碼錯誤" :
            (empty($ra) ? "帳號錯誤" :
            (empty($rp) ? "密碼錯誤" : 1)));
        break;
    case "gmd":
        $r = eq($conn, "SELECT * FROM `message`
                        ORDER BY
                            CASE
                                WHEN `pin` = true THEN 0
                                ELSE 1
                            END,
                            `id` DESC");
        echo json_encode($r);
        break;
    case "gc":
        $r = eq($conn, "SELECT `room` FROM `booking-date`
                        WHERE `date` = ?",
                        [$_GET["date"]]);
        $lc = array_map(fn($room) => substr($room, -1), array_column($r, "room"));
        echo json_encode(array_values(array_diff(range(1, 8), $lc)));
        break;
}