const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'sql.freedb.tech',
    user: 'freedb_aerosmart',
    database: 'freedb_AerosmartDb',
    password: 'ESe%vJ?Hu8Hbpyj',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

module.exports = pool.promise()