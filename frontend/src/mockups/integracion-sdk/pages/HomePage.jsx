import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Code, Key, QrCode, Shield, ArrowRight, CheckCircle, AlertCircle, Copy, Download } from 'lucide-react'
import '../../../styles/colors.css'

export default function IntegracionSDKHomePage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [copied, setCopied] = useState('')

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(''), 2000)
  }

  const integrationSteps = [
    {
      id: 1,
      title: 'Registro de Comercio',
      description: 'Comercio debe estar registrado y tener alta de QR BCR UPI',
      status: 'prerequisite',
      icon: CheckCircle
    },
    {
      id: 2,
      title: 'Solicitud de Registro SDK',
      description: 'Solicitar acceso al SDK de Payments con credenciales',
      status: 'required',
      icon: Key
    },
    {
      id: 3,
      title: 'Obtención de Credenciales',
      description: 'Recibir API Key, Secret Key y Llave Pública para cifrado',
      status: 'required',
      icon: Shield
    },
    {
      id: 4,
      title: 'Implementación SDK',
      description: 'Integrar SDK y utilizar función getQR() para generar códigos',
      status: 'implementation',
      icon: Code
    }
  ]

  const sampleCode = `// Inicializar SDK
const paymentsSDK = new PaymentsSDK({
  apiKey: 'your_api_key',
  secretKey: 'your_secret_key',
  publicKey: 'your_public_key',
  environment: 'production' // o 'sandbox'
});

// Generar QR Dinámico
const dynamicQR = await paymentsSDK.getQR({
  type: 'dynamic',
  amount: 150.00,
  currency: 'PEN',
  transactionId: 'TXN_' + Date.now(),
  description: 'Pago de producto',
  expirationTime: 300 // 5 minutos
});

// Generar QR Estático
const staticQR = await paymentsSDK.getQR({
  type: 'static',
  merchantId: 'MERCHANT_123',
  transactionId: 'TXN_STATIC_' + Date.now()
});

console.log('QR Code:', dynamicQR.qrString);
console.log('Transaction ID:', dynamicQR.transactionId);`

  const apiReference = [
    {
      method: 'getQR()',
      description: 'Genera códigos QR dinámicos o estáticos',
      params: [
        { name: 'type', type: 'string', required: true, description: 'Tipo de QR: "dynamic" o "static"' },
        { name: 'amount', type: 'number', required: false, description: 'Monto (requerido para QR dinámico)' },
        { name: 'currency', type: 'string', required: false, description: 'Moneda (PEN, USD, etc.)' },
        { name: 'transactionId', type: 'string', required: true, description: 'ID único de transacción' },
        { name: 'description', type: 'string', required: false, description: 'Descripción del pago' },
        { name: 'expirationTime', type: 'number', required: false, description: 'Tiempo de expiración en segundos' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">Integración SDK Payments</h1>
                <p className="text-sm text-gray-600">Herramientas de desarrollo para integración de pagos</p>
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-bold text-lg mb-4">
            <Code className="w-6 h-6 mr-2" />
            SDK de Integración de Pagos
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Permite a equipos de desarrollo de otras empresas integrarse fácilmente a través de nuestro SDK de Payments para generar códigos QR dinámicos y estáticos.
          </p>
        </div>

        {/* Integration Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">API Payments</h3>
                <p className="text-sm text-gray-600">Integración directa vía REST API</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm">
              Acceso directo a nuestros endpoints de pagos para desarrolladores que prefieren implementaciones personalizadas.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">SDK Payments</h3>
                <p className="text-sm text-gray-600">Librería lista para usar</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm">
              SDK completo con funciones predefinidas para una integración rápida y segura de pagos QR.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Proceso de Integración', icon: ArrowRight },
                { id: 'implementation', label: 'Implementación', icon: Code },
                { id: 'api', label: 'Referencia API', icon: QrCode }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Proceso de Integración SDK</h3>
                
                <div className="space-y-4">
                  {integrationSteps.map((step, index) => {
                    const Icon = step.icon
                    return (
                      <div key={step.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step.status === 'prerequisite' ? 'bg-green-100' :
                          step.status === 'required' ? 'bg-blue-100' :
                          'bg-purple-100'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            step.status === 'prerequisite' ? 'text-green-600' :
                            step.status === 'required' ? 'text-blue-600' :
                            'text-purple-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-sm font-semibold text-gray-500">Paso {step.id}</span>
                            {step.status === 'prerequisite' && (
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Prerequisito</span>
                            )}
                          </div>
                          <h4 className="font-bold text-gray-900 mb-1">{step.title}</h4>
                          <p className="text-gray-700 text-sm">{step.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">Importante</h4>
                      <p className="text-blue-800 text-sm">
                        Cada vez que generes un QR (dinámico o estático), debes utilizar la función <code className="bg-blue-100 px-1 rounded">getQR()</code> 
                        pasando el tipo, monto y utilizando la llave pública para el cifrado del QR. Además, incluir el ID de transacción en un tag del QR.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-6">
                  <button
                    onClick={() => navigate('/integracion-sdk/onboarding')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-8 rounded-lg transition-colors flex items-center mx-auto"
                  >
                    Comenzar Integración
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            )}

            {/* Implementation Tab */}
            {activeTab === 'implementation' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Ejemplo de Implementación</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => copyToClipboard(sampleCode, 'code')}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center text-sm"
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      {copied === 'code' ? 'Copiado!' : 'Copiar'}
                    </button>
                    <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center text-sm">
                      <Download className="w-4 h-4 mr-1" />
                      Descargar SDK
                    </button>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    <code>{sampleCode}</code>
                  </pre>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                      <QrCode className="w-4 h-4 mr-2" />
                      QR Dinámico
                    </h4>
                    <ul className="text-green-800 text-sm space-y-1">
                      <li>• Incluye monto específico</li>
                      <li>• Tiempo de expiración configurable</li>
                      <li>• ID de transacción único</li>
                      <li>• Cifrado con llave pública</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                      <QrCode className="w-4 h-4 mr-2" />
                      QR Estático
                    </h4>
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>• Sin monto predefinido</li>
                      <li>• Reutilizable múltiples veces</li>
                      <li>• ID de comercio incluido</li>
                      <li>• Ideal para puntos de venta</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* API Reference Tab */}
            {activeTab === 'api' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Referencia de la API</h3>
                
                {apiReference.map((api, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 font-mono">{api.method}</h4>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">POST</span>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{api.description}</p>
                    
                    <h5 className="font-semibold text-gray-900 mb-3">Parámetros:</h5>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Parámetro</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Requerido</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {api.params.map((param, paramIndex) => (
                            <tr key={paramIndex}>
                              <td className="px-4 py-2 text-sm font-mono text-gray-900">{param.name}</td>
                              <td className="px-4 py-2 text-sm text-gray-600">{param.type}</td>
                              <td className="px-4 py-2 text-sm">
                                {param.required ? (
                                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Sí</span>
                                ) : (
                                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">No</span>
                                )}
                              </td>
                              <td className="px-4 py-2 text-sm text-gray-700">{param.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}