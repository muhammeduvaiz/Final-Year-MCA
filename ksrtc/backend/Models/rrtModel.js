const mongoose = require('mongoose')


const rrtSchema = new mongoose.Schema({
    location:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
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
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const rrtModel = mongoose.model('rrt',rrtSchema)
module.exports = rrtModel;