const mongoose = require('mongoose');

const accidentSchema = new mongoose.Schema({
    location:{
        type: String,
        required: true
    },    
    accidentDescription:{
        type: String,
        required: true
    },
    accidentDate:{
        type: String,
        required: false
    },
    accidentTime:{
        type: String,
        required: true
    },
    // Multiple image uploads
    images: [{
        type: String,
        required: true
    }],
    casualties:{
        type: Number,
        required: false
    },
    // Passenger ticket information
    passengerTickets: [{
        pnr: {
            type: String,
            required: true
        },
        source: {
            type: String,
            required: true
        },
        destination: {
            type: String,
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
        price: {
            type: Number,
            required: true
        }
    }],
    // Conductor/User details
    conductorDetails: {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        }
    },
    // Status fields
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    adminResponse: {
        type: String,
        default: ''
    },
    isDeleted:{
        type: Boolean,
        default: false
    },
    isActive:{
        type: Boolean,
        default: true
    }
},{timestamps:true})
const AccidentModel = mongoose.model('Accident', accidentSchema);
module.exports = AccidentModel;