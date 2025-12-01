import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, User } from 'lucide-react'

export default function CrearVPAPage() {
  const navigate = useNavigate()
  const [selectedVPA, setSelectedVPA] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const vpaOptions = [
    '99999999@yape',
    'antonio.mendoza@yape',
    'antoniomendoza@yape',
    'a.mendoza@yape',
    'mendoza.antonio@yape'
  ]

  const handleCreateVPA = () => {
    if (selectedVPA) {
      setShowSuccess(true)
      setTimeout(() => {
        navigate('/consentimiento-usuarios/home')
      }, 2000)
    }
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold">Y</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Crear UPI BCR</h1>
                  <p className="text-sm text-gray-600">Configuración de VPA</p>
                </div>
              </div>
              <button 
                onClick={() => navigate('/home')}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
              >
                ← Centro de Mockups
              </button>
            </div>
          </div>
        </header>
        
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-8">
          <div className="w-full max-w-sm bg-black rounded-3xl p-2 shadow-2xl">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl overflow-hidden h-[700px] relative flex items-center justify-center">
              <div className="bg-white rounded-2xl p-8 mx-4 text-center max-w-xs">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">¡VPA Creado!</h2>
                <p className="text-gray-600 mb-4">Tu VPA {selectedVPA} ha sido creado exitosamente</p>
                <div className="animate-spin w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
                <h1 className="text-2xl font-bold text-gray-900">Crear UPI BCR</h1>
                <p className="text-sm text-gray-600">Configuración de VPA</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/home')}
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
              <div className="flex items-center">
                <button 
                  onClick={() => navigate('/consentimiento-usuarios/home')}
                  className="mr-4 text-white hover:text-white/80"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold text-white">Crear UPI BCR</h1>
              </div>
            </div>

            {/* Content */}
            <div className="px-4 py-6 overflow-y-auto h-[calc(100%-120px)]">
        {/* Onboarding Simulation */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Configuración Completada</h2>
            <p className="text-gray-600">Onboarding UPI BCR finalizado para Antonio Mendoza</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <Check className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-green-800 font-medium">Verificación de identidad completada</span>
            </div>
          </div>
        </div>

        {/* VPA Selection */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Elige tu VPA</h3>
          <p className="text-gray-600 mb-6">Selecciona tu dirección de pago virtual (VPA)</p>

          <div className="space-y-3">
            {vpaOptions.map((vpa, index) => (
              <button
                key={vpa}
                onClick={() => setSelectedVPA(vpa)}
                className={`w-full p-4 rounded-xl border-2 transition-all ${
                  selectedVPA === vpa
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">{vpa}</p>
                    {index === 0 && (
                      <p className="text-sm text-gray-500">Basado en tu número</p>
                    )}
                  </div>
                  {selectedVPA === vpa && (
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={handleCreateVPA}
            disabled={!selectedVPA}
            className={`w-full mt-6 py-4 rounded-xl font-semibold transition-colors ${
              selectedVPA
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Crear VPA
          </button>
        </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}