<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $dni = $input['dni'] ?? '';
    $ruc = $input['ruc'] ?? '';
    $banco = $input['banco'] ?? '';
    $tipoCuenta = $input['tipoCuenta'] ?? '';
    $numeroCuenta = $input['numeroCuenta'] ?? '';
    
    // Simulate validation delay
    sleep(2);
    
    // Mock validation logic (85% success rate)
    $isValid = rand(1, 100) <= 85;
    
    if ($isValid) {
        echo json_encode([
            'success' => true,
            'message' => 'Cuenta bancaria validada exitosamente',
            'data' => [
                'dni' => $dni,
                'ruc' => $ruc,
                'banco' => $banco,
                'tipoCuenta' => $tipoCuenta,
                'numeroCuenta' => substr($numeroCuenta, 0, 4) . '****' . substr($numeroCuenta, -4),
                'titular' => 'EMPRESA DEMO SAC',
                'estado' => 'ACTIVA'
            ]
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'No se pudo validar la cuenta bancaria. Verifique los datos ingresados.',
            'error' => 'INVALID_ACCOUNT_DATA'
        ]);
    }
} else {
    echo json_encode(['error' => 'Método no permitido']);
}
?>