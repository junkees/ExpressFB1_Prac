const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('register', { title: 'Регистрация' });
});

router.post('/', function (req, res, next) {
    res.send(req.body)
})


module.exports = router;