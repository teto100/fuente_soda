import { useState, useEffect } from 'react'
import { Shield, Play, RotateCcw, Pause } from 'lucide-react'
import { loadMermaidFlow } from '../utils/mermaidFlowParser'
import { useFlowAnimation } from '../hooks/useFlowAnimation'
import { getConnectionPath } from '../utils/flowPathUtils'

export default function FlowRenderer({ mermaidPath, title = "Flujo Animado", showControls = true, getStepExplanation }) {
  const [flowData, setFlowData] = useState(null)
  const [loading, setLoading] = useState(true)

  const {
    currentStep,
    isPlaying,
    isPaused,
    completedSteps,
    startAnimation,
    pauseAnimation,
    resetAnimation,
    goToStep
  } = useFlowAnimation(flowData?.steps)

  useEffect(() => {
    const loadFlow = async () => {
      setLoading(true)
      const data = await loadMermaidFlow(mermaidPath)
      setFlowData(data)
      setLoading(false)
    }

    if (mermaidPath) {
      loadFlow()
    }
  }, [mermaidPath])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Cargando flujo...</div>
      </div>
    )
  }

  if (!flowData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">Error al cargar el flujo</div>
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
            {showControls && (
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
                  Reset
                </button>
              </div>
            )}
          </div>
          
          <div className="relative" style={{ height: '500px' }}>
            {/* SVG for connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              {flowData.steps.map((step) => {
                const isActive = currentStep === step.id
                const isCompleted = completedSteps.has(step.id)
                
                return (
                  <g key={step.id}>
                    <path
                      d={getConnectionPath(step.from, step.to, step.id, flowData.nodes)}
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
                          path={getConnectionPath(step.from, step.to, step.id, flowData.nodes)}
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
              
              {/* Detailed Step Explanation */}
              {getStepExplanation && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="font-semibold text-gray-900 mb-2 text-sm">¿Qué sucede?</h5>
                  <p className="text-gray-700 text-xs leading-relaxed">
                    {getStepExplanation(currentStep)}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">⏸️</div>
              <p className="text-gray-500 text-sm">Presiona "Iniciar" para comenzar</p>
            </div>
          )}
          
          {/* Step Navigation */}
          {showControls && flowData.steps.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Navegación</h4>
              <div className="grid grid-cols-3 gap-1">
                {flowData.steps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => goToStep(step.id)}
                    className={`p-1 text-xs rounded transition-colors ${
                      currentStep === step.id
                        ? 'bg-blue-600 text-white'
                        : completedSteps.has(step.id)
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}