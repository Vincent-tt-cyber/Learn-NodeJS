import express, { json } from "express";
import jwt from "jsonwebtoken";
import database from "./database.js";
import { registerValidation } from "./validations/auth.js";
const app = express();
app.use(express.json());

import { validationResult } from "express-validator";

const PORT = 3000;

app.get("/", async (req, res) => {
  const users = await database.getUsers();
  if (users.length < 1) {
    return res.status(400).json({
      success: false,
    });
  } else {
    return res.json({
      success: true,
      data: users,
    });
  }
});

app.post("/auth/register", registerValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  res.json({
    success: true,
  });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    throw err;
  } else {
    console.log(`Server working on ${PORT} port`);
  }
});
