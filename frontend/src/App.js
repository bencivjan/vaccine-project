// export default App;
import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
	const [ username, setUsername ] = useState("");
	const [ password, setPassword ] = useState("");
	// const [ Brand, setBrand ] = useState("");

	const [ userList, setUserList ] = useState([]);
	const [ newPassword, setNewPassword ] = useState("");

	const [ searchQuery, setQuery ] = useState("");

	useEffect(() => {
		Axios.get("http://localhost:3002/api/initdata").then(response => {
			setUserList(response.data);
		});
	}, []);

	const submitUser = () => {
		Axios.post("http://localhost:3002/api/insert", {
			username: username,
			password: password
			// vaccine_brand: Brand
		});
		setUserList([
			{
				username: username,
				password: password
				// vaccine_brand: Brand
			},
			...userList
		]);
	};

	const deleteUser = username => {
		Axios.delete(`http://localhost:3002/api/delete/${username}`);
	};

	const updateUser = username => {
		Axios.put(`http://localhost:3002/api/update`, {
			username: username,
			password: newPassword
		});
		setNewPassword("");
	};

	const searchUser = username => {
		Axios.post("http://localhost:3002/api/search", {
			search_query: searchQuery
		}).then(response => {
			setUserList(response.data || []);
		});
	};

	return (
		<div className="App">
			<h1> CRUD APPLICATIONS</h1>

			<div className="form">
				<label> Username:</label>
				<input
					type="text"
					name="username"
					onChange={e => {
						setUsername(e.target.value);
					}}
				/>
				<label> Password:</label>
				<input
					type="text"
					name="password"
					onChange={e => {
						setPassword(e.target.value);
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

				<button onClick={submitUser}> Add</button>

				<h1> SEARCH USERS </h1>
				<input
					type="text"
					name="search"
					onChange={e => {
						setQuery(e.target.value);
					}}
				/>

				<button onClick={searchUser}> Search </button>

				<div id="searchResults" />

				<h1> ADVANCED QUERY </h1>

				<button onClick={submitUser}> submit </button>

				<input type="text" name="advanced_result" />

				{userList &&
					userList.map(val => {
						return (
							<div className="card">
								<h1> Username: {val.username} </h1>
								<p> Password: {val.password}</p>
								{/* <p>Vaccine Brand: {val.vaccine_brand}</p> */}
								<button
									onClick={() => {
										deleteUser(val.username);
									}}
								>
									{" "}
									Delete
								</button>
								<input
									type="text"
									id="updateInput"
									onChange={e => {
										// setNewBrand(e.target.value);
										setNewPassword(e.target.value);
									}}
								/>
								<button
									onClick={() => {
										updateUser(val.username);
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
