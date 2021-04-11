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
	const [ id, setId ] = useState("");
	const [ Name, setName ] = useState("");
	const [ Brand, setBrand ] = useState("");

	const [ movieReviewList, setMovieReviewList ] = useState([]);
	const [ newReview, setNewReview ] = useState("");

	useEffect(() => {
		Axios.get("http://localhost:3002/api/get").then(response => {
			setMovieReviewList(response.data);
		});
	}, []);

	const submitReview = () => {
		console.log("Submitted");
		console.log(id);
		console.log(Name);
		console.log(Brand);
		Axios.post("http://localhost:3002/api/insert", {
			vaccine_id: id,
			vaccine_name: Name,
			vaccine_brand: Brand
		});

		setMovieReviewList([
			...movieReviewList,
			{
				vaccine_id: id,
				vaccine_name: Name,
				vaccine_brand: Brand
			}
		]);
	};

	const deleteReview = id => {
		Axios.delete(`http://localhost:3002/api/delete/${id}`);
	};

	const updateReview = id => {
		Axios.put(`http://localhost:3002/api/update`, {
			id: id,
			movieReview: newReview
		});
		setNewReview("");
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

				<button onClick={submitReview}> Submit</button>

				{movieReviewList.map(val => {
					return (
						<div className="card">
							<h1> MovieName: {val.id} </h1>
							<p>Movie Name: {val.movieReview}</p>
							<button
								onClick={() => {
									deleteReview(val.id);
								}}
							>
								{" "}
								Delete
							</button>
							<input
								type="text"
								id="updateInput"
								onChange={e => {
									setNewReview(e.target.value);
								}}
							/>
							<button
								onClick={() => {
									updateReview(val.id);
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
