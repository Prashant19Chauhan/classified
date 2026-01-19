import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firebaseUID:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true,
    },
    
})

export default mongoose.model("User", userSchema)