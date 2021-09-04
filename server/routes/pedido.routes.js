const express = require('express');
const router = express.Router();

const controllerPedidos = require('../controllers/pedidos.controllers');

router.route('/')
  .post(controllerPedidos.createPedido, (ret, req, res, next) => {
    if (ret.err) {
      res.status(500).send(`Error: ${ret.err.message}`);
    }
    res.status(200).redirect('/cocina');
  })

  .put(controllerPedidos.cambiarEstadoPedido, (ret, req, res, next) => {
    if (ret.err) {
      res.status(500).send(`Error: ${ret.err.message}`);
    }
    res.status(200).jsonp(req.body);
  })
;

module.exports = router;
