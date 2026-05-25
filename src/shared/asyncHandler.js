'use strict';
// Envuelve controladores async para que los errores lleguen al manejador central.
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
module.exports = { asyncHandler };