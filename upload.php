<?php
// Autoriser les en-têtes CORS si besoin (local ou test)
header("Access-Control-Allow-Origin: *");

$targetDir = "uploads/";
if (!is_dir($targetDir)) {
    mkdir($targetDir, 0777, true);
}

if (isset($_FILES["media"])) {
    $fileName = basename($_FILES["media"]["name"]);
    $targetFile = $targetDir . $fileName;

    $fileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
    $allowedTypes = ["jpg", "jpeg", "png", "gif", "mp4", "webm"];

    if (!in_array($fileType, $allowedTypes)) {
        echo json_encode(["error" => "Type de fichier non autorisé"]);
        exit;
    }

    if (move_uploaded_file($_FILES["media"]["tmp_name"], $targetFile)) {
        echo json_encode(["success" => true, "file" => $targetFile]);
    } else {
        echo json_encode(["error" => "Erreur lors de l’upload"]);
    }
} else {
    echo json_encode(["error" => "Aucun fichier reçu"]);
}
?>
