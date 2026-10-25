import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/', (req, res) => {
  const mongoStatusMap = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting',
  };

  const dbState = mongoose.connection.readyState;

  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    service: 'GoPratle Requirement Engine Backend',
    database: {
      status: mongoStatusMap[dbState] || 'Unknown',
      readyState: dbState,
      name: mongoose.connection.name || 'none',
    },
  });
});

export default router;
