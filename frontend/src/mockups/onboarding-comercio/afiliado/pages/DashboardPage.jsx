import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building, Settings, CreditCard, Smartphone, QrCode, Lock, Plus } from 'lucide-react'
import OnboardingFlow from '../components/OnboardingFlow'
import '../../../../styles/colors.css'

export default function AfiliadoDashboardPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('transactions')
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)

  const transactions = [
    {
      id: 'TXN001',
      date: '2024-01-15',
      time: '14:30',
      amount: 150.00,
      method: 'Tarjeta',
      status: 'Completado',
      reference: 'VISA ****4532'
    },
    {
      id: 'TXN002', 
      date: '2024-01-15',
      time: '12:15',
      amount: 75.50,
      method: 'Yape',
      status: 'Completado',
      reference: '+51 999 888 777'
    },
    {
      id: 'TXN003',
      date: '2024-01-14',
      time: '18:45',
      amount: 220.00,
      method: 'Plin',
      status: 'Completado',
      reference: '+51 987 654 321'
    },
    {
      id: 'TXN004',
      date: '2024-01-14',
      time: '16:20',
      amount: 89.99,
      method: 'Tarjeta',
      status: 'Pendiente',
      reference: 'MCARD ****8765'
    },
    {
      id: 'TXN005',
      date: '2024-01-13',
      time: '11:30',
      amount: 45.00,
      method: 'Yape',
      status: 'Completado',
      reference: '+51 999 123 456'
    }
  ]

  const getMethodIcon = (method) => {
    switch(method) {
      case 'Tarjeta': return <CreditCard className="w-5 h-5 text-blue-600" />
      case 'Yape': return <Smartphone className="w-5 h-5 text-purple-600" />
      case 'Plin': return <Smartphone className="w-5 h-5 text-green-600" />
      default: return <CreditCard className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completado': return 'bg-green-100 text-green-800'
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800'
      case 'Fallido': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">Panel Comercio Afiliado</h1>
                <p className="text-sm text-gray-600">EMPRESA AFILIADA SAC</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowSettingsModal(true)}
                className="p-2 rounded-lg transition-colors bg-gray-100 hover:bg-gray-200 text-gray-600"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button 
                onClick={() => navigate('/onboarding-comercio')}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
              >
                ← Tipo de Comercio
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Total Hoy</p>
                    <p className="text-2xl font-bold text-gray-900">S/ 225.50</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Transacciones</p>
                    <p className="text-2xl font-bold text-gray-900">5</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <QrCode className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Método Popular</p>
                    <p className="text-lg font-bold text-gray-900">Tarjetas</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Transactions List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Historial de Transacciones</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getMethodIcon(transaction.method)}
                        <div>
                          <p className="font-semibold text-gray-900">{transaction.method}</p>
                          <p className="text-sm text-gray-600">{transaction.reference}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">S/ {transaction.amount.toFixed(2)}</p>
                        <p className="text-sm text-gray-600">{transaction.date} {transaction.time}</p>
                      </div>
                      <div>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </div>

      {/* Onboarding Flow */}
      {showOnboarding && (
        <OnboardingFlow onComplete={() => setShowOnboarding(false)} />
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Configuración</h2>
                <button 
                  onClick={() => setShowSettingsModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="text-gray-400 text-xl">×</span>
                </button>
              </div>
              
              <div className="space-y-3">
                <div 
                  className="p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => alert('Función de cambio de contraseña')}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <Lock className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900 text-sm">Cambio de Contraseña</h3>
                      <p className="text-xs text-gray-600">Actualiza tu contraseña de acceso</p>
                    </div>
                  </div>
                </div>

                <div 
                  className="p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => alert('Función de creación de QR')}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <QrCode className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900 text-sm">Creación de QR</h3>
                      <p className="text-xs text-gray-600">Genera códigos QR para pagos</p>
                    </div>
                  </div>
                </div>

                <div 
                  className="p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setShowSettingsModal(false)
                    setShowOnboarding(true)
                  }}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Plus className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900 text-sm">Creación de UPI VPA</h3>
                      <p className="text-xs text-gray-600">Configura tu dirección de pago UPI</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}