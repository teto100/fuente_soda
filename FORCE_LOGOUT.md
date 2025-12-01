# Cerrar Sesión Remota a Todos los Usuarios

## Cómo Funciona

La aplicación verifica en tiempo real un documento en Firestore llamado `sessionControl/global`.

- **Si el documento NO existe o `forceLogout: false`** → Acceso normal ✅
- **Si `forceLogout: true`** → Todos los usuarios son deslogueados inmediatamente ❌
- **Si `minVersion` no coincide** → Fuerza recarga y re-login (incluso versiones viejas) 🔄

## Pasos para Cerrar Sesión a Todos

### Opción 1: Forzar Re-login (Recomendado para Updates)

1. Ve a **Firestore Database** en Firebase Console
2. Edita el documento: `sessionControl/global`
3. Cambia el campo `minVersion` a un nuevo valor:
   ```
   minVersion: "1.0.1"  (o cualquier versión diferente)
   ```
4. ✅ Todos los usuarios (incluso con versiones viejas) serán deslogueados y forzados a recargar
5. Actualizarán automáticamente a la última versión

### Opción 2: Logout Instantáneo (Emergencias)

1. Ve a **Firestore Database** en Firebase Console
2. Edita el documento: `sessionControl/global`

1. Ve a **Firestore Database** en Firebase Console
2. Crea/edita el documento: `sessionControl/global`
3. Establece el campo:
   ```
   forceLogout: true
   ```
4. Todos los usuarios serán deslogueados inmediatamente

5. Para permitir nuevos logins, cambia a:
   ```
   forceLogout: false
   ```

### Opción 2: Desde Código (Script)

Crea un archivo `scripts/forceLogout.js`:

```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  // Tu configuración
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Cerrar todas las sesiones
await setDoc(doc(db, 'sessionControl', 'global'), {
  forceLogout: true,
  timestamp: new Date()
});

console.log('✅ Todas las sesiones cerradas');

// Permitir nuevos logins
await setDoc(doc(db, 'sessionControl', 'global'), {
  forceLogout: false,
  timestamp: new Date()
});

console.log('✅ Logins habilitados nuevamente');
```

## Reglas de Firestore

Agrega estas reglas para proteger el documento:

```javascript
match /sessionControl/{document} {
  allow read: if request.auth != null;
  allow write: if false; // Solo desde Firebase Console o Admin SDK
}
```

## Notas

- ⚡ El cierre de sesión es **instantáneo** (tiempo real)
- 🔒 Solo administradores pueden modificar `sessionControl` (desde Console)
- ✅ Los usuarios son redirigidos automáticamente al login
- 🔄 Recuerda cambiar `forceLogout` a `false` para permitir nuevos logins
