# BASE WEB - STACK TECNOLÓGICO MODERNO

## 📋 Descripción General

**Stack:** React + Vite + Tailwind CSS  
**Patrón:** Mockups interactivos modulares  
**Despliegue:** Vercel + GitHub  
**Desarrollo:** Hot-reload con simulaciones completas

## 🚀 Configuración Inicial

### **1. Crear Proyecto**
```bash
# Crear directorio del proyecto
mkdir mi-proyecto
cd mi-proyecto

# Inicializar proyecto React con Vite
npm create vite@latest frontend -- --template react
cd frontend
npm install

# Instalar dependencias adicionales
npm install -D tailwindcss postcss autoprefixer
npm install react-router-dom lucide-react axios qrcode

# Configurar Tailwind CSS
npx tailwindcss init -p
```

### **2. Estructura de Carpetas**
```
mi-proyecto/
├── frontend/
│   ├── src/
│   │   ├── pages/           # Página principal
│   │   ├── mockups/         # Mockups organizados
│   │   │   ├── mockup-1/
│   │   │   │   └── pages/
│   │   │   └── mockup-2/
│   │   │       └── pages/
│   │   ├── components/      # Componentes reutilizables
│   │   ├── styles/          # Archivos CSS
│   │   └── utils/           # Utilidades
├── public/                  # Assets estáticos
└── README.md
```

## ⚙️ Configuración de Archivos

### **package.json**
```json
{
  "name": "mi-proyecto",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "lucide-react": "^0.263.1",
    "axios": "^1.4.0",
    "qrcode": "^1.5.3"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.24",
    "tailwindcss": "^3.3.0",
    "vite": "^4.4.5"
  }
}
```

### **vite.config.js**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: 'frontend',
  publicDir: '../public',
  build: {
    outDir: '../dist'
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  }
})
```

### **tailwind.config.js**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./frontend/index.html",
    "./frontend/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### **frontend/src/styles/colors.css**
```css
:root {
  --color-primary: #00A8F4;
  --color-secondary: #00092E;
  --color-tertiary: #FFFFFF;
}

.bg-primary { background-color: var(--color-primary); }
.bg-secondary { background-color: var(--color-secondary); }
.text-primary { color: var(--color-primary); }
.text-secondary { color: var(--color-secondary); }
```

## 📱 Estructura Base de Componentes

### **MainPage.jsx**
```jsx
import { useNavigate } from 'react-router-dom'
import { Settings, Layers } from 'lucide-react'

export default function MainPage() {
  const navigate = useNavigate()

  const mockupGroups = [
    {
      id: 'categoria-1',
      title: 'Categoría 1',
      icon: Settings,
      mockups: [
        {
          id: 'mockup-1',
          title: 'Mockup 1',
          description: 'Descripción del mockup',
          path: '/mockup-1',
          status: 'Disponible'
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-amber-50">
      {/* Header y contenido */}
    </div>
  )
}
```

### **App.jsx**
```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
// Importar mockups

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* Rutas de mockups */}
      </Routes>
    </Router>
  )
}

export default App
```

## 🎨 Patrón de Diseño

### **Mockup Modular**
- Cada mockup en carpeta independiente
- Componentes reutilizables en `/components`
- Estilos consistentes con Tailwind
- Navegación centralizada desde MainPage

### **Simulador Móvil**
```jsx
// Wrapper para simulación móvil
<div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-8">
  <div className="w-full max-w-sm bg-black rounded-3xl p-2 shadow-2xl">
    <div className="bg-white rounded-2xl overflow-hidden h-[700px]">
      {/* Contenido del mockup */}
    </div>
  </div>
</div>
```

## 🚀 Despliegue

### **GitHub**
```bash
# Inicializar repositorio
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/usuario/mi-proyecto.git
git push -u origin main
```

### **Vercel**
1. Conectar repositorio en vercel.com
2. Configurar build:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Root Directory:** `./`

## 🛠️ Comandos de Desarrollo

```bash
# Desarrollo local
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Acceso desde red local
# El servidor estará disponible en http://[tu-ip]:3000
```

## 📦 Características Incluidas

- ✅ **React 18** con Vite
- ✅ **Tailwind CSS** para estilos
- ✅ **React Router** para navegación
- ✅ **Lucide React** para iconos
- ✅ **Responsive Design** mobile-first
- ✅ **Hot Reload** en desarrollo
- ✅ **Simulaciones** sin backend
- ✅ **Despliegue automático** con Vercel
- ✅ **Acceso en red local** configurado

## 🎯 Próximos Pasos

1. **Personalizar** colores y branding
2. **Crear mockups** en `/mockups/`
3. **Agregar rutas** en App.jsx
4. **Configurar** GitHub y Vercel
5. **Desarrollar** funcionalidades específicas

## 📄 Licencia

Proyecto base para desarrollo de mockups interactivos.