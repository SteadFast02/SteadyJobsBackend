import { catchAsyncErrors } from "./catchAsyncError.js";
import  {ErrorHandler} from "./error.js";
import jwt from 'jsonwebtoken';
import userSchema from "../models/userSchema.js";

const isAuthorized = catchAsyncErrors(async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token) 
    {
        return next(new ErrorHandler("User not authorized",400));
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.user = await userSchema.findById(decoded.id);
    next();
})

export default isAuthorized;