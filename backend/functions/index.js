
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const functions = require('firebase-functions');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('hello world!');
});

exports.app = functions.https.onRequest(app);


const bodyParser = require("body-parser");
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
let global_pid = "";

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
  const dose_date = require.body.dose_date;
  const dose_number = require.body.dose_number;
  const clinic_name = require.body.clinic_name;
  const clinic_address = require.body.clinic_address;
  const person_id = require.body.person_id;
  let location_id;

  const getLastLocationId = "SELECT max(location_id) as id from locations";

  const vaccineInsert = "INSERT INTO `vaccines` (`vaccine_id`, `vaccine_name`, `vaccine_brand`) VALUES (?,?,?)";
  const locationInsert = "INSERT INTO `locations` (`location_id`, `address`, `clinic_name`) VALUES (?,?,?)";
  const recievedAtInsert = "INSERT INTO `received_at` (`person_id`, `location_id`) VALUES (?,?)";
  const receivedDoseInsert = "INSERT INTO `received_dose` (`person_id`, `vaccine_id`, `dose_date`, `dose_number`) VALUES (?,?,?,?)";

  db.query(vaccineInsert, [vaccine_id, vaccine_name, vaccine_brand], (err, result) => {
    console.log(result);
    console.log(err);
  });

  db.query(getLastLocationId, (err, result) => {
    location_id = Number(result[0].id + 1);

    db.query(locationInsert, [location_id, clinic_address, clinic_name], (err, result) => {
      console.log(result);
      console.log(err);
    });
  });

  db.query(recievedAtInsert, [person_id, location_id], (err, result) => {
    console.log(result);
    console.log(err);
  });

  db.query(receivedDoseInsert, [person_id, vaccine_id, dose_date, dose_number], (err, result) => {
    console.log(result);
    console.log(err);
  });
});

app.post("/api/login", (require, response) => {
  const username = require.body.username;
  global_username = require.body.username;
  
  const query = "SELECT `password` FROM `user_login` WHERE `username` = ?";

  const getPid = `select person_id 
  from person natural join account_information natural join user_login
  where username = ?;`;

  db.query(getPid, [username], (err, result) => {
    if (result) {
        global_pid = result[0].person_id
    }
  })

  db.query(query, [username], (err, result) => {
    console.log(result);
    let password = ""
    if (result != null && result.length > 0) {
      password = result[0].password
    }
    console.log(err);
    response.send(password);
  });
});

app.get("/api/initdata1", (require, response) => {
  const sqlCommand = "call get_data(?)"
  const personTable = "Select * from PersonTable"
  
  `SELECT *
	FROM person NATURAL JOIN account_information NATURAL JOIN received_at
	NATURAL JOIN locations NATURAL JOIN user_login NATURAL JOIN received_dose
	NATURAL JOIN vaccines
	WHERE username = ?`;
  // const sqlSelect = "SELECT * FROM person"
  // db.query(sqlSelect, (err, result) => {
  db.query(sqlCommand, [global_pid], (err, r) => {
    console.log(err);

    db.query(personTable, (err1, response) => {
        response.send(result);
    })
  });
});

app.get("/api/initdata2", (require, response) => {
    const vTable = "Select * from LocationTable NATURAL JOIN VaccineTable"

    db.query(vTable, (err, result) => {
        response.send(result);
        console.log(err);
        console.log(result);
      });
});

// app.get("/api/initdata3", (require, response) => {
//     const vaccineTable = "Select * from VaccineTable"

//     db.query(vaccineTable, [global_pid], (err, result) => {
//         response.send(result);
//         console.log(err);
//         console.log(result);
//       });
// })


app.listen(3002, () => {
  console.log("running on port 3002");
});