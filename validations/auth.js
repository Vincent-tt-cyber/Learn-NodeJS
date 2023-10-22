import { body } from "express-validator";

export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен содержать минимум 5 символов").isLength({ min: 5 }),
  body("fullName", "Укажите полное ФИО").isLength({ min: 3 }),
  body("avatarUrl", "Неверный формат ссылки").optional().isURL()
];
