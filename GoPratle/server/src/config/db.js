import mongoose from 'mongoose';

export const connectDB = async (customUri = null) => {
  const uri = customUri || process.env.MONGODB_URI || 'mongodb://localhost:27017/gopratle_db';

  try {
    const conn = await mongoose.connect(uri, {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}, database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB] Connection error: ${error.message}`);
    // If running in development and local Mongo is not reachable, we log a helpful hint
    if (process.env.NODE_ENV !== 'test') {
      console.warn('[MongoDB] Please ensure MongoDB is running or check your MONGODB_URI in .env');
    }
    throw error;
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('[MongoDB] Connection closed.');
  } catch (error) {
    console.error(`[MongoDB] Error during disconnection: ${error.message}`);
  }
};
