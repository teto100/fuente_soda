import { useNavigate } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import '../../../styles/colors.css'

export default function SuccessPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Pago Realizado!</h2>
        <p className="text-gray-600 mb-6">Tu pago fue aprobado.</p>
        <div className="space-y-3">
          <button 
            onClick={() => navigate('/pasarela-multiriel')}
            className="w-full bg-primary hover:bg-primary text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Nueva Compra
          </button>
          <button 
            onClick={() => navigate('/home')}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            ← Centro de Mockups
          </button>
        </div>
      </div>
    </div>
  )
}