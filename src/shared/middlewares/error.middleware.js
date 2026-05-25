'use strict';
const { AppError } = require('../errors');
const { env } = require('../../config/env');

function notFoundHandler(req, res, next) {
  next(AppError.notFound(`Ruta no encontrada: ${req.method} ${req.originalUrl}`));
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (err.code === '23505') {
    return res.status(409).json({ message: 'El registro ya existe (valor duplicado).' });
  }
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      ...(err.details ? { details: err.details } : {}),
    });
  }
  console.error('[error] No controlado:', err);
  return res.status(500).json({
    message: 'Error interno del servidor',
    ...(env.nodeEnv !== 'production' ? { debug: err.message } : {}),
  });
}

module.exports = { notFoundHandler, errorHandler };