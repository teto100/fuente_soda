import { useNavigate } from 'react-router-dom'
import '../../../styles/colors.css'

export default function PagosP2MHomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">Pagos P2M App2App</h1>
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-8">
            <span className="text-4xl">🚧</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Pagos P2M App2App
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Este mockup está en desarrollo. Próximamente disponible.
          </p>
          <div className="bg-white rounded-lg shadow-sm p-8 border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Funcionalidades Planificadas:</h3>
            <ul className="text-left space-y-2 text-gray-600">
              <li>• Pagos persona a comercio mediante aplicaciones</li>
              <li>• Integración con apps móviles</li>
              <li>• QR dinámicos para comercios</li>
              <li>• Notificaciones push en tiempo real</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}