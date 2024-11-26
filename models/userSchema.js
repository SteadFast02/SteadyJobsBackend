import mongoose from "mongoose";
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name...!"],
        minLength:[3,"Name must contain atleast 3 character"],
        maxLength:[30,"Name cannot exceed 30 character"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email...!"],
        validate:[validator.isEmail,"Please provide a valid Email"]
    },
    phone:{
        type:Number,
        required:[true,"Please enter your phone number"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[5,"Password character are vary less"],
        maxLength:[15,"Passwrod length is too large"]
    },
    role:{
        type:String,
        required:[true,"Please provide your role"],
        enum:['Job Seeker','Employer'],
    },

},{timestamps:true})

// Hash Password
userSchema.pre('save',async function(next){
    if(!this.isModified("password"))
    {
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
})

// Comparing password

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

// Generate Token
userSchema.methods.getToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRE})
}

export default mongoose.model('User',userSchema)