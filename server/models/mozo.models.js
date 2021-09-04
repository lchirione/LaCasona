const mongoose = require('mongoose');

const mozo = new mongoose.Schema(
    {
        nombre: { type: String, required: true, },
        apellido: { type: String, required: true, },
    },
    {
        collection: 'mozos',
    }
);

module.exports = mongoose.model('Mozo', mozo);
