<?php
// sync.php - cross-device slide sync endpoint
$file = __DIR__ . '/slide_sync.json';

if (isset($_GET['slide'])) {
    $slide = intval($_GET['slide']);
    if ($slide >= 1 && $slide <= 13) {
        file_put_contents($file, json_encode(['s' => $slide, 't' => time()]));
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');
        echo json_encode(['ok' => true]);
    } else {
        http_response_code(400);
        echo 'invalid slide';
    }
} else {
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Cache-Control: no-store');
    if (file_exists($file)) {
        echo file_get_contents($file);
    } else {
        echo json_encode(['s' => 1, 't' => 0]);
    }
}
