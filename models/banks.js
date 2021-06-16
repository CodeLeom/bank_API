const mongoose = require('mongoose');
const Schema = mongoose.Schema;


  //create geo location schema
 const GeoSchema = new Schema({
     type: {
         type: String,
         default: "Point"
     },
     coordinates: {
         type: [Number],
         index: "2dsphere"
     }
 });

//create Banks Schema and Models
const bankSchema = new Schema({
    name:{
        type: String,
        required: (true, 'Name Field is required')
    },
    states:{
        type: [String],
        required: (true, 'State Field is required')
    },
    id: {
        type: String,
        required: (true, 'ID is required')
    },

    //add in Geo Location of Banks
    geometry: GeoSchema
    
});

const Bank = mongoose.model('bank', bankSchema);

module.exports = Bank;  