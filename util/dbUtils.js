import mongoose from "mongoose";
import { dbSchema } from "../schema/dbSchemas.js";
const User = mongoose.model("User", dbSchema.user);

export const dBase = {};

dBase.createUser = async (data) => {
  try {
    const { email } = data;
    const isUser = await dBase.checkUser(email);
    if (isUser) {
      const error = new Error("User is already exist.");
      error.status = 400;
      throw error;
    } else {
      return await data.save();
    }
  } catch (error) {
    throw error;
  }
};

dBase.checkUser = async (userEmail) => {
  const user = await User.findOne({ email: userEmail });
  return !!user;
};

dBase.updateUser = async (id, data) => {
  const user = await User.findOne({ email: userEmail });
  if (!user) return;
  // user.set({});
  // user.save();
};
