import mysql from "mysql2";

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  database: "users",
  password: "root",
});

const promisePool = pool.promise();

module.exports.getUsers = async function () {
  let [rows] = await promisePool.query("SELECT * FROM `users`");
  return rows;
};
