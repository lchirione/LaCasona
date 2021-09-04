const modelConsumible = require('../models/consumible.models');
const Consumible = modelConsumible.model('Consumible');

const modelMozo = require('../models/mozo.models');
const Mozo = modelMozo.model('Mozo');

const modelMesa = require('../models/mesa.models');
const Mesa = modelMesa.model('Mesa');

const modelPedido = require('../models/pedido.models');
const Pedido = modelPedido.model('Pedido');

const variablesParaPantallaMozo = async function(req, res, next) {
  next({
    consumibles: await Consumible.find().exec(),
    mozos: await Mozo.find().exec(),
    mesas: await Mesa.find().exec(),
  });
};

const variablesParaPantallaCocina = async function(req, res, next) {
  let mozos = await Mozo.find().exec();
  let mesas = await Mesa.find().exec();

  let pedidos = await Pedido.find({
    estado: { $in: ['En preparación', 'Retirar pedido'] }
  }).sort('estado').exec();

  pedidos = pedidos.map(r => {
    let o = r.toObject();
    o.t_mozo = mozos.find(m => m._id.equals(r.mozo));
    o.t_mesa = mesas.find(m => m._id.equals(r.mesa));

    if (o.t_mozo == undefined) {
      o.t_mozo = new Mozo({
        nombre: '',
        apellido: 'mozo desconocido'
      });
    }

    if (o.t_mesa == undefined) {
      o.t_mesa = new Mesa({
        numero: 0,
        descripcion: 'mesa desconocida'
      });
    }

    return o;
  });

  next({
    pedidos
  });
};

const createPedido = async function(req, res, next) {
  let numero = await Pedido.find().sort('-_id').limit(1).exec();

  let pedido = new Pedido({
    numero: 1 + (numero.length ? numero[0].numero : 0),
    mesa: req.body.mesa,
    mozo: req.body.mozo,
    consumibles: req.body.consumible.map((v) => ({
      consumible: v._id,
      titulo: v.titulo,
      cantidad: + v.cantidad,
      importe: + v.importe,
    })).filter(c => c.cantidad),
  });

  pedido.save((err, response) => {
    next({err, response});
  });
};

const cambiarEstadoPedido = async function(req, res, next) {
  Pedido.updateOne(
    {_id: req.body._id},
    req.body,
    (err, response) => {
      next({err, response});
    }
  );
};

module.exports = {
  variablesParaPantallaMozo,
  variablesParaPantallaCocina,
  createPedido,
  cambiarEstadoPedido,
}
