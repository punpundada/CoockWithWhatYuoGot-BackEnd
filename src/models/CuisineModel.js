const mongoose = require('mongoose');

const CuisineSchema = mongoose.Schema({
    cuisineName:{
        type:String,
        required:[true,'Cuisine Name is a Required Field']
    },
},
{
    timestamps:true,
});
const Cuisine= mongoose.model('Cuisine' , CuisineSchema);
module.exports = Cuisine;
