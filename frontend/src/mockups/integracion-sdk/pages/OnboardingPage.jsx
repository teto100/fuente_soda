import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Code, Key, Shield, CheckCircle, ArrowRight, Download, Copy, X, Loader, AlertTriangle } from 'lucide-react'
import '../../../styles/colors.css'

export default function OnboardingPage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(2)
  const [showContract, setShowContract] = useState(false)
  const [showProcessing, setShowProcessing] = useState(false)
  const [formData, setFormData] = useState({
    appName: '',
    androidPackage: '',
    iosPackage: ''
  })

  useEffect(() => {
    if (currentStep === 2) {
      setTimeout(() => {
        setFormData({
          appName: 'Rappi',
          androidPackage: 'com.rappi.app',
          iosPackage: 'com.rappi.app'
        })
      }, 1000)
    }
  }, [currentStep])
  const [credentials, setCredentials] = useState(null)
  const [copied, setCopied] = useState('')

  const generateCredentials = () => {
    return {
      apiKey: 'pk_live_' + Math.random().toString(36).substring(2, 15),
      secretKey: 'sk_live_' + Math.random().toString(36).substring(2, 15),
      publicKey: '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...\n-----END PUBLIC KEY-----',
      merchantId: 'MERCHANT_' + Math.random().toString(36).substring(2, 8).toUpperCase()
    }
  }

  const [showValidationAlert, setShowValidationAlert] = useState(false)

  const handleSubmitForm = () => {
    if (!formData.appName || !formData.androidPackage || !formData.iosPackage) {
      setShowValidationAlert(true)
      return
    }
    setShowContract(true)
  }

  const handleAcceptContract = () => {
    setShowContract(false)
    const newCredentials = generateCredentials()
    setCredentials(newCredentials)
    setCurrentStep(3)
  }

  const handleNextToStep4 = () => {
    setShowProcessing(true)
    setTimeout(() => {
      setShowProcessing(false)
      setCurrentStep(4)
    }, 3000)
  }

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(''), 2000)
  }

  const downloadCredentials = () => {
    const data = `# Credenciales SDK Payments
# Aplicación: ${formData.appName}
# Fecha: ${new Date().toLocaleDateString()}

API_KEY=${credentials.apiKey}
SECRET_KEY=${credentials.secretKey}
MERCHANT_ID=${credentials.merchantId}

# Llave Pública (para cifrado QR)
PUBLIC_KEY="${credentials.publicKey}"

# IMPORTANTE: Guarda estas credenciales en un lugar seguro
# No se volverán a mostrar por seguridad`

    const blob = new Blob([data], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `credentials_${formData.appName.toLowerCase().replace(/\s+/g, '_')}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

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
                <h1 className="text-2xl font-bold text-primary">Registro SDK Payments</h1>
                <p className="text-sm text-gray-600">Proceso de integración paso a paso</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/integracion-sdk')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
            >
              ← Volver
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
              </div>
              {step < 4 && (
                <div className={`w-16 h-1 mx-2 ${
                  currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Step 2: Application Details */}
        {currentStep === 2 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Detalles de la Aplicación</h2>
              <p className="text-gray-600">Proporciona la información de tu aplicación para generar las credenciales</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de la Aplicación *
                </label>
                <input
                  type="text"
                  value={formData.appName}
                  onChange={(e) => setFormData({...formData, appName: e.target.value})}
                  placeholder="Ej: Mi App de Pagos"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paquete Android *
                </label>
                <input
                  type="text"
                  value={formData.androidPackage}
                  onChange={(e) => setFormData({...formData, androidPackage: e.target.value})}
                  placeholder="com.rappi.app"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bundle ID iOS *
                </label>
                <input
                  type="text"
                  value={formData.iosPackage}
                  onChange={(e) => setFormData({...formData, iosPackage: e.target.value})}
                  placeholder="com.rappi.app"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={handleSubmitForm}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                Solicitar Integración SDK
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Credentials */}
        {currentStep === 3 && credentials && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Key className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Credenciales Generadas</h2>
              <p className="text-gray-600">Guarda estas credenciales en un lugar seguro. No se volverán a mostrar.</p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-900 mb-1">¡Importante!</h4>
                  <p className="text-red-800 text-sm">
                    Estas credenciales no se volverán a mostrar por seguridad. Descárgalas o cópialas ahora.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {[
                { label: 'API Key', value: credentials.apiKey, key: 'apiKey' },
                { label: 'Secret Key', value: credentials.secretKey, key: 'secretKey' },
                { label: 'Merchant ID', value: credentials.merchantId, key: 'merchantId' }
              ].map((item) => (
                <div key={item.key} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-medium text-gray-700">{item.label}</label>
                    <button
                      onClick={() => copyToClipboard(item.value, item.key)}
                      className="text-blue-600 hover:text-blue-700 flex items-center text-sm"
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      {copied === item.key ? 'Copiado!' : 'Copiar'}
                    </button>
                  </div>
                  <code className="text-sm text-gray-800 break-all">{item.value}</code>
                </div>
              ))}

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="font-medium text-gray-700">Llave Pública</label>
                  <button
                    onClick={() => copyToClipboard(credentials.publicKey, 'publicKey')}
                    className="text-blue-600 hover:text-blue-700 flex items-center text-sm"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    {copied === 'publicKey' ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
                <pre className="text-xs text-gray-800 whitespace-pre-wrap">{credentials.publicKey}</pre>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={downloadCredentials}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                <Download className="w-5 h-5 mr-2" />
                Descargar Credenciales
              </button>
              <button
                onClick={handleNextToStep4}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                Continuar
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Summary and Developer Portal */}
        {currentStep === 4 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Integración Completada!</h2>
              <p className="text-gray-600">Tu aplicación está lista para usar el SDK de Payments</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-blue-900 mb-3">Resumen de tu integración:</h3>
              <div className="space-y-2 text-sm text-blue-800">
                <p><strong>Aplicación:</strong> {formData.appName}</p>
                <p><strong>Android:</strong> {formData.androidPackage}</p>
                <p><strong>iOS:</strong> {formData.iosPackage}</p>
                <p><strong>Merchant ID:</strong> {credentials?.merchantId}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Portal de Desarrolladores</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Crear QR', description: 'Genera códigos QR dinámicos y estáticos', icon: '🔲' },
                  { title: 'Consultar Pago', description: 'Verifica el estado de transacciones', icon: '🔍' },
                  { title: 'Cobrar con Tarjeta', description: 'Procesa pagos con tarjetas de crédito/débito', icon: '💳' },
                  { title: 'Cobrar con UPI BCR', description: 'Acepta pagos UPI con VPA', icon: '📱' }
                ].map((feature, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{feature.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigate('/integracion-sdk')}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
            >
              Ir al Portal de Desarrolladores
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        )}
      </div>

      {/* Contract Modal */}
      {showContract && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Contrato de Integración SDK</h3>
                <button
                  onClick={() => setShowContract(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6 max-h-60 overflow-y-auto text-sm">
                <h4 className="font-semibold mb-2">TÉRMINOS Y CONDICIONES DE USO - SDK PAYMENTS</h4>
                <p className="mb-2">
                  <strong>1. RESPONSABILIDADES DEL DESARROLLADOR:</strong><br/>
                  - Mantener las credenciales seguras y no compartirlas<br/>
                  - Implementar medidas de seguridad adecuadas<br/>
                  - Cumplir con las regulaciones PCI DSS<br/>
                  - Notificar cualquier brecha de seguridad inmediatamente
                </p>
                <p className="mb-2">
                  <strong>2. USO PERMITIDO:</strong><br/>
                  - Solo para la aplicación registrada<br/>
                  - Transacciones legítimas únicamente<br/>
                  - Cumplimiento de límites de transacción
                </p>
                <p className="mb-2">
                  <strong>3. LIMITACIONES:</strong><br/>
                  - Máximo 1000 transacciones/día en sandbox<br/>
                  - Soporte técnico de 9AM a 6PM<br/>
                  - SLA de 99.9% de disponibilidad
                </p>
                <p>
                  <strong>4. TERMINACIÓN:</strong><br/>
                  Podemos suspender el acceso por incumplimiento de términos o actividad sospechosa.
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowContract(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAcceptContract}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors"
                >
                  Acepto los Términos
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Processing Modal */}
      {showProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center">
            <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Procesando Solicitud</h3>
            <p className="text-gray-600">Configurando tu entorno de desarrollo...</p>
          </div>
        </div>
      )}

      {/* Validation Alert Dialog */}
      {showValidationAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 transform transition-all">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Campos Requeridos</h3>
            <p className="text-gray-600 text-center mb-6">
              Por favor completa todos los campos obligatorios antes de continuar.
            </p>
            <button
              onClick={() => setShowValidationAlert(false)}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  )
}