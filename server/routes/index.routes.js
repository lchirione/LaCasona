const express = require('express');
const router = express.Router();

router.route('/')
  .get((req, res, next) => {
    res.status(200).render('index', { title: 'Home' });
  })
;

module.exports = router;
