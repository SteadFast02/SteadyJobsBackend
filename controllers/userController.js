import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import { ErrorHandler } from "../middleware/error.js";
import userSchema from "../models/userSchema.js";
import { deleteToken, sendToken } from "../utils/jwtToken.js";

export const Register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, role, password } = req.body;
  if (!name || !email || !phone || !role || !password) {
    return next(new ErrorHandler("Please provide all information"));
  }
  const isEmail = await userSchema.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("This email is already registered...!"));
  }
  const user = await userSchema.create({ name, email, phone, role, password });
  res.status(200).json({
    success: true,
    message: "User Registered Successfully...!",
    user,
  });
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide all field....!"));
  }

  const user = await userSchema.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("Invalid email or Password", 400));
  }

  const isPassword = await user.comparePassword(password);

  if (!isPassword) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }

  if (user.role !== role) {
    return next("user with provided email and role not found", 404);
  }
  if (role === "Employer") {
    sendToken(user, 201, res, "Employer Logged In....!");
  } else {
    sendToken(user, 201, res, "Job seeker Logged In....!");
  }
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  // res
  //   .status(201)
  //   .cookie("token", "", {
  //     httpOnly: true,
  //     expires: new Date(Date.now()),
  //   })
  //   .json({
  //     success: true,
  //     message: "User logged out successfully...!",
  //   });
  deleteToken(res, "You have been logged out.");
});

export const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});
