<?php
session_start();
session_destroy();
header("Location: ../clientside/index.html");
?>