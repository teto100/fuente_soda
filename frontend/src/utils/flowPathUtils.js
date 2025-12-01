export const getConnectionPath = (fromNode, toNode, stepId, nodes) => {
  if (!nodes || !nodes[fromNode] || !nodes[toNode]) return ""
  
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