import { Smartphone, Building, CreditCard, Shield, Server, Users } from 'lucide-react'

// Mapeo de iconos disponibles
const iconMap = {
  smartphone: Smartphone,
  building: Building,
  creditcard: CreditCard,
  shield: Shield,
  server: Server,
  users: Users
}

export const parseMermaidFlow = (mermaidText) => {
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

export const loadMermaidFlow = async (mermaidPath) => {
  try {
    const response = await fetch(mermaidPath)
    const mermaidText = await response.text()
    return parseMermaidFlow(mermaidText)
  } catch (error) {
    console.error('Error loading Mermaid file:', error)
    return null
  }
}