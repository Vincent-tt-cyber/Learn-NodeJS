import express, { json } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createNewUser, getUsers } from "./database.js";
import { registerValidation } from "./validations/auth.js";
const app = express();
app.use(express.json());

import { validationResult } from "express-validator";

const PORT = 3000;

// Запрос на всез пользователей в БД
app.get("/", async (req, res) => {
  const users = await getUsers();

  if (users.length < 1) {
    return res.status(400).json({
      success: false,
      message: "Пользователи не найдены",
    });
  } else {
    return res.json({
      success: true,
      data: users,
    });
  }
});

// Создать пользователя в БД
app.post("/register", registerValidation, async (req, res) => {
  try {
    const body = req.body;
    const password = body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const errors = validationResult(req);

    const user = await createNewUser(
      body.fullName,
      body.email,
      passwordHash,
      body.avatarUrl
    );

    const token = jwt.sign(
      {
        id: user,
        ...body,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    } else {
      return res.status(200).json({
        success: true,
        data: {
          token,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось совершить регистрацию",
    });
    throw error;
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    throw err;
  } else {
    console.log(`Server working on ${PORT} port`);
  }
});
