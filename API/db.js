const {Pool} = require("pg");

const pool = new Pool ({
    user: "postgres",
    host: "localhost",
    port: 5432,
    database: "QuizData",
    password: "shristi"
})

pool
   .connect()
   .then(()=> console.log("connection success"))
   .catch((err) => console.log(err));

module.exports = pool;