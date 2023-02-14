const mysql = require('mysql2')

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    database: 'node-complete',
    password: 'Ahano1one$'
})

module.exports = pool.promise()