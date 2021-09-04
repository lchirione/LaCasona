const express = require('express');
const router = express.Router();

router.route('/')
  .get((req, res, next) => {
    res.status(200).render('prueba', { title: 'Home' });
  })
;

module.exports = router;