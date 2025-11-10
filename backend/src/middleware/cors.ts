import { Request, Response, NextFunction } from 'express';

/**
 * CORS Middleware Configuration
 * Handles Cross-Origin Resource Sharing for the ReqFlow API
 */

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
  process.env.FRONTEND_URL || ''
].filter(Boolean);

export const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;

  // Allow requests from allowed origins
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (process.env.NODE_ENV === 'development') {
    // In development, allow all origins
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  // Allow credentials
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Allowed methods
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD'
  );

  // Allowed headers
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-API-Key, X-Request-ID'
  );

  // Exposed headers
  res.setHeader(
    'Access-Control-Expose-Headers',
    'Content-Length, X-Request-ID, X-Response-Time'
  );

  // Max age for preflight
  res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  next();
};
