import { useNavigate } from 'react-router-dom'
import { CreditCard, Smartphone, RefreshCw, DollarSign, FileText, Calendar, Store, Code, Settings, Layers, Users, GitBranch, Server, Shield, UserCheck, Network } from 'lucide-react'
import '../styles/mainpage-colors.css'

export default function MainPage() {
  const navigate = useNavigate()

  const mockupGroups = [
    {
      id: 'arquitectura',
      title: 'Arquitectura',
      icon: Network,
      color: 'main-primary',
      description: 'Diagramas y documentación del sistema',
      mockups: [
        {
          id: 'arquitectura-actual',
          title: 'Arquitectura Actual',
          description: 'Diagrama de componentes del sistema',
          icon: Network,
          path: '/arquitectura',
          status: 'Disponible'
        }
      ]
    },
    {
      id: 'configuraciones',
      title: 'Configuraciones',
      icon: Settings,
      color: 'main-primary',
      description: 'Configuración y gestión de comercios',
      mockups: [
        {
          id: 'onboarding-comercio',
          title: 'Onboarding Comercio',
          description: 'Registro y configuración de comercios',
          icon: Store,
          path: '/onboarding-comercio',
          status: 'Disponible'
        },
        {
          id: 'integracion-sdk',
          title: 'Integración SDK Payments',
          description: 'Herramientas de desarrollo e integración',
          icon: Code,
          path: '/integracion-sdk',
          status: 'Disponible'
        }
      ]
    },
    {
      id: 'multiriel',
      title: 'MultiRiel',
      icon: Layers,
      color: 'main-accent',
      description: 'Pasarelas de pago con múltiples métodos',
      mockups: [
        {
          id: 'pasarela-multiriel',
          title: 'Pasarela Multiriel',
          description: 'Pasarela de pagos completa con múltiples métodos',
          icon: CreditCard,
          path: '/pasarela-multiriel',
          status: 'Disponible'
        }
      ]
    },
    {
      id: 'casos-p2m',
      title: 'Casos P2M',
      icon: Users,
      color: 'main-secondary',
      description: 'Pagos persona a comercio y casos especiales',
      mockups: [
        {
          id: 'pagos-recurrentes',
          title: 'Pagos Recurrentes Municipios y SAT',
          description: 'Pagos automáticos de servicios públicos',
          icon: Calendar,
          path: '/pagos-recurrentes',
          status: 'Próximamente'
        },
        {
          id: 'pago-planillas',
          title: 'Pago de Planillas',
          description: 'Sistema de nóminas y pagos masivos',
          icon: FileText,
          path: '/pago-planillas',
          status: 'Próximamente'
        },
        {
          id: 'pago-deuda',
          title: 'Pago de Deuda',
          description: 'Gestión y pago de deudas pendientes',
          icon: DollarSign,
          path: '/pago-deuda',
          status: 'Próximamente'
        },
        {
          id: 'devoluciones',
          title: 'Devoluciones',
          description: 'Sistema de reembolsos y devoluciones',
          icon: RefreshCw,
          path: '/devoluciones',
          status: 'Próximamente'
        }
      ]
    },
    {
      id: 'flujos',
      title: 'Flujos',
      icon: GitBranch,
      color: 'main-primary',
      description: 'Flujos de procesos y consentimientos',
      mockups: [
        {
          id: 'psp-tecnologico',
          title: 'PSP Tecnológico Billeteras',
          description: 'Flujo de proveedor de servicios de pago tecnológico',
          icon: Server,
          path: '/psp-tecnologico',
          status: 'Disponible'
        },
        {
          id: 'psp-adquirente-pasarela',
          title: 'PSP Adquirente Pasarela',
          description: 'Flujo de proveedor de servicios de pago adquirente',
          icon: Shield,
          path: '/psp-adquirente',
          status: 'Disponible'
        },
        {
          id: 'psp-adquirente-tpap',
          title: 'PSP Adquirente Tpap',
          description: 'Flujo de proveedor de servicios de pago TPAP',
          icon: Shield,
          path: '/psp-adquirente-tpap',
          status: 'Disponible'
        },
        {
          id: 'consentimiento-usuarios',
          title: 'Consentimiento Usuarios',
          description: 'Proceso de consentimiento para usuarios finales',
          icon: UserCheck,
          path: '/consentimiento-usuarios/home',
          status: 'Disponible'
        },
        {
          id: 'consentimiento-comercios',
          title: 'Consentimiento Comercios (On boarding)',
          description: 'Proceso de consentimiento y registro de comercios',
          icon: Store,
          path: '/onboarding-comercio',
          status: 'Disponible'
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-amber-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mr-6 shadow-md">
                <img src="/assets/img/logo_teto.png" alt="Teto Logo" className="w-18 h-18 object-contain" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">BCRP UPI</h1>
                <p className="text-gray-600">Demostraciones de flujo</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Mockup Groups - Masonry Layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-0">
          {mockupGroups.map((group) => {
            const GroupIcon = group.icon
            
            return (
              <div key={group.id} className="break-inside-avoid mb-6">
                {/* Group Header */}
                <div className="bg-white rounded-t-xl shadow-sm border border-gray-200 p-2">
                  <div className="flex items-center">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700">{group.title}</h3>
                    </div>
                  </div>
                </div>
                
                {/* Group Mockups */}
                <div className="bg-white rounded-b-xl shadow-sm border-l border-r border-b border-gray-200 divide-y divide-gray-100">
                  {group.mockups.map((mockup, index) => {
                    const IconComponent = mockup.icon
                    const isAvailable = mockup.status === 'Disponible'
                    
                    return (
                      <div
                        key={mockup.id}
                        className={`p-3 transition-all duration-300 ${
                          isAvailable 
                            ? 'hover:bg-gray-50 cursor-pointer' 
                            : 'opacity-60 cursor-not-allowed'
                        } ${index === group.mockups.length - 1 ? 'rounded-b-xl' : ''}`}
                        onClick={() => isAvailable && navigate(mockup.path)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 ${group.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 text-sm truncate">{mockup.title}</h4>
                            <p className="text-sm text-gray-600 line-clamp-1">{mockup.description}</p>
                          </div>
                          
                          <div className="flex-shrink-0">
                            {isAvailable ? (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                ✓ Disponible
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                🚧 Próximamente
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">¿Necesitas más información?</h3>
            <p className="text-gray-600 mb-6">
              Estos mockups son demostraciones funcionales que simulan el comportamiento real 
              de nuestras soluciones de pago sin procesar transacciones reales.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>Funcional</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                <span>En desarrollo</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}