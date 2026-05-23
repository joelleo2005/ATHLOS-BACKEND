'use strict';
const { AppError } = require('../errors');

// Valida el body con un esquema zod.
const validate = (schema, source = 'body') => (req, res, next) => {
  const result = schema.safeParse(req[source]);
  if (!result.success) {
    const details = result.error.issues.map((i) => ({
      campo: i.path.join('.'),
      mensaje: i.message,
    }));
    return next(AppError.badRequest('Datos de entrada inválidos', details));
  }
  req[source] = result.data;
  next();
};

module.exports = { validate };