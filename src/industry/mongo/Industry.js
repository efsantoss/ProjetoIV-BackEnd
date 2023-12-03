const mongoose = require('mongoose');

const indutrySchema = new mongoose.Schema({
    _id: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    document: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    history: [
        {
            address: String,
            quantity: Number
        }
    ]
});

const industry = mongoose.model('Industry', indutrySchema);

module.exports = industry;