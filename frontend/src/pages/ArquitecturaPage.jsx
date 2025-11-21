import { useNavigate } from 'react-router-dom'
import { Network, Monitor, Smartphone, Globe, Shield, CreditCard, Database, Hexagon } from 'lucide-react'
import ReactFlow, { 
  MiniMap, 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState,
  Position,
  Handle
} from 'reactflow'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import 'reactflow/dist/style.css'

const TPSAnimation = ({ isActive, onComplete, duration = 10 }) => {
  if (!isActive) return null
  
  return (
    <motion.div
      className="absolute z-50 bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg"
      initial={{ x: 50, y: 190, opacity: 0 }}
      animate={{
        x: [50, 250, 400, 520, 650, 650],
        y: [190, 190, 280, 350, 150, 280],
        opacity: [0, 1, 1, 1, 1, 0]
      }}
      transition={{
        duration: duration * 0.4,
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        ease: 'easeInOut'
      }}
      onAnimationComplete={onComplete}
    >
      400 TPS
    </motion.div>
  )
}

const TPS2Animation = ({ isActive, onComplete, duration = 10 }) => {
  if (!isActive) return null
  
  return (
    <motion.div
      className="absolute z-50 bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg"
      initial={{ x: 50, y: 190, opacity: 0 }}
      animate={{
        x: [50, 250, 400, 650],
        y: [190, 190, 255, 100],
        opacity: [0, 1, 1, 0]
      }}
      transition={{
        duration: duration * 0.3,
        times: [0, 0.3, 0.7, 1],
        ease: 'easeInOut'
      }}
      onAnimationComplete={onComplete}
    >
      400 TPS
    </motion.div>
  )
}

const ScalingEffect = ({ nodeId, isScaling }) => {
  if (!isScaling) return null
  
  return (
    <>
      <motion.div
        className="absolute inset-0 bg-green-500 opacity-20 rounded-xl"
        animate={{
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 0.8,
          repeat: 3,
          ease: 'easeInOut'
        }}
      />
      <motion.div
        className="absolute -right-8 top-1/2 transform -translate-y-1/2 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
      >
        x{Math.floor(Math.random() * 3) + 2}
      </motion.div>
    </>
  )
}

const OptimizedDBEffect = ({ isOptimized }) => {
  if (!isOptimized) return null
  
  return (
    <>
      <motion.div
        className="absolute inset-0 bg-blue-500 opacity-20 rounded-xl"
        animate={{
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 0.8,
          repeat: 3,
          ease: 'easeInOut'
        }}
      />
      <motion.div
        className="absolute -right-16 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold whitespace-nowrap"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
      >
        🔄 Ciclo QR
      </motion.div>
    </>
  )
}

const ProblemAlert = ({ problem, index, duration, position = 'left' }) => {
  const xPos = position === 'left' ? 50 : 850
  const yPos = position === 'left' ? 50 + (index * 60) : 50 + (index * 50)
  
  return (
    <motion.div
      className="absolute z-40 bg-yellow-500 text-black px-3 py-2 rounded-lg text-xs font-semibold shadow-lg max-w-48"
      initial={{ opacity: 0, scale: 0.8, x: xPos, y: yPos }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ delay: (duration * 0.4) + (index * 0.5), duration: 0.3 }}
    >
      ⚠️ {problem}
    </motion.div>
  )
}

const EcomAnimation = ({ isActive, onComplete, duration = 8 }) => {
  if (!isActive) return null
  
  return (
    <motion.div
      className="absolute z-50 bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg"
      initial={{ x: 1050, y: 130, opacity: 0 }}
      animate={{
        x: [1050, 850],
        y: [130, 130],
        opacity: [0, 1, 1, 0]
      }}
      transition={{
        duration: duration * 0.4,
        times: [0, 0.3, 0.8, 1],
        ease: 'easeInOut'
      }}
      onAnimationComplete={onComplete}
    >
      Delay o caída
    </motion.div>
  )
}

