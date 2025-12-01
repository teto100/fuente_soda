# Seguridad y Variables de Entorno

## ✅ Archivos Protegidos

Los siguientes archivos están en `.gitignore` y **NO se suben a GitHub**:
- `.env.local` - Credenciales locales
- `.env` - Variables de entorno
- `.env.*.local` - Variantes de entorno

## 🔒 Configuración Segura

### Variables de Entorno
1. Copia `.env.example` a `.env.local`
2. Completa con tus credenciales reales
3. **NUNCA** hagas commit de `.env.local`

### Firebase
- Las credenciales están en variables de entorno
- No hay credenciales hardcodeadas en el código
- Las reglas de Firestore validan estructura y tamaño de datos

### Vercel (Producción)
Configura estas variables en Vercel Dashboard:
```
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto_id
VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
VITE_REQUIRE_GEOLOCATION=true
```

## ⚠️ Antes de Hacer Push

Verifica que no haya información sensible:
```bash
# Verificar archivos modificados
git status

# Verificar que .env.local esté ignorado
git check-ignore -v .env.local

# Buscar API keys accidentales
grep -r "AIzaSy" --exclude-dir=node_modules --exclude-dir=dist .
```

## 🚨 Si Expusiste Credenciales

1. **Regenera las credenciales** en Firebase Console
2. Actualiza `.env.local` con las nuevas
3. Actualiza variables en Vercel
4. Considera limpiar el historial de Git si es necesario
