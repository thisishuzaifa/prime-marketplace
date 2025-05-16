import { Hono } from 'hono';
import { z } from 'zod';
import { authMiddleware } from '../middleware/auth.js';
import { productService } from '../services/product.service.js';

const products = new Hono();

// Validation schemas
const createProductSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  price: z.number().positive(),
  stock: z.number().int().min(0),
  status: z.enum(['draft', 'published', 'archived'])
});

const updateProductSchema = createProductSchema.partial();

// Routes
products.use('*', authMiddleware);

products.post('/', async (c) => {
  const storeId = c.get('user').storeId;
  const body = await c.req.json();
  const validatedData = createProductSchema.parse(body);
  
  const product = await productService.create({
    ...validatedData,
    store_id: storeId
  });
  
  return c.json(product, 201);
});

products.get('/:id', async (c) => {
  const id = c.req.param('id');
  const product = await productService.getById(id);
  
  if (!product) {
    return c.json({ error: 'Product not found' }, 404);
  }
  
  return c.json(product);
});

products.put('/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const validatedData = updateProductSchema.parse(body);
  
  const product = await productService.update(id, validatedData);
  return c.json(product);
});

products.get('/', async (c) => {
  const storeId = c.get('user').storeId;
  const page = parseInt(c.req.query('page') || '1');
  const limit = parseInt(c.req.query('limit') || '10');
  
  const products = await productService.list(storeId, page, limit);
  return c.json(products);
});

export default products; 