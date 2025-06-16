import express from "express";
import { customers } from "./data/customers.js";
import mongoose from "mongoose";
import "dotenv/config"; // To hide the mongo URI
import { dBase } from "./util/dbUtils.js";
import { dbSchema, joiSchema } from "./schema/dbSchemas.js";

const app = express();
app.use(express.json());
const mongoURI = process.env.MONGO_URI;

// * Connecting to the database
// * It is necessary to allo access from the current IP address -> need to setup in the mongo dashboard at the current project
mongoose
  .connect(`${mongoURI}`)
  .then(() => {
    console.log("Connected to database...");
  })
  .catch((error) => console.log("Not connected", error));


app.get("/", (req, res) => {
  res.send("Hello world.");
  res.end();
});

app.get("/api/users", (req, res) => {
});

app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
});

app.post("/api/users", async (req, res) => {
  const user = req.body;
  const { firstName, lastName, email, address } = user;

  if (!firstName || !lastName || !email || !address) {
    res.status(400).json({ error: "Missing data!" });
    res.end();
  }

  const joiValidate = joiSchema.user.validate(user);

  if (joiValidate.error) {
    res.status(400).json({ error: joiValidate.error.details[0].message });
    res.end();
  }

  // * This the model of the database
  const User = mongoose.model("User", dbSchema.user);

  const newUser = new User({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    address: user.address,
    password: "zoli",
    dateCreated: Date.now(),
  });

  try {
    const response = await dBase.createUser(newUser);
    res.status(201).json(response);
    res.end();
  } catch (error) {
    res.status(error.status || 500).json({ Error: error.message });
    res.end();
  }
});

app.listen(3000, () => {
  console.log("NodeJS pizza server is istening on port: 3000");
});
