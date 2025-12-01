# QR EMV Code - Principales Tags

## 📱 Tags Principales para Lectura de QR EMV

### **Identificación del QR**
- **00** - Payload Format Indicator
  - *Descripción:* Versión del formato EMV QR
  - *Ejemplo:* `000201` = Versión 01

- **01** - Point of Initiation Method
  - *Descripción:* Indica si el QR es estático (11) o dinámico (12)
  - *Ejemplo:* `010211` = QR estático, `010212` = QR dinámico

### **Información de Cuenta del Comercio**
- **26-51** - Merchant Account Information
  - *Descripción:* Información de la cuenta del comercio por proveedor
  - *Ejemplo:* `26580014pe.com.bcp.yape0109123456789` = Cuenta Yape

- **52** - Merchant Category Code (MCC)
  - *Descripción:* Código de categoría del comercio (4 dígitos)
  - *Ejemplo:* `52040000` = Categoría general

- **53** - Transaction Currency
  - *Descripción:* Código de moneda ISO 4217
  - *Ejemplo:* `5303604` = Soles peruanos (604)

- **54** - Transaction Amount
  - *Descripción:* Monto de la transacción
  - *Ejemplo:* `54041.00` = S/ 1.00

- **55** - Tip or Convenience Indicator
  - *Descripción:* Indicador de propina (01=fija, 02=porcentaje, 03=ambas)
  - *Ejemplo:* `550201` = Propina fija

- **56** - Value of Convenience Fee Fixed
  - *Descripción:* Valor fijo de propina
  - *Ejemplo:* `56040.50` = S/ 0.50 de propina

- **57** - Value of Convenience Fee Percentage
  - *Descripción:* Porcentaje de propina
  - *Ejemplo:* `570210` = 10% de propina

### **Información del Comercio**
- **58** - Country Code
  - *Descripción:* Código de país ISO 3166-1 alpha-2
  - *Ejemplo:* `5802PE` = Perú

- **59** - Merchant Name
  - *Descripción:* Nombre del comercio
  - *Ejemplo:* `5913FUENTE DE SODA` = Nombre del negocio

- **60** - Merchant City
  - *Descripción:* Ciudad del comercio
  - *Ejemplo:* `6004LIMA` = Ciudad Lima

- **61** - Postal Code
  - *Descripción:* Código postal del comercio
  - *Ejemplo:* `61051501` = Código postal 15001

### **Información Adicional**
- **62** - Additional Data Field Template
  - *Descripción:* Plantilla para datos adicionales
  - *Ejemplo:* `6207070312345` = Datos adicionales
  
  **Sub-tags del campo 62:**
  - **01** - Bill Number
    - *Descripción:* Número de factura
    - *Ejemplo:* `010512345` = Factura #12345
  
  - **02** - Mobile Number
    - *Descripción:* Número de teléfono móvil
    - *Ejemplo:* `0209987654321` = Teléfono 987654321
  
  - **03** - Store Label
    - *Descripción:* Etiqueta de la tienda
    - *Ejemplo:* `0307TIENDA1` = Tienda 1
  
  - **05** - Reference Label
    - *Descripción:* Etiqueta de referencia
    - *Ejemplo:* `0508REF12345` = Referencia 12345

### **Control**
- **63** - CRC (Cyclic Redundancy Check)
  - *Descripción:* Código de verificación de integridad (4 caracteres)
  - *Ejemplo:* `6304A1B2` = Checksum A1B2

## 🏦 Tags Específicos por Método de Pago

### **💳 Billeteras Digitales - Perú**
- **26** - Yape (BCP)
  - *Descripción:* Información de cuenta Yape del BCP
  - *Ejemplo:* `26580014pe.com.bcp.yape0109987654321`

- **27** - Plin (Interbank)
  - *Descripción:* Información de cuenta Plin
  - *Ejemplo:* `27580014pe.com.plin.app0109987654321`

- **28** - Tunki (BBVA)
  - *Descripción:* Información de cuenta Tunki del BBVA
  - *Ejemplo:* `28580014pe.com.bbva.tunki0109987654321`

### **🏦 Cuentas Bancarias**
- **29** - Cuenta Corriente/Ahorros
  - *Descripción:* Información de cuenta bancaria tradicional
  - *Ejemplo:* `29580014pe.com.bcp.cuenta01091234567890123`

- **30** - CCI (Código Cuenta Interbancaria)
  - *Descripción:* Cuenta interbancaria de 20 dígitos
  - *Ejemplo:* `30580014pe.cci.account012012345678901234567890`

### **💳 Tarjetas de Crédito/Débito**
- **31** - Visa
  - *Descripción:* Información de tarjeta Visa
  - *Ejemplo:* `31580014pe.com.visa.card0116************1234`

- **32** - Mastercard
  - *Descripción:* Información de tarjeta Mastercard
  - *Ejemplo:* `32580014pe.com.mc.card0116************5678`

- **33** - American Express
  - *Descripción:* Información de tarjeta Amex
  - *Ejemplo:* `33580014pe.com.amex.card0115***********9012`

### **🌐 Métodos Internacionales**
- **34** - PayPal
  - *Descripción:* Cuenta PayPal
  - *Ejemplo:* `34580014pe.com.paypal.com0120usuario@email.com`

- **35** - Google Pay
  - *Descripción:* Información de Google Pay
  - *Ejemplo:* `35580014pe.com.googlepay0115gpay.identifier`

- **36** - Apple Pay
  - *Descripción:* Información de Apple Pay
  - *Ejemplo:* `36580014pe.com.applepay.com0115apay.identifier`

### **Ejemplo de Estructura:**
```
00020101021126580014pe.com.bcp.yape01091234567890203456789012345678901234567890123456789052040000530360454041.005802PE5913NOMBRE TIENDA6004LIMA61050001162070703***6304ABCD
```

## 🔍 Decodificación Básica

### **Formato:** `TAG + LENGTH + VALUE`
- **TAG:** 2 dígitos
- **LENGTH:** 2 dígitos (longitud del valor)
- **VALUE:** Datos del tag

### **Ejemplo:**
- `5913NOMBRE TIENDA` = Tag 59, Length 13, Value "NOMBRE TIENDA"
- `54041.00` = Tag 54, Length 04, Value "1.00"