import { Context, Next } from 'hono';

export const errorHandler = async (c: Context, next: Next) => {
  try {
    await next();
  } catch (error) {
    console.error(error);
    
    if (error instanceof Error) {
      return c.json({ 
        error: error.message 
      }, 500);
    }
    
    return c.json({ 
      error: 'Internal server error' 
    }, 500);
  }
}; 