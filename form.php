<?php

$ra = rand(1, 2);

if ($ra == 1) {
    header("Location: form_fail.html");
} else {
    header("Location: form_ok.html");
}

exit;
