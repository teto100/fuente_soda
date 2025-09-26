import { useNavigate } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

export default function SuccessPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Pago Realizado!</h2>
        <p className="text-gray-600 mb-6">Tu pago por S/ 1333.00 fue aprobado.</p>
        <button 
          onClick={() => navigate('/')}
          className="btn-primary"
        >
          Volver
        </button>
      </div>
    </div>
  )
}