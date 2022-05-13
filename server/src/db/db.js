require('dotenv').config();
const { Pool } = require("pg").Pool;
const config = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT
  }
const pool = new Pool(config);

module.exports = pool;