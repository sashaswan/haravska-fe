<?php

$recepient = "info@haravska.com";
$sitename = "HARAVSKA";

$name = trim($_POST["name"]);
$email = trim($_POST["email"]);
$message = trim($_POST["message"]);
$text = trim($_POST["text"]);
$message = "Name: $name \nE-mail: $email \nText: $message";

$pagetitle = "NEW MESSAGE \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
