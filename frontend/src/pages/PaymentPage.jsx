import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreditCard, Lock, ArrowLeft } from 'lucide-react'

export default function PaymentPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [cardData, setCardData] = useState({
    number: '4111 1111 1111 1111',
    expiry: '12/28',
    cvv: '123',
    name: 'Antonio Mendoza'
  })

  const handlePayment = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      navigate('/success')
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/checkout')}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver
            </button>
            <div className="flex items-center">
              <Lock className="w-4 h-4 text-green-600 mr-2" />
              <span className="text-sm text-gray-600">Pago seguro</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Detalle de pagos</h2>
            
            {/* Payment Methods */}
            <div className="mb-6">
              <div className="flex space-x-4 mb-4">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center px-4 py-3 rounded-lg border-2 transition-all ${
                    paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  <span className="font-medium">Crédito o Débito</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex items-center px-4 py-3 rounded-lg border-2 transition-all ${
                    paymentMethod === 'upi' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img src="/assets/icons/upi.8804b1c0.svg" alt="UPI" className="w-5 h-5 mr-2" />
                  <span className="font-medium">UPI BCR</span>
                </button>
              </div>
              
              {/* Accepted Cards */}
              {paymentMethod === 'card' && (
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-sm text-gray-600">Nostros aceptamos:</span>
                  <img src="/assets/icons/visa.svg" alt="Visa" className="h-6" />
                  <img src="/assets/icons/mastercard.svg" alt="Mastercard" className="h-6" />
                  <img src="/assets/icons/amex.svg" alt="Amex" className="h-6" />
                </div>
              )}
              
              {/* UPI Options */}
              {paymentMethod === 'upi' && (
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-sm text-gray-600"> UPI Apps:</span>
                  <img src="/assets/icons/googlepay.svg" alt="Google Pay" className="h-6" />
                  <img src="/assets/icons/phonepe.svg" alt="PhonePe" className="h-6" />
                  <img src="/assets/icons/paytm.svg" alt="Paytm" className="h-6" />
                </div>
              )}
            </div>

            {/* Card Form */}
            {paymentMethod === 'card' && (
              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Número de tarjeta</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={cardData.number}
                      onChange={(e) => setCardData({...cardData, number: e.target.value})}
                      required
                    />
                    <img src="/assets/icons/creditcard.png" alt="Card" className="absolute right-3 top-1/2 transform -translate-y-1/2 h-6" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Fecha de expiracion</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={cardData.expiry}
                      onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">CVV</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-3 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={cardData.cvv}
                        onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
                        required
                      />
                      <img src="/assets/icons/cvv.png" alt="CVV" className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Nombre en la tarjeta</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={cardData.name}
                    onChange={(e) => setCardData({...cardData, name: e.target.value})}
                    required
                  />
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Procesando...
                    </div>
                  ) : (
                    `Pagar S/ 1333.00`
                  )}
                </button>
              </form>
            )}

            {/* UPI Form */}
            {paymentMethod === 'upi' && (
              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">UPI VPA</label>
                  <input
                    type="text"
                    placeholder="tuVPA@yape"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Pagar S/ 1333.00'}
                </button>
              </form>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Resumen</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Polo Premium</span>
                <span>S/ 1299.00</span>
              </div>
              <div className="flex justify-between">
                <span>Impuesto</span>
                <span>S/ 34</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>S/ 1333.00</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center text-sm text-green-700">
                <img src="/assets/icons/lock.png" alt="Secure" className="w-4 h-4 mr-2" />
                La informacion de pago es segura y encriptada
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}