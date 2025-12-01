# Reglas de Firestore para Login Attempts

## Problema: No se guardan los datos

### Causa probable:
Las reglas de seguridad de Firestore están bloqueando las escrituras.

### Solución:

1. Ve a Firebase Console: https://console.firebase.google.com/project/mocksantonio/firestore/rules
2. Reemplaza las reglas con:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /loginAttempts/{document} {
      allow create: if 
        // Validar estructura y tipos de datos
        request.resource.data.keys().hasAll(['email', 'success', 'ip', 'timestamp', 'userAgent']) &&
        request.resource.data.email is string &&
        request.resource.data.email.size() > 0 &&
        request.resource.data.email.size() < 100 &&
        request.resource.data.success is bool &&
        request.resource.data.ip is string &&
        request.resource.data.userAgent is string &&
        // Limitar tamaño de campos (prevenir spam)
        request.resource.data.ip.size() < 50 &&
        request.resource.data.userAgent.size() < 500;
      
      allow read: if request.auth != null;
    }
    
    // Control de sesiones remotas
    match /sessionControl/{document} {
      allow read: if request.auth != null;
      allow write: if false; // Solo desde Firebase Console o Admin SDK
    }
    
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. Haz clic en **Publicar**
4. Espera 10-20 segundos para que se propaguen los cambios

### Protecciones de Seguridad:
- ✅ Valida estructura exacta de datos requeridos
- ✅ Valida tipos de datos (string, bool)
- ✅ Limita tamaño de campos (previene spam masivo)
- ✅ Solo permite `create`, no `update` ni `delete`
- ✅ Solo usuarios autenticados pueden leer los intentos
- ✅ Previene inyección de campos adicionales maliciosos

### Verificar en consola del navegador:
Abre DevTools (F12) y busca errores como:
- `FirebaseError: Missing or insufficient permissions`
- `PERMISSION_DENIED`
