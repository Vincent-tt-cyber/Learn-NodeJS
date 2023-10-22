import mysql from "mysql2";

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  database: "Users_bd",
  password: "root",
});

const promisePool = pool.promise();

export const getUsers = async () => {
  let [rows] = await promisePool.query("SELECT * FROM `users`");
  return rows;
};

export const createNewUser = async (fullName, email, password, avatarUrl) => {
  let [rows] = await promisePool.query(
    "INSERT INTO `users`(`fullName`, `email`, `password`, `avatarUrl`) VALUES (?, ?, ?, ?)",
    [fullName, email, password, avatarUrl]
  );
  return rows.insertId;
};
