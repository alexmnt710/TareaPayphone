// src/services/products.service.ts
import type { Product } from '@/types/examples';

/**
 * Servicio para gestionar productos
 * En un caso real, esto se conectaría a una API
 */
class ProductsService {
  /**
   * Productos de ejemplo
   */
  private products: Product[] = [
    {
      id: 1,
      name: 'Laptop Gaming',
      description: 'Laptop de alto rendimiento con RTX 4060, ideal para gaming y diseño',
      category: 'Tecnología',
      price: 1299.99,
      stock: 15,
      imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500',
      active: true,
    },
    {
      id: 2,
      name: 'Mouse Inalámbrico',
      description: 'Mouse ergonómico con conexión Bluetooth y batería de larga duración',
      category: 'Tecnología',
      price: 29.99,
      stock: 50,
      imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
      active: true,
    },
    {
      id: 3,
      name: 'Teclado Mecánico RGB',
      description: 'Teclado mecánico con switches Cherry MX e iluminación RGB personalizable',
      category: 'Tecnología',
      price: 89.99,
      stock: 30,
      imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500',
      active: true,
    },
    {
      id: 4,
      name: 'Monitor 27" 4K',
      description: 'Monitor Ultra HD con panel IPS y frecuencia de 144Hz',
      category: 'Tecnología',
      price: 449.99,
      stock: 20,
      imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500',
      active: true,
    },
    {
      id: 5,
      name: 'Auriculares Bluetooth',
      description: 'Auriculares over-ear con cancelación de ruido activa y 30h de batería',
      category: 'Audio',
      price: 199.99,
      stock: 40,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      active: true,
    },
    {
      id: 6,
      name: 'Webcam HD 1080p',
      description: 'Cámara web con enfoque automático y micrófono integrado',
      category: 'Tecnología',
      price: 69.99,
      stock: 35,
      imageUrl: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=500',
      active: true,
    },
    {
      id: 7,
      name: 'SSD 1TB NVMe',
      description: 'Disco de estado sólido con velocidades de lectura hasta 7000MB/s',
      category: 'Almacenamiento',
      price: 119.99,
      stock: 60,
      imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500',
      active: true,
    },
    {
      id: 8,
      name: 'Silla Gamer Ergonómica',
      description: 'Silla con soporte lumbar ajustable y reposabrazos 4D',
      category: 'Muebles',
      price: 299.99,
      stock: 12,
      imageUrl: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500',
      active: true,
    },
  ];

  /**
   * Obtener todos los productos
   */
  async getAllProducts(): Promise<Product[]> {
    // Simular delay de API
    await this.delay(300);
    return this.products.filter(p => p.active);
  }

  /**
   * Obtener productos por categoría
   */
  async getProductsByCategory(category: string): Promise<Product[]> {
    await this.delay(300);
    return this.products.filter(
      p => p.active && p.category.toLowerCase() === category.toLowerCase()
    );
  }

  /**
   * Obtener un producto por ID
   */
  async getProductById(id: number): Promise<Product | undefined> {
    await this.delay(200);
    return this.products.find(p => p.id === id && p.active);
  }

  /**
   * Obtener categorías únicas
   */
  async getCategories(): Promise<string[]> {
    await this.delay(200);
    const categories = new Set(
      this.products.filter(p => p.active).map(p => p.category)
    );
    return Array.from(categories);
  }

  /**
   * Buscar productos por nombre
   */
  async searchProducts(query: string): Promise<Product[]> {
    await this.delay(300);
    const lowerQuery = query.toLowerCase();
    return this.products.filter(
      p =>
        p.active &&
        (p.name.toLowerCase().includes(lowerQuery) ||
          p.description?.toLowerCase().includes(lowerQuery))
    );
  }

  /**
   * Verificar disponibilidad de stock
   */
  async checkStock(productId: number, quantity: number): Promise<boolean> {
    const product = await this.getProductById(productId);
    return product ? product.stock >= quantity : false;
  }

  /**
   * Simular delay de red
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const productsService = new ProductsService();
