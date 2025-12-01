# PASARELA DE PAGO MODERNA

## 📋 Descripción General del Proyecto

**Nombre:** Pasarela de pago moderna  
**Tipo:** Aplicación web con React + PHP
**Objetivo:** Mockup funcional de una pasarela de pagos con navegación completa
**Powered by:** Antonio's Crew

## 🎯 Propósito y Alcance

### **Características Principales:**
- Mockups interactivos de soluciones de pago modernas
- Simulaciones completas sin base de datos ni APIs reales
- React + Vite para frontend moderno con Tailwind CSS
- Diseño responsive y profesional
- Flujos animados y diagramas interactivos

## 🚀 Estructura del Proyecto

```
upi/
├── frontend/          # React app con Vite
│   ├── src/
│   │   ├── pages/     # Páginas principales
│   │   ├── components/# Componentes reutilizables
│   │   └── utils/     # Utilidades
├── backend/           # PHP APIs simuladas
│   ├── controllers/   # Controladores
│   └── models/        # Modelos de datos
├── public/            # Assets estáticos
└── data/mock/         # Datos de prueba
```

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js 18+
- PHP 8.1+
- XAMPP o servidor local

### Instalación
```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev          # React dev server (puerto 3000)
npm run serve        # PHP server (puerto 8000)

# Producción
npm run build        # Build React app
```

## 🎨 Funcionalidades

### ✅ Configuraciones
- [x] **Onboarding Comercio** - Registro completo de comercios (Afiliado/No Afiliado)
- [x] **Integración SDK** - Documentación y herramientas de desarrollo

### ✅ MultiRiel
- [x] **Pasarela Multiriel** - Checkout con múltiples métodos de pago
  - Tarjetas de crédito/débito
  - UPI con códigos QR dinámicos
  - Billeteras digitales (Yape, Plin)
  - Transferencia bancaria con validación DNI
  - Animaciones fluidas y validaciones

### ✅ Casos P2M
- [x] **App2App** - Pagos persona a comercio
- [ ] Pagos Recurrentes (Próximamente)
- [ ] Pago de Planillas (Próximamente)
- [ ] Pago de Deuda (Próximamente)
- [ ] Devoluciones (Próximamente)

### ✅ Flujos
- [x] **PSP Tecnológico** - Flujos P2P directos con SDK
- [x] **PSP Adquirente** - Flujos P2M con pasarela
- [x] **PSP Adquirente TPAP** - Flujos P2M con SDK integrado
- [x] **Consentimiento Usuarios** - Simulación UPI BCR en Yape
- [x] **Consentimiento Comercios** - Onboarding completo

## 🎯 Características Técnicas

### **Flujos Animados:**
- Diagramas Mermaid interactivos
- Controles de reproducción (play/pause/reset)
- Navegación por pasos
- Explicaciones detalladas por paso

### **Simulador Móvil:**
- Formato tablet/phablet para demos
- Experiencia nativa simulada
- Barra de estado y navegación realista

### **Métodos de Pago:**
- **Tarjetas:** Visa, Mastercard, Rupay
- **UPI:** GPay, PhonePe, Paytm
- **Bancos:** BCP, IBK, BIM, BBVA, Scotiabank
- **Billeteras:** Yape, Plin, Paytm

## 📱 Diseño y UX

- **Responsive Design** - Mobile-first approach
- **Simulador Móvil** - Experiencia tablet/phablet
- **Componentes Modulares** - Tailwind CSS
- **Animaciones Fluidas** - Transiciones suaves
- **Paleta Corporativa** - Colores consistentes (#00A8F4, #00092E)

## 🔧 Configuración de Desarrollo

El proyecto usa Vite para desarrollo rápido y hot-reload con simulaciones completas.

**URLs de desarrollo:**
- Frontend: http://localhost:3000
- Todos los flujos son simulados (sin backend real)

## 🎮 Mockups Disponibles

### **Configuraciones**
- `/onboarding-comercio` - Registro de comercios
- `/integracion-sdk` - Documentación SDK

### **MultiRiel**
- `/pasarela-multiriel` - Pasarela de pagos completa

### **Casos P2M**
- `/pagos-p2m` - Pagos App2App

### **Flujos**
- `/psp-tecnologico` - PSP Tecnológico (2 flujos)
- `/psp-adquirente` - PSP Adquirente Pasarela
- `/psp-adquirente-tpap` - PSP Adquirente TPAP
- `/consentimiento-usuarios/home` - Simulación Yape UPI BCR

## 👥 Créditos

**Powered by Antonio's Crew**

## 📄 Licencia

Proyecto de demostración - Uso educativo