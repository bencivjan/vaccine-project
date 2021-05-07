import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Button, Form, Grid, Header, Message, Segment, Card, Input } from 'semantic-ui-react'

function App() {
	const [VaccineName, setVaccineName] = useState("");
	const [VaccineBrand, setVaccineBrand] = useState("");
	const [vaccine_id, setVaccineId] = useState("");
	const [DoseDate, setDoseDate] = useState("");
	const [DoseNumber, setDoseNumber] = useState("");
	let person_id;


	const [ClinicAddress, setClinicAddress] = useState("");
	const [ClinicName, setClinicName] = useState("");

	const [personList, setPersonList] = useState([]);
	const [person, setPerson] = useState([]);
	const [vaccineList, setVaccineList] = useState([]);

	const createVaccineID = () => {
		console.log("Pressed");
		Axios.post("http://localhost:3002/api/createVaccine", {
			person_id: person_id,
			vaccine_id: vaccine_id,
			vaccine_name: VaccineName,
			vaccine_brand: VaccineBrand,
			dose_date: DoseDate,
			dose_number: DoseNumber,
			clinic_address: ClinicAddress,
			clinic_name: ClinicName
		}).then(response => {
			console.log("created");
		});
	};

	useEffect(() => {
		Axios.get("http://localhost:3002/api/initdata1").then(response => {
			console.log(response.data);
			setPersonList(response.data);
			setPerson([response.data[0]])
		});

		Axios.get("http://localhost:3002/api/initdata2").then(response => {
			console.log(response.data);
			setVaccineList(response.data);
		});
	}, []);

	return (
		<div className="App">
			<h1> Vaccine Database </h1>

			<div className="form">
				{personList && personList.map(val => {
					return (<Card>
						<Card.Content>
							<Card.Header>Name: {val.first_name} {val.last_name}</Card.Header>
							<Card.Meta>Age: {val.age}</Card.Meta>
							<Card.Description>
								Email: {val.email}
							</Card.Description>
						</Card.Content>
					</Card>
					);
				})}
				{vaccineList &&
					vaccineList.map(val => {
						return (
							<div>
								<Card>
									<Card.Content>
										<Card.Header>Vaccine Id: {val.vaccine_id}</Card.Header>
										<Card.Description>
											Vaccine Name: {val.vaccine_name} <br></br>
											Vaccine Brand: {val.vaccine_brand}<br></br>
											Dose Date: {val.dose_date}<br></br>
											Dose Number: {val.dose_number}<br></br>
											Clinic Name: {val.clinic_name}<br></br>
											Clinic Address: {val.address}
										</Card.Description>
									</Card.Content>
								</Card>
							</div>
						);
					})}
				<div>

				</div>

				<label> Vaccine Id: </label>
				<Input
					type="text"
					name="VaccineId"
					onChange={e => {
						setVaccineId(e.target.value);
					}}
				/>

				<label> Vaccine Name: </label>
				<Input
					type="text"
					name="VaccineName"
					onChange={e => {
						setVaccineName(e.target.value);
					}}
				/>

				<label> Vaccine Brand: </label>
				<Input
					type="text"
					name="VaccineBrand"
					onChange={e => {
						setVaccineBrand(e.target.value);
					}}
				/>

				<label> Dose Date: </label>
				<Input
					type="text"
					name="DoseDate"
					onChange={e => {
						setDoseDate(e.target.value);
					}}
				/>
				<label> Dose Number: </label>
				<Input
					type="text"
					name="DoseNumber"
					onChange={e => {
						setDoseNumber(e.target.value);
					}}
				/>
				<label> Clinic Name: </label>
				<Input
					type="text"
					name="ClinicName"
					onChange={e => {
						setClinicName(e.target.value);
					}}
				/>
				<label> Clinic Address: </label>
				<Input
					type="text"
					name="ClinicAddress"
					onChange={e => {
						setClinicAddress(e.target.value);
					}}
				/>

				<Button onClick={createVaccineID}> Add Vaccine</Button>

			</div>
		</div>
	);
}

export default App;