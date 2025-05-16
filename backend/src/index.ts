import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { errorHandler } from './middleware/error';
import products from './routes/products';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', errorHandler);
app.use('*', cors({
  origin: process.env.FRONTEND_URL,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// Health check
app.get('/health', (c) => c.json({ status: 'ok' }));

// API routes
app.route('/api/products', products);

// Start server
const port = parseInt(process.env.PORT || '3000');
console.log(`Server is running on port ${port}`);

export default {
  port,
  fetch: app.fetch
}; 