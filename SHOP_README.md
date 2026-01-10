# Sistema de Ventas con Payphone

Sistema de ventas en línea desarrollado con Vue 3, TypeScript, PrimeVue y integración con Payphone para procesamiento de pagos.

## 🚀 Características

- ✅ Catálogo de productos con búsqueda y filtros
- ✅ Carrito de compras persistente (localStorage)
- ✅ Cálculo automático de impuestos (IVA 15%)
- ✅ Integración con Payphone para pagos seguros
- ✅ Diseño responsive y moderno
- ✅ Sistema de temas personalizables
- ✅ Gestión de estado con Pinia

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn
- Cuenta de Payphone (para procesamiento de pagos)

## 🔧 Instalación

1. Clona el repositorio
```bash
git clone <url-del-repositorio>
cd negocioTarea
```

2. Instala las dependencias
```bash
npm install
```

3. Configura las variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# API Base URL (si tienes un backend)
VITE_API_URL=http://localhost:8000

# Payphone Configuration
VITE_PAYPHONE_TOKEN=tu_token_de_payphone_aqui
VITE_PAYPHONE_BASE_URL=https://pay.payphonetodoesposible.com
```

## 📱 Configuración de Payphone

Para configurar la integración con Payphone:

1. **Crear cuenta en Payphone**
   - Visita [https://payphone.app](https://payphone.app)
   - Regístrate y completa el proceso de verificación
   - Obtén tu token de API desde el dashboard

2. **Configurar el token**
   - Edita el archivo `src/services/payphone.service.ts`
   - Reemplaza `'YOUR_PAYPHONE_TOKEN'` con tu token real
   - O mejor aún, usa la variable de entorno `VITE_PAYPHONE_TOKEN`

3. **Actualizar el servicio (opcional)**
   ```typescript
   // En src/services/payphone.service.ts
   private readonly token: string = import.meta.env.VITE_PAYPHONE_TOKEN || 'YOUR_PAYPHONE_TOKEN';
   ```

4. **Configurar webhooks** (para producción)
   - En el dashboard de Payphone, configura una URL de webhook
   - Esta URL recibirá las notificaciones de pago
   - Ejemplo: `https://tu-dominio.com/api/payphone/webhook`

## 🎯 Uso del Sistema

### Ejecutar en desarrollo

```bash
npm run dev
```

El servidor se iniciará en `http://localhost:5173`

### Compilar para producción

```bash
npm run build
```

### Vista previa de producción

```bash
npm run preview
```

## 📂 Estructura del Proyecto

```
src/
├── components/
│   ├── Globales/          # Componentes globales (header, footer, etc.)
│   └── Shop/              # Componentes de la tienda
│       └── ProductCard.vue
├── views/
│   ├── Global/            # Vistas generales
│   └── Shop/              # Vistas de la tienda
│       ├── ProductsView.vue
│       ├── CartView.vue
│       └── CheckoutView.vue
├── stores/
│   ├── Shop/
│   │   └── cartStore.ts   # Store del carrito de compras
│   └── System/            # Stores del sistema
├── services/
│   ├── products.service.ts  # Servicio de productos
│   └── payphone.service.ts  # Integración con Payphone
├── types/
│   └── examples.ts        # Interfaces de TypeScript
└── router/
    └── index.ts           # Configuración de rutas
```

## 🛒 Funcionalidades Principales

### 1. Catálogo de Productos
- Visualización en grid responsive
- Búsqueda en tiempo real
- Filtros por categoría
- Información de stock

### 2. Carrito de Compras
- Agregar/eliminar productos
- Ajustar cantidades
- Cálculo automático de totales
- Persistencia en localStorage

### 3. Proceso de Checkout
- Formulario de información del cliente
- Validación de datos
- Resumen del pedido
- Integración con Payphone

### 4. Integración Payphone
- Creación de links de pago
- Redirección segura a la pasarela
- Verificación de transacciones
- Manejo de respuestas

## 🎨 Personalización

### Modificar Productos

Los productos están definidos en `src/services/products.service.ts`. Modifica el array `products` para agregar, editar o eliminar productos:

```typescript
{
  id: 1,
  name: 'Producto',
  description: 'Descripción del producto',
  category: 'Categoría',
  price: 99.99,
  stock: 10,
  imageUrl: 'URL de la imagen',
  active: true,
}
```

### Ajustar Impuestos

El IVA se configura en `src/stores/Shop/cartStore.ts`:

```typescript
taxRate: 0.15, // 15% (Ecuador)
```

### Cambiar Temas

El sistema incluye gestión de temas. Usa el selector de temas en la interfaz o modifica los archivos en `src/styles/`.

## 📝 Interfaces de Payphone

El sistema incluye las siguientes interfaces para Payphone:

- `PayphonePaymentRequest`: Datos para crear un pago
- `PayphonePaymentResponse`: Respuesta al crear el link de pago
- `PayphoneTransaction`: Información de la transacción
- `Order`: Estructura de la orden de compra

## 🔒 Seguridad

- Los datos del carrito se almacenan solo en el cliente
- Las transacciones se procesan a través de Payphone
- Validación de formularios en el frontend
- Nunca se almacenan datos sensibles de tarjetas

## 🐛 Solución de Problemas

### El carrito no persiste
- Verifica que localStorage esté habilitado en el navegador
- Revisa la consola para errores de persistencia

### Error en la integración de Payphone
- Verifica que el token sea correcto
- Revisa que la URL base de Payphone sea correcta
- Comprueba la conexión a internet

### Productos no se cargan
- Verifica que el servicio de productos esté funcionando
- Revisa la consola del navegador para errores

## 📚 Recursos Adicionales

- [Documentación de Vue 3](https://vuejs.org/)
- [Documentación de PrimeVue](https://primevue.org/)
- [Documentación de Payphone](https://payphone.app/docs)
- [Pinia Store](https://pinia.vuejs.org/)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

## 👥 Autor

Desarrollado con ❤️ para crear experiencias de compra excepcionales.

---

**Nota Importante**: Recuerda reemplazar el token de Payphone con tu token real antes de desplegar a producción. Nunca subas tokens o credenciales al repositorio público.
