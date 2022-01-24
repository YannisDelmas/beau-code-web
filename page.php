<?php

header('Content-Type: text/html; charset=utf-8');
require_once 'vendor/autoload.php';
$twig = new \Twig\Environment(new \Twig\Loader\FilesystemLoader('.'));
$twig->addFilter(new \Twig\TwigFilter('glob', 'glob'));
$twig->createTemplate($template)->display(is_array($env)?$env:[]);