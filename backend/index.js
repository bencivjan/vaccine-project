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
	const sqlSelect = "SELECT * FROM locations";
	db.query(sqlSelect, (err, result) => {
		response.send(result);
		console.log(err);
	});
});

app.post("/api/search", (require, response) => {
	const search_query = require.body.search_query;
	const sqlSearch = "SELECT * FROM `locations` WHERE `location_id` = ? OR `clinic_name` =  ? OR `address` = ?";

	db.query(sqlSearch, [search_query, search_query, search_query], (err, result) => {
		response.send(result);
		console.log(err);
	});
});

app.post("/api/insert", (require, response) => {
	const location_id = require.body.location_id;
	const clinic_name = require.body.clinic_name;
	const address = require.body.address;

	const sqlInsert = "INSERT INTO `locations` (`location_id`, `clinic_name`, `address`) VALUES (?,?,?)";
	db.query(sqlInsert, [location_id, clinic_name, address], (err, result) => {
		console.log(result);
		console.log(err);
	});
});

app.delete("/api/delete/:location_id", (require, response) => {
	const location_id = require.params.location_id;

	const sqlDelete = "DELETE FROM `locations` WHERE `location_id` = ?";
	db.query(sqlDelete, location_id, (err, result) => {
		if (err) console.log(err);
	});
});

app.put("/api/update/", (require, response) => {
	const location_id = require.body.location_id;
	const address = require.body.address;
	const sqlUpdate = "UPDATE `locations` SET `address` = ?  WHERE `location_id`= ?";
	db.query(sqlUpdate, [address, location_id], (err, result) => {
		console.log(result);
		if (err) console.log(err);
	});
});

app.get("/api/advanced_query", (require, response) => {
	const sqlInsert = "SELECT * FROM `locations` WHERE `location_id` < 3";
	db.query(sqlInsert, (err, result) => {
		console.log(result);
		response.send(result);
	})
});

app.listen(3002, () => {
	console.log("running on port 3002");
});
