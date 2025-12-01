import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building2 } from 'lucide-react'
import LargeOnboardingFlow from '../components/LargeOnboardingFlow'
import '../../../../../styles/colors.css'

export default function LargePage() {
  const navigate = useNavigate()
  const [showOnboarding, setShowOnboarding] = useState(true)

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
                <h1 className="text-2xl font-bold text-primary">Large Enterprise</h1>
                <p className="text-sm text-gray-600">Onboarding para empresas grandes</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/onboarding-comercio/no-afiliado')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
            >
              ← Selección de Segmento
            </button>
          </div>
        </div>
      </header>

      {/* Onboarding Flow */}
      {showOnboarding && (
        <LargeOnboardingFlow onComplete={() => setShowOnboarding(false)} />
      )}

      {/* Completion Message */}
      {!showOnboarding && (
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">¡Onboarding Completado!</h2>
            <p className="text-gray-600 mb-6">
              Tu empresa ha sido registrada exitosamente. Ya puedes comenzar a recibir pagos.
            </p>
            <button 
              onClick={() => navigate('/home')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Ir al Centro de Mockups
            </button>
          </div>
        </div>
      )}
    </div>
  )
}