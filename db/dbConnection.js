import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_ATLAS_URI)
    .then(() => {
      console.log("DB connected Successfully");
    })
    .catch((err) => {
      console.log(`Error Found while connecting with Database ${err}`);
    });
};
