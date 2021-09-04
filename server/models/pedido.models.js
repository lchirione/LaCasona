const mongoose = require('mongoose');

const pedido = new mongoose.Schema(
    {
        numero: { 
            type: Number, 
            required: true, 
            min: 0,
        },
        mesa: {
            type: mongoose.ObjectId,
            required: true,
        },
        mozo: {
            type: mongoose.ObjectId,
            required: true,
        },
        estado: {
            type: String,
            default: 'En preparación',
            enum: ['En preparación', 'Retirar pedido', 'Entregado'],
        },
        consumibles: [{
            consumible: {
                type: mongoose.ObjectId,
                required: true,
            },
            titulo: {
                type: String,
                required: true,
            },
            cantidad: {
                type: Number,
                required: true,
                min: 0,
            },
            importe: {
                type: Number,
                required: true,
                min: 0,
            },
        }],
    },
    {
        collection: 'pedidos',
    }
);

module.exports = mongoose.model('Pedido', pedido);
