const express = require('express');
const router = express.Router();

const controllerPedidos = require('../controllers/pedidos.controllers');

router.route('/')
  .get(controllerPedidos.variablesParaPantallaCocina, (vars, req, res, next) => {
    vars.title = 'Cocina';
    res.status(200).render('cocina', vars);
  })
;

module.exports = router;
