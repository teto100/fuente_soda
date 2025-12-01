<?php
class PaymentController {
    
    public function processPayment() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        // Simulate processing delay
        sleep(2);
        
        // Mock success/failure (85% success rate)
        $success = rand(1, 100) <= 85;
        
        if ($success) {
            echo json_encode([
                'status' => 'success',
                'transaction_id' => 'TXN' . time() . rand(1000, 9999),
                'amount' => $input['amount'] ?? 1533,
                'message' => 'Payment processed successfully'
            ]);
        } else {
            http_response_code(400);
            echo json_encode([
                'status' => 'failed',
                'error' => 'Payment failed. Please try again.',
                'error_code' => 'PAYMENT_DECLINED'
            ]);
        }
    }
    
    public function getPaymentMethods() {
        echo json_encode([
            'methods' => [
                [
                    'id' => 'card',
                    'name' => 'Credit/Debit Card',
                    'icon' => 'credit-card',
                    'enabled' => true
                ],
                [
                    'id' => 'upi',
                    'name' => 'UPI',
                    'icon' => 'smartphone',
                    'enabled' => true
                ],
                [
                    'id' => 'netbanking',
                    'name' => 'Net Banking',
                    'icon' => 'building',
                    'enabled' => true
                ],
                [
                    'id' => 'wallet',
                    'name' => 'Digital Wallet',
                    'icon' => 'wallet',
                    'enabled' => true
                ]
            ]
        ]);
    }
}
?>