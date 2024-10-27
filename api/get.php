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
    case "ls":
        $ra = eq($conn, "SELECT * FROM `admin`
                         WHERE `acc` = ?",
                         [$_GET["acc"]]);
        $rp = eq($conn, "SELECT * FROM `admin`
                         WHERE `pw` = ?",
                         [$_GET["pw"]]);
        echo $_SESSION["cn"] != $_GET["c"] ? "驗證碼錯誤" :
            (empty($ra) && empty($rp) ? "帳號和密碼錯誤" :
            (empty($ra) ? "帳號錯誤" :
            (empty($rp) ? "密碼錯誤" : 1)));
        break;
}