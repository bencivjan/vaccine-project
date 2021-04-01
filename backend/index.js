const express = require("express");
const app = express();
const mysql = require("mysql");

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123abc',
    database: 'vaccination_database'
})

app.get('/', (require, response) => {
    const sqlInsert = "SELECT * FROM vaccines";
    db.query(sqlInsert, (err, result) => {
        response.send("Hello world!");
    })
})

app.listen(3001, () => {
    console.log("running on port 3001");
})