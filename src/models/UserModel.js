const { mongoose } = require("mongoose");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const UserSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:[true,'Firstname is a Required Field']
    },
    lastName:{
        type:String,
        required:[true,'Lastname is a Required Field']
    },
    email:{
        type:String,
        required:[true,'Lastname is a Required Field'],
        match:emailRegex
    },
    password:{
        type:String,
        minlength:[6,'Password Must be atleast 6 characters'],
        maxlength:[30,'Password Must be Under 30 characters'],
        lowercase: true
    }
},
{
    timestamps:true,
},
);
const User = mongoose.model('User',UserSchema);
module.exports=User