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

app.post("/api/login", (require, response) => {
	const username = require.body.username;
	console.log(username);
	const query = "SELECT `password` FROM `user_login` WHERE `username` = ?";

	db.query(query, [ username ], (err, result) => {
		const password = result[0].password
		console.log(err);
		response.send(password);
	});
});

// ================= STAGE 4 CODE BELOW========================
app.get("/api/initdata", (require, response) => {
	const sqlSelect = "SELECT * FROM vaccines";
	db.query(sqlSelect, (err, result) => {
		response.send(result);
		console.log(err);
	});
});

app.post("/api/search", (require, response) => {
	const search_query = require.body.search_query;
	const sqlSearch = "SELECT * FROM `vaccines` WHERE `vaccine_id` = ? OR `vaccine_name` =  ? OR `vaccine_brand` = ?";

	db.query(sqlSearch, [search_query, search_query, search_query], (err, result) => {
		response.send(result);
		console.log(err);
	});
});

app.post("/api/insert", (require, response) => {
	const vaccine_id = require.body.vaccine_id;
	const vaccine_name = require.body.vaccine_name;
	const vaccine_brand = require.body.vaccine_brand;

	const sqlInsert = "INSERT INTO `vaccines` (`vaccine_id`, `vaccine_name`, `vaccine_brand`) VALUES (?,?,?)";
	db.query(sqlInsert, [vaccine_id, vaccine_name, vaccine_brand], (err, result) => {
		console.log(result);
		console.log(err);
	});
});

app.delete("/api/delete/:vaccine_id", (require, response) => {
	const vaccine_id = require.params.vaccine_id;

	const sqlDelete = "DELETE FROM `vaccines` WHERE `vaccine_id` = ?";
	db.query(sqlDelete, vaccine_id, (err, result) => {
		if (err) console.log(err);
	});
});

app.put("/api/update/", (require, response) => {
	const vaccine_id = require.body.vaccine_id;
	const vaccine_brand = require.body.vaccine_brand;
	const sqlUpdate = "UPDATE `vaccines` SET `vaccine_brand` = ?  WHERE `vaccine_id`= ?";
	db.query(sqlUpdate, [vaccine_brand, vaccine_id], (err, result) => {
		console.log(result);
		if (err) console.log(err);
	});
});

app.get("/api/advanced_query", (require, response) => {
	const sqlInsert = "SELECT * FROM `vaccines` WHERE `vaccine_id` < 3";
	db.query(sqlInsert, (err, result) => {
		console.log(result);
		response.send(result);
	});
});

app.listen(3002, () => {
	console.log("running on port 3002");
});
