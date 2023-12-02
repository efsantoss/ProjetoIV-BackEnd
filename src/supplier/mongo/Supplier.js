    const mongoose = require('mongoose');

    const supplierSchema = new mongoose.Schema({
        _id: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        document: { type: String, unique: true, required: true },
        phone: { type: String, unique: true, required: true },
        history: [
            {
                address: String,
                quantity: Number
            }
        ]
    });

    const supplier = mongoose.model('Supplier', supplierSchema);

    module.exports = supplier;