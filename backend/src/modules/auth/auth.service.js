'use strict';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { env } = require('../../config/env');
const { AppError } = require('../../shared/errors');
const { authRepository } = require('./auth.repository');

const authService = {
  _signToken(user) {
    return jwt.sign({ sub: user.id, email: user.email }, env.jwt.secret, {
      expiresIn: env.jwt.expiresIn,
    });
  },

  _publicUser(user) {
    return { id: user.id, name: user.nombre, email: user.email };
  },

  async register({ name, email, password }) {
    const existing = await authRepository.findByEmail(email);
    if (existing) throw AppError.conflict('Ya existe una cuenta con ese email');

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await authRepository.createUser({ nombre: name, email, passwordHash });

    const token = this._signToken(user);
    return { token, user: this._publicUser(user) };
  },

  async login({ email, password }) {
    const user = await authRepository.findByEmail(email);
    if (!user) throw AppError.unauthorized('Credenciales inválidas');

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) throw AppError.unauthorized('Credenciales inválidas');

    const token = this._signToken(user);
    return { token, user: this._publicUser(user) };
  },

  async me(userId) {
    const user = await authRepository.findById(userId);
    if (!user) throw AppError.notFound('Usuario no encontrado');
    return this._publicUser(user);
  },
};

module.exports = { authService };