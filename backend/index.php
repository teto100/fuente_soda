<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Simple router
$request = $_SERVER['REQUEST_URI'];
$path = parse_url($request, PHP_URL_PATH);

switch ($path) {
    case '/api/payment/process':
        require_once 'controllers/PaymentController.php';
        $controller = new PaymentController();
        $controller->processPayment();
        break;
    
    case '/api/payment/methods':
        require_once 'controllers/PaymentController.php';
        $controller = new PaymentController();
        $controller->getPaymentMethods();
        break;
    
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Not found']);
        break;
}
?>