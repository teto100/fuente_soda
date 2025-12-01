import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Verificar si la sesión fue revocada remotamente o versión desactualizada
  useEffect(() => {
    if (!user?.email) return;

    const unsubscribe = onSnapshot(
      doc(db, 'sessionControl', 'global'),
      (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          
          // Forzar logout si está activado
          if (data.forceLogout === true) {
            signOut(auth);
            return;
          }
          
          // Verificar versión mínima requerida
          const APP_VERSION = '1.0.1'; // Actualiza esto en cada deploy importante
          if (data.minVersion && data.minVersion !== APP_VERSION) {
            alert('Hay una nueva versión disponible. Por favor, recarga la página.');
            signOut(auth);
            window.location.reload();
          }
        }
      },
      (error) => {
        // Si el documento no existe, permitir acceso normal
        console.log('sessionControl no existe, acceso normal');
      }
    );

    return () => unsubscribe();
  }, [user]);

  return { user, loading };
}
