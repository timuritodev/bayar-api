const mysql = require('mysql2/promise');

const urlRegex = /^https?:\/\/(www\.)?[a-zA-Z\0-9]+\.[\w\-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

const emailRegex = /^[a-z0-9-]+@[a-z0-9-.]+/i;

const allowedCors = [
  'localhost:3000',
  'http://tatbayar.ru',
];

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'timur2003',
  database: 'bayar',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = {
  emailRegex,
  urlRegex,
  allowedCors,
  pool,
};
