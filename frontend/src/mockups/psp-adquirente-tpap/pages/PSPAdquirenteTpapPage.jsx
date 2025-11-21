import { useNavigate } from 'react-router-dom'
import { Shield, DollarSign } from 'lucide-react'
import FlowRenderer from '../../../components/FlowRenderer'
import '../../../styles/colors.css'

export default function PSPAdquirenteTpapPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">PSP Adquirente TPAP</h1>
                <p className="text-sm text-gray-600">Flujo de procesamiento con SDK integrado</p>
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

      {/* Flow Diagram */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Flow Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-bold text-lg mb-4">
            <Shield className="w-6 h-6 mr-2" />
            Flujo PSP Adquirente TPAP - Procesamiento con SDK
          </div>
        </div>
        
        {/* Flow Component */}
        <FlowRenderer 
          mermaidPath="/flows/psp-adquirente-tpap.mermaid"
          title="Flujo PSP Adquirente TPAP - Procesamiento con SDK"
          getStepExplanation={(step) => {
            const explanations = {
              1: "La app del comercio inicia el proceso de pago integrando el SDK PSP Niubiz. El usuario selecciona el producto y procede al checkout.",
              2: "El SDK PSP Niubiz se comunica con el servidor PSP para obtener la lista de billeteras UPI disponibles y configurar la transacción.",
              3: "El PSP genera un Intent específico que incluye el VPA del comercio, monto, y detalles de la transacción, preparando todo para el pago.",
              4: "El Intent generado se envía de vuelta al SDK en la app del comercio, manteniendo toda la información necesaria para procesar el pago.",
              5: "El SDK ejecuta el Intent automáticamente, lo que abre las billeteras UPI BCR y selecciona una con todos los datos pre-cargados.",
              6: "La billetera UPI del pagador se abre con la información del pago ya completada. El usuario solo necesita autenticar la transacción.",
              7: "El usuario confirma el pago en su billetera UPI usando PIN.",
              8: "La billetera procesa el pago y envía la confirmación directamente al PSP, incluyendo el estado de la transacción y detalles.",
              9: "El PSP recibe la confirmación del pago y actualiza el estado de la transacción en sus sistemas internos.",
              10: "El PSP notifica a la app del comercio sobre el resultado del pago a través del SDK, permitiendo actualizar la UI inmediatamente.",
              11: "La app del comercio muestra la confirmación del pago al usuario y procede con el flujo post-pago (recibo, entrega, etc.).",
              12: "El PSP procesa la liquidación de fondos hacia la cuenta del comercio según los términos acordados en el contrato comercial."
            }
            return explanations[step] || "Paso del flujo de procesamiento PSP Adquirente TPAP."
          }}
        />

        {/* Posibles Clientes y Monetización */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Posibles Clientes */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-green-500">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-green-100 p-2 rounded-lg mr-3">🏢</span>
              Posibles Clientes
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <span className="font-semibold text-gray-900">Rappi o Pedidos Ya</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🚚</span>
                </div>
                <span className="font-semibold text-gray-900">Empresas Courier</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <span className="font-semibold text-gray-900">Temu o AliExpress</span>
              </div>
                        <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🚕</span>
                </div>
                <span className="font-semibold text-gray-900">Cabify o Uber</span>
              </div>
            </div>
          </div>

          {/* Monetización */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-blue-500">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 p-2 rounded-lg mr-3">💰</span>
              Monetización
            </h3>
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-bold text-blue-900 mb-3 flex items-center">
                  <span className="mr-2">📅</span>
                  Fee por Mantenimiento SDK
                </h4>
                <div className="bg-white rounded p-3 border">
                  <span className="text-sm font-medium text-gray-700">Cobro Mensual Mayor</span>
                  <p className="text-xs text-gray-600 mt-1">Tarifa más alta por mantener y actualizar el SDK</p>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-bold text-blue-900 mb-3 flex items-center">
                  <span className="mr-2">📊</span>
                  Costo por Rango de Transacción
                </h4>
                <div className="space-y-2">
                  <div className="bg-white rounded p-2 border flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">1 - 10,000</span>
                    <span className="text-sm font-bold text-green-600">Tarifa 1</span>
                  </div>
                  <div className="bg-white rounded p-2 border flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">10,000 - 40,000</span>
                    <span className="text-sm font-bold text-yellow-600">Tarifa 2</span>
                  </div>
                  <div className="bg-white rounded p-2 border flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">40,000 - 100,000</span>
                    <span className="text-sm font-bold text-orange-600">Tarifa 3</span>
                  </div>
                  <div className="bg-white rounded p-2 border flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">100,000 - 1,000,000</span>
                    <span className="text-sm font-bold text-blue-600">Tarifa 4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Differences */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border-t-4 border-green-500">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <span className="bg-green-100 p-2 rounded-lg mr-3">
              🔄
            </span>
            Diferencias Clave - Flujo TPAP
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h4 className="font-bold text-green-900 mb-3 flex items-center">
                <span className="mr-2">📱</span>
                Integración SDK
              </h4>
              <ul className="space-y-2 text-sm text-green-800">
                <li>• App del comercio integra SDK PSP Niubiz</li>
                <li>• SDK maneja la comunicación con billeteras</li>
                <li>• Lista automática de billeteras UPI BCR disponibles</li>
                <li>• Experiencia nativa en la app del comercio</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-bold text-blue-900 mb-3 flex items-center">
                <span className="mr-2">🔗</span>
                Flujo de Intent
              </h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• PSP genera Intent con VPA e ID incluido</li>
                <li>• Intent se envía de vuelta a la app</li>
                <li>• SDK ejecuta el Intent para iniciar pago</li>
                <li>• Mayor control sobre la experiencia UX</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-4 border border-green-300">
            <h4 className="font-bold text-gray-900 mb-3 text-center">
              💡 Ventajas del Modelo TPAP
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🎯</span>
                </div>
                <p className="font-semibold text-gray-900">Control Total</p>
                <p className="text-gray-700">La app mantiene control completo del flujo de pago</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">⚡</span>
                </div>
                <p className="font-semibold text-gray-900">Experiencia Nativa</p>
                <p className="text-gray-700">Sin redirecciones, todo dentro de la app</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🔒</span>
                </div>
                <p className="font-semibold text-gray-900">Mayor Seguridad</p>
                <p className="text-gray-700">SDK maneja la seguridad y validaciones</p>
              </div>
            </div>
          </div>
        </div>

        {/* Flow Comparison */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border-t-4 border-purple-500">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <span className="bg-purple-100 p-2 rounded-lg mr-3">
              📊
            </span>
            Comparación de Flujos PSP
          </h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aspecto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PSP Adquirente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PSP Adquirente TPAP</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PSP Tecnológico</th>
                </tr>
              </thead>
     <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Tipo de Transacción</td>
                  <td className="px-6 py-4 text-sm text-gray-600">P2M Pasarela o Gateway</td>
                  <td className="px-6 py-4 text-sm text-gray-600">P2M con SDK</td>
                  <td className="px-6 py-4 text-sm text-gray-600">P2P (SDK)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Integración</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Web/API</td>
                  <td className="px-6 py-4 text-sm text-gray-600">SDK iOS - Android</td>
                  <td className="px-6 py-4 text-sm text-gray-600">SDK iOS - Android</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Experiencia UX</td>
                  <td className="px-6 py-4 text-sm text-yellow-600">⚡ Transparente</td>
                  <td className="px-6 py-4 text-sm text-green-600">⚡ Nativa</td>
                  <td className="px-6 py-4 text-sm text-green-600">⚡ Nativa</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Complejidad implementacion</td>
                  <td className="px-6 py-4 text-sm text-yellow-600">🟡 Media </td>
                  <td className="px-6 py-4 text-sm text-red-600">🔴 Muy Alta</td>
                  <td className="px-6 py-4 text-sm text-red-600">🔴 Muy Alta</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Control Comercial</td>
                  <td className="px-6 py-4 text-sm text-green-600">🟢 Completo</td>
                  <td className="px-6 py-4 text-sm text-yellow-600">🟡  Intermedio</td>
                  <td className="px-6 py-4 text-sm text-red-600">🔴 Limitado</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Conexión LBTR</td>
                  <td className="px-6 py-4 text-sm text-green-600">✅</td>
                  <td className="px-6 py-4 text-sm text-yellow-600">✅</td>
                  <td className="px-6 py-4 text-sm text-red-600">✅</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Adminitracion VPA</td>
                  <td className="px-6 py-4 text-sm text-green-600">🟢 Completo</td>
                  <td className="px-6 py-4 text-sm text-green-600">🟢 Completo</td>
                  <td className="px-6 py-4 text-sm text-red-600">🔴 Limitado</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Exposición al fraude </td>
                  <td className="px-6 py-4 text-sm text-yellow-600">🟡 Media</td>
                  <td className="px-6 py-4 text-sm text-red-600">🔴 Muy Alta</td>
                  <td className="px-6 py-4 text-sm text-red-600">🔴 Muy Alta</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Validación afiliación </td>
                  <td className="px-6 py-4 text-sm text-gray-600">Biometría facial / Firmas digitales </td>
                  <td className="px-6 py-4 text-sm text-gray-600">Firmas digitales</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Firmas digitales</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Tipo  afiliación </td>
                  <td className="px-6 py-4 text-sm text-gray-600">Autoatendida - Gestionada </td>
                  <td className="px-6 py-4 text-sm text-gray-600">Gestionada</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Gestionada</td>
                </tr>
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}