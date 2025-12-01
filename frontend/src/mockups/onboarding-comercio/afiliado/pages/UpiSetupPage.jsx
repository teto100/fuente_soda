import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building, ArrowRight, CheckCircle, Clock, CreditCard } from 'lucide-react'
import '../../../../styles/colors.css'

export default function UpiSetupPage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)

  const steps = [
    { id: 1, title: 'Verificación', icon: Building, status: 'current' },
    { id: 2, title: 'Activación', icon: CheckCircle, status: 'pending' }
  ]

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
    } else {
      navigate('/onboarding-comercio/afiliado')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">Creación de UPI VPA</h1>
                <p className="text-sm text-gray-600">Configuración de dirección de pago UPI</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/onboarding-comercio/afiliado')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
            >
              ← Panel Principal
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
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                    Paso {step.id}
                  </p>
                  <p className={`text-xs ${isActive ? 'text-blue-700' : 'text-gray-400'}`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    step.id < currentStep ? 'bg-blue-600' : 'bg-gray-300'
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Verificación de Comercio Afiliado</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800 text-sm">
                  <strong>Proceso simplificado:</strong> Como comercio afiliado, solo necesitamos verificar tu identidad y confirmar los datos preestablecidos.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Código de Afiliado</label>
                  <input 
                    type="text" 
                    placeholder="AF-123456"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">DNI del Representante</label>
                  <input 
                    type="text" 
                    placeholder="12345678"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Correo de Confirmación</label>
                  <input 
                    type="email" 
                    placeholder="representante@empresa.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">Datos Preconfigurados</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-green-700">Razón Social: EMPRESA AFILIADA SAC</p>
                    <p className="text-green-700">RUC: 20987654321</p>
                  </div>
                  <div>
                    <p className="text-green-700">Cuenta Bancaria: Preconfigurada</p>
                    <p className="text-green-700">Límites: Establecidos</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">¡UPI VPA Creado Exitosamente!</h2>
              <p className="text-gray-600 mb-8">
                Tu dirección de pago UPI ha sido configurada y está lista para usar.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-4">Información UPI VPA</h3>
                <div className="grid grid-cols-1 gap-4 text-left">
                  <div>
                    <p className="text-sm text-blue-700">UPI VPA:</p>
                    <p className="font-mono text-blue-900 text-lg">empresa.afiliada@upi</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-700">QR Code:</p>
                    <div className="w-32 h-32 bg-white border-2 border-blue-200 rounded-lg flex items-center justify-center mx-auto mt-2">
                      <span className="text-blue-600 text-xs">QR UPI</span>
                    </div>
                  </div>
                </div>
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
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
            >
              {currentStep === 2 ? 'Finalizar' : 'Verificar'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}