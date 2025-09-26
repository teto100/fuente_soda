import { ShoppingCart } from 'lucide-react'

export default function LoadingTransition({ isVisible, message = "Procesando..." }) {
  if (!isVisible) return null

  const renderMessage = () => {
    if (message.includes('Esperando la respuesta de Plin')) {
      const parts = message.split('Plin ')
      if (parts.length === 2 && parts[1].trim()) {
        return (
          <p className="text-lg font-semibold text-gray-800">
            {parts[0]}Plin <span className="text-purple-600 font-bold">{parts[1]}</span>
          </p>
        )
      }
    }
    return <p className="text-lg font-semibold text-gray-800">{message}</p>
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center">
        <div className="animate-bounce mb-4">
          <ShoppingCart className="w-16 h-16 text-blue-600" />
        </div>
        {renderMessage()}
        <div className="flex space-x-1 mt-4">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    </div>
  )
}