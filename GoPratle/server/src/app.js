import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import healthRoutes from './routes/healthRoutes.js';
import requirementRoutes from './routes/requirementRoutes.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';

const app = express();

// Allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  process.env.CORS_ORIGIN,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps, curl, postman)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app') ||
        process.env.NODE_ENV === 'development'
      ) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive for preview/internship assessment review
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Root welcome route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to GoPratle Requirement Engine API',
    version: '1.0.0',
    documentation: '/api/health or /api/requirements',
  });
});

// Mount modular API routers
app.use('/api/health', healthRoutes);
app.use('/api/requirements', requirementRoutes);

// Fallbacks & Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
