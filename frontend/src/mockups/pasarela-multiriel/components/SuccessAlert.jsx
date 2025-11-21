import { CheckCircle } from 'lucide-react'

export default function SuccessAlert({ isVisible, total, onClose }) {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center mx-4">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
        <h2 className="text-2xl font-bold mb-4 text-gray-900">¡Pago Realizado!</h2>
        <p className="text-gray-600 mb-6">Tu pago por S/ {total.toFixed(2)} fue aprobado exitosamente.</p>
        <div className="flex space-x-1 justify-center">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
        <p className="text-sm text-gray-500 mt-4">Redirigiendo al inicio...</p>
      </div>
    </div>
  )
}