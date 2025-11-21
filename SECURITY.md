# 🔒 Guía de Seguridad

## Variables de Entorno Requeridas

### Firebase (OBLIGATORIO)
```env
VITE_FIREBASE_API_KEY=tu_api_key_aqui
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id_aqui
VITE_FIREBASE_APP_ID=tu_app_id_aqui
```

### reCAPTCHA (Opcional)
```env
VITE_ENABLE_RECAPTCHA=true
VITE_RECAPTCHA_SITE_KEY=tu_site_key_aqui
```

## ⚠️ NUNCA Commitear

- ❌ `.env.local` - Contiene credenciales reales
- ❌ `.env.production` - Configuración de producción
- ❌ Credenciales hardcodeadas en el código

## ✅ Buenas Prácticas

1. **Usa variables de entorno** para todas las credenciales
2. **Verifica .gitignore** antes de hacer commit
3. **Rota credenciales** si fueron expuestas
4. **Habilita reCAPTCHA** en producción
5. **Configura Firebase Security Rules** para limitar acceso

## 🛡️ Protecciones Implementadas

- ✅ Firebase Auth con email/password
- ✅ reCAPTCHA v2 (activable)
- ✅ Rutas protegidas con ProtectedRoute
- ✅ Variables de entorno para credenciales
- ✅ Validación de configuración al iniciar

## 📝 Deployment en Vercel

Configura las variables de entorno en:
`Settings → Environment Variables`

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_ENABLE_RECAPTCHA=true
VITE_RECAPTCHA_SITE_KEY=...
```

## 🚨 Si Expusiste Credenciales

1. Rota inmediatamente las API Keys en Firebase Console
2. Regenera reCAPTCHA Site Key
3. Actualiza las variables de entorno
4. Revisa logs de acceso no autorizado
