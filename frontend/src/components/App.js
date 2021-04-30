// export default App;
import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

function App() {
	const [id, setId] = useState();
	const [FirstName, setFirstName] = useState("");
	const [LastName, setLastName] = useState("");
	const [Age, setAge] = useState("");
	const [Email, setEmail] = useState("");

	const [VaccineName, setVaccineName] = useState("");
	const [VaccineBrand, setVaccineBrand] = useState("");
	const [vaccine_id, setVaccineId] = useState("");
	const [DoseDate, setDoseDate] = useState("");
	const [DoseNumber, setDoseNumber] = useState("");

	const [ClinicAddress, setClinicAddress] = useState("");
	const [ClinicName, setClinicName] = useState("");

	const [IsVerified, setIsVerified] = useState("");
	const [VerificationId, setVerificationId] = useState("");

	const [userList, setUserList] = useState([]);

	const [searchQuery, setQuery] = useState("");

	const createVaccineID = () => {
		console.log("Pressed");
		Axios.post("http://localhost:3002/api/createVaccine", {
			vaccine_id: vaccine_id,
			vaccine_name: VaccineName,
			vaccine_brand: VaccineBrand
		}).then(response => {
			console.log("created");
		});
	};

	useEffect(() => {
		Axios.get("http://localhost:3002/api/initdata").then(response => {
			setUserList(response.data);
		});
	}, []);

	return (
		<div className="App">
			<h1> Vaccine Database </h1>

			<div className="form">
				{userList &&
					userList.map(val => {
						return (
							<div className="card">
								<h1> Name: {val.first_name} {val.last_name} </h1>
								<p> Age: {val.age} </p>
								<p> Email: {val.email} </p>

								<br></br>
								<br></br>

								<p> Vaccine Id: {val.vaccine_id} </p>
								<p> Vaccine Name: {val.vaccine_name} </p>
								<p> Vaccine Brand: {val.vaccine_brand} </p>
								<p> Dose Date: {val.dose_date} </p>
								<p> Dose Number: {val.dose_number} </p>

								<p> Clinic Name {val.clinic_name} </p>
								<p> Clinic Address: {val.address} </p>

								<p> Is Verified: {val.verified}</p>
								<p> Verification Id: {val.verification_id}</p>

								<label> Vaccine Id: </label>
								<input
									type="text"
									name="VaccineId"
									onChange={e => {
										setVaccineId(e.target.value);
									}}
								/>

								<label> Vaccine Name: </label>
								<input
									type="text"
									name="VaccineName"
									onChange={e => {
										setVaccineName(e.target.value);
									}}
								/>

								<label> Vaccine Brand: </label>
								<input
									type="text"
									name="VaccineBrand"
									onChange={e => {
										setVaccineBrand(e.target.value);
									}}
								/>

								<button onClick={createVaccineID}> Add Vaccine</button>
								
							</div>
						);
					})}
			</div>
		</div>
	);
}

export default App;