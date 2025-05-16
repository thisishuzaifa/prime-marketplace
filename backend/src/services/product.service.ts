import { query } from '../config/database';

export interface Product {
  id: string;
  store_id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: 'draft' | 'published' | 'archived';
}

export const productService = {
  async create(product: Omit<Product, 'id'>) {
    const sql = `
      INSERT INTO products (store_id, name, description, price, stock, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const result = await query(sql, [
      product.store_id,
      product.name,
      product.description,
      product.price,
      product.stock,
      product.status
    ]);
    return result;
  },

  async getById(id: string) {
    const sql = 'SELECT * FROM products WHERE id = ?';
    const [product] = await query<Product[]>(sql, [id]);
    return product;
  },

  async update(id: string, product: Partial<Product>) {
    const updates = Object.entries(product)
      .filter(([_, value]) => value !== undefined)
      .map(([key]) => `${key} = ?`)
      .join(', ');
    
    const sql = `UPDATE products SET ${updates} WHERE id = ?`;
    const values = [...Object.values(product).filter(v => v !== undefined), id];
    
    await query(sql, values);
    return this.getById(id);
  },

  async list(storeId: string, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const sql = `
      SELECT * FROM products 
      WHERE store_id = ? 
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `;
    return query<Product[]>(sql, [storeId, limit, offset]);
  }
}; 