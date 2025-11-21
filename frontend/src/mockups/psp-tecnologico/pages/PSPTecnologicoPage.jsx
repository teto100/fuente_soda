import { useNavigate } from 'react-router-dom'
import { Server, Shield } from 'lucide-react'
import FlowRenderer from '../../../components/FlowRenderer'
import '../../../styles/colors.css'

export default function PSPTecnologicoPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Server className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">PSP Proveedor Tecnológico</h1>
                <p className="text-sm text-gray-600">Flujo de transferencia entre billeteras</p>
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
            <Server className="w-6 h-6 mr-2" />
            Flujo PSP Proveedor Tecnológico - Recibiendo el pago
          </div>
        </div>
        
        {/* Flow Component 1 - Directo */}
        <FlowRenderer 
          mermaidPath="/flows/psp-tecnologico.mermaid"
          title=""
          getStepExplanation={(step) => {
            const explanations = {
              1: "El usuario en la App Yape inicia una transferencia UPI directa a otro usuario.",
              2: "El PSP Yape envía una petición UPI Switch para procesar la transferencia.",
              3: "El UPI Switch envía la instrucción al Banco Yape para debitar la cuenta del pagador.",
              4: "El Banco Yape debita la cuenta del usuario y confirma la operación al UPI Switch.",
              5: "El UPI Switch envía la instrucción al Banco Revolut para acreditar la cuenta del beneficiario.",
              6: "El Banco Revolut abona el monto a la cuenta del beneficiario y confirma al UPI Switch.",
              7: "El UPI Switch notifica al PSP Yape que la transacción se completó exitosamente.",
              8: "El PSP Yape notifica a la App Yape del pagador que la transferencia fue exitosa.",
              9: "El UPI Switch notifica al PSP Niubiz sobre la transacción completada.",
              10: "El PSP Niubiz notifica a la App Revolut del beneficiario que recibió la transferencia."
            }
            return explanations[step] || "Procesando..."
          }}
        />

        {/* Flow Component 2 - Con SDK */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-bold text-lg mb-4">
              <Server className="w-6 h-6 mr-2" />
              Flujo PSP Tecnológico - Iniciando el pago
            </div>
          </div>
          
          <FlowRenderer 
            mermaidPath="/flows/psp-tecnologico-sdk.mermaid"
            title=""
            getStepExplanation={(step) => {
              const explanations = {
                1: "El usuario en la App Revolut inicia una transferencia UPI usando el SDK PSP Niubiz integrado.",
                2: "El SDK PSP Niubiz solicita el PIN UPI al usuario para autenticar la transacción.",
                3: "El PSP Niubiz envía la petición a UPI Switch para procesar la transferencia.",
                4: "El UPI Switch envía la instrucción al Banco Revolut para debitar la cuenta del pagador.",
                5: "El Banco Revolut debita la cuenta del usuario y confirma la operación al UPI Switch.",
                6: "El UPI Switch envía la instrucción al Banco Yape para acreditar la cuenta del beneficiario.",
                7: "El Banco Yape abona el monto a la cuenta del beneficiario y confirma al UPI Switch.",
                8: "El UPI Switch notifica al PSP Niubiz que la transacción se completó exitosamente.",
                9: "El PSP Niubiz notifica al SDK integrado en la App Revolut sobre el resultado.",
                10: "El SDK notifica a la App Revolut del pagador que la transferencia fue exitosa.",
                11: "El UPI Switch notifica al PSP Yape sobre la transacción completada.",
                12: "El PSP Yape notifica a la App Yape del beneficiario que recibió la transferencia."
              }
              return explanations[step] || "Procesando..."
            }}
          />
        </div>

        {/* Posibles Clientes y Monetización */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Posibles Clientes */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-green-500">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-green-100 p-2 rounded-lg mr-3">🏢</span>
              Posibles Clientes
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <span className="font-semibold text-gray-900">Revolut</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="w-10 h-10 bg-purple-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <span className="font-semibold text-gray-900">Nubank</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">B</span>
                </div>
                <span className="font-semibold text-gray-900">BiPay</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">+</span>
                </div>
                <span className="font-semibold text-gray-900">Otras billeteras</span>
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
                <h4 className="font-bold text-blue-900 mb-2 flex items-center">
                  <span className="mr-2">📊</span>
                  Modelo de Cobro
                </h4>
                <p className="text-sm text-blue-800 mb-3">
                  Se cobra un costo por cantidad de transacciones
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-white rounded border">
                    <span className="text-sm font-medium text-gray-700">Solo Notificación</span>
                    <span className="text-sm font-bold text-green-600">Tarifa Lite</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded border">
                    <span className="text-sm font-medium text-gray-700">Inicio de Pago</span>
                    <span className="text-sm font-bold text-blue-600">Tarifa Full</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border-t-4 border-purple-500">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <span className="bg-purple-100 p-2 rounded-lg mr-3">
              🔄
            </span>
            Características del PSP Tecnológico
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <h4 className="font-bold text-purple-900 mb-3 flex items-center">
                <span className="mr-2">⚡</span>
                Transferencia Directa
              </h4>
              <ul className="space-y-2 text-sm text-purple-800">
                <li>• Transferencia P2P sin intermediarios comerciales</li>
                <li>• Flujo directo entre billeteras digitales</li>
                <li>• Procesamiento simultáneo en ambos extremos</li>
                <li>• Mayor velocidad de transacción</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-bold text-blue-900 mb-3 flex items-center">
                <span className="mr-2">🏦</span>
                Gestión Bancaria
              </h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Débito automático en banco emisor</li>
                <li>• Abono simultáneo en banco receptor</li>
                <li>• Confirmación bidireccional</li>
                <li>• Liquidación en tiempo real</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-4 border border-purple-300">
            <h4 className="font-bold text-gray-900 mb-3 text-center">
              💡 Ventajas del Modelo Tecnológico
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🚀</span>
                </div>
                <p className="font-semibold text-gray-900">Velocidad</p>
                <p className="text-gray-700">Procesamiento en tiempo real sin demoras</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">💰</span>
                </div>
                <p className="font-semibold text-gray-900">Menor Costo</p>
                <p className="text-gray-700">Sin intermediarios comerciales adicionales</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🔗</span>
                </div>
                <p className="font-semibold text-gray-900">Simplicidad</p>
                <p className="text-gray-700">Flujo directo entre usuarios finales</p>
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