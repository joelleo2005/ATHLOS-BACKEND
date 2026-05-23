'use strict';
const jwt = require('jsonwebtoken');
const { env } = require('../../config/env');
const { AppError } = require('../errors');

// Verifica el JWT del header Authorization: Bearer <token>.
function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return next(AppError.unauthorized('Falta el token de autenticación'));
  }

  try {
    const payload = jwt.verify(token, env.jwt.secret);
    req.user = { id: payload.sub, email: payload.email };
    next();
  } catch (err) {
    return next(AppError.unauthorized('Token inválido o expirado'));
  }
}

module.exports = { requireAuth };