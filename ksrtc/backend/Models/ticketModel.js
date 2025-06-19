const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    pnr: {
        type: String,
        required: true,
        unique: true
    },
    source: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    adult: {
        type: Number,
        required: true
    },
    child: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
})
const TicketModel = mongoose.model('Ticket', ticketSchema);
module.exports = TicketModel;