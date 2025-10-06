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
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(basicLimiter);

// Connect to DB
connectDB();

// Mount routes
const apiRouter = require('./routes/index');
app.use('/api', apiRouter);

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});

module.exports = app;
