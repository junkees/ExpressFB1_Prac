const mysql = require("mysql2");

const con = mysql.createConnection({
    host: 'db.onlyawp.ru',
    user: 'expresslearn',
    database: 'expresslearn',
    password: 'qwerty123',
});

con.connect()

module.exports = con

