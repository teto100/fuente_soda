import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Play, RotateCcw, Smartphone, Building, CreditCard, ArrowRight, Users, Server, DollarSign, Pause, SkipForward } from 'lucide-react'
import '../../../styles/colors.css'

export default function PSPAdquirentePage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [completedSteps, setCompletedSteps] = useState(new Set())
  const timeoutRef = useRef(null)

  const getStepExplanation = (step) => {
    const explanations = {
      1: "El cliente en la App Yape decide realizar un pago y envía la solicitud a la Pasarela de Falabella para procesar la transacción.",
      2: "La Pasarela de Falabella recibe la solicitud y llama a la API del PSP Niubiz para iniciar el proceso de pago.",
      3: "El PSP Niubiz genera un ID único de transacción y lo devuelve a la Pasarela de Falabella para identificar el pago.",
      4: "La Pasarela de Falabella presenta al cliente el VPA (Virtual Payment Address) junto con el ID de transacción.",
      5: "La App Yape utiliza el VPA proporcionado para iniciar el pago a través del PSP Yape.",
      6: "El PSP Yape envía una petición de débito al UPI Switch incluyendo el ID de transacción.",
      7: "UPI Switch recibe la petición y envía la instrucción de débito al Banco del Yapero.",
      8: "El Banco del Yapero procesa el débito y confirma la operación al UPI Switch.",
      9: "El UPI Switch confirma el éxito de la transacción al PSP Niubiz, incluyendo el ID para la conciliación.",
      10: "El PSP Niubiz verifica el ID, confirma el éxito y vincula la transacción con la orden de Falabella.",
      11: "La Pasarela de Falabella registra, concilia usando el ID de transacción y procede con la liquidación.",
      12: "Finalmente, la Pasarela de Falabella notifica al cliente que el pago se ha completado exitosamente."
    }
    return explanations[step] || "Procesando..."
  }

  const flowSteps = [
    { id: 1, from: 'yape', to: 'falabella', label: 'Cliente solicita pago', delay: 3000 },
    { id: 2, from: 'falabella', to: 'niubiz', label: 'Llama a API del PSP', delay: 3500 },
    { id: 3, from: 'niubiz', to: 'falabella', label: 'PSP crea y devuelve Txn ID', delay: 3200 },
    { id: 4, from: 'falabella', to: 'yape', label: 'Pasarela presenta VPA con ID', delay: 3000 },
    { id: 5, from: 'yape', to: 'psp-yape', label: 'App Yape usa VPA para iniciar pago', delay: 3800 },
    { id: 6, from: 'psp-yape', to: 'upiswitch', label: 'Petición de débito (Incluye ID)', delay: 3300 },
    { id: 7, from: 'upiswitch', to: 'banco', label: 'Instruye débito', delay: 2800 },
    { id: 8, from: 'banco', to: 'upiswitch', label: 'Confirma débito', delay: 2500 },
    { id: 9, from: 'upiswitch', to: 'niubiz', label: 'Confirma éxito (Incluye ID)', delay: 3000 },
    { id: 10, from: 'niubiz', to: 'falabella', label: 'PSP verifica ID, notifica éxito', delay: 3500 },
    { id: 11, from: 'falabella', to: 'liquidacion', label: 'Registra, concilia y liquida', delay: 4000 },
    { id: 12, from: 'falabella', to: 'yape', label: 'Notifica al Cliente', delay: 3000 }
  ]

  const nodes = {
    // Cliente
    yape: { x: 60, y: 60, label: 'App Yape', color: '#BCE8F8', icon: Smartphone, group: 'Cliente' },
    
    // Comercio/Adquisición
    falabella: { x: 320, y: 140, label: 'Pasarela Falabella', color: '#F8E8BC', icon: Building, group: 'Comercio' },
    niubiz: { x: 320, y: 300, label: 'PSP Niubiz', color: '#F8E0B2', icon: Shield, group: 'Comercio' },
    
    // Pagador
    'psp-yape': { x: 60, y: 380, label: 'PSP Yape', color: '#C0E6F0', icon: CreditCard, group: 'Pagador' },
    banco: { x: 60, y: 520, label: 'Banco de Yapero', color: '#C0E6F0', icon: Building, group: 'Pagador' },
    
    // Red/upiswitch
    upiswitch: { x: 190, y: 450, label: 'Upi Switch', color: '#D0D8F8', icon: Building, group: 'Red' },
    
    // Liquidación
    liquidacion: { x: 540, y: 140, label: 'Cuenta Liquidación', color: '#D7F6F4', icon: CreditCard, group: 'Liquidación' }
  }

  const startAnimation = () => {
    setIsPlaying(true)
    setIsPaused(false)
    if (currentStep === 0) {
      setCompletedSteps(new Set())
    }
    runStep(currentStep)
  }

  const runStep = (stepIndex) => {
    if (stepIndex >= flowSteps.length) {
      setIsPlaying(false)
      setIsPaused(false)
      return
    }
    
    setCurrentStep(stepIndex + 1)
    
    timeoutRef.current = setTimeout(() => {
      if (!isPaused) {
        setCompletedSteps(prev => new Set([...prev, stepIndex + 1]))
        runStep(stepIndex + 1)
      }
    }, flowSteps[stepIndex].delay)
  }

  const pauseAnimation = () => {
    setIsPaused(true)
    setIsPlaying(false)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  const resetAnimation = () => {
    setIsPlaying(false)
    setIsPaused(false)
    setCurrentStep(0)
    setCompletedSteps(new Set())
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  const goToStep = (stepNumber) => {
    setIsPlaying(false)
    setIsPaused(false)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setCurrentStep(stepNumber)
    const newCompletedSteps = new Set()
    for (let i = 1; i < stepNumber; i++) {
      newCompletedSteps.add(i)
    }
    setCompletedSteps(newCompletedSteps)
  }

  const getConnectionPath = (fromNode, toNode, stepId) => {
    const from = nodes[fromNode]
    const to = nodes[toNode]
    const fromX = (from.x + 40) * 0.85
    const fromY = (from.y + 28) * 0.85
    let toX = (to.x + 40) * 0.85
    let toY = (to.y + 28) * 0.85
    
    // Calcular dirección y acortar la línea 40 píxeles antes de la caja objetivo
    const dx = toX - fromX
    const dy = toY - fromY
    const length = Math.sqrt(dx * dx + dy * dy)
    const unitX = dx / length
    const unitY = dy / length
    
    // Mover el punto final 40 píxeles antes del centro de la caja para que se detenga antes del borde
    toX = toX - (unitX * 40)
    toY = toY - (unitY * 40)
    
    // Crear trayectoria curva con offset único para evitar colisiones
    let midX = (fromX + toX) / 2
    const midY = (fromY + toY) / 2
    const baseOffset = Math.abs(fromX - toX) > Math.abs(fromY - toY) ? 20 : 30
    
    // Agregar separación horizontal basada en el ID del paso para separar las flechas a lo ancho
    const horizontalOffset = (stepId % 4 - 2) * 20 // Varía entre -40, -20, 0, 20
    midX = midX + horizontalOffset
    const offset = baseOffset
    
    return `M ${fromX} ${fromY} Q ${midX} ${midY - offset} ${toX} ${toY}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">PSP Adquirente</h1>
                <p className="text-sm text-gray-600">Pasarela o Gateway</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {!isPlaying && !isPaused ? (
                <button 
                  onClick={startAnimation}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {currentStep > 0 ? 'Continuar' : 'Iniciar Flujo'}
                </button>
              ) : isPlaying ? (
                <button 
                  onClick={pauseAnimation}
                  className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors flex items-center"
                >
                  <Pause className="w-4 h-4 mr-2" />
                  Pausar
                </button>
              ) : (
                <button 
                  onClick={startAnimation}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Reanudar
                </button>
              )}
              <button 
                onClick={resetAnimation}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reiniciar
              </button>
              <button 
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
              >
                ← Centro de Mockups
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Flow Diagram */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Flow Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-bold text-lg mb-4">
            <Shield className="w-6 h-6 mr-2" />
            Flujo PSP Adquirente - Pasarela o Gateway
          </div>
        </div>
        
        {/* Flow Diagram and Step Information - Side by Side */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Flow Diagram - 2/3 width */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 border-4 border-blue-200 h-full">
              <div className="relative" style={{ height: '600px' }}>
                {/* Group Labels */}
                <div className="absolute top-2 left-2 bg-blue-100 px-2 py-1 rounded text-xs font-semibold text-blue-800">
                  Cliente
                </div>
                <div className="absolute top-2 left-72 bg-yellow-100 px-2 py-1 rounded text-xs font-semibold text-yellow-800">
                  Comercio/Adquisición
                </div>
                <div className="absolute top-80 left-2 bg-cyan-100 px-2 py-1 rounded text-xs font-semibold text-cyan-800">
                  Pagador
                </div>
                <div className="absolute top-2 right-2 bg-green-100 px-2 py-1 rounded text-xs font-semibold text-green-800">
                  Liquidación
                </div>
                {/* SVG for connections */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                  {flowSteps.map((step, index) => {
                    const isActive = currentStep === step.id
                    const isCompleted = completedSteps.has(step.id)
                    
                    return (
                      <g key={step.id}>
                        <path
                          d={getConnectionPath(step.from, step.to, step.id)}
                          stroke={isCompleted ? '#10B981' : isActive ? '#3B82F6' : '#E5E7EB'}
                          strokeWidth={isActive ? '4' : isCompleted ? '3' : '2'}
                          fill="none"
                          markerEnd={`url(#arrowhead${isCompleted ? '-completed' : isActive ? '-active' : ''})`}
                          className={`transition-all duration-500 ${
                            isActive ? 'animate-pulse' : ''
                          }`}
                          strokeDasharray={isActive ? '8,4' : 'none'}
                        />
                        {isActive && (
                          <circle
                            r="4"
                            fill="#3B82F6"
                            className="animate-pulse"
                          >
                            <animateMotion
                              dur="1s"
                              repeatCount="indefinite"
                              path={getConnectionPath(step.from, step.to, step.id)}
                            />
                          </circle>
                        )}
                      </g>
                    )
                  })}
                  
                  {/* Arrow markers */}
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="8"
                      markerHeight="6"
                      refX="7"
                      refY="3"
                      orient="auto"
                      markerUnits="strokeWidth"
                    >
                      <polygon
                        points="0 0, 8 3, 0 6"
                        fill="#6B7280"
                      />
                    </marker>
                    <marker
                      id="arrowhead-active"
                      markerWidth="8"
                      markerHeight="6"
                      refX="7"
                      refY="3"
                      orient="auto"
                      markerUnits="strokeWidth"
                    >
                      <polygon
                        points="0 0, 8 3, 0 6"
                        fill="#3B82F6"
                      />
                    </marker>
                    <marker
                      id="arrowhead-completed"
                      markerWidth="8"
                      markerHeight="6"
                      refX="7"
                      refY="3"
                      orient="auto"
                      markerUnits="strokeWidth"
                    >
                      <polygon
                        points="0 0, 8 3, 0 6"
                        fill="#10B981"
                      />
                    </marker>
                  </defs>
                </svg>

                {/* Nodes */}
                {Object.entries(nodes).map(([key, node]) => {
                  const IconComponent = node.icon
                  const isInvolved = flowSteps.some(step => 
                    (step.from === key || step.to === key) && 
                    (currentStep === step.id || completedSteps.has(step.id))
                  )
                  
                  return (
                    <div
                      key={key}
                      className={`absolute w-20 h-14 rounded-xl border-2 flex flex-col items-center justify-center text-xs font-semibold transition-all duration-500 ${
                        isInvolved 
                          ? 'border-blue-500 shadow-lg scale-110 z-10' 
                          : 'border-gray-300 shadow-sm z-0'
                      }`}
                      style={{
                        left: `${node.x * 0.85}px`,
                        top: `${node.y * 0.85}px`,
                        backgroundColor: node.color,
                        zIndex: isInvolved ? 10 : 2
                      }}
                    >
                      <IconComponent className={`w-3 h-3 mb-1 ${isInvolved ? 'text-blue-600' : 'text-gray-600'}`} />
                      <span className={`text-center leading-tight ${isInvolved ? 'text-blue-900' : 'text-gray-700'}`}>
                        {node.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Step Information - 1/3 width */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-4 border-l-4 border-blue-500 h-full">
              <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center">
                <span className="bg-blue-100 p-1 rounded-lg mr-2 text-sm">
                  📊
                </span>
                Paso Actual
              </h3>
              
              {currentStep > 0 ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm animate-pulse">
                      {currentStep}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-blue-900 text-sm">
                        {flowSteps[currentStep - 1]?.label}
                      </h4>
                      <p className="text-blue-700 text-xs">
                        📤 {nodes[flowSteps[currentStep - 1]?.from]?.label}
                      </p>
                      <p className="text-blue-700 text-xs">
                        📥 {nodes[flowSteps[currentStep - 1]?.to]?.label}
                      </p>
                    </div>
                  </div>
                  
                  {/* Detailed Step Explanation */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h5 className="font-semibold text-gray-900 mb-2 text-sm">¿Qué sucede?</h5>
                    <p className="text-gray-700 text-xs leading-relaxed">
                      {getStepExplanation(currentStep)}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progreso</span>
                      <span>{completedSteps.size}/{flowSteps.length}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(completedSteps.size / flowSteps.length) * 100}%` }}
                      ></div>
                    </div>
                    
                    {/* Step Navigation */}
                    <div className="space-y-2">
                      <h6 className="text-xs font-semibold text-gray-700">Ir a paso:</h6>
                      <div className="grid grid-cols-4 gap-1">
                        {flowSteps.map((step, index) => (
                          <button
                            key={step.id}
                            onClick={() => goToStep(step.id)}
                            className={`text-xs px-2 py-1 rounded transition-colors ${
                              currentStep === step.id
                                ? 'bg-blue-600 text-white'
                                : completedSteps.has(step.id)
                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {step.id}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2 text-sm">¡Listo para comenzar!</h4>
                  <p className="text-gray-600 text-xs">Presiona "Iniciar Flujo" para ver el procesamiento paso a paso</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Posibles Clientes y Monetización */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Posibles Clientes */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-green-500">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-green-100 p-2 rounded-lg mr-3">🏢</span>
              Posibles Clientes
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🌐</span>
                </div>
                <span className="font-semibold text-gray-900">Comercios Pago Web</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">📱</span>
                </div>
                <span className="font-semibold text-gray-900">Comercios Pago App</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <span className="font-semibold text-gray-900">Comercios Pasarela Niubiz</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🔗</span>
                </div>
                <span className="font-semibold text-gray-900">Comercios Pago Link</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🔗</span>
                </div>
                <span className="font-semibold text-gray-900">PFS</span>
              </div>
                      <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🔄</span>
                </div>
                <span className="font-semibold text-gray-900">Recurrentes</span>
              </div>
            </div>
          </div>

          {/* Monetización */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-blue-500">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 p-2 rounded-lg mr-3">💰</span>
              Monetización
            </h3>
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-bold text-blue-900 mb-3 flex items-center">
                  <span className="mr-2">📅</span>
                  Fee por Mantenimiento
                </h4>
                <div className="bg-white rounded p-3 border">
                  <span className="text-sm font-medium text-gray-700">Cobro Mensual</span>
                  <p className="text-xs text-gray-600 mt-1">Tarifa fija por mantener la cuenta activa</p>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-bold text-blue-900 mb-3 flex items-center">
                  <span className="mr-2">📊</span>
                  Costo por Rango de Transacción
                </h4>
                <div className="space-y-2">
                  <div className="bg-white rounded p-2 border flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">1 - 10,000</span>
                    <span className="text-sm font-bold text-green-600">Tarifa 1</span>
                  </div>
                  <div className="bg-white rounded p-2 border flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">10,000 - 40,000</span>
                    <span className="text-sm font-bold text-yellow-600">Tarifa 2</span>
                  </div>
                  <div className="bg-white rounded p-2 border flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">40,000 - 100,000</span>
                    <span className="text-sm font-bold text-orange-600">Tarifa 3</span>
                  </div>
                  <div className="bg-white rounded p-2 border flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">100,000 - 1,000,000</span>
                    <span className="text-sm font-bold text-blue-600">Tarifa 4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border-t-4 border-blue-500">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <span className="bg-blue-100 p-2 rounded-lg mr-3">
              🔄
            </span>
            Características del PSP Adquirente
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-bold text-blue-900 mb-3 flex items-center">
                <span className="mr-2">🏪</span>
                Procesamiento Comercial
              </h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Gestión completa de transacciones P2M</li>
                <li>• Integración con pasarelas de pago</li>
                <li>• Conciliación automática de órdenes</li>
                <li>• Liquidación a cuentas comerciales</li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h4 className="font-bold text-green-900 mb-3 flex items-center">
                <span className="mr-2">🔒</span>
                Seguridad y Control
              </h4>
              <ul className="space-y-2 text-sm text-green-800">
                <li>• Validación de ID de transacción</li>
                <li>• Vinculación con órdenes específicas</li>
                <li>• Registro completo de auditoría</li>
                <li>• Prevención de fraudes</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg p-4 border border-blue-300">
            <h4 className="font-bold text-gray-900 mb-3 text-center">
              💡 Ventajas del Modelo Adquirente
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🎯</span>
                </div>
                <p className="font-semibold text-gray-900">Control Comercial</p>
                <p className="text-gray-700">Gestión completa del ciclo de pago comercial</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">📊</span>
                </div>
                <p className="font-semibold text-gray-900">Trazabilidad</p>
                <p className="text-gray-700">Seguimiento completo de transacciones</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">💼</span>
                </div>
                <p className="font-semibold text-gray-900">Integración</p>
                <p className="text-gray-700">Compatible con sistemas comerciales</p>
              </div>
            </div>
          </div>
        </div>

        {/* Flow Comparison */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border-t-4 border-purple-500">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <span className="bg-purple-100 p-2 rounded-lg mr-3">
              📊
            </span>
            Comparación de Flujos PSP
          </h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aspecto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PSP Adquirente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PSP Adquirente TPAP</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PSP Tecnológico</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Tipo de Transacción</td>
                  <td className="px-6 py-4 text-sm text-gray-600">P2M Pasarela o Gateway</td>
                  <td className="px-6 py-4 text-sm text-gray-600">P2M con SDK</td>
                  <td className="px-6 py-4 text-sm text-gray-600">P2P (SDK)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Integración</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Web/API</td>
                  <td className="px-6 py-4 text-sm text-gray-600">SDK iOS - Android</td>
                  <td className="px-6 py-4 text-sm text-gray-600">SDK iOS - Android</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Experiencia UX</td>
                  <td className="px-6 py-4 text-sm text-yellow-600">⚡ Transparente</td>
                  <td className="px-6 py-4 text-sm text-green-600">⚡ Nativa</td>
                  <td className="px-6 py-4 text-sm text-green-600">⚡ Nativa</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Complejidad implementacion</td>
                  <td className="px-6 py-4 text-sm text-yellow-600">🟡 Media </td>
                  <td className="px-6 py-4 text-sm text-red-600">🔴 Muy Alta</td>
                  <td className="px-6 py-4 text-sm text-red-600">🔴 Muy Alta</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Control Comercial</td>
                  <td className="px-6 py-4 text-sm text-green-600">🟢 Completo</td>
                  <td className="px-6 py-4 text-sm text-yellow-600">🟡  Intermedio</td>
                  <td className="px-6 py-4 text-sm text-red-600">🔴 Limitado</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Conexión LBTR</td>
                  <td className="px-6 py-4 text-sm text-green-600">✅</td>
                  <td className="px-6 py-4 text-sm text-yellow-600">✅</td>
                  <td className="px-6 py-4 text-sm text-red-600">✅</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Adminitracion VPA</td>
                  <td className="px-6 py-4 text-sm text-green-600">🟢 Completo</td>
                  <td className="px-6 py-4 text-sm text-green-600">🟢 Completo</td>
                  <td className="px-6 py-4 text-sm text-red-600">🔴 Limitado</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Exposición al fraude </td>
                  <td className="px-6 py-4 text-sm text-yellow-600">🟡 Media</td>
                  <td className="px-6 py-4 text-sm text-red-600">🔴 Muy Alta</td>
                  <td className="px-6 py-4 text-sm text-red-600">🔴 Muy Alta</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Validación afiliación </td>
                  <td className="px-6 py-4 text-sm text-gray-600">Biometría facial / Firmas digitales </td>
                  <td className="px-6 py-4 text-sm text-gray-600">Firmas digitales</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Firmas digitales</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Tipo  afiliación </td>
                  <td className="px-6 py-4 text-sm text-gray-600">Autoatendida - Gestionada </td>
                  <td className="px-6 py-4 text-sm text-gray-600">Gestionada</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Gestionada</td>
                </tr>
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}