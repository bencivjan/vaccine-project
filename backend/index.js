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
	const sqlSelect = "SELECT * FROM vaccines";
	db.query(sqlSelect, (err, result) => {
		response.send(result);
		console.log(err);
	});
});

app.get("/api/get", (require, response) => {
    const search_query = require.body.search_query;
	const sqlSearch = "SELECT * FROM `vaccines` WHERE `vaccine_id` = ? OR `vaccine_name` =  ? OR `vaccine_brand` = ?";

    console.log(require.body);
    console.log(require.body.search_query);

	db.query(sqlSearch, [search_query, search_query, search_query], (err, result) => {
		console.log(result);
		console.log(err);
	});
});

app.post("/api/insert", (require, response) => {
	console.log(require.body);
	const vaccine_id = require.body.vaccine_id;
	const vaccine_name = require.body.vaccine_name;
	const vaccine_brand = require.body.vaccine_brand;
	console.log(vaccine_id);
	console.log(vaccine_name);
	console.log(vaccine_brand);

	const sqlInsert = "INSERT INTO `vaccines` (`vaccine_id`, `vaccine_name`, `vaccine_brand`) VALUES (?,?,?)";
	db.query(sqlInsert, [ vaccine_id, vaccine_name, vaccine_brand ], (err, result) => {
		console.log(result);
		console.log(err);
	});
});

app.delete("/api/delete/:movieName", (require, response) => {
	const vaccine_id = require.body.vaccine_id;

	const sqlDelete = "DELETE FROM `vaccines` WHERE `vaccine_id`= ?";
	db.query(sqlDelete, vaccine_id, (err, result) => {
		if (err) console.log(err);
	});
});

app.put("/api/update/", (require, response) => {
	console.log(require.body);
	const vaccine_name = require.body.vaccine_name;
	const vaccine_brand = require.body.vaccine_brand;
	console.log(vaccine_name);
	console.log(vaccine_brand);
	const sqlUpdate = "UPDATE `vaccines` SET `vaccine_name` = ?  WHERE `vaccine_brand`= ?";
	db.query(sqlUpdate, [ vaccine_name, vaccine_brand ], (err, result) => {
		if (err) console.log(err);
	});

	// const movieName = require.body.movieName;
	// const movieReview = require.body.movieReview;

	// const sqlUpdate = "UPDATE `movie_reviews` SET `movieReview` = ? WHERE `movieName`= ?";
	// db.query(sqlUpdate, [ movieReview, movieName ], (err, result) => {
	// 	if (err) console.log(err);
	// });
});

app.listen(3002, () => {
	console.log("running on port 3002");
});
