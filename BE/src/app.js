require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const connectDB = require('./config/db');
const { corsMiddleware, basicLimiter, authLimiter, forgotLimiter, mongoSanitize, xss, hpp } = require('./middleware/security.middleware');

const app = express();
app.use(corsMiddleware());

// Stripe webhook needs raw body BEFORE express.json()
const paymentController = require('./controllers/payment.controller');
app.post('/api/orders/webhook', express.raw({ type: 'application/json' }), paymentController.webhook);

app.use(express.json());
app.use(helmet());
// Disable security middleware causing Node.js compatibility issues
// app.use(mongoSanitize()); // Error: Cannot set property query
// app.use(xss()); // Error: Cannot set property query  
// app.use(hpp()); // Error: Cannot set property query
app.use(basicLimiter);

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Connect to DB
connectDB();

// Mount routes
const apiRouter = require('./routes/index');
app.use('/api', apiRouter);

// 404 handler - must be before error handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found', path: req.path });
});

// error handler
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

module.exports = app;
