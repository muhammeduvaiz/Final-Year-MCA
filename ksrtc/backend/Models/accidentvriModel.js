const mongoose = require('mongoose');

const ticketvriSchema = new mongoose.Schema({
    pnr:{
        type: String,
        required: true
    },
    busNumber:{
        type: String,
        required: true
    },
    accidentDate:{
        type: String,
        required: false
    }
})

const TicketvriModel = mongoose.model('Accidentvri', ticketvriSchema);
module.exports = TicketvriModel;