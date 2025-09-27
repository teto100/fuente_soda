import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Shield, Award, CreditCard, Smartphone, Wallet, Clock, Building, Coins, ChevronDown, FileText, Edit } from 'lucide-react'
import QRCode from 'qrcode'
import LoadingTransition from '../components/LoadingTransition'
import SuccessAlert from '../components/SuccessAlert'
import ValidationAlert from '../components/ValidationAlert'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const [selectedPayment, setSelectedPayment] = useState('')
  const [qrCode, setQrCode] = useState('')
  const [showBilling, setShowBilling] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showAllPayments, setShowAllPayments] = useState(true)
  const [validationAlert, setValidationAlert] = useState({ show: false, message: '' })
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  })
  const [cardFieldsOpacity, setCardFieldsOpacity] = useState(1)
  const [selectedWallet, setSelectedWallet] = useState('')
  const [walletData, setWalletData] = useState({
    phone: '',
    approvalCode: '',
    bank: ''
  })
  const [showBankMessage, setShowBankMessage] = useState(false)
  const [selectedBank, setSelectedBank] = useState('')
  const [dni, setDni] = useState('12345678')
  const [formData, setFormData] = useState({
    email: 'amendoza@email.com',
    phone: '+51 987 654 321',
    name: 'Antonio Mendoza Ochoa',
    address: 'Av. Javier Prado 123, San Isidro, Lima'
  })

  const baseAmount = 1299.00
  const tax = 34.00
  
  const calculateTotal = () => {
    let total = baseAmount + tax
    let discount = 0
    let fee = 0
    let loyaltyPoints = 0
    
    switch(selectedPayment) {
      case 'card':
        loyaltyPoints = 20 // 20 puntos
        break
      case 'upi':
        discount = total * 0.01 // 1% descuento
        total -= discount
        break
      case 'transfer':
        loyaltyPoints = 10 // 10 puntos
        break
    }
    
    return { total, discount, fee, loyaltyPoints }
  }
  
  const { total, discount, fee, loyaltyPoints } = calculateTotal()

  const generateQR = async () => {
    const upiData = `upi://pay?pa=tiendazaara@niubiz&pn=Tienda Zaara&am=${total.toFixed(2)}&cu=PEN&tn=Polo Premium - ID:TZ${Date.now().toString().slice(-6)}`
    try {
      const qr = await QRCode.toDataURL(upiData, { width: 200, margin: 2 })
      setQrCode(qr)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (selectedPayment === 'upi' || selectedPayment === 'wallet') {
      generateQR()
    }
  }, [selectedPayment, total])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validación DNI para transferencia bancaria
    if (selectedPayment === 'transfer') {
      if (!dni || dni.length !== 8 || !/^\d{8}$/.test(dni)) {
        setValidationAlert({ show: true, message: 'Por favor ingresa un DNI válido de 8 dígitos para continuar con la transferencia bancaria.' })
        return
      }
      if (!selectedBank) {
        setValidationAlert({ show: true, message: 'Selecciona tu banco preferido para procesar la transferencia.' })
        return
      }
    }
    
    if (selectedPayment === 'wallet' && selectedWallet === 'plin') {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setShowSuccess(true)
        setTimeout(() => {
          navigate('/')
        }, 2000)
      }, 5000)
    } else if (selectedPayment === 'transfer') {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setShowSuccess(true)
        setTimeout(() => {
          navigate('/')
        }, 2000)
      }, 5000)
    } else {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setShowSuccess(true)
        setTimeout(() => {
          navigate('/')
        }, 3000)
      }, 3000)
    }
  }

  const handlePaymentSelect = (payment) => {
    setSelectedPayment(payment)
    setShowAllPayments(false)
    
    // Reset states for different payment methods
    if (payment === 'transfer') {
      setSelectedBank('')
      setDni('46310476') // Pre-fill DNI
    }
    
    if (payment === 'card') {
      // Limpiar campos primero
      setCardData({ number: '', expiry: '', cvv: '', name: '' })
      setCardFieldsOpacity(1)
      
      // Efecto fade después de 800ms
      setTimeout(() => {
        setCardFieldsOpacity(0.3)
        
        // Prellenar con fade in después de 200ms más
        setTimeout(() => {
          setCardData({
            number: '4532 1234 5678 9012',
            expiry: '12/28',
            cvv: '123',
            name: 'ANTONIO MENDOZA OCHOA'
          })
          setCardFieldsOpacity(1)
        }, 200)
      }, 800)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => navigate('/')}
                className="mr-4 p-2 hover:bg-gray-100 rounded-full"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Checkout Seguro</h1>
            </div>
            {/* Zona Segura */}
            <div className="bg-white rounded-lg shadow-sm p-3 border border-blue-100">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">TZ</span>
                </div>
                <div className="text-right">
                  <h3 className="font-semibold text-gray-900 text-sm">Tienda Zaara</h3>
                  <div className="flex items-center space-x-3 text-xs">
                    <div className="flex items-center space-x-1">
                      <Shield className="w-3 h-3 text-green-500" />
                      <span className="text-green-600">Pago 100% Seguro</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="w-3 h-3 text-blue-500" />
                      <span className="text-blue-600">Verificado</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


        <div className={`grid grid-cols-1 xl:grid-cols-3 gap-8 transition-all duration-700 ease-in-out ${selectedPayment && !showAllPayments ? 'transform scale-98' : 'scale-100'}`}>
          
          {/* Payment Methods */}
          <div className={`${selectedPayment && !showAllPayments ? 'xl:col-span-1' : 'xl:col-span-2'}`}>
            <div className={`bg-white shadow-sm p-6 transition-all duration-700 ease-in-out ${selectedPayment && !showAllPayments ? 'rounded-3xl transform -translate-x-2' : 'rounded-lg'}`}>
              {showAllPayments ? (
                <>
                  <h2 className="text-xl font-bold mb-6">Selecciona tu método de pago</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div onClick={() => handlePaymentSelect('card')} className={`p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${selectedPayment === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                      <div className="flex flex-col items-center text-center">
                        <CreditCard className="w-8 h-8 mb-2 text-blue-600" />
                        <h3 className="font-semibold text-sm">Crédito/Débito</h3>
                        <div className="flex space-x-1 mt-2">
                          <img src="/assets/icons/visa.svg" alt="Visa" className="h-4 w-4 object-contain" />
                          <img src="/assets/icons/mastercard.svg" alt="Mastercard" className="h-4 w-4 object-contain" />
                          <img src="/assets/icons/amex.svg" alt="Amex" className="h-4 w-4 object-contain" />
                        </div>
                        <span className="text-xs text-blue-600 mt-1 animate-pulse bg-blue-100 px-2 py-1 rounded-full font-semibold">+20 puntos</span>
                      </div>
                    </div>
                    <div onClick={() => handlePaymentSelect('upi')} className={`p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${selectedPayment === 'upi' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                      <div className="flex flex-col items-center text-center">
                        <Smartphone className="w-8 h-8 mb-2 text-green-600" />
                        <h3 className="font-semibold text-sm">UPI BCR</h3>
                        <div className="flex space-x-1 mt-2">
                          <img src="/assets/icons/googlepay.svg" alt="GooglePay" className="h-4 w-4 object-contain" />
                          <img src="/assets/img/yape.png" alt="Yape" className="h-4 w-4 object-contain" />
                          <img src="/assets/img/plin.jpeg" alt="Plin" className="h-4 w-4 object-contain" />
                        </div>
                        <span className="text-xs text-green-600 mt-1 animate-pulse bg-green-100 px-2 py-1 rounded-full font-semibold shadow-lg">-1% descuento</span>
                      </div>
                    </div>
                    <div onClick={() => handlePaymentSelect('wallet')} className={`p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${selectedPayment === 'wallet' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                      <div className="flex flex-col items-center text-center">
                        <Wallet className="w-8 h-8 mb-2 text-purple-600" />
                        <h3 className="font-semibold text-sm">Billeteras</h3>
                        <div className="flex space-x-1 mt-2">
                          <img src="/assets/img/yape.png" alt="Yape" className="h-4 w-4 object-contain" />
                          <img src="/assets/img/plin.jpeg" alt="Plin" className="h-4 w-4 object-contain" />
                        </div>
                        <span className="text-xs text-cyan-600 mt-1 animate-pulse bg-purple-100 px-2 py-1 rounded-full font-semibold">+20 puntos Plin</span>
                      </div>
                    </div>
                     <div className="p-4 border-2 border-gray-200 rounded-xl opacity-50">
                      <div className="flex flex-col items-center text-center">
                        <Clock className="w-8 h-8 mb-2 text-orange-600" />
                        <h3 className="font-semibold text-sm">Buy Now Pay Later</h3>
                        <p className="text-xs text-gray-600 mt-1">0% interés</p>
                         <p className="text-xs text-gray-500 mt-1">Próximamente</p>
                      </div>
                    </div>
                    <div onClick={() => handlePaymentSelect('transfer')} className={`p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${selectedPayment === 'transfer' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                      <div className="flex flex-col items-center text-center">
                        <Building className="w-8 h-8 mb-2 text-blue-600" />
                        <h3 className="font-semibold text-sm">Transferencia</h3>
                        <div className="flex space-x-1 mt-2">
                          <img src="/assets/img/bcp.jpg" alt="BCP" className="h-4 w-4 object-contain" />
                          <img src="/assets/img/bbva.png" alt="BBVA" className="h-4 w-4 object-contain" />
                        </div>
                        <span className="text-xs text-blue-600 mt-1 animate-pulse bg-blue-100 px-2 py-1 rounded-full font-semibold">+10 puntos</span>
                      </div>
                    </div>
                    <div className="p-4 border-2 border-gray-200 rounded-xl opacity-50">
                      <div className="flex flex-col items-center text-center">
                        <Coins className="w-8 h-8 mb-2 text-yellow-600" />
                        <h3 className="font-semibold text-sm">CriptoMonedas</h3>
                        <p className="text-xs text-gray-500 mt-1">Próximamente</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Método seleccionado</h3>
                    <button onClick={() => setShowAllPayments(true)} className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
                      <Edit className="w-4 h-4" />
                      <span className="text-sm">Cambiar</span>
                    </button>
                  </div>
                  <div className="p-3 border-2 border-blue-500 bg-blue-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      {selectedPayment === 'card' && <CreditCard className="w-6 h-6 text-blue-600" />}
                      {selectedPayment === 'upi' && <Smartphone className="w-6 h-6 text-green-600" />}
                      {selectedPayment === 'wallet' && <Wallet className="w-6 h-6 text-purple-600" />}
                      {selectedPayment === 'bnpl' && <Clock className="w-6 h-6 text-orange-600" />}
                      {selectedPayment === 'transfer' && <Building className="w-6 h-6 text-blue-600" />}
                      <div>
                        <h4 className="font-semibold text-sm">
                          {selectedPayment === 'card' && 'Crédito/Débito'}
                          {selectedPayment === 'upi' && 'UPI BCR'}
                          {selectedPayment === 'wallet' && 'Billeteras'}
                          {selectedPayment === 'bnpl' && 'Buy Now Pay Later'}
                          {selectedPayment === 'transfer' && 'Transferencia'}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contenedor de Pago */}
          {selectedPayment && !showAllPayments && (
            <div className="xl:col-span-1 animate-in slide-in-from-right-5 duration-700">
              <div id="pagoContainer" className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
                <h3 className="text-lg font-semibold mb-4">
                  {selectedPayment === 'transfer' ? 'Transferencia Bancaria' : 'Completa tu pago'}
                </h3>
                
                {selectedPayment === 'upi' && qrCode && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
                      <div className="flex flex-col items-center">
                        <div className="relative bg-white p-3 rounded-xl shadow-lg">
                          <img src={qrCode} alt="QR Code UPI" className="w-32 h-32" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white rounded-full p-1 shadow-md">
                              <img src="/assets/img/upi.jpeg" alt="UPI Logo" className="w-6 h-6 rounded-full object-contain" />
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 text-center">
                          <div className="flex items-center justify-center mb-1 bg-green-100 rounded-full px-2 py-1">
                            <Shield className="w-3 h-3 text-green-600 mr-1" />
                            <span className="text-xs text-green-700 font-semibold">Verificado</span>
                          </div>
                          <p className="text-sm font-semibold text-green-600">S/ {total.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <label className="block text-sm font-medium mb-2">Paga con tú VPA</label>
                      <input type="text" placeholder="usuario@upi" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>
                  </div>
                )}

                {selectedPayment === 'card' && (
                  <div className="space-y-4" style={{ opacity: cardFieldsOpacity, transition: 'opacity 0.3s ease-in-out' }}>
                    <div>
                      <label className="block text-sm font-medium mb-1">Número de tarjeta</label>
                      <input 
                        type="text" 
                        placeholder="1234 5678 9012 3456" 
                        value={cardData.number}
                        onChange={(e) => setCardData({...cardData, number: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Vencimiento</label>
                        <input 
                          type="text" 
                          placeholder="MM/AA" 
                          value={cardData.expiry}
                          onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">CVV</label>
                        <input 
                          type="text" 
                          placeholder="123" 
                          value={cardData.cvv}
                          onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Nombre del titular</label>
                      <input 
                        type="text" 
                        placeholder="Nombre completo" 
                        value={cardData.name}
                        onChange={(e) => setCardData({...cardData, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300" 
                      />
                    </div>
                  </div>
                )}

                {selectedPayment === 'wallet' && (
                  <div className="space-y-4">
                    {/* QR Code para Billeteras - Siempre visible */}
                    {qrCode && (
                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200">
                        <div className="flex flex-col items-center">
                          <div className="relative bg-white p-3 rounded-xl shadow-lg">
                            <img src={qrCode} alt="QR Code Billetera" className="w-32 h-32" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-white rounded-full p-1 shadow-md">
                                <img src="/assets/img/logo_teto.png" alt="Teto Logo" className="w-6 h-6 rounded-full object-contain" />
                              </div>
                            </div>
                          </div>
                          <div className="mt-2 text-center">
                            <div className="flex items-center justify-center mb-1 bg-purple-100 rounded-full px-2 py-1">
                              <Shield className="w-3 h-3 text-purple-600 mr-1" />
                              <span className="text-xs text-purple-700 font-semibold">Verificado</span>
                            </div>
                             <span className="text-xs text-blue-700 font-semibold">Power by Antonio's Crews</span>
                            <p className="text-sm font-semibold text-purple-600">S/ {total.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {!selectedWallet ? (
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">Selecciona tu billetera</h4>
                        <div className="grid grid-cols-1 gap-3">
                          <button 
                            onClick={() => setSelectedWallet('yape')}
                            className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all"
                          >
                            <img src="/assets/img/yape.png" alt="Yape" className="w-8 h-8 object-contain" />
                            <div className="text-left">
                              <h5 className="font-semibold text-sm">Paga con Yape</h5>
                              <p className="text-xs text-gray-600">Pago instantáneo con tu celular</p>
                            </div>
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedWallet('plin')
                              setWalletData({...walletData, phone: '987654321'})
                            }}
                            className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all"
                          >
                            <img src="/assets/img/plin.jpeg" alt="Plin" className="w-8 h-8 object-contain" />
                            <div className="text-left">
                              <h5 className="font-semibold text-sm">Paga con Plin</h5>
                              <p className="text-xs text-gray-600">Transferencias entre bancos al instante</p>
                            </div>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <img 
                              src={selectedWallet === 'yape' ? '/assets/img/yape.png' : '/assets/img/plin.jpeg'} 
                              alt={selectedWallet === 'yape' ? 'Yape' : 'Plin'} 
                              className="w-6 h-6 object-contain" 
                            />
                            <h4 className="font-medium">{selectedWallet === 'yape' ? 'Yape' : 'Plin'}</h4>
                          </div>
                          <button 
                            onClick={() => {
                              setSelectedWallet('')
                              setWalletData({ phone: '', approvalCode: '', bank: '' })
                              setShowBankMessage(false)
                            }}
                            className="text-sm text-blue-600 hover:text-blue-700"
                          >
                            Cambiar
                          </button>
                        </div>
                        
                        {selectedWallet === 'yape' && (
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium mb-1">Número de celular</label>
                              <input 
                                type="tel" 
                                placeholder="987 654 321" 
                                value={walletData.phone}
                                onChange={(e) => setWalletData({...walletData, phone: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" 
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Código de aprobación</label>
                              <input 
                                type="text" 
                                placeholder="123456" 
                                value={walletData.approvalCode}
                                onChange={(e) => setWalletData({...walletData, approvalCode: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" 
                              />
                            </div>
                          </div>
                        )}
                        
                        {selectedWallet === 'plin' && (
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium mb-1">Número de celular</label>
                              <input 
                                type="tel" 
                                placeholder="987 654 321" 
                                value={walletData.phone}
                                onChange={(e) => setWalletData({...walletData, phone: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" 
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Banco</label>
                              <select 
                                value={walletData.bank}
                                onChange={(e) => setWalletData({...walletData, bank: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                              >
                                <option value="">Selecciona tu banco</option>
                                <option value="IBK">Interbank (IBK)</option>
                                <option value="BBVA">BBVA</option>
                                <option value="Scotiabank">Scotiabank</option>
                              </select>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {selectedPayment === 'transfer' && (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 text-lg">Selecciona tu banco</h4>
                
                    
                    {/* Instrucciones de pago - Solo aparece cuando se selecciona banco */}
                    {selectedBank && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="flex items-start space-x-2">
                          <div className="bg-blue-600 rounded-full p-1">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <h6 className="font-semibold text-blue-900 mb-1" style={{fontSize: '0.6rem'}}>Instrucciones de pago</h6>
                            <p className="text-blue-700" style={{fontSize: '0.6rem'}}>
                              Completa el pago en tu aplicación móvil bancaria. Recibirás los datos de transferencia después de confirmar.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  
                    <div className="grid grid-cols-1 gap-3 transition-all duration-500">
                      {/* BCP */}
                      <button 
                        onClick={() => setSelectedBank('bcp')}
                        className={`flex items-center rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-500 shadow-md hover:shadow-lg ${
                          selectedBank === 'bcp' ? 'border-blue-500 bg-blue-50 shadow-lg border-3 p-4 space-x-3' : 
                          selectedBank && selectedBank !== 'bcp' ? 'border-gray-200 border-2 p-2 space-x-2 scale-90' :
                          'border-gray-200 border-3 p-4 space-x-3'
                        }`}
                      >
                        <img src="/assets/img/bcp.jpg" alt="BCP" className={`object-contain ${
                          selectedBank && selectedBank !== 'bcp' ? 'w-8 h-8' : 'w-10 h-10'
                        }`} />
                        <div className={`text-left flex-1 ${
                          selectedBank && selectedBank !== 'bcp' && selectedBank ? 'text-xs' : ''
                        }`}>
                          <h5 className={`font-bold text-gray-900 ${
                            selectedBank && selectedBank !== 'bcp' ? 'text-xs' : 'text-sm'
                          }`}>BCP</h5>
                          <p className={`text-gray-600 ${
                            selectedBank && selectedBank !== 'bcp' ? 'text-xs' : 'text-xs'
                          }`}>App BCP</p>
                        </div>
                        {selectedBank === 'bcp' && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
                      </button>
                      
                      {/* Interbank */}
                      <button 
                        onClick={() => setSelectedBank('interbank')}
                        className={`flex items-center rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-500 shadow-md hover:shadow-lg ${
                          selectedBank === 'interbank' ? 'border-blue-500 bg-blue-50 shadow-lg border-3 p-4 space-x-3' : 
                          selectedBank && selectedBank !== 'interbank' ? 'border-gray-200 border-2 p-2 space-x-2 scale-90' :
                          'border-gray-200 border-3 p-4 space-x-3'
                        }`}
                      >
                        <img src="/assets/img/ibk.jpg" alt="Interbank" className={`object-contain ${
                          selectedBank && selectedBank !== 'interbank' ? 'w-8 h-8' : 'w-10 h-10'
                        }`} />
                        <div className={`text-left flex-1 ${
                          selectedBank && selectedBank !== 'interbank' && selectedBank ? 'text-xs' : ''
                        }`}>
                          <h5 className={`font-bold text-gray-900 ${
                            selectedBank && selectedBank !== 'interbank' ? 'text-xs' : 'text-sm'
                          }`}>Interbank</h5>
                          <p className={`text-gray-600 ${
                            selectedBank && selectedBank !== 'interbank' ? 'text-xs' : 'text-xs'
                          }`}>App Interbank</p>
                        </div>
                        {selectedBank === 'interbank' && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
                      </button>
                      
                      {/* BBVA */}
                      <button 
                        onClick={() => setSelectedBank('bbva')}
                        className={`flex items-center rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-500 shadow-md hover:shadow-lg opacity-75 ${
                          selectedBank === 'bbva' ? 'border-blue-500 bg-blue-50 shadow-lg border-3 p-4 space-x-3' : 
                          selectedBank && selectedBank !== 'bbva' ? 'border-gray-200 border-2 p-2 space-x-2 scale-90' :
                          'border-gray-200 border-3 p-4 space-x-3'
                        }`}
                      >
                        <img src="/assets/img/bbva.png" alt="BBVA" className={`object-contain ${
                          selectedBank && selectedBank !== 'bbva' ? 'w-8 h-8' : 'w-10 h-10'
                        }`} />
                        <div className={`text-left flex-1 ${
                          selectedBank && selectedBank !== 'bbva' && selectedBank ? 'text-xs' : ''
                        }`}>
                          <h5 className={`font-bold text-gray-900 ${
                            selectedBank && selectedBank !== 'bbva' ? 'text-xs' : 'text-sm'
                          }`}>BBVA</h5>
                          <p className={`text-red-600 ${
                            selectedBank && selectedBank !== 'bbva' ? 'text-xs' : 'text-xs'
                          }`}>⚠️ Ha presentado problemas la última hora</p>
                        </div>
                        {selectedBank === 'bbva' && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
                      </button>
                      
                      {/* Scotiabank */}
                      <button 
                        onClick={() => setSelectedBank('scotiabank')}
                        className={`flex items-center rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-500 shadow-md hover:shadow-lg ${
                          selectedBank === 'scotiabank' ? 'border-blue-500 bg-blue-50 shadow-lg border-3 p-4 space-x-3' : 
                          selectedBank && selectedBank !== 'scotiabank' ? 'border-gray-200 border-2 p-2 space-x-2 scale-90' :
                          'border-gray-200 border-3 p-4 space-x-3'
                        }`}
                      >
                        <img src="/assets/img/scotia.jpg" alt="Scotiabank" className={`object-contain ${
                          selectedBank && selectedBank !== 'scotiabank' ? 'w-8 h-8' : 'w-10 h-10'
                        }`} />
                        <div className={`text-left flex-1 ${
                          selectedBank && selectedBank !== 'scotiabank' && selectedBank ? 'text-xs' : ''
                        }`}>
                          <h5 className={`font-bold text-gray-900 ${
                            selectedBank && selectedBank !== 'scotiabank' ? 'text-xs' : 'text-sm'
                          }`}>Scotiabank</h5>
                          <p className={`text-gray-600 ${
                            selectedBank && selectedBank !== 'scotiabank' ? 'text-xs' : 'text-xs'
                          }`}>Scotia Móvil</p>
                        </div>
                        {selectedBank === 'scotiabank' && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
                      </button>
                    </div>
                    

                    
                    {/* DNI y Botón Pagar */}
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <div className="space-y-3">
                        <div>
                          <label className="block font-medium mb-1" style={{fontSize: '0.8rem'}}>DNI</label>
                          <input 
                            type="text" 
                            placeholder="12345678" 
                            value={dni}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '').slice(0, 8)
                              setDni(value)
                            }}
                            className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            style={{fontSize: '0.8rem'}}
                            maxLength="8"
                          />
                        </div>
                        <button 
                          onClick={handleSubmit}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                        >
                          Pagar S/ {total.toFixed(2)}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {selectedPayment === 'bnpl' && (
                  <div className="text-center py-8">
                    <p className="text-gray-600">Formulario de pago para Buy Now Pay Later</p>
                  </div>
                )}

                {selectedPayment !== 'transfer' && (
                  <form onSubmit={handleSubmit} className="mt-6">
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                      Pagar S/ {total.toFixed(2)}
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* Order Summary */}
          <div className="xl:col-span-1">
            <div className="bg-white shadow-sm p-4 h-fit rounded-lg">
              <h2 className="text-base font-semibold mb-3 flex items-center">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Resumen del Pedido
              </h2>
              
              <div className="border-b pb-3 mb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-sm">Polo Premium</h3>
                    <p className="text-gray-600 text-xs">Cantidad: 1</p>
                  </div>
                  <span className="font-semibold text-sm">S/ {baseAmount.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>S/ {baseAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Impuesto</span>
                  <span>S/ {tax.toFixed(2)}</span>
                </div>
                
                {fee > 0 && (
                  <div className="flex justify-between text-red-600 text-sm">
                    <span>Comisión (1.5%)</span>
                    <span>+S/ {fee.toFixed(2)}</span>
                  </div>
                )}
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 text-sm">
                    <span>Descuento UPI (1%)</span>
                    <span>-S/ {discount.toFixed(2)}</span>
                  </div>
                )}
                
                {loyaltyPoints > 0 && (
                  <div className="flex justify-between text-blue-600 text-sm">
                    <span>Puntos Loyalty</span>
                    <span>+{loyaltyPoints} pts</span>
                  </div>
                )}
                
                <div className="border-t pt-2 flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span>S/ {total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-4 p-2 bg-green-50 rounded border border-green-200">
                <div className="flex items-center text-xs text-green-700">
                  <Shield className="w-3 h-3 mr-1" />
                  Pago 100% seguro
                </div>
              </div>
            </div>
            
            {/* Módulo de Facturación */}
            <div className="bg-white rounded-lg shadow-sm p-3 border border-blue-100 mt-4">
              <button 
                onClick={() => setShowBilling(!showBilling)}
                className="w-full flex items-center justify-between hover:bg-gray-50 rounded transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900 text-xs">Facturación</h3>
                    <div className="flex items-center space-x-1">
                      <p className="text-xs text-gray-600">Datos de envío</p>
                      <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform ${showBilling ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </div>
              </button>
              
              {showBilling && (
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs font-medium mb-1">Nombre</label>
                      <input
                        type="text"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Correo</label>
                      <input
                        type="email"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Teléfono</label>
                      <input
                        type="tel"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Dirección</label>
                      <input
                        type="text"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <LoadingTransition 
        isVisible={isLoading} 
        message={
          selectedPayment === 'wallet' && selectedWallet === 'plin' 
            ? `Sigue los pasos de tu aplicativo... Esperando la respuesta de Plin ${walletData.bank}` 
            : selectedPayment === 'transfer'
            ? `Sigue los pasos de tu aplicativo bancario... Procesando transferencia`
            : "Procesando pago..."
        } 
      />
      <SuccessAlert isVisible={showSuccess} total={total} onClose={() => setShowSuccess(false)} />
      <ValidationAlert 
        isVisible={validationAlert.show} 
        message={validationAlert.message} 
        onClose={() => setValidationAlert({ show: false, message: '' })} 
      />
    </div>
  )
}