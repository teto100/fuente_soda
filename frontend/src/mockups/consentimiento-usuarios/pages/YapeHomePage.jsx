import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Smartphone, Plus, CreditCard, ArrowRight } from 'lucide-react'
import '../../../styles/colors.css'

export default function YapeHomePage() {
  const navigate = useNavigate()
  const [showUPIOptions, setShowUPIOptions] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold">Y</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Consentimiento Usuarios - Yape</h1>
                <p className="text-sm text-gray-600">Simulación de flujo UPI BCR</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
            >
              ← Centro de Mockups
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Simulator */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-8">
        <div className="w-full max-w-sm bg-black rounded-3xl p-2 shadow-2xl">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl overflow-hidden h-[700px] relative">
            {/* Status Bar */}
            <div className="flex justify-between items-center px-6 py-2 text-white text-xs">
              <span>9:41</span>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-2 border border-white rounded-sm">
                  <div className="w-3 h-1 bg-white rounded-sm m-0.5"></div>
                </div>
              </div>
            </div>
            
            {/* App Header */}
            <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-bold text-sm">Y</span>
                  </div>
                  <h1 className="text-xl font-bold text-white">Yape</h1>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-4 py-6 overflow-y-auto h-[calc(100%-120px)]">
        {/* Balance Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20">
          <div className="text-center">
            <p className="text-white/80 text-sm mb-2">Tu saldo disponible</p>
            <h2 className="text-3xl font-bold text-white mb-4">S/ 1,250.00</h2>
            <div className="flex space-x-3">
              <button className="flex-1 bg-white text-purple-600 py-3 rounded-xl font-semibold">
                Yapear
              </button>
              <button className="flex-1 bg-white/20 text-white py-3 rounded-xl font-semibold">
                Recargar
              </button>
            </div>
          </div>
        </div>

        {/* UPI BCR Section */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">UPI BCR</h3>
                <p className="text-sm text-gray-600">Pagos instantáneos</p>
              </div>
            </div>
            <button 
              onClick={() => setShowUPIOptions(!showUPIOptions)}
              className="text-blue-600 hover:text-blue-700"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {showUPIOptions && (
            <div className="space-y-3 mt-4 pt-4 border-t border-gray-200">
              <button 
                onClick={() => navigate('/consentimiento-usuarios/crear-vpa')}
                className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <Plus className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Crear UPI BCR</p>
                    <p className="text-sm text-gray-600">Configura tu VPA</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>

              <button 
                onClick={() => navigate('/consentimiento-usuarios/asociar-cuenta')}
                className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                    <CreditCard className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Asociar Cuenta</p>
                    <p className="text-sm text-gray-600">Vincula tu banco</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          )}
        </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">📱</span>
                    </div>
                    <p className="text-white font-semibold text-sm">Pagar con QR</p>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">💳</span>
                    </div>
                    <p className="text-white font-semibold text-sm">Mis Tarjetas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}