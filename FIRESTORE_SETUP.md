# Configuración de Firestore para Login Attempts

## Pasos para habilitar Firestore en Firebase

1. **Ir a Firebase Console**
   - Visita: https://console.firebase.google.com/
   - Selecciona tu proyecto: `mocksantonio`

2. **Habilitar Firestore Database**
   - En el menú lateral, busca "Firestore Database"
   - Click en "Crear base de datos"
   - Selecciona modo: **Producción** o **Prueba**
   - Elige ubicación: `us-central` (o la más cercana)

3. **Configurar Reglas de Seguridad**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Permitir lectura/escritura solo a usuarios autenticados
       match /loginAttempts/{document=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

4. **Crear Colección (Opcional)**
   - La colección `loginAttempts` se creará automáticamente
   - Estructura del documento:
     ```json
     {
       "email": "usuario@ejemplo.com",
       "success": true,
       "ip": "192.168.1.1",
       "location": {
         "latitude": -12.0464,
         "longitude": -77.0428
       },
       "timestamp": "2024-01-15T10:30:00Z",
       "error": null,
       "userAgent": "Mozilla/5.0..."
     }
     ```

## Funcionalidades Implementadas

### 1. Geolocalización en Login
- Solicita permisos de ubicación al cargar la página de login
- **Obligatoria solo en producción (Vercel)** mediante variable de entorno
- Captura latitud y longitud del usuario
- En desarrollo local es opcional

### 2. Registro de IP
- Obtiene la IP pública del usuario usando API externa (ipify.org)
- Almacena la IP en cada intento de login

### 3. Tabla de Intentos de Login
- Ruta: `/login-attempts`
- Muestra últimos 100 intentos
- Información mostrada:
  - Estado (Aprobado/Rechazado)
  - Email
  - IP
  - Ubicación (lat/long)
  - Fecha y hora
  - Navegador (User Agent)
- Estadísticas: Total, Aprobados, Rechazados

## Visualización de Datos

**IMPORTANTE:** Los datos solo se visualizan en Firebase Console.

1. Ir a Firebase Console: https://console.firebase.google.com/
2. Seleccionar proyecto: `mocksantonio`
3. Ir a Firestore Database
4. Abrir colección: `loginAttempts`
5. Ver todos los intentos de login registrados

## Variables de Entorno

### Configuración de Geolocalización

**Local (.env.local):**
```bash
VITE_REQUIRE_GEOLOCATION=false
```

**Vercel (Production):**
```bash
VITE_REQUIRE_GEOLOCATION=true
```

En Vercel:
1. Ir a Project Settings
2. Environment Variables
3. Agregar: `VITE_REQUIRE_GEOLOCATION` = `true`
4. Redeploy

## Notas de Seguridad

- Los intentos de login se registran tanto exitosos como fallidos
- La geolocalización es **obligatoria solo en producción**
- En desarrollo local es opcional para facilitar testing
- **NO hay interfaz web para ver los datos**
- Los datos solo se visualizan en Firebase Console
- La IP se obtiene del lado del cliente (puede ser ocultada con VPN)
- Los datos se almacenan en Firestore (backend)

## Troubleshooting

### Error: "Missing or insufficient permissions"
- Verifica las reglas de seguridad en Firestore
- Asegúrate de estar autenticado

### Error: "Geolocation permission denied"
- El usuario debe permitir el acceso a la ubicación
- En Chrome: Settings > Privacy > Site Settings > Location

### No se muestra la IP
- Verifica que la API de ipify.org esté disponible
- Revisa la consola del navegador para errores
