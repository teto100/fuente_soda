import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import ProtectedRoute from './components/ProtectedRoute'

// Pasarela Multiriel
import PasarelaHomePage from './mockups/pasarela-multiriel/pages/HomePage'
import PasarelaCheckoutPage from './mockups/pasarela-multiriel/pages/CheckoutPage'
import PasarelaSuccessPage from './mockups/pasarela-multiriel/pages/SuccessPage'

// Pagos P2M
import PagosP2MHomePage from './mockups/pagos-p2m/pages/HomePage'

// PSP Adquirente
import PSPAdquirentePage from './mockups/psp-adquirente/pages/PSPAdquirentePage'

// Integración SDK
import IntegracionSDKHomePage from './mockups/integracion-sdk/pages/HomePage'
import OnboardingPage from './mockups/integracion-sdk/pages/OnboardingPage'

// PSP Adquirente TPAP
import PSPAdquirenteTpapPage from './mockups/psp-adquirente-tpap/pages/PSPAdquirenteTpapPage'

// PSP Tecnológico
import PSPTecnologicoPage from './mockups/psp-tecnologico/pages/PSPTecnologicoPage'

// Onboarding Comercio
import OnboardingTypePage from './mockups/onboarding-comercio/pages/OnboardingTypePage'
import AfiliadoDashboardPage from './mockups/onboarding-comercio/afiliado/pages/DashboardPage'
import UpiSetupPage from './mockups/onboarding-comercio/afiliado/pages/UpiSetupPage'
import NoAfiliadoSegmentSelectionPage from './mockups/onboarding-comercio/no-afiliado/pages/SegmentSelectionPage'
import LargePage from './mockups/onboarding-comercio/no-afiliado/large/pages/LargePage'
import MediumOnboardingHomePage from './mockups/onboarding-comercio/no-afiliado/medium/pages/HomePage'
import SmallPage from './mockups/onboarding-comercio/no-afiliado/small/pages/SmallPage'
import MicroOnboardingHomePage from './mockups/onboarding-comercio/no-afiliado/micro/pages/HomePage'
import OnboardingComercioSuccessPage from './mockups/onboarding-comercio/pages/SuccessPage'

// Consentimiento Usuarios
import YapeHomePage from './mockups/consentimiento-usuarios/pages/YapeHomePage'
import CrearVPAPage from './mockups/consentimiento-usuarios/pages/CrearVPAPage'
import AsociarCuentaPage from './mockups/consentimiento-usuarios/pages/AsociarCuentaPage'

// Arquitectura
import ArquitecturaPage from './pages/ArquitecturaPage'

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
          
          {/* Pasarela Multiriel */}
          <Route path="/pasarela-multiriel" element={<ProtectedRoute><PasarelaHomePage /></ProtectedRoute>} />
          <Route path="/pasarela-multiriel/checkout" element={<ProtectedRoute><PasarelaCheckoutPage /></ProtectedRoute>} />
          <Route path="/pasarela-multiriel/success" element={<ProtectedRoute><PasarelaSuccessPage /></ProtectedRoute>} />
          
          {/* Pagos P2M */}
          <Route path="/pagos-p2m" element={<ProtectedRoute><PagosP2MHomePage /></ProtectedRoute>} />
          
          {/* PSP Adquirente */}
          <Route path="/psp-adquirente" element={<ProtectedRoute><PSPAdquirentePage /></ProtectedRoute>} />
          
          {/* Integración SDK */}
          <Route path="/integracion-sdk" element={<ProtectedRoute><IntegracionSDKHomePage /></ProtectedRoute>} />
          <Route path="/integracion-sdk/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
          
          {/* PSP Adquirente TPAP */}
          <Route path="/psp-adquirente-tpap" element={<ProtectedRoute><PSPAdquirenteTpapPage /></ProtectedRoute>} />
          
          {/* PSP Tecnológico */}
          <Route path="/psp-tecnologico" element={<ProtectedRoute><PSPTecnologicoPage /></ProtectedRoute>} />
          
          {/* Onboarding Comercio */}
          <Route path="/onboarding-comercio" element={<ProtectedRoute><OnboardingTypePage /></ProtectedRoute>} />
          <Route path="/onboarding-comercio/afiliado" element={<AfiliadoDashboardPage />} />
          <Route path="/onboarding-comercio/afiliado/upi-setup" element={<UpiSetupPage />} />
          <Route path="/onboarding-comercio/no-afiliado" element={<NoAfiliadoSegmentSelectionPage />} />
          <Route path="/onboarding-comercio/no-afiliado/large" element={<LargePage />} />
          <Route path="/onboarding-comercio/no-afiliado/medium" element={<MediumOnboardingHomePage />} />
          <Route path="/onboarding-comercio/no-afiliado/small" element={<SmallPage />} />
          <Route path="/onboarding-comercio/no-afiliado/micro" element={<MicroOnboardingHomePage />} />
          <Route path="/onboarding-comercio/afiliado/success" element={<OnboardingComercioSuccessPage />} />
          <Route path="/onboarding-comercio/no-afiliado/large/success" element={<OnboardingComercioSuccessPage />} />
          <Route path="/onboarding-comercio/no-afiliado/medium/success" element={<OnboardingComercioSuccessPage />} />
          <Route path="/onboarding-comercio/no-afiliado/small/success" element={<OnboardingComercioSuccessPage />} />
          <Route path="/onboarding-comercio/no-afiliado/micro/success" element={<OnboardingComercioSuccessPage />} />
          
          {/* Consentimiento Usuarios */}
          <Route path="/consentimiento-usuarios/home" element={<ProtectedRoute><YapeHomePage /></ProtectedRoute>} />
          <Route path="/consentimiento-usuarios/crear-vpa" element={<CrearVPAPage />} />
          <Route path="/consentimiento-usuarios/asociar-cuenta" element={<AsociarCuentaPage />} />
          
          {/* Arquitectura */}
          <Route path="/arquitectura" element={<ProtectedRoute><ArquitecturaPage /></ProtectedRoute>} />
          
          {/* Rutas legacy para compatibilidad */}
          <Route path="/checkout" element={<PasarelaCheckoutPage />} />
          <Route path="/success" element={<PasarelaSuccessPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App