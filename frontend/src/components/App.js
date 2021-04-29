// export default App;
import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
	const [id, setId] = useState();
	const [FirstName, setFirstName] = useState("");
	const [LastName, setLastName] = useState("");
	const [Age, setAge] = useState("");
	const [Email, setEmail] = useState("");

	const [VaccineName, setVaccineName] = useState("");
	const [VaccineBrand, setVaccineBrand] = useState("");
	const [VaccineId, setVaccineId] = useState("");
	const [DoseDate, setDoseDate] = useState("");
	const [DoseNumber, setDoseNumber] = useState("");

	const [ClinicAddress, setClinicAddress] = useState("");
	const [ClinicName, setClinicName] = useState("");

	const [IsVerified, setIsVerified] = useState("");
	const [VerificationId, setVerificationId] = useState("");

	const [userList, setUserList] = useState([]);

	const [searchQuery, setQuery] = useState("");

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
								
							</div>
						);
					})}
			</div>
		</div>
	);
}

export default App;