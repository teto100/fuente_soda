import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, ArrowRight, CheckCircle, CreditCard } from 'lucide-react'
import '../../../../../styles/colors.css'

export default function MicroOnboardingHomePage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)

  const steps = [
    { id: 1, title: 'Información Básica', icon: Home, status: 'current' },
    { id: 2, title: 'Activación Inmediata', icon: CheckCircle, status: 'pending' }
  ]

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
    } else {
      navigate('/onboarding-comercio/micro/success')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">Onboarding Micro</h1>
                <p className="text-sm text-gray-600">Microempresas y emprendimientos</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/onboarding-comercio')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
            >
              ← Seleccionar Segmento
            </button>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            const isActive = step.id <= currentStep
            
            return (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                  isActive 
                    ? 'bg-purple-600 border-purple-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${isActive ? 'text-purple-600' : 'text-gray-500'}`}>
                    Paso {step.id}
                  </p>
                  <p className={`text-xs ${isActive ? 'text-purple-700' : 'text-gray-400'}`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    step.id < currentStep ? 'bg-purple-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            )
          })}
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Registro Rápido - Microempresa</h2>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                <p className="text-purple-800 text-sm">
                  <strong>Contacto:</strong> Solo dueño | 
                  <strong> Canal:</strong> WhatsApp únicamente | 
                  <strong> Validación:</strong> Solo biometría facial | 
                  <strong>Activación:</strong> Inmediata
                </p>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Emprendimiento</label>
                    <input 
                      type="text" 
                      placeholder="Comida Casera Mary"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">DNI del Dueño</label>
                    <input 
                      type="text" 
                      placeholder="12345678"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Dueño</label>
                    <input 
                      type="text" 
                      placeholder="María Rodríguez"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
                    <input 
                      type="tel" 
                      placeholder="+51 999 123 456"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Emprendimiento</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>Comida casera</option>
                    <option>Venta por catálogo</option>
                    <option>Servicios de belleza</option>
                    <option>Artesanías</option>
                    <option>Repostería</option>
                    <option>Otro</option>
                  </select>
                </div>

                {/* Simplified Bank Info */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-900 mb-3">Información Bancaria (Opcional)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-yellow-700 mb-1">Banco</label>
                      <select className="w-full px-3 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm">
                        <option>Seleccionar (opcional)</option>
                        <option>BCP</option>
                        <option>BBVA</option>
                        <option>Banco de la Nación</option>
                        <option>Yape</option>
                        <option>Plin</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-yellow-700 mb-1">Número de Cuenta/Celular</label>
                      <input 
                        type="text" 
                        placeholder="999123456 o 191-123456789"
                        className="w-full px-3 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-yellow-700 mt-2">
                    Puedes agregar esta información después para recibir pagos
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">¡Emprendimiento Activado!</h2>
              <p className="text-gray-600 mb-8">
                Tu microempresa ha sido activada inmediatamente. Proceso ultra-simplificado completado.
              </p>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="font-semibold text-purple-900 mb-4">Próximos pasos:</h3>
                <ul className="text-left text-purple-800 space-y-2 text-sm">
                  <li>• Configura tu información bancaria cuando estés listo</li>
                  <li>• Comparte tu enlace de pago por WhatsApp</li>
                  <li>• Comienza a recibir pagos de inmediato</li>
                </ul>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button 
              onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
              className={`px-6 py-2 rounded-lg transition-colors ${
                currentStep > 1 
                  ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
                  : 'bg-gray-50 text-gray-400 cursor-not-allowed'
              }`}
              disabled={currentStep === 1}
            >
              Anterior
            </button>
            <button 
              onClick={handleNext}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
            >
              {currentStep === 2 ? 'Finalizar' : 'Activar Ahora'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}