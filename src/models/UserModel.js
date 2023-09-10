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
    }
},
{
    timestamps:true,
},
);
const User = mongoose.model('User',UserSchema);
module.exports=User