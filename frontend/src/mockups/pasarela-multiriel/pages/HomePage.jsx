import { useNavigate } from 'react-router-dom'
import { CreditCard, Smartphone, Wallet, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import LoadingTransition from '../components/LoadingTransition'
import '../../../styles/colors.css'

export default function HomePage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = () => {
    setIsLoading(true)
    setTimeout(() => {
      navigate('/pasarela-multiriel/checkout')
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">Tienda Zaara</h1>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/home')}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
              >
                ← Centro de Mockups
              </button>
              <button className="relative p-2 hover:bg-gray-100 rounded-full">
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">1</span>
              </button>
              <button className="btn-secondary">Login</button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Tenemos todas las tallas y colores
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Aceptamos TODAS los formas pagos de manera segura y rápida
          </p>
        </div>

        {/* Main Content - Layout Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Payment Methods - Izquierda en desktop, abajo en mobile */}
          <div className="order-2 lg:order-1">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
              <h3 className="text-2xl font-bold mb-6 text-blue-900">Métodos de Pago</h3>
              <div className="space-y-4">
                
                {/* Tarjetas */}
                <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-2">
                      <img src="/assets/icons/visa.svg" alt="Visa" className="h-6 w-6 object-contain" />
                      <img src="/assets/icons/mastercard.svg" alt="Mastercard" className="h-6 w-6 object-contain" />
                      <img src="/assets/icons/amex.svg" alt="Amex" className="h-6 w-6 object-contain" />
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-800">Tarjetas</h4>
                      <p className="text-sm text-gray-600">Visa, Mastercard, Amex</p>
                    </div>
                  </div>
                </div>
                
                {/* UPI */}
                <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-2">
                      <img src="/assets/icons/googlepay.svg" alt="Google Pay" className="h-6 w-6 object-contain" />
                      <img src="/assets/img/yape.png" alt="Yape" className="h-6 w-6 object-contain" />
                      <img src="/assets/img/plin.jpeg" alt="Plin" className="h-6 w-6 object-contain" />
                      <img src="/assets/img/bim.jpeg" alt="BIM" className="h-6 w-6 object-contain" />
                      <img src="/assets/img/ligo.jpeg" alt="Ligo" className="h-6 w-6 object-contain" />
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-800">UPI BCR</h4>
                      <p className="text-sm text-gray-600">GooglePay, Yape, Plin, BIM, Ligo</p>
                    </div>
                  </div>
                </div>
                
                {/* Wallets */}
                <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-2">
                      <img src="/assets/img/yape.png" alt="Yape" className="h-6" />
                      <img src="/assets/img/revolut.jpeg" alt="Revolut" className="h-6" />
                      <img src="/assets/img/plin.jpeg" alt="Plin" className="h-6" />
                      <img src="/assets/img/bipay.jpeg" alt="Bipay" className="h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-800">Billeteras</h4>
                      <p className="text-sm text-gray-600">Yape, Revolut, Plin, Bipay</p>
                    </div>
                  </div>
                </div>
                
                {/* Transferencia Bancaria */}
                <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-2">
                      <img src="/assets/img/bcp.jpg" alt="BCP" className="h-6" />
                      <img src="/assets/img/bbva.png" alt="BBVA" className="h-6" />
                      <img src="/assets/img/ibk.jpg" alt="IBK" className="h-6" />
                      <img src="/assets/img/scotia.jpg" alt="Scotiabank" className="h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-800">Transferencia bancaria</h4>
                      <p className="text-sm text-gray-600">BCP, BBVA, IBK, Scotiabank</p>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>

          {/* Demo Product - Derecha en desktop, arriba en mobile */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md mx-auto lg:max-w-none">
              <img 
                src="/assets/img/polonegro.jpeg" 
                alt="Polo Premium" 
                className="w-full h-64 object-contain bg-gray-50"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Polo Premium</h3>
                <p className="text-gray-600 mb-4">Polo de diseño moderno</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-primary">S/ 1299.00</span>
                  <span className="text-sm text-gray-500">Envio Gratis</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-primary hover:bg-primary text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Comprar ahora
                </button>
              </div>
            </div>
          </div>
          
        </div>


      </main>
      <LoadingTransition isVisible={isLoading} message="Procesando..." />
    </div>
  )
}