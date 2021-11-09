const express = require('express');
const router = express.Router();
const connect = require('../config/mysql');
const bcrypt = require('bcrypt');
const {log} = require("debug");


async function isValidPassword(formpassword, bdpassword)
{
    return await bcrypt.compareSync(formpassword, bdpassword);
}

router.get('/', function (req, res) {
    res.render('login', { title: 'Authorization' });
});

router.post('/', async function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    connect.query('SELECT * FROM users WHERE email = ? OR username = ?', [username, username, password], async (err, result) => {
        if(err) console.log(err);
        if(result.length != 1)
        {
            console.log(result.length)
            res.render('error', { title: 'Error', message: 'Ooops.', error: 'Invalid username or password! No more rows in database!' });
            return;
        }
        if(await isValidPassword(password, result['0']['password'])) {
            res.send('Valid username or password!');
        }
        else res.render('error', { title: 'Error', message: 'Ooops.', error: 'Invalid username or password! Incorrect data!' });
    })
});

module.exports = router;