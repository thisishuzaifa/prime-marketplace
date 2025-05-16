import { Context, Next } from 'hono';
import { clerkClient } from '@clerk/clerk-sdk-node';

export const authMiddleware = async (c: Context, next: Next) => {
  const sessionToken = c.req.header('Authorization')?.split(' ')[1];
  
  if (!sessionToken) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const session = await clerkClient.sessions.verifySession(sessionToken);
    c.set('user', session);
    await next();
  } catch (error) {
    return c.json({ error: 'Invalid session' }, 401);
  }
}; 