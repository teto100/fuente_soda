import { useNavigate } from 'react-router-dom'
import { CheckCircle, Store, CreditCard, BarChart3, Settings } from 'lucide-react'
import '../../../styles/colors.css'

export default function OnboardingSuccessPage() {
  const navigate = useNavigate()

  const features = [
    {
      icon: CreditCard,
      title: 'Recibir Pagos',
      description: 'Acepta todos los métodos de pago disponibles'
    },
    {
      icon: BarChart3,
      title: 'Dashboard',
      description: 'Monitorea tus ventas y transacciones en tiempo real'
    },
    {
      icon: Settings,
      title: 'Configuración',
      description: 'Personaliza tu experiencia de pago'
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
              <h1 className="text-2xl font-bold text-primary">Onboarding Completado</h1>
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

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ¡Bienvenido a la Plataforma!
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Tu comercio <strong>Tienda Zaara</strong> está listo para recibir pagos
          </p>
        </div>

        {/* Account Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Información de tu Cuenta</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-teal-50 rounded-lg p-4">
              <h4 className="font-medium text-teal-900 mb-2">Merchant ID</h4>
              <p className="font-mono text-teal-700 text-sm">MRC_TZ_001234</p>
            </div>
            <div className="bg-teal-50 rounded-lg p-4">
              <h4 className="font-medium text-teal-900 mb-2">Estado</h4>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                ✓ Activo
              </span>
            </div>
            <div className="bg-teal-50 rounded-lg p-4">
              <h4 className="font-medium text-teal-900 mb-2">Comisión</h4>
              <p className="text-teal-700">2.9% + S/ 0.30 por transacción</p>
            </div>
            <div className="bg-teal-50 rounded-lg p-4">
              <h4 className="font-medium text-teal-900 mb-2">Liquidación</h4>
              <p className="text-teal-700">Diaria (T+1)</p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Próximos Pasos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="text-center p-4 border border-gray-200 rounded-lg hover:border-teal-300 transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Integration Guide */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Guía de Integración</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Descarga el SDK</h4>
                <p className="text-gray-600 text-sm">Integra nuestra librería en tu sitio web o aplicación</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Configura los Webhooks</h4>
                <p className="text-gray-600 text-sm">Recibe notificaciones en tiempo real de tus transacciones</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Prueba en Sandbox</h4>
                <p className="text-gray-600 text-sm">Realiza transacciones de prueba antes de ir a producción</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button 
            onClick={() => navigate('/onboarding-comercio')}
            className="flex-1 bg-primary hover:bg-primary text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Ver Dashboard
          </button>
          <button 
            onClick={() => navigate('/home')}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Explorar Otros Mockups
          </button>
        </div>
      </main>
    </div>
  )
}