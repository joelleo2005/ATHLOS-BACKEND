const pool = require('../../config/db');

const findByEmail = async (email) => {
  const query = `
    SELECT *
    FROM auth.usuarios
    WHERE email = $1
  `;

  const { rows } = await pool.query(query, [email]);

  return rows[0];
};

module.exports = {
  findByEmail,
};