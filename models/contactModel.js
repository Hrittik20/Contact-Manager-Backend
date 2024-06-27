const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: [true, "Please enter contact name"],
    },
    email: {
        type: String,
        required: [true, "Please enter contact email"],
    },
    phone: {
        type: String,
        required: [true, "Please enter contact phone number"],
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model('Contact', contactSchema);