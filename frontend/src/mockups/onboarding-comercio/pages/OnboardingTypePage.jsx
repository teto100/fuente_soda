import { useNavigate } from 'react-router-dom'
import { Store, Building, UserCheck } from 'lucide-react'
import '../../../styles/colors.css'

export default function OnboardingTypePage() {
  const navigate = useNavigate()

  const onboardingTypes = [
    {
      id: 'afiliado',
      title: 'Comercio Afiliado',
      icon: Building,
      color: 'bg-blue-600',
      description: 'Comercios que ya tienen una relación comercial establecida',
      features: ['Proceso simplificado', 'Activación rápida', 'Configuración preestablecida'],
      path: '/onboarding-comercio/afiliado'
    },
    {
      id: 'no-afiliado',
      title: 'Comercio No Afiliado',
      icon: UserCheck,
      color: 'bg-green-600',
      description: 'Nuevos comercios que requieren proceso completo de verificación',
      features: ['Proceso completo', 'Verificación detallada', 'Múltiples segmentos'],
      path: '/onboarding-comercio/no-afiliado'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-3">
                <Store className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-primary">Onboarding Comercio</h1>
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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Tipo de Comercio</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Selecciona el tipo de comercio para acceder al proceso de onboarding correspondiente
          </p>
        </div>

        {/* Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {onboardingTypes.map((type) => {
            const IconComponent = type.icon
            
            return (
              <div
                key={type.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
                onClick={() => navigate(type.path)}
              >
                <div className="text-center">
                  <div className={`w-20 h-20 ${type.color} rounded-xl flex items-center justify-center mx-auto mb-6`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{type.title}</h3>
                  <p className="text-gray-600 mb-6">{type.description}</p>
                  
                  <div className="space-y-2">
                    {type.features.map((feature, index) => (
                      <div key={index} className="flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className={`mt-6 px-6 py-3 ${type.color} text-white rounded-lg hover:opacity-90 transition-opacity font-medium`}>
                    Continuar
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}