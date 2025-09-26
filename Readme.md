# MOCKUP DE UNA PASARELA DE PAGO MODERNA

## 📋 Descripción General del Proyecto

**Nombre:** Pasarela de pago moderna  
**Tipo:** Aplicación web con React + PHP
**Objetivo:** Crear un mockup funcional de una pasarela de pagos con navegación completa pero sin backend real

## 🎯 Propósito y Alcance

### **Problemática a Resolver:**
- Crear una pasarela de pagos navegable y funcional (UI/UX completo)
- Sin base de datos ni APIs reales (todo simulado)
- Utilizar React para frontend moderno y PHP para APIs mock
- Inspiración basada en Razorpay (carpeta inspire/rz/)

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
├── data/mock/         # Datos de prueba
└── inspire/           # Referencias de diseño
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

### ✅ Implementadas
- [x] Página principal con producto demo
- [x] Proceso de checkout completo
- [x] Múltiples métodos de pago simulados
- [x] APIs mock con respuestas realistas
- [x] Diseño responsive

### 🔄 En desarrollo
- [ ] Página de pagos con formularios
- [ ] Página de confirmación
- [ ] Dashboard de transacciones
- [ ] Más métodos de pago

## 🎯 Métodos de Pago Simulados

- **Tarjetas:** Visa, Mastercard, Rupay
- **UPI:** GPay, PhonePe, Paytm
- **NetBanking:** Todos los bancos principales
- **Wallets:** Paytm, Mobikwik, etc.

## 📱 Responsive Design

- Mobile-first approach
- Optimizado para todas las pantallas
- Componentes modulares con Tailwind CSS

## 🔧 Configuración de Desarrollo

El proyecto usa Vite para desarrollo rápido y hot-reload. Las APIs PHP se ejecutan en paralelo para simular un backend real.

**URLs de desarrollo:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api

## 📄 Licencia

Proyecto de demostración - Uso educativo