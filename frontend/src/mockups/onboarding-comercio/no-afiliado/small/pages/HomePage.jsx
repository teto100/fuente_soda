import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingBag, ArrowRight, CheckCircle, CreditCard } from 'lucide-react'
import '../../../../../styles/colors.css'

export default function SmallOnboardingHomePage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)

  const steps = [
    { id: 1, title: 'Información Básica', icon: ShoppingBag, status: 'current' },
    { id: 2, title: 'Validación Bancaria', icon: CreditCard, status: 'pending' },
    { id: 3, title: 'Activación', icon: CheckCircle, status: 'pending' }
  ]

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      navigate('/onboarding-comercio/small/success')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center mr-3">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">Onboarding Small</h1>
                <p className="text-sm text-gray-600">Pequeñas empresas y comercios locales</p>
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            const isActive = step.id <= currentStep
            
            return (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                  isActive 
                    ? 'bg-orange-600 border-orange-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${isActive ? 'text-orange-600' : 'text-gray-500'}`}>
                    Paso {step.id}
                  </p>
                  <p className={`text-xs ${isActive ? 'text-orange-700' : 'text-gray-400'}`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    step.id < currentStep ? 'bg-orange-600' : 'bg-gray-300'
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Información Básica - Negocio Small</h2>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <p className="text-orange-800 text-sm">
                  <strong>Contacto:</strong> Dueño o cajero | 
                  <strong> Canales:</strong> Correo + WhatsApp | 
                  <strong> Validación:</strong> Solo biometría facial
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Negocio</label>
                  <input 
                    type="text" 
                    placeholder="Bodega San Martín"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">RUC</label>
                  <input 
                    type="text" 
                    placeholder="10123456789"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dueño/Cajero</label>
                  <input 
                    type="text" 
                    placeholder="Juan Pérez"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
                  <input 
                    type="tel" 
                    placeholder="+51 999 888 777"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Correo (Opcional)</label>
                  <input 
                    type="email" 
                    placeholder="bodega@gmail.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Negocio</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option>Bodega/Minimarket</option>
                    <option>Restaurante pequeño</option>
                    <option>Tienda de ropa</option>
                    <option>Farmacia</option>
                    <option>Ferretería</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Validación de Cuenta Personal/Negocio</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">DNI del Dueño</label>
                  <input 
                    type="text" 
                    placeholder="12345678"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Banco</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option>BCP</option>
                    <option>BBVA</option>
                    <option>Interbank</option>
                    <option>Banco de la Nación</option>
                    <option>Caja Huancayo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Cuenta</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option>Ahorros</option>
                    <option>Corriente</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Número de Cuenta</label>
                  <input 
                    type="text" 
                    placeholder="191-123456789-0-12"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">¡Negocio Activado!</h2>
              <p className="text-gray-600 mb-8">
                Tu negocio pequeño ha sido verificado y activado. Proceso simplificado completado.
              </p>
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
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
            >
              {currentStep === 3 ? 'Finalizar' : 'Siguiente'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}