import { useState, useRef, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { useAuth } from '../components/ProtectedRoute';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [geoPermission, setGeoPermission] = useState(null);
  const [location, setLocation] = useState(null);
  const recaptchaRef = useRef(null);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const isCaptchaEnabled = import.meta.env.VITE_ENABLE_RECAPTCHA === 'true';
  const requireGeolocation = import.meta.env.VITE_REQUIRE_GEOLOCATION === 'true';

  useEffect(() => {
    if (requireGeolocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setGeoPermission('granted');
        },
        (error) => {
          setGeoPermission('denied');
          setError('Debes permitir el acceso a tu ubicación para poder iniciar sesión');
        }
      );
    } else {
      setGeoPermission('granted');
    }
  }, [requireGeolocation]);

  useEffect(() => {
    if (user && !authLoading) {
      navigate('/home', { replace: true });
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const getIPAddress = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      return 'Unknown';
    }
  };

  const logLoginAttempt = async (success, errorMsg = null) => {
    try {
      const ip = await getIPAddress();
      const docRef = await addDoc(collection(db, 'loginAttempts'), {
        email,
        success,
        ip,
        location: location || null,
        timestamp: serverTimestamp(),
        error: errorMsg,
        userAgent: navigator.userAgent
      });
      console.log('✅ Login attempt logged:', docRef.id);
    } catch (error) {
      console.error('❌ Error logging attempt:', error.code, error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (requireGeolocation && geoPermission !== 'granted') {
      setError('Debes permitir el acceso a tu ubicación para continuar');
      return;
    }

    if (isCaptchaEnabled && !captchaValue) {
      setError('Por favor completa el reCAPTCHA');
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      await logLoginAttempt(true);
      navigate('/home');
    } catch (err) {
      const errorMsg = 'Credenciales incorrectas';
      setError(errorMsg);
      await logLoginAttempt(false, errorMsg);
      recaptchaRef.current?.reset();
      setCaptchaValue(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src="/assets/img/logo_teto.png" alt="Logo" className="w-24 h-24 object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Bienvenido</h1>
          <p className="text-gray-600">Antonio's Crew</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="tu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {isCaptchaEnabled && (
            <div className="flex justify-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={(value) => setCaptchaValue(value)}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Powered by Antonio's Crew
        </div>
      </div>
    </div>
  );
}
