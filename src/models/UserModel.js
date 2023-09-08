const { default: mongoose } = require("mongoose");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const UserSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.type.ObjectId,
        required:true,
        ref:'User'
    },
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
        minLength:[6,'Password Must be atleast 6 characters'],
        maxLength:[30,'Password Must be Under 30 characters'],
        lowercase: true
    }
},
{
    timestamps:true,
},
);

module.exports=mongoose.model('User',UserSchema);