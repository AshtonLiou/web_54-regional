<?php

header("Content-type: image/png");

session_start();

$number = rand(1000, 9999);
$image = imagecreate(100, 40);
$backgroundColor = imagecolorallocate($image, 250, 250, 250);
$textColor = imagecolorallocate($image, 0, 0, 0);

imagefill($image, 0, 0, $backgroundColor);
imagestring($image, 5, 32.5, 13, $number, $textColor);
imagepng($image, "../img/captcha-image.png");
imagedestroy($image);

$_SESSION["captchaNumber"] = $number;