const OverloadEffect = ({ nodeId, isOverloaded }) => {
  if (!isOverloaded) return null
  
  return (
    <motion.div
      className="absolute inset-0 bg-red-500 opacity-30 rounded-xl"
      animate={{
        opacity: [0.3, 0.6, 0.3]
      }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  )
}

const CustomNode = ({ data, selected }) => {
  const IconComponent = data.icon
  const isLarge = data.large
  const isMedium = data.medium
  const isChannel = data.type === 'channel'
  const isOverloaded = data.overloaded
  const isScaling = data.scaling
  const isOptimizedDB = data.optimizedDB
  const isExternalNetwork = ['Red de\ntarjetas (Ecom)', 'Red de\ntarjetas (MPP)', 'UPI\nBCR', 'Cuentas\nbancarias', 'Yape/Plin', 'Billeteras\nForaneas'].includes(data.label)
  
  return (
    <div className={`bg-white rounded-xl border-2 border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 relative ${
      isLarge ? 'px-8 py-6' : isMedium ? 'px-6 py-4' : 'px-4 py-3'
    } ${isOverloaded ? 'border-red-500' : ''} ${isScaling ? 'border-green-500' : ''} ${isOptimizedDB ? 'border-blue-500' : ''}`}>
      <OverloadEffect isOverloaded={isOverloaded} />
      <ScalingEffect isScaling={isScaling} />
      <OptimizedDBEffect isOptimized={isOptimizedDB} />
      {!isExternalNetwork && data.label !== 'Billeteras' && data.label !== 'Base de Datos\n35+ TB' && data.label !== 'Base de datos' && <Handle type="target" position={Position.Left} />}
      {isChannel && <Handle type="target" position={Position.Left} id="wallet-input" style={{ top: '20%' }} />}
      {data.label === 'QR Manager' && <Handle type="target" position={Position.Top} id="top" />}
      {data.label === 'PBC Autorizacion\nMultiriel (Géminis)' && <Handle type="target" position={Position.Top} id="top" />}
      {data.label === 'Base de datos' && <Handle type="target" position={Position.Top} id="top" />}
      {data.label === 'Lógica de\nnegocio y enrutamiento' && (
        <>
          <Handle type="source" position={Position.Bottom} id="bottom" />
          <Handle type="source" position={Position.Right} />
        </>
      )}
      {data.label === 'Hub de\nServicios' && (
        <>
          <Handle type="target" position={Position.Left} />
          <Handle type="source" position={Position.Right} />
        </>
      )}
      {data.label === 'MACE' && <Handle type="target" position={Position.Left} />}
      {data.label === 'Autorizacion\nE-commerce' && <Handle type="target" position={Position.Left} />}
      {data.label === 'Proyecto 28' && <Handle type="target" position={Position.Top} />}
      <div className="flex flex-col items-center justify-center">
        <div 
          className={`rounded-lg flex items-center justify-center mb-2 ${
            isLarge ? 'w-16 h-16' : isMedium ? 'w-12 h-12' : 'w-8 h-8'
          }`}
          style={{ backgroundColor: data.color }}
        >
          <IconComponent className={`text-white ${
            isLarge ? 'w-8 h-8' : isMedium ? 'w-6 h-6' : 'w-4 h-4'
          }`} />
        </div>
        <span className={`font-semibold text-gray-700 text-center leading-tight ${
          isLarge ? 'text-sm' : 'text-xs'
        }`}>
          {data.label}
        </span>
      </div>
      {isExternalNetwork ? 
        <Handle type="source" position={Position.Bottom} /> :
        data.label === 'Base de Datos\n35+ TB' ? 
          <Handle type="source" position={Position.Left} id="left" /> : 
          data.label === 'Autorización\nMPP' || data.label === 'Base de datos' ? null :
          <Handle type="source" position={Position.Right} />
      }
    </div>
  )
}

const nodeTypes = {
  custom: CustomNode,
}

const ProposedQRLifecycleAnimation = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  
  const steps = [
    { id: 'created', label: 'Creado', color: '#3B82F6', icon: '🆕', desc: 'QR generado' },
    { id: 'paid', label: 'Pagado', color: '#10B981', icon: '✅', desc: 'Pago realizado' },
    { id: 'processed', label: 'Procesado', color: '#8B5CF6', icon: '⚡', desc: 'Transacción procesada' },
    { id: 'settled', label: 'Liquidado', color: '#059669', icon: '💰', desc: 'Fondos transferidos' },
    { id: 'disabled-auto', label: 'Inhabilitado\n(automático)', color: '#F59E0B', icon: '⏰', desc: 'Deshabilitado automático' },
    { id: 'disabled-manual', label: 'Inhabilitado\n(manual)', color: '#EF4444', icon: '🚫', desc: 'Deshabilitado manual' }
  ]
  
  useEffect(() => {
    let interval
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep(prev => (prev + 1) % steps.length)
      }, 1500)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying])
  
  return (
    <div className="mt-8 bg-green-50 border border-green-200 rounded-xl shadow-sm p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-green-800">🔄 Ciclo de Vida Propuesto del QR - Diseño Óptimo</h3>
      </div>
      
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-96 h-96">
          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full border-4 border-green-300 flex items-center justify-center shadow-lg">
            <div className="text-center">
              <div className="text-2xl mb-1">🔄</div>
              <div className="text-sm font-bold text-green-800">Ciclo QR</div>
            </div>
          </div>
          
          {/* Circular progress track */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border-4 border-gray-200" />
          
          {steps.map((step, index) => {
            // Custom angles to position Procesado more to the right
            const angles = [-90, -30, 30, 90, 150, 210] // Creado, Pagado, Procesado, Liquidado, Inhabilitado(auto), Inhabilitado(manual)
            const angle = angles[index]
            const radius = 140
            let x = Math.cos(angle * Math.PI / 180) * radius
            let y = Math.sin(angle * Math.PI / 180) * radius
            
            // Move only Procesado further to the right
            if (index === 2) { // Procesado is at index 2
              x += 30 // Add 30px to the right
            }
            
            // Move Liquidado down and to the right
            if (index === 3) { // Liquidado is at index 3
              x += 20 // Add 20px to the right
              y += 20 // Add 20px down
            }
            
            return (
              <div 
                key={step.id} 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`
                }}
              >
                <motion.div
                  className="w-20 h-20 rounded-full flex items-center justify-center relative"
                  style={{ backgroundColor: step.color }}
                  animate={{
                    scale: currentStep === index ? [1, 1.4, 1.2] : 1,
                    boxShadow: currentStep === index ? 
                      `0 0 30px ${step.color}80` : 
                      '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                >
                  <motion.span 
                    className="text-white font-bold text-xl"
                    animate={{ 
                      rotate: currentStep === index ? [0, 360] : 0,
                      scale: currentStep === index ? [1, 1.3, 1] : 1
                    }}
                    transition={{ duration: 0.8 }}
                  >
                    {step.icon}
                  </motion.span>
                  
                  <AnimatePresence>
                    {currentStep === index && (
                      <motion.div
                        className="absolute -inset-3 border-3 border-yellow-400 rounded-full"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ 
                          scale: [0.8, 1.3, 1],
                          opacity: [0, 1, 0.8]
                        }}
                        exit={{ scale: 1.3, opacity: 0 }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
                
                <motion.div 
                  className="mt-3 text-center"
                  animate={{
                    scale: currentStep === index ? 1.1 : 1
                  }}
                >
                  <motion.p 
                    className="font-semibold text-sm leading-tight"
                    style={{ color: step.color }}
                    animate={{ 
                      fontWeight: currentStep === index ? 700 : 600
                    }}
                  >
                    {step.label}
                  </motion.p>
                  <motion.p 
                    className="text-xs text-gray-600 mt-1"
                    animate={{
                      opacity: currentStep === index ? 1 : 0.7
                    }}
                  >
                    {step.desc}
                  </motion.p>
                </motion.div>
              </div>
            )
          })}
          

        </div>
        
        {/* Progress indicator */}
        <motion.div 
          className="mt-8 bg-white rounded-full p-3 shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex space-x-3">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="w-3 h-3 rounded-full border-2"
                style={{ borderColor: step.color }}
                animate={{
                  backgroundColor: currentStep >= index ? step.color : 'transparent',
                  scale: currentStep === index ? 1.5 : 1
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="bg-white rounded-lg p-6 border border-green-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-6">
          <h4 className="text-lg font-semibold text-green-800 mb-2">✅ Ventajas del Diseño Óptimo</h4>
          <p className="text-sm text-green-700 mb-3">
            <strong>Ciclo completo y robusto:</strong> 6 estados que cubren todo el flujo de transacción desde creación hasta liquidación.
          </p>
          <p className="text-sm text-green-700">
            <strong>Estados intermedios críticos:</strong> Incluye validación, autorización y confirmación para mayor seguridad y trazabilidad.
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-green-800 mb-3">🎯 Beneficios Operacionales</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• <strong>Trazabilidad completa:</strong> Seguimiento detallado de cada transacción</li>
              <li>• <strong>Manejo de errores:</strong> Estados intermedios permiten recuperación</li>
              <li>• <strong>Auditoría mejorada:</strong> Registro de cada paso del proceso</li>
              <li>• <strong>Reconciliación automática:</strong> Estados claros facilitan conciliación</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-green-800 mb-3">🔒 Beneficios de Seguridad</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• <strong>Validación temprana:</strong> Detección de fraudes en etapas iniciales</li>
              <li>• <strong>Autorización granular:</strong> Control de acceso por estado</li>
              <li>• <strong>Rollback seguro:</strong> Reversión controlada en caso de fallas</li>
              <li>• <strong>Compliance:</strong> Cumplimiento de regulaciones financieras</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-green-800 mb-3">📊 Optimización de Base de Datos</h4>
            
            {/* Database Animation */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4 relative overflow-hidden">
              <div className="flex justify-center space-x-8">
                {/* QR Dinámico Table */}
                <motion.div 
                  className="bg-blue-100 border-2 border-blue-300 rounded p-3 w-24 h-16 flex flex-col items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                    borderColor: ['#93C5FD', '#3B82F6', '#93C5FD']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <div className="text-xs font-bold text-blue-700">QR Dinámico</div>
                  <div className="text-xs text-blue-600">Tabla A</div>
                </motion.div>
                
                {/* QR Estático Table */}
                <motion.div 
                  className="bg-green-100 border-2 border-green-300 rounded p-3 w-24 h-16 flex flex-col items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                    borderColor: ['#86EFAC', '#10B981', '#86EFAC']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5
                  }}
                >
                  <div className="text-xs font-bold text-green-700">QR Estático</div>
                  <div className="text-xs text-green-600">Tabla B</div>
                </motion.div>
              </div>
              
              {/* Animated Search Lines */}
              <motion.div
                className="absolute top-1/2 left-1/4 w-16 h-0.5 bg-blue-500 rounded-full"
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
              
              <motion.div
                className="absolute top-1/2 right-1/4 w-16 h-0.5 bg-green-500 rounded-full"
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5
                }}
              />
              
              <div className="text-center mt-2">
                <span className="text-xs text-gray-600 font-medium">Búsquedas Optimizadas por Tipo</span>
              </div>
            </div>
            
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• <strong>Segmentación mejorada:</strong> Búsqueda y escritura optimizada por tipo de QR</li>
              <li>• <strong>QR Dinámico:</strong> Efímero y amplio - gestión especializada</li>
              <li>• <strong>QR Estático:</strong> Efímero y amplio - almacenamiento optimizado</li>
              <li>• <strong>Consultas rápidas:</strong> Índices especializados por grupo de QR</li>
            </ul>
          </div>
        </div>
      </motion.div>
      

    </div>
  )
}

const QRLifecycleAnimation = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  
  const steps = [
    { id: 'created', label: 'QR Creado', color: '#3B82F6', icon: 'QR' },
    { id: 'paid', label: 'QR Pagado', color: '#10B981', icon: '✓' }
  ]
  
  useEffect(() => {
    let interval
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep(prev => (prev + 1) % steps.length)
      }, 2000)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying])
  
  return (
    <div className="mt-8 bg-orange-50 border border-orange-200 rounded-xl shadow-sm p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-orange-800">🔄 Ciclo de Vida Actual del QR - Diseño Deficiente</h3>
      </div>
      
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center space-x-24 relative">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center relative">
              <motion.div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-4 relative"
                style={{ backgroundColor: step.color }}
                animate={{
                  scale: currentStep === index ? [1, 1.2, 1] : 1,
                  boxShadow: currentStep === index ? 
                    '0 0 20px rgba(59, 130, 246, 0.5)' : 
                    '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                <motion.span 
                  className="text-white font-bold text-lg"
                  animate={{ rotate: currentStep === index ? 360 : 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {step.icon}
                </motion.span>
                
                <AnimatePresence>
                  {currentStep === index && (
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-xs">⚡</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              <motion.p 
                className="font-semibold text-center"
                style={{ color: step.color }}
                animate={{ 
                  scale: currentStep === index ? 1.1 : 1,
                  fontWeight: currentStep === index ? 700 : 600
                }}
              >
                {step.label}
              </motion.p>
              <p className="text-xs text-gray-600 text-center mt-1">
                {index === 0 ? 'Estado inicial' : 'Estado final'}
              </p>
            </div>
          ))}
          
          {/* Animated Connection Line */}
          <motion.div 
            className="absolute top-10 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
            style={{ width: '120px', left: '-10%', transform: 'translateX(-50%)' }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </div>
      </div>
      
      <motion.div 
        className="bg-white rounded-lg p-6 border border-orange-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-6">
          <h4 className="text-lg font-semibold text-red-800 mb-2">⚠️ Fallas en el Diseño Conceptual</h4>
          <p className="text-sm text-red-700 mb-3">
            <strong>Ciclo extremadamente corto:</strong> Solo 2 estados (Creado → Pagado) ignoran la complejidad real de las transacciones financieras.
          </p>
          <p className="text-sm text-red-700">
            <strong>Ausencia de estados críticos:</strong> No contempla validaciones, autorizaciones, confirmaciones, errores o estados intermedios necesarios.
          </p>
        </div>
        
        <h4 className="text-lg font-semibold text-orange-800 mb-4">Consecuencias de este Ciclo Simplificado:</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '⏱️', title: 'Tiempos Elevados', desc: 'Consultas lentas por la cantidad masiva de data en la base de datos', color: 'red' },
            { icon: '🔍', title: 'Trazabilidad Limitada', desc: 'No se sabe exactamente qué pasó entre los estados', color: 'yellow' },
            { icon: '=', title: 'Tratamiento Igual', desc: 'QRs dinámicos y estáticos se manejan de la misma manera', color: 'purple' }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className={`w-12 h-12 bg-${item.color}-500 rounded-full flex items-center justify-center mx-auto mb-3`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-white font-bold">{item.icon}</span>
              </motion.div>
              <h5 className={`font-semibold text-${item.color}-800 mb-2`}>{item.title}</h5>
              <p className={`text-sm text-${item.color}-700`}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

// Configuración de animación TPS
const TPS_CONFIG = {
  defaultDuration: 20,
  availableDurations: [5, 10, 15],
  problems: [
    'Tiempos de respuesta de más de 20 segundos',
    'No impresión de voucher',
    'Autorización fallida',
    'Tareas de anulación demoradas'
  ],
  overloadedNodes: ['qr-pos', 'qr-manager', 'database']
}

// Configuración de animación Ecom
const ECOM_CONFIG = {
  defaultDuration: 8,
  problems: [
    'Demora en tiempo de respuesta',
    'Transacciones no confirmadas',
    'Encolamiento de anulaciones'
  ],
  overloadedNodes: ['auth-api']
}

export default function ArquitecturaPage() {
  const navigate = useNavigate()
  const [showTPS, setShowTPS] = useState(false)
  const [showEcom, setShowEcom] = useState(false)
  const [showTPS2, setShowTPS2] = useState(false)
  const [overloadedNodes, setOverloadedNodes] = useState(new Set())
  const [scalingNodes, setScalingNodes] = useState(new Set())
  const [optimizedDBNodes, setOptimizedDBNodes] = useState(new Set())
  const [showProblems, setShowProblems] = useState(false)
  const [showEcomProblems, setShowEcomProblems] = useState(false)
  const [animationDuration, setAnimationDuration] = useState(TPS_CONFIG.defaultDuration)

  const initialNodes = [
    // Billeteras (izquierda)
    { id: 'yape', type: 'custom', position: { x: 50, y: 190 }, data: { label: 'Billeteras', icon: Smartphone, color: '#10B981' }, sourcePosition: Position.Right, targetPosition: Position.Left },
    
    // Canales (centro-izquierda)
    { id: 'pfs', type: 'custom', position: { x: 250, y: -20 }, data: { label: "Pf's", icon: Globe, color: '#3B82F6', type: 'channel' }, sourcePosition: Position.Right, targetPosition: Position.Left },
    { id: 'ecom', type: 'custom', position: { x: 250, y: 75 }, data: { label: 'E-Commerce', icon: Globe, color: '#3B82F6', type: 'channel' }, sourcePosition: Position.Right, targetPosition: Position.Left },
    { id: 'pos', type: 'custom', position: { x: 250, y: 190 }, data: { label: 'POS', icon: Monitor, color: '#3B82F6', type: 'channel' }, sourcePosition: Position.Right, targetPosition: Position.Left },
    { id: 'pinpad', type: 'custom', position: { x: 250, y: 320 }, data: { label: 'PinPad', icon: CreditCard, color: '#3B82F6', type: 'channel' }, sourcePosition: Position.Right, targetPosition: Position.Left },
    
    // Intermediarios QR (centro)
    { id: 'qr-iso', type: 'custom', position: { x: 400, y: 280 }, data: { label: 'QR ISO', icon: Database, color: '#DC2626' }, sourcePosition: Position.Right, targetPosition: Position.Left },
    { id: 'qr-pos', type: 'custom', position: { x: 520, y: 350 }, data: { label: 'QR POS', icon: Database, color: '#DC2626' }, sourcePosition: Position.Right, targetPosition: Position.Left },
    
    // QR Manager (centro-derecha)
    { id: 'qr-manager', type: 'custom', position: { x: 650, y: 150 }, data: { label: 'QR Manager', icon: Database, color: '#DC2626', large: true }, sourcePosition: Position.Right, targetPosition: Position.Left },
    
    // Base de Datos (arriba de QR Manager)
    { id: 'database', type: 'custom', position: { x: 480, y: -50 }, data: { label: 'Base de Datos\n6+ TB', icon: Database, color: '#DC2626', large: true }, sourcePosition: Position.Left, targetPosition: Position.Left },
    
    // Autorizadores (derecha)
    { id: 'auth-api', type: 'custom', position: { x: 850, y: 130 }, data: { label: 'Autorización\nE-Commerce', icon: Shield, color: '#7C3AED' }, sourcePosition: Position.Right, targetPosition: Position.Left },
    { id: 'auth-mpp', type: 'custom', position: { x: 900, y: 260 }, data: { label: 'Autorización\nMPP', icon: Shield, color: '#7C3AED' }, sourcePosition: Position.Right, targetPosition: Position.Left },
    
    // Pago Web/App (extrema derecha)
    { id: 'pago-web', type: 'custom', position: { x: 1050, y: 130 }, data: { label: 'Pago Web\n/ App', icon: Globe, color: '#059669' }, sourcePosition: Position.Right, targetPosition: Position.Left },
  ]

  const initialEdges = [
    // Yape lee QR de todos los canales (por lado izquierdo)
    { id: 'e1', source: 'yape', target: 'pfs', targetHandle: 'wallet-input', animated: true, style: { stroke: '#10B981' } },
    { id: 'e2', source: 'yape', target: 'ecom', targetHandle: 'wallet-input', animated: true, style: { stroke: '#10B981' } },
    { id: 'e12', source: 'yape', target: 'pos', targetHandle: 'wallet-input', animated: true, style: { stroke: '#10B981' } },
    { id: 'e15', source: 'yape', target: 'pinpad', targetHandle: 'wallet-input', animated: true, style: { stroke: '#10B981' } },
    
    // Canales a QR Manager
    { id: 'e3', source: 'pfs', target: 'qr-manager', animated: true, style: { stroke: '#3B82F6' } },
    { id: 'e4', source: 'ecom', target: 'qr-manager', animated: true, style: { stroke: '#3B82F6' } },
    
    // POS y PinPad a través de intermediarios
    { id: 'e5', source: 'pos', target: 'qr-iso', animated: true, style: { stroke: '#DC2626' } },
    { id: 'e6', source: 'pinpad', target: 'qr-iso', animated: true, style: { stroke: '#DC2626' } },
    { id: 'e7', source: 'qr-iso', target: 'qr-pos', animated: true, style: { stroke: '#DC2626' } },
    { id: 'e8', source: 'qr-pos', target: 'qr-manager', animated: true, style: { stroke: '#DC2626' } },
    
    // Base de datos a QR Manager
    { id: 'e11', source: 'database', target: 'qr-manager', sourceHandle: 'left', targetHandle: 'top', animated: true, style: { stroke: '#DC2626' } },
    
    // QR Manager a autorizadores
    { id: 'e9', source: 'qr-manager', target: 'auth-api', animated: true, style: { stroke: '#7C3AED' } },
    { id: 'e10', source: 'qr-manager', target: 'auth-mpp', animated: true, style: { stroke: '#7C3AED' } },
    
    // Autorización E-Commerce a Pago Web/App
    { id: 'e12', source: 'auth-api', target: 'pago-web', animated: true, style: { stroke: '#059669' } },
  ]

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  
  // QR 2.0 Architecture nodes and edges
  const qr20Nodes = [
    // Billeteras (izquierda)
    { id: 'yape-2', type: 'custom', position: { x: 50, y: 190 }, data: { label: 'Billeteras', icon: Smartphone, color: '#10B981' }, sourcePosition: Position.Right, targetPosition: Position.Left },
    
    // Canales (centro-izquierda)
    { id: 'pfs-2', type: 'custom', position: { x: 250, y: -20 }, data: { label: "Pf's", icon: Globe, color: '#3B82F6', type: 'channel' }, sourcePosition: Position.Right, targetPosition: Position.Left },
    { id: 'ecom-2', type: 'custom', position: { x: 250, y: 75 }, data: { label: 'E-Commerce', icon: Globe, color: '#3B82F6', type: 'channel' }, sourcePosition: Position.Right, targetPosition: Position.Left },
    { id: 'pos-2', type: 'custom', position: { x: 250, y: 190 }, data: { label: 'POS', icon: Monitor, color: '#3B82F6', type: 'channel' }, sourcePosition: Position.Right, targetPosition: Position.Left },
    { id: 'pinpad-2', type: 'custom', position: { x: 250, y: 320 }, data: { label: 'PinPad', icon: CreditCard, color: '#3B82F6', type: 'channel' }, sourcePosition: Position.Right, targetPosition: Position.Left },
    
    // ISO NB (intermediario)
    { id: 'iso-nb', type: 'custom', position: { x: 400, y: 255 }, data: { label: 'ISO NB', icon: Database, color: '#00a8f4' }, sourcePosition: Position.Right, targetPosition: Position.Left },
    
    // Canales POS y PinPad
    { id: 'canal-pos', type: 'custom', position: { x: 520, y: 190 }, data: { label: 'Canal POS', icon: Monitor, color: '#00a8f4' }, sourcePosition: Position.Right, targetPosition: Position.Left },
    { id: 'canal-pinpad', type: 'custom', position: { x: 520, y: 320 }, data: { label: 'Canal PinPad', icon: CreditCard, color: '#00a8f4' }, sourcePosition: Position.Right, targetPosition: Position.Left },
    
    // Canales Ecom y Externo
    { id: 'canal-ecom', type: 'custom', position: { x: 400, y: -20 }, data: { label: 'Canal Ecom', icon: Globe, color: '#00a8f4' }, sourcePosition: Position.Right, targetPosition: Position.Left },
    { id: 'canal-externo', type: 'custom', position: { x: 400, y: 75 }, data: { label: 'Canal Externo', icon: Globe, color: '#00a8f4' }, sourcePosition: Position.Right, targetPosition: Position.Left },
    
    // Capa de negocio
    { id: 'api-gateway', type: 'custom', position: { x: 650, y: 100 }, data: { label: 'Lógica de\nnegocio y enrutamiento', icon: Network, color: '#00a8f4', large: true } },
    
    // Autorizacion E-commerce
    { id: 'auth-ecom', type: 'custom', position: { x: 950, y: 500 }, data: { label: 'Autorizacion\nE-commerce', icon: Shield, color: '#DC2626' } },
    
    // Hub de Servicios
    { id: 'hub-negocios', type: 'custom', position: { x: 1000, y: 350 }, data: { label: 'Hub de\nServicios', icon: Hexagon, color: '#00a8f4', large: true } },
    
    // Proyecto 28
    { id: 'proyecto-28', type: 'custom', position: { x: 1200, y: 450 }, data: { label: 'Proyecto 28', icon: Database, color: '#00a8f4' } },
    
    // MACE
    { id: 'mace', type: 'custom', position: { x: 1200, y: 350 }, data: { label: 'MACE', icon: Shield, color: '#00a8f4' } },
    
    // Base de datos
    { id: 'database-qr20', type: 'custom', position: { x: 700, y: 400 }, data: { label: 'Base de datos', icon: Database, color: '#00a8f4', medium: true } },
    
    // PBC Autorizacion Multiriel (Géminis)
    { id: 'pbc-multi', type: 'custom', position: { x: 1000, y: 180 }, data: { label: 'PBC Autorizacion\nMultiriel (Géminis)', icon: Database, color: '#00a8f4', large: true } },

    
    // Procesadores Externos - Arriba del PBC
    { id: 'visa-mc-ecom', type: 'custom', position: { x: 700, y: -50 }, data: { label: 'Red de\ntarjetas (Ecom)', icon: CreditCard, color: '#1F2937' } },
    { id: 'visa-mc-mpp', type: 'custom', position: { x: 900, y: -50 }, data: { label: 'Red de\ntarjetas (MPP)', icon: CreditCard, color: '#1F2937' } },
    { id: 'upi-network', type: 'custom', position: { x: 1100, y: -50 }, data: { label: 'UPI\nBCR', icon: Network, color: '#7C3AED' } },
    { id: 'bank-network', type: 'custom', position: { x: 1200, y: -50 }, data: { label: 'Cuentas\nbancarias', icon: Database, color: '#059669' } },
    { id: 'billeteras-ext', type: 'custom', position: { x: 1350, y: -50 }, data: { label: 'Yape/Plin', icon: Smartphone, color: '#10B981' } },
    { id: 'billeteras-foraneas', type: 'custom', position: { x: 1350, y: 85 }, data: { label: 'Billeteras\nForaneas', icon: Smartphone, color: '#F59E0B' } }
  ]
  
  const qr20Edges = [
    // Billeteras conecta con todos los canales
    { id: 'e1-2', source: 'yape-2', target: 'pfs-2', targetHandle: 'wallet-input', animated: true, style: { stroke: '#10B981' } },
    { id: 'e2-2', source: 'yape-2', target: 'ecom-2', targetHandle: 'wallet-input', animated: true, style: { stroke: '#10B981' } },
    { id: 'e21-2', source: 'yape-2', target: 'pos-2', targetHandle: 'wallet-input', animated: true, style: { stroke: '#10B981' } },
    { id: 'e22-2', source: 'yape-2', target: 'pinpad-2', targetHandle: 'wallet-input', animated: true, style: { stroke: '#10B981' } },
    
    // POS y PinPad a través de ISO NB
    { id: 'e3-2', source: 'pos-2', target: 'iso-nb', animated: true, style: { stroke: '#00a8f4' } },
    { id: 'e4-2', source: 'pinpad-2', target: 'iso-nb', animated: true, style: { stroke: '#00a8f4' } },
    
    // ISO NB a Canales
    { id: 'e23-2', source: 'iso-nb', target: 'canal-pos', animated: true, style: { stroke: '#00a8f4' } },
    { id: 'e24-2', source: 'iso-nb', target: 'canal-pinpad', animated: true, style: { stroke: '#00a8f4' } },
    
    // Pf's y E-Commerce a sus canales
    { id: 'e5-2', source: 'pfs-2', target: 'canal-ecom', animated: true, style: { stroke: '#00a8f4' } },
    { id: 'e6-2', source: 'ecom-2', target: 'canal-externo', animated: true, style: { stroke: '#00a8f4' } },
    
    // Todos los canales a Capa de negocio
    { id: 'e25-2', source: 'canal-ecom', target: 'api-gateway', animated: true, style: { stroke: '#00a8f4' } },
    { id: 'e26-2', source: 'canal-externo', target: 'api-gateway', animated: true, style: { stroke: '#00a8f4' } },
    { id: 'e27-2', source: 'canal-pos', target: 'api-gateway', animated: true, style: { stroke: '#00a8f4' } },
    { id: 'e28-2', source: 'canal-pinpad', target: 'api-gateway', animated: true, style: { stroke: '#00a8f4' } },
    
    // Lógica de negocio a Autorizacion E-commerce
    { id: 'e32-2', source: 'api-gateway', target: 'auth-ecom', animated: true, style: { stroke: '#DC2626' } },
    
    // Lógica de negocio a Hub de negocios
    { id: 'e30-2', source: 'api-gateway', target: 'hub-negocios', animated: true, style: { stroke: '#00a8f4' } },
    
    // Hub de negocios a MACE
    { id: 'e31-2', source: 'hub-negocios', target: 'mace', animated: true, style: { stroke: '#00a8f4' } },
    
    // Hub de negocios a Proyecto 28
    { id: 'e33-2', source: 'hub-negocios', target: 'proyecto-28', animated: true, style: { stroke: '#00a8f4' } },
    
    // Lógica de negocio a Base de datos (por abajo)
    { id: 'e29-2', source: 'api-gateway', target: 'database-qr20', sourceHandle: 'bottom', targetHandle: 'top', animated: true, style: { stroke: '#00a8f4' } },
    
    // Lógica de negocio a PBC (por la derecha)
    { id: 'e10-2', source: 'api-gateway', target: 'pbc-multi', animated: true, style: { stroke: '#DC2626' } },
    
    // Redes Externas a PBC (desde arriba hacia abajo por la parte superior)
    { id: 'e18-2', source: 'visa-mc-ecom', target: 'pbc-multi', targetHandle: 'top', animated: true, style: { stroke: '#1F2937' } },
    { id: 'e19-2', source: 'visa-mc-mpp', target: 'pbc-multi', targetHandle: 'top', animated: true, style: { stroke: '#1F2937' } },
    { id: 'e20-2', source: 'upi-network', target: 'pbc-multi', targetHandle: 'top', animated: true, style: { stroke: '#7C3AED' } },
    { id: 'e21-2', source: 'bank-network', target: 'pbc-multi', targetHandle: 'top', animated: true, style: { stroke: '#059669' } },
    { id: 'e22-2', source: 'billeteras-ext', target: 'pbc-multi', targetHandle: 'top', animated: true, style: { stroke: '#10B981' } },
    { id: 'e23-2', source: 'billeteras-foraneas', target: 'pbc-multi', targetHandle: 'top', animated: true, style: { stroke: '#F59E0B' } }
  ]
  
  const [qr20NodesState, setQr20Nodes, onQr20NodesChange] = useNodesState(qr20Nodes)
  const [qr20EdgesState, setQr20Edges, onQr20EdgesChange] = useEdgesState(qr20Edges)
  
  useEffect(() => {
    setNodes(prevNodes => 
      prevNodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          overloaded: overloadedNodes.has(node.id)
        }
      }))
    )
  }, [overloadedNodes, setNodes])
  
  useEffect(() => {
    setQr20Nodes(prevNodes => 
      prevNodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          scaling: scalingNodes.has(node.id),
          optimizedDB: optimizedDBNodes.has(node.id),
          overloaded: overloadedNodes.has(node.id)
        }
      }))
    )
  }, [scalingNodes, optimizedDBNodes, overloadedNodes, setQr20Nodes])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Network className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Arquitectura QR</h1>
                <p className="text-sm text-gray-600">Proceso de autorización de códigos QR</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
            >
              ← Centro de Mockups
            </button>
          </div>
        </div>
      </header>

      {/* Architecture Diagram */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Arquitectura Actual Red Pointis</h2>
          <div className="flex space-x-3">
            <button
              onClick={() => {
                setShowTPS(true)
                setOverloadedNodes(new Set())
                setShowProblems(false)
                setShowEcomProblems(false)
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              🚨 TPS
            </button>
            <button
              onClick={() => {
                setShowEcom(true)
                setOverloadedNodes(new Set())
                setShowProblems(false)
                setShowEcomProblems(false)
              }}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
            >
              🔄 Ecom
            </button>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-4 relative" style={{ height: '600px' }}>
          <TPSAnimation 
            isActive={showTPS}
            duration={animationDuration}
            onComplete={() => {
              setShowTPS(false)
              setOverloadedNodes(new Set(TPS_CONFIG.overloadedNodes))
              setShowProblems(true)
              setTimeout(() => {
                setOverloadedNodes(new Set())
                setShowProblems(false)
              }, animationDuration * 600)
            }}
          />
          
          <EcomAnimation 
            isActive={showEcom}
            duration={ECOM_CONFIG.defaultDuration}
            onComplete={() => {
              setShowEcom(false)
              setOverloadedNodes(new Set(ECOM_CONFIG.overloadedNodes))
              setShowEcomProblems(true)
              setTimeout(() => {
                setOverloadedNodes(new Set())
                setShowEcomProblems(false)
              }, ECOM_CONFIG.defaultDuration * 600)
            }}
          />
          
          <AnimatePresence>
            {showProblems && TPS_CONFIG.problems.map((problem, index) => (
              <ProblemAlert 
                key={`tps-${index}`}
                problem={problem} 
                index={index}
                duration={animationDuration}
                position="left"
              />
            ))}
            {showEcomProblems && ECOM_CONFIG.problems.map((problem, index) => (
              <ProblemAlert 
                key={`ecom-${index}`}
                problem={problem} 
                index={index}
                duration={ECOM_CONFIG.defaultDuration}
                position="right"
              />
            ))}
          </AnimatePresence>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
            attributionPosition="top-right"
          >
            <MiniMap />
            <Controls />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </div>


        {/* Problems Section */}
        <div className="mt-8 bg-red-50 border border-red-200 rounded-xl shadow-sm p-8">
          <h3 className="text-2xl font-bold text-red-800 mb-6">⚠️ Principales Problemas del Diseño Actual</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-1">!</div>
                <div>
                  <p className="font-semibold text-red-800">Diseño altamente acoplado</p>
                  <p className="text-sm text-red-700">Todos los componentes dependen directamente del monolito central</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-1">!</div>
                <div>
                  <p className="font-semibold text-red-800">Versiones obsoletas de Java</p>
                  <p className="text-sm text-red-700">Java 6 (2006) y Java 8 (2014) - tecnología desactualizada</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-1">!</div>
                <div>
                  <p className="font-semibold text-red-800">No se puede hacer rastreo rápido</p>
                  <p className="text-sm text-red-700">Falta de trazabilidad en tiempo real de transacciones</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-1">!</div>
                <div>
                  <p className="font-semibold text-red-800">No se tiene monitoreo total</p>
                  <p className="text-sm text-red-700">Visibilidad limitada del estado del sistema completo</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-1">!</div>
                <div>
                  <p className="font-semibold text-red-800">Documentación parcial</p>
                  <p className="text-sm text-red-700">Falta de documentación completa y actualizada del sistema</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-1">!</div>
                <div>
                  <p className="font-semibold text-red-800">Base de datos con más de 6 TB</p>
                  <p className="text-sm text-red-700">Volumen masivo de datos dificulta el mantenimiento y performance</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-1">!</div>
                <div>
                  <p className="font-semibold text-red-800">Lógica mezclada en un componente</p>
                  <p className="text-sm text-red-700">Lógica de negocio, integración y validación concentradas en el monolito</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* QR Lifecycle Section */}
        <QRLifecycleAnimation />
        
        {/* QR Design Visualization */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl shadow-sm p-8">
          <h3 className="text-2xl font-bold text-blue-800 mb-6">📱 Diseño Actual del QR - Solo Tarjetas</h3>
          
          <div className="flex items-center justify-center space-x-12">
            {/* QR Code Display */}
            <div className="relative">
              <motion.div 
                className="w-48 h-48 bg-white border-4 border-gray-300 rounded-lg flex flex-col items-center justify-center shadow-lg"
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: ['0 4px 6px rgba(0,0,0,0.1)', '0 8px 25px rgba(59,130,246,0.3)', '0 4px 6px rgba(0,0,0,0.1)']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <div className="w-32 h-32 bg-black grid grid-cols-8 gap-1 p-2 rounded">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'} rounded-sm`}></div>
                  ))}
                </div>
                <p className="text-xs text-gray-600 mt-2 font-mono">QR EMV Code</p>
              </motion.div>
              
              {/* QR Data Info */}
              <div id="qr-data-info" className="absolute -left-52 top-4 bg-white border border-gray-200 rounded-lg p-3 shadow-md max-w-48">
                {/* Connecting Line */}
                <div className="absolute -right-10 top-1/2 w-20 h-0.5 bg-gray-400 transform -translate-y-1/2"></div>
                <div className="absolute -right-2 top-1/2 w-2 h-2 bg-gray-400 rounded-full transform -translate-y-1/2"></div>
                <h5 className="font-semibold text-gray-800 text-sm mb-2">Datos del QR:</h5>
                <div className="text-xs text-gray-600 space-y-1">
                  <div><strong>Merchant ID:</strong> 123456789</div>
                  <div><strong>Amount:</strong> S/ 25.00</div>
                  <div><strong>Currency:</strong> PEN</div>
                  <div><strong>Alias:</strong> <span className="text-blue-600 font-bold">{`4${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`}</span></div>
                  <div><strong>Tipo:</strong> <span className="text-green-600 font-semibold">Dinámico</span></div>
                  <div><strong>Card Network:</strong> Visa/MC</div>
                  <div><strong>Terminal ID:</strong> T001</div>
                </div>
              </div>
            </div>
            
            {/* Wallet Animation */}
            <div className="relative">
              <motion.div
                className="w-24 h-40 bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center shadow-xl"
                animate={{
                  x: [0, -30, 0],
                  rotateY: [0, -10, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <div className="w-16 h-28 bg-blue-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-2xl">📱</span>
                </div>
              </motion.div>
              
              {/* Scanning Effect */}
              <motion.div
                className="absolute -left-8 top-1/2 w-16 h-1 bg-red-500 rounded-full"
                animate={{
                  opacity: [0, 1, 0],
                  scaleX: [0.5, 1.5, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
              
              <p className="text-center text-sm text-blue-700 mt-4 font-semibold">Billetera Digital</p>
            </div>
          </div>
          
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h5 className="font-semibold text-yellow-800 mb-2">⚠️ Limitaciones del Diseño Actual</h5>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• <strong>Solo contempla pagos con tarjeta</strong> - No soporta otros métodos de pago</li>
              <li>• <strong>Estructura rígida</strong> - No permite extensibilidad para nuevos casos de uso</li>
              <li>• <strong>Datos limitados</strong> - Falta información para trazabilidad y auditoría</li>
              <li>• <strong>Sin estados intermedios</strong> - No maneja validaciones o errores</li>
            </ul>
          </div>
        </div>
        

        
        {/* Animated Divider */}
        <div className="mt-8 mb-8 flex items-center justify-center">
          <div className="w-4/5 h-4">
            <motion.div 
              className="h-4 rounded-full"
              style={{ backgroundColor: '#00a8f4' }}
              animate={{
                width: ['0%', '100%', '0%'],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          </div>
        </div>
        
        {/* QR Transformation Solution */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl shadow-sm p-8">
          <h3 className="text-2xl font-bold text-blue-800 mb-6">✨ Solución: Transformación del QR</h3>
          
          <div className="flex items-start justify-center space-x-16">
            {/* Old QR */}
            <div className="text-center">
              <div 
                className="w-24 h-24 bg-red-800 border-4 border-red-700 rounded-lg flex flex-col items-center justify-center shadow-lg mb-4"
              >
                <div className="w-16 h-16 bg-red-700 grid grid-cols-5 gap-1 p-1 rounded">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div key={i} className={`w-1 h-1 ${Math.random() > 0.5 ? 'bg-red-900' : 'bg-red-500'} rounded-sm`}></div>
                  ))}
                </div>
              </div>
              <h4 className="font-semibold text-red-700 mb-2">QR Antiguo</h4>
              <ul className="text-xs text-red-600 space-y-1">
                <li>• Solo tarjetas</li>
                <li>• Datos limitados</li>
                <li>• Sin trazabilidad</li>
                <li>• Lento</li>
              </ul>
            </div>
            
            {/* Transformation Arrow */}
            <motion.div 
              className="flex flex-col items-center mt-12"
              animate={{
                x: [0, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <div className="text-4xl mb-2">➡️</div>
              <p className="text-sm font-semibold text-blue-700">Transformación</p>
            </motion.div>
            
            {/* New Multipurpose QR and Business Capabilities */}
            <div className="flex space-x-6">
              {/* QR Multipropósito */}
              <div className="text-center">
                <motion.div 
                  className="w-32 h-32 bg-blue-100 border-4 border-blue-300 rounded-lg flex flex-col items-center justify-center shadow-lg mb-4"
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: ['0 4px 6px rgba(0,0,0,0.1)', '0 8px 25px rgba(34,197,94,0.3)', '0 4px 6px rgba(0,0,0,0.1)']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <div className="w-20 h-20 bg-blue-500 grid grid-cols-6 gap-1 p-1 rounded">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <motion.div 
                        key={i} 
                        className={`w-1 h-1 ${Math.random() > 0.5 ? 'bg-blue-700' : 'bg-blue-300'} rounded-sm`}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.05 }}
                      />
                    ))}
                  </div>
                </motion.div>
                <h4 className="font-semibold text-blue-700 mb-2">QR Multipropósito</h4>
                <ul className="text-xs text-blue-600 space-y-1">
                  <li>• Múltiples métodos</li>
                  <li>• Datos completos</li>
                  <li>• Trazabilidad total</li>
                  <li>• Rápido y eficiente</li>
                  <li>• Estados intermedios</li>
                  <li>• Extensible</li>
                </ul>
              </div>
              
              {/* Business Capabilities - To the right of QR Multipropósito */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200 w-[500px]">
                <h5 className="font-semibold text-blue-800 mb-3 text-sm">🏢 Capacidades del Negocio</h5>
                
                <div className="space-y-3">
                  {/* Top row - Main capabilities */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded p-6 border-2 border-purple-100 min-h-[80px]">
                      <h6 className="font-medium text-purple-700 text-sm mb-1">📱 Generar QR</h6>
                      <p className="text-xs text-gray-600">Estático y dinámico</p>
                    </div>
                    
                    <div className="bg-white rounded p-6 border-2 border-indigo-100 min-h-[80px]">
                      <h6 className="font-medium text-indigo-700 text-sm mb-1">🔐 Autorizar QR</h6>
                      <p className="text-xs text-gray-600">Multi-Riel</p>
                    </div>
                  </div>
                  
                  {/* Bottom rows - Secondary capabilities */}
                  <div className="grid grid-cols-4 gap-1.5">
                    <div className="bg-white rounded p-1 border border-blue-100">
                      <h6 className="font-medium text-blue-700 text-xs mb-1">🔗 Integrar billeteras</h6>
                      <p className="text-xs text-gray-600">3 modelos</p>
                    </div>
                    
                    <div className="bg-white rounded p-1 border border-green-100">
                      <h6 className="font-medium text-green-700 text-xs mb-1">⚡ Habilitar QR</h6>
                      <p className="text-xs text-gray-600">Alias, merchant</p>
                    </div>
                    
                    <div className="bg-white rounded p-1 border border-orange-100">
                      <h6 className="font-medium text-orange-700 text-xs mb-1">📊 QR Batch</h6>
                      <p className="text-xs text-gray-600">BillPayments</p>
                    </div>
                    
                    <div className="bg-white rounded p-1 border border-teal-100">
                      <h6 className="font-medium text-teal-700 text-xs mb-1">🔍 Consultar QR</h6>
                      <p className="text-xs text-gray-600">Estado QR</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-1.5">
                    <div className="bg-white rounded p-1 border border-red-100">
                      <h6 className="font-medium text-red-700 text-xs mb-1">❌ Anular QR</h6>
                      <p className="text-xs text-gray-600">Cancelación</p>
                    </div>
                    
                    <div className="bg-white rounded p-1 border border-yellow-100">
                      <h6 className="font-medium text-yellow-700 text-xs mb-1">🔔 Notificar pago</h6>
                      <p className="text-xs text-gray-600">Confirmaciones</p>
                    </div>
                    
                    <div className="bg-white rounded p-1 border border-cyan-100">
                      <h6 className="font-medium text-cyan-700 text-xs mb-1">🌍 QR internacionales</h6>
                      <p className="text-xs text-gray-600">Cross-border</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-white rounded-lg p-6 border border-blue-200">
            <h4 className="text-lg font-semibold text-blue-800 mb-4">🎆 Beneficios de la Transformación</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">🚀</span>
                </div>
                <h5 className="font-semibold text-blue-800 mb-2">Mayor Velocidad</h5>
                <p className="text-sm text-blue-700">Procesamiento optimizado y respuestas más rápidas</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">🔍</span>
                </div>
                <h5 className="font-semibold text-green-800 mb-2">Trazabilidad Completa</h5>
                <p className="text-sm text-green-700">Seguimiento detallado de cada transacción</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">⚙️</span>
                </div>
                <h5 className="font-semibold text-purple-800 mb-2">Extensibilidad</h5>
                <p className="text-sm text-purple-700">Fácil integración de nuevos métodos de pago</p>
              </div>
            </div>
          </div>
          

        </div>
        
        {/* Proposed QR Lifecycle */}
        <ProposedQRLifecycleAnimation />
        
        {/* Optimized QR Design */}
        <div className="mt-8 bg-purple-50 border border-purple-200 rounded-xl shadow-sm p-8">
          <h3 className="text-2xl font-bold text-purple-800 mb-6">📱 Diseño Optimizado del QR - Multi Método</h3>
          
          <div id="qr-multi-metodo-container" className="flex items-center justify-center space-x-12">
            {/* Enhanced QR Code Display */}
            <div className="relative">
              <motion.div 
                className="w-48 h-48 bg-white border-4 border-purple-300 rounded-lg flex flex-col items-center justify-center shadow-lg"
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: ['0 4px 6px rgba(0,0,0,0.1)', '0 8px 25px rgba(147,51,234,0.3)', '0 4px 6px rgba(0,0,0,0.1)']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <div className="w-32 h-32 grid grid-cols-8 gap-1 p-2 rounded" style={{backgroundColor: '#00a8f4'}}>
                  {Array.from({ length: 64 }).map((_, i) => (
                    <motion.div 
                      key={i} 
                      className="w-2 h-2 rounded-sm"
                      style={{backgroundColor: Math.random() > 0.5 ? '#000000' : '#ffffff'}}
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.02 }}
                    />
                  ))}
                </div>
                <p className="text-xs mt-2 font-mono font-bold" style={{color: '#00a8f4'}}>QR EMV Code Multi-Método</p>
              </motion.div>
              
              {/* Enhanced QR Data Info */}
              <div id="datos-qr-optimizado" className="absolute -left-64 top-4 bg-white border border-purple-200 rounded-lg p-3 shadow-md max-w-48">
                <div className="absolute -right-10 top-1/2 w-20 h-0.5 bg-purple-400 transform -translate-y-1/2"></div>
                <div className="absolute -right-2 top-1/2 w-2 h-2 bg-purple-400 rounded-full transform -translate-y-1/2"></div>
                <h5 className="font-semibold text-purple-800 text-sm mb-2">Datos del QR Optimizado:</h5>
                <div className="text-xs text-gray-600 space-y-1">
                  <div><strong>Tag 00:</strong> <span className="text-purple-600 font-bold">01</span> (Versión Multi-Método)</div>
                  <div><strong>Merchant ID:</strong> 123456789</div>
                  <div><strong>Amount:</strong> S/ 25.00</div>
                  <div><strong>Currency:</strong> PEN</div>
                  <div><strong>Alias:</strong> <span className="text-blue-600 font-bold">{`4${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`}</span></div>
                  <div><strong>Número de Cuenta:</strong> <span className="text-orange-600 font-semibold">191-123456789-0-12</span></div>
                  <div><strong>VPA UPI:</strong> <span className="text-indigo-600 font-semibold">merchant@upi</span></div>
                  <div><strong>Teléfono:</strong> <span className="text-teal-600 font-semibold">+51 987 654 321</span></div>
                  <div><strong>Métodos:</strong> <span className="text-green-600 font-semibold">Cuentas, Tarjetas, UPI, Billeteras</span></div>
                  <div><strong>Terminal ID:</strong> T001</div>
                </div>
              </div>
            </div>
            
            {/* Smartphone Reading QR */}
            <div className="relative">
              <motion.div 
                className="w-32 h-56 bg-gray-900 rounded-2xl border-4 border-gray-700 flex flex-col shadow-xl"
                animate={{
                  rotateY: [0, -5, 0],
                  scale: [1, 1.02, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                {/* Phone Screen */}
                <div className="flex-1 bg-white m-2 rounded-xl overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="bg-gray-100 h-4 flex items-center justify-between px-2">
                    <div className="text-xs font-bold">9:41</div>
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Camera Viewfinder */}
                  <div className="flex-1 bg-black relative flex items-center justify-center">
                    <motion.div 
                      className="w-16 h-16 border-2 border-green-400 rounded-lg"
                      animate={{
                        scale: [1, 1.1, 1],
                        borderColor: ['#4ade80', '#22c55e', '#4ade80']
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity
                      }}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <motion.div 
                          className="w-8 h-8 grid grid-cols-4 gap-0.5"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          {Array.from({ length: 16 }).map((_, i) => (
                            <div 
                              key={i} 
                              className={`w-1 h-1 ${Math.random() > 0.5 ? 'bg-green-400' : 'bg-white'} rounded-sm`}
                            />
                          ))}
                        </motion.div>
                      </div>
                    </motion.div>
                    
                    {/* Scanning Line */}
                    <motion.div 
                      className="absolute w-full h-0.5 bg-green-400 opacity-70"
                      animate={{ y: [-30, 30, -30] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>
                  
                  {/* App Interface */}
                  <div className="bg-white p-2">
                    <div className="text-center">
                      <div className="text-xs font-semibold text-green-600">Escaneando QR...</div>
                      <div className="text-xs text-gray-500 mt-1">Multi-Método Detectado</div>
                    </div>
                  </div>
                </div>
                
                {/* Home Button */}
                <div className="w-8 h-1 bg-gray-600 rounded-full mx-auto mb-2"></div>
              </motion.div>
              
              <p className="text-xs text-purple-600 mt-2 text-center font-semibold">📱 Lectura QR Multi-Método</p>
            </div>
            
            {/* Multi-Method Payment Animation */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {/* Bancos */}
                <div className="flex items-center space-x-2">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-b from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotateY: [0, 5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    <span className="text-white text-sm">🏦</span>
                  </motion.div>
                  <span className="text-sm font-semibold text-blue-700">Bancos</span>
                </div>
                
                {/* Tarjetas */}
                <div className="flex items-center space-x-2">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-b from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotateY: [0, 5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.5
                    }}
                  >
                    <span className="text-white text-sm">💳</span>
                  </motion.div>
                  <span className="text-sm font-semibold text-green-700">Tarjetas</span>
                </div>
                
                {/* UPI */}
                <div className="flex items-center space-x-2">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-b from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotateY: [0, 5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 1
                    }}
                  >
                    <span className="text-white text-sm">⚡</span>
                  </motion.div>
                  <span className="text-sm font-semibold text-purple-700">UPI</span>
                </div>
                
                {/* Billeteras */}
                <div className="flex items-center space-x-2">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-b from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotateY: [0, 5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 1.5
                    }}
                  >
                    <span className="text-white text-sm">📱</span>
                  </motion.div>
                  <span className="text-sm font-semibold text-orange-700">Billeteras</span>
                </div>
              </div>
              
              {/* Scanning Effect */}
              <motion.div
                className="absolute -left-8 top-1/2 w-24 h-1 bg-purple-500 rounded-full"
                animate={{
                  opacity: [0, 1, 0],
                  scaleX: [0.5, 1.5, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
              
              <p className="text-center text-sm text-purple-700 mt-4 font-semibold">Métodos de Pago Múltiples</p>
            </div>
            

          </div>
          
          <div id="ventajas-diseno-multi-metodo" className="mt-[150px] bg-green-50 border border-green-200 rounded-lg p-4">
            <h5 className="font-semibold text-green-800 mb-2">✅ Ventajas del Diseño Multi-Método</h5>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• <strong>Soporte completo:</strong> Cuentas, Tarjetas, UPI y Billeteras en un solo QR</li>
              <li>• <strong>Tag 00 optimizado:</strong> Versión 01 para identificación de capacidades multi-método</li>
              <li>• <strong>Flexibilidad total:</strong> El usuario elige su método preferido al escanear</li>
              <li>• <strong>Compatibilidad extendida:</strong> Funciona con todas las billeteras del mercado</li>
            </ul>
          </div>
          
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h5 className="font-semibold text-yellow-800 mb-2">🔄 Reintegración Requerida</h5>
            <p className="text-sm text-yellow-700 mb-2">
              <strong>Actualización del Tag 00:</strong> Las billeteras deben leer el tag 00 para identificar la versión del QR y sus capacidades.
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <span className="font-medium text-yellow-800">Coordinación necesaria con:</span>
              <div className="flex space-x-2">
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium">Yape</span>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">IBK</span>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">BBVA</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* QR 2.0 Architecture */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-green-900">🚀 Arquitectura QR 2.0</h2>
            <button
              onClick={() => {
                setShowTPS2(true)
                setScalingNodes(new Set())
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              ❌  TPS
            </button>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-4 relative" style={{ height: '600px' }}>
            <TPS2Animation 
              isActive={showTPS2}
              duration={10}
              onComplete={() => {
                setShowTPS2(false)
                setScalingNodes(new Set(['iso-nb', 'canal-pos', 'canal-pinpad', 'canal-ecom', 'canal-externo', 'api-gateway', 'pbc-multi', 'hub-negocios', 'mace', 'proyecto-28']))
                setOptimizedDBNodes(new Set(['database-qr20']))
                setOverloadedNodes(new Set(['auth-ecom']))
                setTimeout(() => {
                  setScalingNodes(new Set())
                  setOptimizedDBNodes(new Set())
                  setOverloadedNodes(new Set())
                }, 30000)
              }}
            />
            <ReactFlow
              nodes={qr20NodesState}
              edges={qr20EdgesState}
              onNodesChange={onQr20NodesChange}
              onEdgesChange={onQr20EdgesChange}
              nodeTypes={nodeTypes}
              fitView
              attributionPosition="top-right"
            >
              <MiniMap />
              <Controls />
              <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
          </div>
          
          {/* Architecture Benefits */}
          <div className="mt-8 bg-green-50 border border-green-200 rounded-xl shadow-sm p-8">
            <h3 className="text-2xl font-bold text-green-800 mb-6">✅ Beneficios de la Arquitectura QR 2.0</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-1">🏗️</div>
                  <div>
                    <p className="font-semibold text-green-800">Arquitectura en Capas</p>
                    <p className="text-sm text-green-700">Separación clara de responsabilidades: Presentación, Servicios, Datos</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-1">🔗</div>
                  <div>
                    <p className="font-semibold text-green-800">Arquitectura Desacoplada</p>
                    <p className="text-sm text-green-700">Componentes independientes comunicados por APIs REST</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-1">⚡</div>
                  <div>
                    <p className="font-semibold text-green-800">Crecimiento Horizontal</p>
                    <p className="text-sm text-green-700">Escalabilidad para soportar 3x más TPS con load balancing</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-1">🎯</div>
                  <div>
                    <p className="font-semibold text-blue-800">PBC Multi-Método Único</p>
                    <p className="text-sm text-blue-700">Un solo componente que maneja todos los métodos de pago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-1">🔍</div>
                  <div>
                    <p className="font-semibold text-blue-800">Trazabilidad Completa</p>
                    <p className="text-sm text-blue-700">Base de datos especializada en auditoría y seguimiento</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-1">📊</div>
                  <div>
                    <p className="font-semibold text-blue-800">Bases de Datos Optimizadas</p>
                    <p className="text-sm text-blue-700">Separación por dominio: QR, Pagos, Auditoría</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
              </div>
            </div>
          </div>
          
          {/* Cost Analysis Section */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl shadow-sm p-8">
            <h3 className="text-2xl font-bold text-blue-800 mb-6">💰 Inversión y Costos de Desarrollo</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Personas */}
              <div className="bg-white rounded-lg p-6 border border-blue-200">
                <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                  <span className="text-2xl mr-2">👥</span> Equipo de Desarrollo
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    4 Devs Backend Semi-Senior
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    1 Dev Backend Senior
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    2 QAs
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    1 Implementador de Infraestructura
                  </li>
                  <li className="flex items-center mt-3 pt-3 border-t border-gray-200">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    Equipos Cross (Arquitectura, Infraestructura, Seguridad)
                  </li>
                </ul>
              </div>
              
              {/* Recursos Técnicos */}
              <div className="bg-white rounded-lg p-6 border border-blue-200">
                <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                  <span className="text-2xl mr-2">🛠️</span> Recursos Técnicos
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    1 Librería para aceleración de conversiones ISO
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Certificaciones y Setups (una sola vez)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Infraestructura Cloud
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Costos Detallados */}
            <div className="bg-white rounded-lg p-6 border border-blue-200">
              <h4 className="text-lg font-semibold text-blue-800 mb-4">📊 Desglose de Inversión Inicial</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-700">POD DEV</span>
                  <span className="text-sm font-bold text-gray-900">S/ 1,780,022.40</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-700">POD DEV (Variable)</span>
                  <span className="text-sm font-bold text-gray-900">S/ 25,500.00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-700">POD STRATEGY</span>
                  <span className="text-sm font-bold text-gray-900">S/ 267,003.36</span>
                </div>
                <div className="flex justify-between items-center py-2 bg-blue-50 rounded px-3">
                  <span className="text-sm font-semibold text-blue-800">Total Equipo</span>
                  <span className="text-sm font-bold text-blue-900">S/ 2,072,525.76</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-200 mt-4">
                  <span className="text-sm font-medium text-gray-700">Certificaciones y Setups</span>
                  <span className="text-sm font-bold text-gray-900">S/ 280,021.00</span>
                </div>
                
                <div className="flex justify-between items-center py-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg px-4 mt-4">
                  <span className="text-base font-bold text-blue-900">TOTAL GLOBAL</span>
                  <span className="text-lg font-bold text-blue-900">S/ 3,299,984.11</span>
                </div>
              </div>
            </div>
            
            {/* Mantenimiento Mensual */}
            <div className="bg-white rounded-lg p-6 border border-orange-200 mt-6">
              <h4 className="text-lg font-semibold text-orange-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">🔄</span> Mantenimiento Mensual
              </h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-700">Opex (Infra y otros)</span>
                  <span className="text-sm font-bold text-gray-900">S/ 40,934.61</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-700">Opex (Dev y QA)</span>
                  <span className="text-sm font-bold text-gray-900">S/ 50,049.12</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg px-4">
                  <span className="text-base font-bold text-orange-900">TOTAL MENSUAL</span>
                  <span className="text-lg font-bold text-orange-900">S/ 90,983.73</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}