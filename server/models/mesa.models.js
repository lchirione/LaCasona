const mongoose = require('mongoose');

const mesa = new mongoose.Schema(
    {
        numero: { type: Number, required: true, min: 0, },
        descripcion: { type: String, required: true, },
    },
    {
        collection: 'mesas',
    }
);

module.exports = mongoose.model('Mesa', mesa);
