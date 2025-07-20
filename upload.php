<?php
$allowed = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm'];
$uploadDir = 'uploads/';
$mediaFile = 'media.json';

if (!isset($_FILES['media'])) {
  echo json_encode(['success' => false, 'message' => 'Aucun fichier reçu.']);
  exit;
}

$file = $_FILES['media'];
$type = mime_content_type($file['tmp_name']);
$ext = pathinfo($file['name'], PATHINFO_EXTENSION);
$name = uniqid() . '.' . $ext;

if (!in_array($type, $allowed)) {
  echo json_encode(['success' => false, 'message' => 'Type de fichier non autorisé.']);
  exit;
}

if (!move_uploaded_file($file['tmp_name'], $uploadDir . $name)) {
  echo json_encode(['success' => false, 'message' => 'Erreur d’upload.']);
  exit;
}

$newEntry = [
  'type' => strpos($type, 'video') !== false ? 'video' : 'image',
  'file' => $uploadDir . $name
];

$data = file_exists($mediaFile) ? json_decode(file_get_contents($mediaFile), true) : [];
$data[] = $newEntry;
file_put_contents($mediaFile, json_encode($data, JSON_PRETTY_PRINT));

echo json_encode(['success' => true]);

