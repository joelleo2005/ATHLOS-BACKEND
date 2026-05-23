'use strict';

class AppError extends Error {
  constructor(statusCode, message, details = undefined) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.details = details;
  }
  static badRequest(msg = 'Solicitud inválida', details) { return new AppError(400, msg, details); }
  static unauthorized(msg = 'No autenticado') { return new AppError(401, msg); }
  static notFound(msg = 'Recurso no encontrado') { return new AppError(404, msg); }
  static conflict(msg = 'Conflicto con el estado actual') { return new AppError(409, msg); }
}

module.exports = { AppError };