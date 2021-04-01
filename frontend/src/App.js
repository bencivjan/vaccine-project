import "./App.css";
import Axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
	return (
		<div className="App">
			<h1> Vaccine Form </h1>

			<div className="form">
				<label> First Name: </label>
				<input type="text" name="firstName" />

				<label> Last Name: </label>
				<input type="text" name="lastName" />

				<label> Vaccine Brand: </label>
				<input type="text" name="brand" />

				<button> Submit</button>
			</div>
		</div>
	);
}

export default App;
