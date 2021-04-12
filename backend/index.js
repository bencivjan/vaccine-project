const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

var db = mysql.createConnection({
	host: "34.70.192.41",
	user: "root",
	password: "123abc",
	database: "vaccine_db"
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/initdata", (require, response) => {
	const sqlSelect = "SELECT * FROM user_login";
	db.query(sqlSelect, (err, result) => {
		response.send(result);
		console.log(err);
	});
});

app.post("/api/search", (require, response) => {
	const search_query = require.body.search_query;
	const sqlSearch = `SELECT * FROM user_login WHERE username LIKE '%${search_query}%' OR password LIKE '%${search_query}%'`;
	db.query(sqlSearch, (err, result) => {
		response.send(result);
		console.log(err);
	});
});

app.post("/api/insert", (require, response) => {
	const username = require.body.username;
	const password = require.body.password;
	// const vaccine_brand = require.body.vaccine_brand;

	const sqlInsert = "INSERT INTO `user_login` (`username`, `password`) VALUES (?,?)";
	db.query(sqlInsert, [ username, password ], (err, result) => {
		console.log(result);
		console.log(err);
	});
});

app.delete("/api/delete/:username", (require, response) => {
	const username = require.params.username;

	const sqlDelete = "DELETE FROM `user_login` WHERE `username` = ?";
	db.query(sqlDelete, username, (err, result) => {
		if (err) console.log(err);
	});
});

app.put("/api/update/", (require, response) => {
	console.log(require.body);
	const username = require.body.username;
	const password = require.body.password;
	console.log(username);
	console.log(password);
	const sqlUpdate = "UPDATE `user_login` SET `password` = ?  WHERE `username`= ?";
	db.query(sqlUpdate, [ password, username ], (err, result) => {
		console.log(result);
		if (err) console.log(err);
	});
});

app.listen(3002, () => {
	console.log("running on port 3002");
});
