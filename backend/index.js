// const express = require("express");
// const app = express();
// const mysql = require("mysql");

// var db = mysql.createConnection({
// 	host: "localhost",
// 	user: "root",
// 	password: "123abc",
// 	database: "vaccination_database"
// });

// app.get("/", (require, response) => {
// 	const sqlInsert = "SELECT * FROM vaccines";
// 	db.query(sqlInsert, (err, result) => {
// 		response.send("Hello world!");
// 	});
// });

// app.listen(3001, () => {
// 	console.log("running on port 3001");
// });
//
//
//
//
//
//
//

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

// db.connect(function(err) {
//     if (err) throw err;
//     var sql = "INSERT INTO `movie_reviews` (`id`,`movieName`, `movieReview`) VALUES (5,'inception', 'good movie');";
//     db.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result.affectedRows + " record(s) updated");
//     });
//   });

// app.get("/", (require, response) => {
// 	const sqlInsert = "INSERT INTO `vaccines` (`vaccine_id`, `vaccine_name`, `vaccine_brand`) VALUES ('4', 'a', 'b');";
// 	db.query(sqlInsert, (err, result) => {
// 		response.send("Hello world!!!");
// 	});
// });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/get", (require, response) => {
	const sqlSelect = "SELECT * FROM movie_reviews";
	db.query(sqlSelect, (err, result) => {
		response.send(result);
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
		console.log(error);
	});
});

app.delete("/api/delete/:movieName", (require, response) => {
	const movieName = require.params.movieName;

	const sqlDelete = "DELETE FROM `movie_reviews` WHERE `movieName`= ?";
	db.query(sqlDelete, movieName, (err, result) => {
		if (err) console.log(error);
	});
});

app.put("/api/update/", (require, response) => {
	const movieName = require.body.movieName;
	const movieReview = require.body.movieReview;

	const sqlUpdate = "UPDATE `movie_reviews` SET `movieReview` = ? WHERE `movieName`= ?";
	db.query(sqlUpdate, [ movieReview, movieName ], (err, result) => {
		if (err) console.log(error);
	});
});

app.listen(3002, () => {
	console.log("running on port 3002");
});
