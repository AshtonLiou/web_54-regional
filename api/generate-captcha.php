<?php
header("Content-type: image/png");
session_start();
$n = rand(1000, 9999);
$i = imagecreate(100, 40);
$b=  imagecolorallocate($i, 250, 250, 250);
$t = imagecolorallocate($i, 0, 0, 0);
imagefill($i, 0, 0, $b);
imagestring($i, 5, 32.5, 13, $n, $t);
image($image, "../img/captcha-image.png");
$_SESSION["cn"] = $n;