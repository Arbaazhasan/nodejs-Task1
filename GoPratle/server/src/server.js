import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`🚀 GoPratle Backend Server running on port ${PORT}`);
      console.log(`🔗 Health check available at: http://localhost:${PORT}/api/health`);
      console.log(`📋 Requirements API available at: http://localhost:${PORT}/api/requirements`);
    });

    const shutdown = () => {
      console.log('\nGracefully shutting down server...');
      server.close(() => {
        console.log('HTTP server closed.');
        process.exit(0);
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
