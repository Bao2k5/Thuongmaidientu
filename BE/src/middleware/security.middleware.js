// src/middleware/security.middleware.js
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const expressMongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

function corsMiddleware() {
  const allowed = (process.env.CORS_ORIGIN || '').split(',').map(s=>s.trim()).filter(Boolean);
  const opts = allowed.length ? { origin: allowed } : {};
  return cors(opts);
}

const isDev = process.env.NODE_ENV !== 'production';
const basicLimiter = rateLimit({ windowMs: 15*60*1000, max: isDev ? 1000 : 200 });
const authLimiter = rateLimit({ windowMs: 15*60*1000, max: isDev ? 100 : 10, message: 'Too many attempts, try later' });
const forgotLimiter = rateLimit({ windowMs: 60*60*1000, max: isDev ? 20 : 5, message: 'Too many password reset attempts, try later' });

// Wrap express-mongo-sanitize to avoid crashing when req.query is read-only in some environments
function mongoSanitize() {
  const m = expressMongoSanitize();
  return function (req, res, next) {
    try {
      return m(req, res, next);
    } catch (err) {
      // Log and skip sanitation for this request to prevent server crash
      console.warn('[security.middleware] express-mongo-sanitize threw, skipping sanitize for request:', err && err.message ? err.message : err);
      return next();
    }
  };
}

module.exports = { corsMiddleware, basicLimiter, authLimiter, forgotLimiter, mongoSanitize, xss, hpp };
