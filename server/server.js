const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { testConnection } = require('./config/db');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection check middleware
let dbConnected = false;
const checkDB = async (req, res, next) => {
  if (!dbConnected) {
    return res.status(503).json({
      message: 'Database not connected. Please run: npm run db:setup',
      error: 'SERVICE_UNAVAILABLE'
    });
  }
  next();
};

// Initialize database connection
testConnection().then(connected => {
  dbConnected = connected;
  if (connected) {
    console.log('✅ Database ready');
  } else {
    console.log('⚠️  Database not connected. Run: npm run db:setup');
  }
});

// Routes
app.use('/api/articles', checkDB, require('./routes/articles'));
app.use('/api/team', checkDB, require('./routes/team'));
app.use('/api/company', checkDB, require('./routes/company'));
app.use('/api/subscriptions', checkDB, require('./routes/subscriptions'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/categories', checkDB, require('./routes/categories'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'BTI CMS API is running',
    database: dbConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// DB Status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    database: dbConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 8080;

// Handle port in use error gracefully
const server = app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📊 DB Status: http://localhost:${PORT}/api/status`);
  console.log(`=================================`);
  if (!dbConnected) {
    console.log('\n⚠️  WARNING: Database not connected');
    console.log('   Run: npm run db:setup\n');
  }
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ Port ${PORT} is already in use!`);
    console.log(`\n📌 Solusi:`);
    console.log(`   1. Tutup terminal lain yang menjalankan server`);
    console.log(`   2. Atau ganti port di file .env (contoh: PORT=8081)`);
    console.log(`   3. Lalu jalankan lagi: npm start\n`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
    process.exit(1);
  }
});
