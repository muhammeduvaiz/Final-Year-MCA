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
    image:{
        type: String,
        required: true
    },
    casualties:{
        type: Number,
        required: false
    },
    isDeleted:{
        type: Boolean,
        default: false
    },
    isActive:{
        type: Boolean,
        default: true
    },
    pnr:[{
        type: String,
        required: false
    }]
},{timestamps:true})
const AccidentModel = mongoose.model('Accident', accidentSchema);
module.exports = AccidentModel;