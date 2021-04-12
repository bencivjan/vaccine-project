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
	const sqlSelect = "SELECT * FROM vaccine_verification";
	db.query(sqlSelect, (err, result) => {
		response.send(result);
	});
});

app.post("/api/search", (require, response) => {
	const search_query = require.body.search_query;
	const sqlSearch = "SELECT * FROM `vaccine_verification` WHERE `verification_id` = ? OR `vaccine_id` =  ?";

	db.query(sqlSearch, [search_query, search_query], (err, result) => {
		response.send(result);
	});
});

app.post("/api/insert", (require, response) => {
	const verification_id = require.body.verification_id;
	const vaccine_id = require.body.vaccine_id;

	const sqlInsert = "INSERT INTO `vaccine_verification` (`verification_id`, `vaccine_id`) VALUES (?,?)";
	db.query(sqlInsert, [verification_id, vaccine_id], (err, result) => {
		console.log(err);
	});
});

app.delete("/api/delete/:vaccine_id", (require, response) => {
	const vaccine_id = require.params.vaccine_id;
	console.log(vaccine_id);

	const sqlDelete = "DELETE FROM `vaccine_verification` WHERE `vaccine_id` = ?";
	db.query(sqlDelete, vaccine_id, (err, result) => {
		if (err) console.log(err);
	});
});

app.put("/api/update/", (require, response) => {
	const vaccine_id = require.body.vaccine_id;
	const verification_id = require.body.verification_id;
	const sqlUpdate = "UPDATE `vaccine_verification` SET `vaccine_id` = ?  WHERE `verification_id`= ?";
	db.query(sqlUpdate, [vaccine_id, verification_id], (err, result) => {
		if (err) console.log(err);
	});
});

app.get("/api/advanced_query", (require, response) => {
	const sqlInsert = 
		`(SELECT DISTINCT p.first_name, p.last_name, p.person_id, v.vaccine_brand
		FROM person p NATURAL JOIN received_dose r JOIN vaccines v USING(vaccine_id), is_verified vv
		WHERE p.person_id = vv.verification_id AND vv.verified LIKE 'T' AND p.person_id IN 
			(SELECT l.person_id
		 	FROM received_at l
		 	WHERE l.location_id = 1))`;

	db.query(sqlInsert, (err, result) => {
		console.log(result);
		response.send(result);
	});
});

app.listen(3002, () => {
	console.log("running on port 3002");
});
