// import "./App.css";
// import Axios from "axios";
// import React, { useState, useEffect } from "react";

// function App() {
// 	return (
// 		<div className="App">
// 			<h1> Vaccine Form </h1>

// 			<div className="form">
// 				<label> First Name: </label>
// 				<input type="text" name="firstName" />

// 				<label> Last Name: </label>
// 				<input type="text" name="lastName" />

// 				<label> Vaccine Brand: </label>
// 				<input type="text" name="brand" />

// 				<button> Submit</button>
// 			</div>
// 		</div>
// 	);
// }

// export default App;
import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
	const [ id, setId ] = useState();
	const [ Name, setName ] = useState("");
	const [ Brand, setBrand ] = useState("");

	const [ vaccineList, setVaccineList ] = useState([]);
	const [ newVaccine, setNewVaccine ] = useState("");

	useEffect(() => {
		Axios.get("http://localhost:3002/api/initdata").then(response => {
			setVaccineList(response.data);

		});
	}, []);

	const submitVaccine = () => {
		console.log("Submitted");
		console.log(id);
		console.log(Name);
		console.log(Brand);
		Axios.post("http://localhost:3002/api/insert", {
			vaccine_id: id,
			vaccine_name: Name,
			vaccine_brand: Brand
		});
		console.log(vaccineList);
		setVaccineList([
			...vaccineList,
			{
				vaccine_id: id,
				vaccine_name: Name,
				vaccine_brand: Brand
			}
		]);
	};

	const deleteVaccine = id => {
		Axios.delete(`http://localhost:3002/api/delete/${id}`);
	};

	const updateVaccine = id => {
		Axios.put(`http://localhost:3002/api/update`, {
			id: id,
			movieReview: newVaccine
		});
		setNewVaccine("");
	};

	return (
		<div className="App">
			<h1> CRUD APPLICATIONS</h1>

			<div className="form">
				<label> Vaccine Id:</label>
				<input
					type="text"
					name="id"
					onChange={e => {
						setId(e.target.value);
					}}
				/>
				<label> Vaccine Name:</label>
				<input
					type="text"
					name="Name"
					onChange={e => {
						setName(e.target.value);
					}}
				/>

				<label> Vaccine Brand: </label>
				<input
					type="text"
					name="Brand"
					onChange={e => {
						setBrand(e.target.value);
					}}
				/>
				
				<button onClick={submitVaccine}> Add</button>
				
				<h1> SEARCH VACCINES </h1>
				<input
					type="text"
					name="search"
					/*
					onChange={e => {
						setBrand(e.target.value);
					}}
					*/
				/>

				<button onClick={submitVaccine}> Search </button>

				<h1> ADVANCED QUERY </h1>

				<button onClick={submitVaccine}> submit </button>

				<input
					type="text"
					name="advanced_result"
					/*
					onChange={e => {
						setBrand(e.target.value);
					}}
					*/
				/>

				{vaccineList &&
					vaccineList.map(val => {
						return (
							<div className="card">
								<h1> Vaccine ID: {val.id} </h1>
								<p>Vaccine ID: {val.vaccine_id}</p>
								<p>Vaccine Name: {val.vaccine_name}</p>
								<p>Vaccine Brand: {val.vaccine_brand}</p>
								<button
									onClick={() => {
										deleteVaccine(val.id);
									}}
								>
									{" "}
									Delete
								</button>
								<input
									type="text"
									id="updateInput"
									onChange={e => {
										setNewVaccine(e.target.value);
									}}
								/>
								<button
									onClick={() => {
										updateVaccine(val.id);
									}}
								>
									{" "}
									Update
								</button>
							</div>
						);
					})}
			</div>
		</div>
	);
}

export default App;
