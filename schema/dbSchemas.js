import mongoose from "mongoose";
import Joi from "joi";

export const dbSchema = {};
export const joiSchema = {};

// * Creating user schemas for database and for validation 

dbSchema.user = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  address: String,
  password: String,
  dateCreated: Number,
});

joiSchema.user = Joi.object({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
  email: Joi.string(),
  address: Joi.string(),
});
