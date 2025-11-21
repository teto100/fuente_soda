import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Store, ArrowRight, CheckCircle, Clock, FileText, CreditCard, Building2 } from 'lucide-react'
import '../../../../../styles/colors.css'

export default function LargeOnboardingHomePage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)

  const steps = [
    { id: 1, title: 'Información Básica', icon: Store, status: 'current' },
    { id: 2, title: 'Validación Bancaria', icon: CreditCard, status: 'pending' },
    { id: 3, title: 'Documentos', icon: FileText, status: 'pending' },
    { id: 4, title: 'Verificación', icon: Clock, status: 'pending' },
    { id: 5, title: 'Activación', icon: CheckCircle, status: 'pending' }
  ]

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    } else {
      navigate('/onboarding-comercio/no-afiliado/large/success')
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
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">Onboarding Large</h1>
                <p className="text-sm text-gray-600">Empresas grandes con operaciones complejas</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/onboarding-comercio/no-afiliado')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
            >
              ← Seleccionar Segmento
            </button>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            const isActive = step.id <= currentStep
            
            return (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                  isActive 
                    ? 'bg-primary border-primary text-white' 
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${isActive ? 'text-primary' : 'text-gray-500'}`}>
                    Paso {step.id}
                  </p>
                  <p className={`text-xs ${isActive ? 'text-secondary' : 'text-gray-400'}`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    step.id < currentStep ? 'bg-primary' : 'bg-gray-300'
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Información Básica - Empresa Large</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800 text-sm">
                  <strong>Contacto:</strong> Jefe de operaciones | 
                  <strong> Canal:</strong> Correo electrónico | 
                  <strong> Validación:</strong> Biometría facial + Vigencia de poderes
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Razón Social</label>
                  <input 
                    type="text" 
                    placeholder="CORPORACIÓN EMPRESARIAL SAC"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">RUC</label>
                  <input 
                    type="text" 
                    placeholder="20123456789"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Jefe de Operaciones</label>
                  <input 
                    type="text" 
                    placeholder="Carlos Mendoza"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Correo Corporativo</label>
                  <input 
                    type="email" 
                    placeholder="operaciones@empresa.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Validación de Cuenta Bancaria Corporativa</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">DNI Representante Legal</label>
                  <input 
                    type="text" 
                    placeholder="12345678"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">RUC Empresa</label>
                  <input 
                    type="text" 
                    placeholder="20123456789"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Banco Corporativo</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>BCP Empresas</option>
                    <option>BBVA Corporate</option>
                    <option>Interbank Business</option>
                    <option>Scotiabank Corporate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Cuenta</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Cuenta Corriente Corporativa</option>
                    <option>Cuenta de Ahorros Empresarial</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Número de Cuenta Corporativa</label>
                  <input 
                    type="text" 
                    placeholder="191-123456789-0-12"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
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
              className="bg-primary hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
            >
              {currentStep === 5 ? 'Finalizar' : 'Siguiente'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}