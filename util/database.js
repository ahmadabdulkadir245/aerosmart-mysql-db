const mysql = require('mysql2')

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    database: 'node-complete',
    password: 'Ahano1one$',
    port: 3306
})

module.exports = pool.promise()