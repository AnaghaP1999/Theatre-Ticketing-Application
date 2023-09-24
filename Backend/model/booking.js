const mongoose = require('mongoose');
// Booking Collection
const Schema = mongoose.Schema({                                               
    moviename: { 
        type: String, required: true 
    },
    date: { 
        type: String, required: true 
    },
    tickets:{
        type:Number, required: true                                                       
     },
     amount:{
        type:String, required: true                                                       
    },
    time:{
        type:String, required: true                                                       
    },
    email:{
        type:String, required: true                                                       
    }
});

const bookingData = mongoose.model('movies',Schema);
module.exports = bookingData;
