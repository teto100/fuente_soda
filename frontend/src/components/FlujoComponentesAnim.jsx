import { useState, useEffect, useRef } from 'react'
import { Shield, Play, RotateCcw, Pause, Smartphone, Building, CreditCard, Server, Users } from 'lucide-react'

export default function FlujoComponentesAnim({ mermaidPath, title = "Flujo Animado" }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [completedSteps, setCompletedSteps] = useState(new Set())
  const [flowData, setFlowData] = useState(null)
  const timeoutRef = useRef(null)

  // Iconos disponibles
  const iconMap = {
    smartphone: Smartphone,
    building: Building,
    creditcard: CreditCard,
    shield: Shield,
    server: Server,
    users: Users
  }

  useEffect(() => {
    // Cargar y parsear el archivo Mermaid
    const loadMermaidFile = async () => {
      try {
        const response = await fetch(mermaidPath)
        const mermaidText = await response.text()
        const parsedData = parseMermaidFlow(mermaidText)
        setFlowData(parsedData)
      } catch (error) {
        console.error('Error loading Mermaid file:', error)
      }
    }

    if (mermaidPath) {
      loadMermaidFile()
    }
  }, [mermaidPath])

  const parseMermaidFlow = (mermaidText) => {
    const lines = mermaidText.split('\n').filter(line => line.trim())
    const nodes = {}
    const steps = []
    let stepId = 1

    lines.forEach(line => {
      // Parsear nodos: A[Label|icon|color|group|x|y]
      const nodeMatch = line.match(/(\w+)\[([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|(\d+)\|(\d+)\]/)
      if (nodeMatch) {
        const [, id, label, icon, color, group, x, y] = nodeMatch
        nodes[id] = {
          x: parseInt(x),
          y: parseInt(y),
          label,
          color,
          icon: iconMap[icon.toLowerCase()] || Building,
          group
        }
      }

      // Parsear conexiones: A -->|Label|delay| B
      const connectionMatch = line.match(/(\w+)\s*-->\|([^|]+)\|(\d+)\|\s*(\w+)/)
      if (connectionMatch) {
        const [, from, label, delay, to] = connectionMatch
        steps.push({
          id: stepId++,
          from,
          to,
          label,
          delay: parseInt(delay)
        })
      }
    })

    return { nodes, steps }
  }

  const getStepExplanation = (step) => {
    if (!flowData) return "Cargando..."
    const stepData = flowData.steps[step - 1]
    return stepData ? `${stepData.label}` : "Procesando..."
  }

  const getConnectionPath = (fromNode, toNode, stepId) => {
    if (!flowData) return ""
    
    const from = flowData.nodes[fromNode]
    const to = flowData.nodes[toNode]
    if (!from || !to) return ""

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
    
    // Mover el punto final 40 píxeles antes del centro de la caja
    toX = toX - (unitX * 40)
    toY = toY - (unitY * 40)
    
    // Crear trayectoria curva con separación horizontal
    let midX = (fromX + toX) / 2
    const midY = (fromY + toY) / 2
    const baseOffset = Math.abs(fromX - toX) > Math.abs(fromY - toY) ? 20 : 30
    
    // Separación horizontal para evitar colisiones
    const horizontalOffset = (stepId % 4 - 2) * 20
    midX = midX + horizontalOffset
    const offset = baseOffset
    
    return `M ${fromX} ${fromY} Q ${midX} ${midY - offset} ${toX} ${toY}`
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
    if (!flowData || stepIndex >= flowData.steps.length) {
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
    }, flowData.steps[stepIndex].delay)
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

  if (!flowData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Cargando flujo...</div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Flow Diagram - 2/3 width */}
      <div className="xl:col-span-2">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-4 border-blue-200 h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            <div className="flex items-center space-x-2">
              {!isPlaying && !isPaused ? (
                <button 
                  onClick={startAnimation}
                  className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center text-sm"
                >
                  <Play className="w-3 h-3 mr-1" />
                  {currentStep > 0 ? 'Continuar' : 'Iniciar'}
                </button>
              ) : isPlaying ? (
                <button 
                  onClick={pauseAnimation}
                  className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors flex items-center text-sm"
                >
                  <Pause className="w-3 h-3 mr-1" />
                  Pausar
                </button>
              ) : (
                <button 
                  onClick={startAnimation}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center text-sm"
                >
                  <Play className="w-3 h-3 mr-1" />
                  Reanudar
                </button>
              )}
              <button 
                onClick={resetAnimation}
                className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center text-sm"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Reiniciar
              </button>
            </div>
          </div>
          
          <div className="relative" style={{ height: '500px' }}>
            {/* SVG for connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              {flowData.steps.map((step, index) => {
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
                      className={`transition-all duration-500 ${isActive ? 'animate-pulse' : ''}`}
                      strokeDasharray={isActive ? '8,4' : 'none'}
                    />
                    {isActive && (
                      <circle r="4" fill="#3B82F6" className="animate-pulse">
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
                <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
                  <polygon points="0 0, 8 3, 0 6" fill="#6B7280" />
                </marker>
                <marker id="arrowhead-active" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
                  <polygon points="0 0, 8 3, 0 6" fill="#3B82F6" />
                </marker>
                <marker id="arrowhead-completed" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
                  <polygon points="0 0, 8 3, 0 6" fill="#10B981" />
                </marker>
              </defs>
            </svg>

            {/* Nodes */}
            {Object.entries(flowData.nodes).map(([key, node]) => {
              const IconComponent = node.icon
              const isInvolved = flowData.steps.some(step => 
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
            <span className="bg-blue-100 p-1 rounded-lg mr-2 text-sm">📊</span>
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
                    {flowData.steps[currentStep - 1]?.label}
                  </h4>
                  <p className="text-blue-700 text-xs">
                    📤 {flowData.nodes[flowData.steps[currentStep - 1]?.from]?.label}
                  </p>
                  <p className="text-blue-700 text-xs">
                    📥 {flowData.nodes[flowData.steps[currentStep - 1]?.to]?.label}
                  </p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Progreso</span>
                  <span>{completedSteps.size}/{flowData.steps.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(completedSteps.size / flowData.steps.length) * 100}%` }}
                  ></div>
                </div>
                
                {/* Step Navigation */}
                <div className="space-y-2">
                  <h6 className="text-xs font-semibold text-gray-700">Ir a paso:</h6>
                  <div className="grid grid-cols-4 gap-1">
                    {flowData.steps.map((step, index) => (
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
              <p className="text-gray-600 text-xs">Presiona "Iniciar" para ver el procesamiento paso a paso</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}