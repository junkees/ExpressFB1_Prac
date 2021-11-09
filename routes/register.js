const express = require('express');
const router = express.Router();
const connect = require('../config/mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', function (req, res, next) {
    res.render('register', { title: 'Регистрация' });
});

router.post('/', async function (req, res, next) {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let encryptPassword = await bcrypt.hash(password, saltRounds);
    connect.query(`INSERT INTO users (email, username, password, role) VALUES (?, ?, ?, ?)`, [email, username, encryptPassword, 'user'], function (err, result) {
        if(err) {
            res.render('error', { title: '500', message: 'Register error =(', error: 'You have used data that is already taken by other users.' })
        } else {
            res.render('index', { title: 'Регистрация завершена!' });
        }
    });

})


module.exports = router;