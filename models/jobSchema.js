import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please provide job title"],
        minLength:[5,"Job title length should be greater then 5"],
        maxLength:[30,"Job title length should be less then 5"]
    },
    description:{
        type:String,
        required:[true,"Please provide description"],
        minLength:[30,"Job Description length should be greater then 30"],
        maxLength:[500,"Job Description length should be less then 500"]
    },
    category:{
        type:String,
        required:[true,"Please provide a category"]
    },
    country:{
        type:String,
        required:[true,"Please provide country name"]
    },
    city:{
        type:String,
        required:[true,"Please provide city name"]
    },
    location:{
        type:String,
        required:[true,"Please provide location name"]
    },
    fixedSalary:{
        type:Number,
        minLength:[4,"Salary must contain at least 4 digits"],
        maxLength:[9,"Salary cannot exceed 9 digit"]
    },
    salaryFrom:{
        type:Number,
        minLength:[4,"Salary must contain at least 4 digits"],
        maxLength:[9,"Salary cannot exceed 9 digit"]
    },
    salaryTo:{
        type:Number,
        minLength:[4,"Salary must contain at least 4 digits"],
        maxLength:[9,"Salary cannot exceed 9 digit"]
    },
    expired:{
        type:Boolean,
        default:false
    },
    jobPostedOn:{
        type:Date,
        default:Date.now,
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})

export default mongoose.model("Job",jobSchema)