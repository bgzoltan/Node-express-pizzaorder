import mongoose from "mongoose";
import Joi from "joi";

export const dbSchema = {};
export const joiSchema = {};

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const addressRegex = /^(?=.*\b\d+\b)(?=.*\b[A-Za-z]+\b).{2,}$/;

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
  email: Joi.string().pattern(emailRegex).messages({
    "string.pattern.base": "The specified email is not valid.", // .base is necessary
  }),
  address: Joi.string()
    .pattern(addressRegex)
    .messages({ "string.pattern.base": "The specified address is not valid." }),
});
