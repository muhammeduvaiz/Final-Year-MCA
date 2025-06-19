const mongoose = require('mongoose');

const ticketvriSchema = new mongoose.Schema({
    pnr:{
        type: String,
        required: true
    }
})

const TicketvriModel = mongoose.model('Accidentvri', ticketvriSchema);
module.exports = TicketvriModel;