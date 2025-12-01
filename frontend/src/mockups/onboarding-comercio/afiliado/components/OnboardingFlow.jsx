import { useState, useEffect } from 'react'
import { Building, ArrowRight, CheckCircle, Camera, User, CreditCard, QrCode, Shield } from 'lucide-react'
import QRCode from 'qrcode'
import '../../../../styles/colors.css'

export default function OnboardingFlow({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedVPA, setSelectedVPA] = useState('')
  const [isCapturing, setIsCapturing] = useState(false)
  const [isValidating, setIsValidating] = useState(false)
  const [validationComplete, setValidationComplete] = useState(false)
  const [qrCode, setQrCode] = useState('')

  const steps = [
    { id: 1, title: 'Datos Básicos', icon: User, status: 'current' },
    { id: 2, title: 'Validación Biométrica', icon: Camera, status: 'pending' },
    { id: 3, title: 'Creación VPA', icon: QrCode, status: 'pending' },
    { id: 4, title: 'Finalización', icon: CheckCircle, status: 'pending' }
  ]

  const vpaOptions = [
    'Zaara',
    'Tienda Zaara', 
    'Comercio Zaara',
    'Zaara Home',
    'Zaara Sac'
  ]

  const handleBiometricValidation = () => {
    setIsCapturing(true)
    
    // Simulate camera capture
    setTimeout(() => {
      setIsCapturing(false)
      setIsValidating(true)
      
      // Simulate validation process
      setTimeout(() => {
        setIsValidating(false)
        setValidationComplete(true)
      }, 5000)
    }, 3000)
  }

  const generateQR = async () => {
    if (selectedVPA) {
      const vpaAddress = `${selectedVPA.toLowerCase().replace(/\s+/g, '')}@niubiz`
      const upiData = `upi://pay?pa=${vpaAddress}&pn=Tienda Zaara&am=0.00&cu=PEN&tn=QR Comercio`
      try {
        const qr = await QRCode.toDataURL(upiData, { width: 200, margin: 2 })
        setQrCode(qr)
      } catch (err) {
        console.error(err)
      }
    }
  }

  useEffect(() => {
    if (currentStep === 4 && selectedVPA) {
      generateQR()
    }
  }, [currentStep, selectedVPA])

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">Onboarding Comercio Afiliado</h1>
                <p className="text-sm text-gray-600">Configuración inicial</p>
              </div>
            </div>
            <button 
              onClick={onComplete}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="text-gray-400 text-xl">×</span>
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              const isActive = step.id <= currentStep
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                    isActive 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="ml-2">
                    <p className={`text-xs font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-2 ${
                      step.id < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6">
          {currentStep === 1 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Datos Básicos - Comercio Afiliado</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p className="text-blue-800 text-sm">
                  <strong>Datos precargados:</strong> La información está preconfigurada para comercios afiliados
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombres y Apellidos</label>
                  <input 
                    type="text" 
                    value="Carlos Mendoza Ruiz"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
                  <input 
                    type="text" 
                    value="12345678"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Número de Celular</label>
                  <input 
                    type="tel" 
                    value="+51 987 654 321"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    readOnly
                  />
                  <p className="text-xs text-gray-500 mt-1">Aquí llegarán todas las notificaciones</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Código de Comercio</label>
                  <input 
                    type="text" 
                    value="123456789"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de Comercio</label>
                  <input 
                    type="text" 
                    value="Zaara"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Correo Representante Legal</label>
                  <input 
                    type="email" 
                    value="carlos.mendoza@zaara.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Cuenta</label>
                  <input 
                    type="text" 
                    value="Cuenta Corriente"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Banco</label>
                  <input 
                    type="text" 
                    value="BCP"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    readOnly
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Número de Cuenta</label>
                  <input 
                    type="text" 
                    value="191-123456789-0-12"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    readOnly
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="text-center">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Validación Biométrica</h2>
              
              {!isCapturing && !isValidating && !validationComplete && (
                <div>
                  <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-16 h-16 text-gray-400" />
                  </div>
                  <p className="text-gray-600 mb-6">Presiona el botón para iniciar la validación biométrica</p>
                  <button 
                    onClick={handleBiometricValidation}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    Iniciar Validación
                  </button>
                </div>
              )}

              {isCapturing && (
                <div>
                  <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Camera className="w-16 h-16 text-blue-600" />
                  </div>
                  <p className="text-blue-600 font-medium">Capturando imagen...</p>
                </div>
              )}

              {isValidating && (
                <div>
                  <div className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-600"></div>
                  </div>
                  <p className="text-yellow-600 font-medium">Validando identidad...</p>
                </div>
              )}

              {validationComplete && (
                <div>
                  <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-16 h-16 text-green-600" />
                  </div>
                  <p className="text-green-600 font-medium">¡Validación exitosa!</p>
                </div>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Creación de VPA UPI</h2>
              <p className="text-gray-600 mb-4">Selecciona el nombre para tu dirección UPI:</p>
              
              <div className="space-y-3">
                {vpaOptions.map((option) => (
                  <label key={option} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="vpa"
                      value={option}
                      checked={selectedVPA === option}
                      onChange={(e) => setSelectedVPA(e.target.value)}
                      className="mr-3"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{option}</p>
                      <p className="text-sm text-gray-600">{option.toLowerCase().replace(/\s+/g, '')}@niubiz.com</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">¡UPI VPA Creado Exitosamente!</h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-900 mb-3">Tu UPI VPA</h3>
                <p className="font-mono text-blue-900 text-lg mb-4">
                  {selectedVPA.toLowerCase().replace(/\s+/g, '')}@niubiz.com
                </p>
                
                {qrCode ? (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
                    <div className="flex flex-col items-center">
                      <div className="relative bg-white p-3 rounded-xl shadow-lg">
                        <img src={qrCode} alt="QR Code UPI" className="w-32 h-32" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-white rounded-full p-1 shadow-md">
                            <img src="/assets/img/upi.jpeg" alt="UPI Logo" className="w-6 h-6 rounded-full object-contain" />
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-center">
                        <div className="flex items-center justify-center mb-1 bg-green-100 rounded-full px-2 py-1">
                          <Shield className="w-3 h-3 text-green-600 mr-1" />
                          <span className="text-xs text-green-700 font-semibold">Verificado</span>
                        </div>
                        <p className="text-xs text-blue-700 mt-2">Código QR UPI - {selectedVPA.toLowerCase().replace(/\s+/g, '')}@niubiz</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center mx-auto">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
            <button 
              onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
              className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                currentStep > 1 
                  ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
                  : 'bg-gray-50 text-gray-400 cursor-not-allowed'
              }`}
              disabled={currentStep === 1 || isCapturing || isValidating}
            >
              Anterior
            </button>
            <button 
              onClick={handleNext}
              disabled={(currentStep === 2 && !validationComplete) || (currentStep === 3 && !selectedVPA) || isCapturing || isValidating}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center text-sm ${
                (currentStep === 2 && !validationComplete) || (currentStep === 3 && !selectedVPA) || isCapturing || isValidating
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {currentStep === 4 ? 'Finalizar' : 'Siguiente'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}