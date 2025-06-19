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
    }
});

const rrtModel = mongoose.model('rrt',rrtSchema)
module.exports = rrtModel;