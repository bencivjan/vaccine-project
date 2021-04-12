// export default App;
import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
	const [id, setId] = useState();
	const [Name, setName] = useState("");
	const [Address, setBrand] = useState("");

	const [locationList, setLocationList] = useState([]);
	const [newAddress, setNewBrand] = useState("");

	const [searchQuery, setQuery] = useState("");

	useEffect(() => {
		Axios.get("http://localhost:3002/api/initdata").then(response => {
			setLocationList(response.data);
		});
	}, []);

	const submitLocation = () => {
		Axios.post("http://localhost:3002/api/insert", {
			location_id: id,
			clinic_name: Name,
			address: Address
		});
		setLocationList([
			...locationList,
			{
				location_id: id,
				clinic_name: Name,
				address: Address
			}
		]);
	};

	const deleteLocation = id => {
		Axios.delete(`http://localhost:3002/api/delete/${id}`);
	};

	const updateLocation = (location_id) => {
		Axios.put(`http://localhost:3002/api/update`, {
			location_id: location_id,
			address: newAddress
		});
		setNewBrand("");
	};

	const searchLocation = id => {
		Axios.post("http://localhost:3002/api/search", {
			search_query: searchQuery
		}).then(response => {
			setLocationList(response.data || []);
		});
	};

	const runAdvancedQuery = id => {
		Axios.get("http://localhost:3002/api/advanced_query", {
		}).then(response => {
			console.log(response.data);

			setLocationList(response.data || []);
		});
	};


	return (
		<div className="App">
			<h1> CRUD APPLICATIONS</h1>

			<div className="form">
				<label> Location ID:</label>
				<input
					type="text"
					name="id"
					onChange={e => {
						setId(e.target.value);
					}}
				/>
				<label> Clinic Name:</label>
				<input
					type="text"
					name="Name"
					onChange={e => {
						setName(e.target.value);
					}}
				/>

				<label> Address: </label>
				<input
					type="text"
					name="Address"
					onChange={e => {
						setBrand(e.target.value);
					}}
				/>

				<button onClick={submitLocation}> Add</button>

				<h1> SEARCH VACCINES </h1>
				<input
					type="text"
					name="search"
					onChange={e => {
						setQuery(e.target.value);
					}}
				/>

				<button onClick={searchLocation}> Search </button>

				<div id="searchResults" />

				<h1> ADVANCED QUERY </h1>

				<button onClick={runAdvancedQuery}> RUN </button>

				{locationList &&
					locationList.map(val => {
						return (
							<div className="card">
								<h1> Location ID: {val.location_id} </h1>
								<p>Clinic Name: {val.clinic_name}</p>
								<p>Address: {val.address}</p>
								<button
									onClick={() => {
										deleteLocation(val.location_id);
									}}
								>
									{" "}
									Delete</button>
								<input
									type="text"
									id="updateInput"
									onChange={e => {
										setNewBrand(e.target.value);
									}} />
								<button
									onClick={() => {
										updateLocation(val.location_id);
									}}
								>
									{" "}
									Update</button>
							</div>
						);
					})}
			</div>
		</div>
	);
}

export default App;