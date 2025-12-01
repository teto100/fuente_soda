import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, Building, CreditCard, Lock } from 'lucide-react'

export default function AsociarCuentaPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState('select-vpa') // select-vpa, select-bank, select-account, create-pin, success
  const [selectedVPA, setSelectedVPA] = useState('')
  const [selectedBank, setSelectedBank] = useState('')
  const [selectedAccount, setSelectedAccount] = useState('')
  const [pin, setPin] = useState('')

  const vpaOptions = ['99999999@yape']
  const banks = ['BCP', 'IBK', 'BIM', 'BBVA', 'Bipay', 'Scotiabank']
  const accounts = [
    { number: '****-1234', type: 'Cuenta Corriente', balance: 'S/ 5,420.00' },
    { number: '****-5678', type: 'Cuenta de Ahorros', balance: 'S/ 12,850.00' }
  ]

  const handleSelectVPA = (vpa) => {
    setSelectedVPA(vpa)
    setStep('select-bank')
  }

  const handleSelectBank = (bank) => {
    setSelectedBank(bank)
    // Simulate validation
    setTimeout(() => {
      setStep('select-account')
    }, 1500)
  }

  const handleSelectAccount = (account) => {
    setSelectedAccount(account.number)
    setStep('create-pin')
  }

  const handleCreatePin = () => {
    if (pin.length === 6) {
      setStep('success')
      setTimeout(() => {
        navigate('/consentimiento-usuarios/home')
      }, 3000)
    }
  }

  const renderStepContent = () => {
    switch (step) {
      case 'select-vpa':
        return (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Selecciona tu VPA</h3>
            <p className="text-gray-600 mb-6">Elige el VPA que deseas asociar a una cuenta bancaria</p>
            
            <div className="space-y-3">
              {vpaOptions.map((vpa) => (
                <button
                  key={vpa}
                  onClick={() => handleSelectVPA(vpa)}
                  className="w-full p-4 rounded-xl border-2 border-gray-200 hover:border-purple-300 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <CreditCard className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">{vpa}</p>
                      <p className="text-sm text-gray-500">VPA activo</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )

      case 'select-bank':
        return (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Selecciona tu Banco</h3>
            <p className="text-gray-600 mb-6">VPA seleccionado: <span className="font-semibold text-purple-600">{selectedVPA}</span></p>
            
            <div className="grid grid-cols-2 gap-3">
              {banks.map((bank) => (
                <button
                  key={bank}
                  onClick={() => handleSelectBank(bank)}
                  className="p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-colors"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Building className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="font-semibold text-gray-900 text-sm">{bank}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )

      case 'select-account':
        return (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Selecciona tu Cuenta</h3>
            <p className="text-gray-600 mb-6">Cuentas encontradas en {selectedBank}</p>
            
            <div className="space-y-3">
              {accounts.map((account, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectAccount(account)}
                  className="w-full p-4 rounded-xl border-2 border-gray-200 hover:border-green-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">{account.number}</p>
                      <p className="text-sm text-gray-500">{account.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{account.balance}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )

      case 'create-pin':
        return (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Crear PIN UPI</h3>
            <p className="text-gray-600 mb-6">Crea un PIN de 6 dígitos para autorizar tus pagos</p>
            
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <Lock className="w-5 h-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">PIN de seguridad</span>
              </div>
              
              <input
                type="password"
                maxLength="6"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                placeholder="••••••"
                className="w-full p-4 text-center text-2xl tracking-widest border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none"
              />
              
              <p className="text-xs text-gray-500 mt-2 text-center">
                Ingresa 6 dígitos numéricos
              </p>
            </div>

            <button
              onClick={handleCreatePin}
              disabled={pin.length !== 6}
              className={`w-full py-4 rounded-xl font-semibold transition-colors ${
                pin.length === 6
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Crear PIN
            </button>
          </div>
        )

      case 'success':
        return (
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">¡Configuración Completa!</h2>
            
            <div className="space-y-3 mb-6">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-600">VPA creado</p>
                <p className="font-semibold text-gray-900">{selectedVPA}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-600">Cuenta asociada</p>
                <p className="font-semibold text-gray-900">{selectedBank} - {selectedAccount}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-600">PIN configurado</p>
                <p className="font-semibold text-gray-900">••••••</p>
              </div>
            </div>
            
            <div className="animate-spin w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full mx-auto"></div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold">Y</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Asociar Cuenta</h1>
                <p className="text-sm text-gray-600">Vinculación bancaria</p>
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

      {/* Mobile Simulator */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-8">
        <div className="w-full max-w-sm bg-black rounded-3xl p-2 shadow-2xl">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl overflow-hidden h-[700px] relative">
            {/* Status Bar */}
            <div className="flex justify-between items-center px-6 py-2 text-white text-xs">
              <span>9:41</span>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-2 border border-white rounded-sm">
                  <div className="w-3 h-1 bg-white rounded-sm m-0.5"></div>
                </div>
              </div>
            </div>
            
            {/* App Header */}
            <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 px-4 py-3">
              <div className="flex items-center">
                <button 
                  onClick={() => navigate('/consentimiento-usuarios/home')}
                  className="mr-4 text-white hover:text-white/80"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold text-white">Asociar Cuenta</h1>
              </div>
            </div>

            {/* Content */}
            <div className="px-4 py-6 overflow-y-auto h-[calc(100%-120px)]">
        {renderStepContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}