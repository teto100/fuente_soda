import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Store, Building2, ShoppingBag, Home, ArrowRight, Mail, MessageCircle, Eye, Shield, CreditCard } from 'lucide-react'
import '../../../../styles/colors.css'

export default function NoAfiliadoSegmentSelectionPage() {
  const navigate = useNavigate()
  const [selectedSegment, setSelectedSegment] = useState(null)

  const segments = [
    {
      id: 'large',
      title: 'Large',
      icon: Building2,
      color: 'bg-blue-600',
      contactPerson: 'Jefe de operaciones',
      contactChannels: ['Correo electrónico'],
      validation: ['Biometría facial', 'Validación de vigencia de poderes'],
      description: 'Empresas grandes con operaciones complejas'
    },
    {
      id: 'medium',
      title: 'Medium',
      icon: Store,
      color: 'bg-green-600',
      contactPerson: 'Encargado o Dueño',
      contactChannels: ['Correo electrónico', 'WhatsApp'],
      validation: ['Biometría facial', 'Validación de vigencia de poderes'],
      description: 'Empresas medianas con crecimiento sostenido'
    },
    {
      id: 'small',
      title: 'Small',
      icon: ShoppingBag,
      color: 'bg-orange-600',
      contactPerson: 'Dueño o cajero',
      contactChannels: ['Correo electrónico', 'WhatsApp'],
      validation: ['Biometría facial'],
      description: 'Pequeñas empresas y comercios locales'
    },
    {
      id: 'micro',
      title: 'Micro',
      icon: Home,
      color: 'bg-purple-600',
      contactPerson: 'Dueño',
      contactChannels: ['WhatsApp'],
      validation: ['Biometría facial'],
      description: 'Microempresas y emprendimientos'
    }
  ]

  const handleContinue = () => {
    if (selectedSegment) {
      navigate(`/onboarding-comercio/no-afiliado/${selectedSegment.id}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-3">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">Comercio No Afiliado</h1>
                <p className="text-sm text-gray-600">Proceso completo de verificación</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/onboarding-comercio')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
            >
              ← Tipo de Comercio
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-1xl font-bold text-gray-900 mb-4">AutoAfiliación (App Movil o Dashboard Web con magic Link)</h2>
          <h2 className="text-1xl font-bold text-gray-900 mb-4">Asesor comercial (Backoffice Web)</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
          Selecciona un segmento </p>
        </div>

        {/* Segments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {segments.map((segment) => {
            const IconComponent = segment.icon
            const isSelected = selectedSegment?.id === segment.id
            
            return (
              <div
                key={segment.id}
                className={`bg-white rounded-xl shadow-sm border-2 p-6 cursor-pointer transition-all duration-300 ${
                  isSelected 
                    ? 'border-primary shadow-lg scale-105' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
                onClick={() => setSelectedSegment(segment)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-16 h-16 ${segment.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{segment.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{segment.description}</p>
                    
                    <div className="space-y-3">
                      {/* Contact Person */}
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center">
                          <span className="text-xs">👤</span>
                        </div>
                        <span className="text-sm text-gray-700">
                          <strong>Contacto:</strong> {segment.contactPerson}
                        </span>
                      </div>
                      
                      {/* Contact Channels */}
                      <div className="flex items-start space-x-2">
                        <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center mt-0.5">
                          <MessageCircle className="w-3 h-3 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <span className="text-sm text-gray-700">
                            <strong>Canales:</strong>
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {segment.contactChannels.map((channel, index) => (
                              <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                                {channel === 'Correo electrónico' && <Mail className="w-3 h-3 mr-1" />}
                                {channel === 'WhatsApp' && <MessageCircle className="w-3 h-3 mr-1" />}
                                {channel}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Validation */}
                      <div className="flex items-start space-x-2">
                        <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center mt-0.5">
                          <Shield className="w-3 h-3 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <span className="text-sm text-gray-700">
                            <strong>Validación:</strong>
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {segment.validation.map((validation, index) => (
                              <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                {validation === 'Biometría facial' && <Eye className="w-3 h-3 mr-1" />}
                                {validation === 'Validación de vigencia de poderes' && <Shield className="w-3 h-3 mr-1" />}
                                {validation}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Bank Validation Note */}
                      <div className="flex items-center space-x-2 bg-yellow-50 p-2 rounded-lg">
                        <CreditCard className="w-4 h-4 text-yellow-600" />
                        <span className="text-xs text-yellow-800">
                          <strong>Incluye:</strong> Validación de cuenta bancaria
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {isSelected && (
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button 
            onClick={handleContinue}
            disabled={!selectedSegment}
            className={`px-8 py-3 rounded-lg transition-all duration-300 flex items-center mx-auto ${
              selectedSegment
                ? 'bg-primary hover:bg-blue-700 text-white shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continuar con {selectedSegment?.title || 'Segmento'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  )
}