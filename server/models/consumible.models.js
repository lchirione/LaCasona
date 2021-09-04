const mongoose = require('mongoose');

const consumible = new mongoose.Schema(
    {
        titulo: { type: String, required: true, },
        precio: { type: Number, required: true, min: 0, },
    },
    {
        collection: 'consumibles',
    }
);

module.exports = mongoose.model('Consumible', consumible);
