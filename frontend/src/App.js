// export default App;
import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
	const [verification_id, setVerificationID] = useState();
	const [vaccine_id, setVaccineID] = useState("");
	const [verifiedList, setVerifiedList] = useState([]);
	const [newID, setNewID] = useState("");
	const [searchQuery, setQuery] = useState("");
	const [advQuery, setAdvQuery] = useState([]);

	useEffect(() => {
		Axios.get("http://localhost:3002/api/initdata").then(response => {
			setVerifiedList(response.data);
		});
	}, []);

	const submitVerified = () => {
		Axios.post("http://localhost:3002/api/insert", {
			verification_id: verification_id,
			vaccine_id: vaccine_id
		});
		setVerifiedList([
			...verifiedList,
			{
				verification_id: verification_id,
				vaccine_id: vaccine_id
			}
		]);
	};

	const deleteVerified = (vaccine_id) => {
		Axios.delete(`http://localhost:3002/api/delete/${vaccine_id}`);
	};

	const updateVerified = (vaccine_id) => {
		Axios.put(`http://localhost:3002/api/update`, {
			verification_id: verification_id,
			vaccine_id: newID
		});
		setNewID("");
	};

	const searchVerified = () => {
		Axios.post("http://localhost:3002/api/search", {
			search_query: searchQuery
		}).then(response => {
			setVerifiedList(response.data || []);
			setAdvQuery([]);
		});
	};

	const runAdvancedQuery = () => {
		Axios.get("http://localhost:3002/api/advanced_query", {}).then(response => {
			console.log(response.data);

			setAdvQuery(response.data || []);
			setVerifiedList([]);
		});
	};

	return (
		<div className="App">
			<h1> CRUD APPLICATIONS</h1>

			<div className="form">
				<label> Verification ID:</label>
				<input
					type="text"
					name="verification_id"
					onChange={e => {
						setVerificationID(e.target.value);
					}}
				/>
				<label> Vaccine ID:</label>
				<input
					type="text"
					name="vaccine_id"
					onChange={e => {
						setVaccineID(e.target.value);
					}}
				/>

				{/* <label> Vaccine Brand: </label>
				<input
					type="text"
					name="Brand"
					onChange={e => {
						setBrand(e.target.value);
					}}
				/> */}

				<button onClick={submitVerified}> Add</button>

				<h1> SEARCH VERIFICATIONS </h1>
				<input
					type="text"
					name="search"
					onChange={e => {
						setQuery(e.target.value);
					}}
				/>

				<button onClick={searchVerified}> Search </button>

				<div id="searchResults" />

				<h1> ADVANCED QUERY </h1>

				<button onClick={runAdvancedQuery}> RUN </button>

				{advQuery &&
					advQuery.map(val => {
						return (
							<div className="card">
								<h1> Person ID: {val.person_id} </h1>
								<p> First Name: {val.first_name}</p>
								<p> Last Name: {val.last_name}</p>
								<p> Vaccine Brand: {val.vaccine_brand}</p>
							</div>
						);
					})}

				{verifiedList &&
					verifiedList.map(val => {
						return (
							<div className="card">
								<h1> Verification ID: {val.verification_id} </h1>
								<p> Vaccine ID: {val.vaccine_id}</p>
								{/* <p>Vaccine Brand: {val.vaccine_brand}</p> */}
								<button
									onClick={() => {
										delete(val.vaccine_id);
									}}
								>
									{" "}
									Delete
								</button>
								<input
									type="text"
									id="updateInput"
									onChange={e => {
										setNewID(e.target.value);
									}}
								/>
								<button
									onClick={() => {
										updateVerified(val.verification_id);
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