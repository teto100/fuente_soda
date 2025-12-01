# Entorno y Despliegue - Mockup Pasarela de Pagos

## Entornos

### Desarrollo (XAMPP Local)
```env
# Configuración Apache
DocumentRoot=/xampp/htdocs/upi-mockup
ServerName=localhost
Port=80

# PHP
PHP_VERSION=8.1+
memory_limit=256M

# React Dev Server
REACT_PORT=3000
REACT_HOST=localhost

# Configuración del sistema
APP_ENV=development
APP_DEBUG=true
APP_URL=http://localhost/upi-mockup
API_URL=http://localhost/upi-mockup/api
```

### Staging (Servidor de pruebas)
```env
# Apache/Nginx
DocumentRoot=/var/www/upi-mockup
ServerName=staging.upimockup.com
SSL=enabled

# PHP
PHP_VERSION=8.1
opcache.enable=1
opcache.memory_consumption=128

# React Build
REACT_BUILD_PATH=/var/www/upi-mockup/frontend/dist

# Sistema
APP_ENV=staging
APP_DEBUG=false
APP_URL=https://staging.upimockup.com
```

### Producción
```env
# Servidor web
DocumentRoot=/var/www/upi-mockup
ServerName=www.upimockup.com
SSL=required
HTTP2=enabled

# PHP optimizado
PHP_VERSION=8.1
opcache.enable=1
opcache.memory_consumption=256
opcache.max_accelerated_files=10000

# React Build Optimizado
REACT_BUILD_PATH=/var/www/upi-mockup/frontend/dist
REACT_BUILD_OPTIMIZED=true

# Sistema
APP_ENV=production
APP_DEBUG=false
APP_URL=https://www.upimockup.com
```

## Variables de entorno requeridas

### Aplicación
```env
# Configuración básica
APP_NAME="UPI Payment Gateway Mockup"
APP_VERSION=1.0.0
APP_TIMEZONE=America/New_York
APP_LOCALE=en_US

# Simulación de datos
MOCK_DATA_PATH=/data/mock
SIMULATE_DELAYS=true
DEFAULT_DELAY_MS=2000

# Sesiones demo
SESSION_LIFETIME=3600
SESSION_SECURE=false
CSRF_TOKEN_NAME=_token

# Assets y archivos
UPLOAD_MAX_SIZE=5242880
ALLOWED_IMAGE_TYPES=jpg,jpeg,png,webp,svg
STATIC_PATH=/public/assets
```

### APIs simuladas
```env
# Pasarelas de pago (MOCK)
RAZORPAY_KEY_ID=mock_key_id
RAZORPAY_KEY_SECRET=mock_key_secret
STRIPE_PUBLIC_KEY=mock_stripe_public
PAYPAL_CLIENT_ID=mock_paypal_client

# Respuestas simuladas
MOCK_SUCCESS_RATE=85
MOCK_FAILURE_RATE=15
SIMULATE_NETWORK_DELAY=true

# Notificaciones (MOCK)
EMAIL_SIMULATION=true
SMS_SIMULATION=true

# Datos de prueba
TEST_CARD_NUMBERS=4111111111111111,5555555555554444
TEST_UPI_IDS=test@upi,demo@paytm
```

## Proceso de despliegue

### Desarrollo local (XAMPP)
```bash
# 1. Clonar repositorio
git clone https://github.com/tu-usuario/fuente-soda.git
cd fuente-soda

# 2. Configurar base de datos
mysql -u root -p
CREATE DATABASE fuente_soda_dev;

# 3. Importar esquema inicial
mysql -u root -p fuente_soda_dev < database/schema.sql

# 4. Configurar permisos
chmod 755 public/uploads/
chmod 755 storage/logs/

# 5. Instalar dependencias (si usa Composer)
composer install --dev

# 6. Configurar Apache virtual host
# Agregar en httpd-vhosts.conf
```

### Staging/Producción
```bash
# 1. Preparar servidor
sudo apt update
sudo apt install apache2 php8.1 mysql-server
sudo a2enmod rewrite ssl

# 2. Configurar base de datos
mysql -u root -p
CREATE DATABASE fuente_soda_prod;
CREATE USER 'prod_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON fuente_soda_prod.* TO 'prod_user'@'localhost';

# 3. Deploy de código
git clone https://github.com/tu-usuario/fuente-soda.git /var/www/fuente-soda
cd /var/www/fuente-soda
git checkout main

# 4. Configurar permisos
sudo chown -R www-data:www-data /var/www/fuente-soda
sudo chmod -R 755 public/uploads/
sudo chmod -R 755 storage/

# 5. Configurar SSL
sudo certbot --apache -d www.fuentesoda.com

# 6. Optimizaciones
# Habilitar compresión gzip
# Configurar cache headers
# Optimizar imágenes
```

## Infraestructura requerida

### Servidor mínimo
- **CPU**: 2 cores (2.4GHz)
- **RAM**: 4GB
- **Disco**: 50GB SSD
- **Ancho de banda**: 100Mbps
- **OS**: Ubuntu 20.04 LTS o CentOS 8

### Base de datos
- **MySQL**: 8.0+
- **RAM dedicada**: 2GB mínimo
- **Conexiones simultáneas**: 50
- **Backup automático**: Diario
- **Replicación**: Recomendada para producción

### Backup y recuperación
```bash
# Backup automático diario
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u backup_user -p fuente_soda_prod > /backups/db_$DATE.sql
tar -czf /backups/files_$DATE.tar.gz /var/www/fuente-soda/public/uploads/

# Retener backups por 30 días
find /backups/ -name "*.sql" -mtime +30 -delete
find /backups/ -name "*.tar.gz" -mtime +30 -delete
```

### Monitoreo
- **Uptime**: Pingdom o similar
- **Performance**: New Relic o Google Analytics
- **Logs**: Centralizados en /var/log/fuente-soda/
- **Alertas**: Email para errores críticos
- **Métricas**: CPU, RAM, disco, conexiones DB