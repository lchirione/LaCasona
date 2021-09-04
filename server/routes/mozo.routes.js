const express = require('express');
const router = express.Router();

const controllerPedidos = require('../controllers/pedidos.controllers');

router.route('/')
  .get(controllerPedidos.variablesParaPantallaMozo, (vars, req, res, next) => {
    vars.title = 'Mozo';
    res.status(200).render('mozo', vars);
  })
;

module.exports = router;
