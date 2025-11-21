import { useState, useEffect } from 'react'
import { Building, ArrowRight, CheckCircle, Camera, User, FileText, QrCode, Shield, Upload, Eye, Clock } from 'lucide-react'
import QRCode from 'qrcode'
import '../../../../../styles/colors.css'

export default function LargeOnboardingFlow({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedVPA, setSelectedVPA] = useState('')
  const [isCapturing, setIsCapturing] = useState(false)
  const [isValidating, setIsValidating] = useState(false)
  const [validationComplete, setValidationComplete] = useState(false)
  const [qrCode, setQrCode] = useState('')
  const [documentsUploaded, setDocumentsUploaded] = useState(false)
  const [validationMethod, setValidationMethod] = useState('')
  const [showDocumentAlert, setShowDocumentAlert] = useState(false)

  const steps = [
    { id: 1, title: 'Datos Básicos', icon: User, status: 'current' },
    { id: 2, title: 'Documentos', icon: FileText, status: 'pending' },
    { id: 3, title: 'Validación', icon: Shield, status: 'pending' },
    { id: 4, title: 'Creación VPA', icon: QrCode, status: 'pending' },
    { id: 5, title: 'Finalización', icon: CheckCircle, status: 'pending' }
  ]

  const vpaOptions = [
    'Bata',
    'Tienda Bata', 
    'Comercio Bata',
    'Bata SAC',
    'Bata Corp'
  ]

  const handleBiometricValidation = () => {
    setIsCapturing(true)
    
    setTimeout(() => {
      setIsCapturing(false)
      setIsValidating(true)
      
      setTimeout(() => {
        setIsValidating(false)
        setValidationComplete(true)
      }, 5000)
    }, 3000)
  }

  const handleDocuSignValidation = () => {
    setShowDocumentAlert(true)
    setTimeout(() => {
      setShowDocumentAlert(false)
      setValidationComplete(true)
    }, 3000)
  }

  const generateQR = async () => {
    if (selectedVPA) {
      const vpaAddress = `${selectedVPA.toLowerCase().replace(/\s+/g, '')}@niubiz`
      const upiData = `upi://pay?pa=${vpaAddress}&pn=Tienda Bata&am=0.00&cu=PEN&tn=QR Comercio`
      try {
        const qr = await QRCode.toDataURL(upiData, { width: 200, margin: 2 })
        setQrCode(qr)
      } catch (err) {
        console.error(err)
      }
    }
  }

  useEffect(() => {
    if (currentStep === 5 && selectedVPA) {
      generateQR()
    }
  }, [currentStep, selectedVPA])

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3">
                  <Building className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Onboarding Large Enterprise</h1>
                  <p className="text-sm text-blue-100">Proceso completo de verificación</p>
                </div>
              </div>
              <button 
                onClick={onComplete}
                className="p-2 hover:bg-blue-600 rounded-lg transition-colors"
              >
                <span className="text-white text-xl">×</span>
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
                <h2 className="text-lg font-bold text-gray-900 mb-4">Datos Básicos - Large Enterprise</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Razón Social</label>
                    <input 
                      type="text" 
                      value="BATA PERU SAC"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">RUC</label>
                    <input 
                      type="text" 
                      value="20123456789"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Representante Legal</label>
                    <input 
                      type="text" 
                      value="Carlos Rodriguez Martinez"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">DNI Representante</label>
                    <input 
                      type="text" 
                      value="87654321"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Correo Corporativo</label>
                    <input 
                      type="email" 
                      value="carlos.rodriguez@bata.com.pe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <input 
                      type="tel" 
                      value="+51 987 123 456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Documentos Requeridos</h2>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">Vigencia de Poderes</h3>
                    <p className="text-sm text-gray-600 mb-4">Documento que acredite la vigencia de poderes del representante legal</p>
                    <button 
                      onClick={() => setDocumentsUploaded(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      Subir Documento
                    </button>
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">Licencia de Funcionamiento</h3>
                    <p className="text-sm text-gray-600 mb-4">Licencia municipal de funcionamiento vigente</p>
                    <button 
                      onClick={() => setDocumentsUploaded(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      Subir Documento
                    </button>
                  </div>

                  {documentsUploaded && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-green-800 font-medium">Documentos cargados exitosamente</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Método de Validación</h2>
                <p className="text-gray-600 mb-6">Selecciona el método de validación para tu empresa:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div 
                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                      validationMethod === 'biometric' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setValidationMethod('biometric')}
                  >
                    <div className="text-center">
                      <Camera className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">Validación Biométrica</h3>
                      <p className="text-sm text-gray-600">Validación facial inmediata</p>
                    </div>
                  </div>
                  
                  <div 
                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                      validationMethod === 'docusign' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setValidationMethod('docusign')}
                  >
                    <div className="text-center">
                      <FileText className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">DocuSign</h3>
                      <p className="text-sm text-gray-600">Firma digital de documentos</p>
                    </div>
                  </div>
                </div>

                {validationMethod === 'biometric' && (
                  <div className="text-center">
                    {!isCapturing && !isValidating && !validationComplete && (
                      <div>
                        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Camera className="w-16 h-16 text-gray-400" />
                        </div>
                        <button 
                          onClick={handleBiometricValidation}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                        >
                          Iniciar Validación Biométrica
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

                {validationMethod === 'docusign' && (
                  <div className="text-center">
                    <div className="w-32 h-32 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-16 h-16 text-purple-600" />
                    </div>
                    <button 
                      onClick={handleDocuSignValidation}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                      Procesar con DocuSign
                    </button>
                  </div>
                )}
              </div>
            )}

            {currentStep === 4 && (
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

            {currentStep === 5 && (
              <div className="text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">¡Documentos Validados Exitosamente!</h2>
                <p className="text-gray-600 mb-6">Tu UPI VPA ha sido creado y está listo para usar</p>
                
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
                          <p className="text-xs text-blue-700 mt-2">Código QR UPI BCR - {selectedVPA.toLowerCase().replace(/\s+/g, '')}@niubiz</p>
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
                disabled={
                  (currentStep === 2 && !documentsUploaded) ||
                  (currentStep === 3 && !validationComplete) || 
                  (currentStep === 4 && !selectedVPA) || 
                  isCapturing || isValidating
                }
                className={`px-4 py-2 rounded-lg transition-colors flex items-center text-sm ${
                  (currentStep === 2 && !documentsUploaded) ||
                  (currentStep === 3 && !validationComplete) || 
                  (currentStep === 4 && !selectedVPA) || 
                  isCapturing || isValidating
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {currentStep === 5 ? 'Finalizar' : 'Siguiente'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Document Alert Modal */}
      {showDocumentAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Documentos en Validación</h3>
              <p className="text-gray-600 mb-4">
                Tus documentos serán validados en un plazo de <strong>1 día hábil</strong>. 
                Recibirás una notificación cuando el proceso esté completo.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-yellow-800 text-sm">
                  <strong>Nota:</strong> Mientras tanto, puedes continuar con la configuración de tu VPA.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}