const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        expirationDate: { type: Date, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Package', packageSchema);
