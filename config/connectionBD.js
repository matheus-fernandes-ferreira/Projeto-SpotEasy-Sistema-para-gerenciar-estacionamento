const { Pool } = require('pg');

const pool = new Pool ({
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password: 'BemVindo!',
    database: 'SpotEasy_DB'
})

module.exports = pool;

