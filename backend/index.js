const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const { response } = require("express");

var db = mysql.createConnection({
	host: "34.70.192.41",
	user: "root",
	password: "123abc",
	database: "vaccine_db"
});

var global_username = "";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/createUser", (require, response) => {
	const username = require.body.username;
	const password = require.body.password;
	const first = require.body.first_name;
	const last = require.body.last_name;
	const age = require.body.age;
	const email = require.body.email;

	const getLastId = "SELECT max(person_id) as id from person";

	const personInsert =
		"INSERT INTO `person` (`person_id`, `first_name`, `last_name`, `age`, `email`) VALUES (?,?,?,?,?)";
	const loginInsert = "INSERT INTO `user_login` (`username`, `password`) VALUES (?,?)";
	const aiInsert = "INSERT INTO `account_information` (`username`, `person_id`) VALUES (?,?)";

	db.query(getLastId, (err, result) => {
		console.log(result);

		const person_id = Number(result[0].id + 1);
		console.log(person_id);

		db.query(personInsert, [person_id, first, last, age, email], (errPerson, resultPerson) => {
			console.log(resultPerson);
			console.log(errPerson);
		});

		db.query(loginInsert, [username, password], (errLogin, resultLogin) => {
			console.log(resultLogin);
			console.log(errLogin);
		});

		db.query(aiInsert, [username, person_id], (errAI, resultAI) => {
			console.log(resultAI);
			console.log(errAI);
		});
	});
});

app.post("/api/createVaccine", (require, response) => {
	const vaccine_id = require.body.vaccine_id;
	const vaccine_name = require.body.vaccine_name;
	const vaccine_brand = require.body.vaccine_brand;

	const sqlInsert = "INSERT INTO `vaccines` (`vaccine_id`, `vaccine_name`, `vaccine_brand`) VALUES (?,?,?)";
	db.query(sqlInsert, [vaccine_id, vaccine_name, vaccine_brand], (err, result) => {
		console.log(result);
		console.log(err);
	});
});

app.post("/api/login", (require, response) => {
	const username = require.body.username;
	global_username = require.body.username;
	const query = "SELECT `password` FROM `user_login` WHERE `username` = ?";

	db.query(query, [ username ], (err, result) => {
		console.log(result);
		let password = ""
		if (result.length > 0) {
			password = result[0].password
		}
		console.log(err);
		response.send(password);
	});
});

app.get("/api/initdata", (require, response) => {
	const sqlSelect = "SELECT * FROM person p JOIN account_information a on p.person_id = a.person_id WHERE a.username = ?";
	// const sqlSelect = "SELECT * FROM person"
	// db.query(sqlSelect, (err, result) => {
	db.query(sqlSelect, [ global_username ], (err, result) => {
		response.send(result);
		console.log(err);
		console.log("username: " + global_username)
	});
});


app.listen(3002, () => {
	console.log("running on port 3002");
});
