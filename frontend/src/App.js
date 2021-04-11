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
	const [ movieName, setMovieName ] = useState("");
	const [ Review, setReview ] = useState("");
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
		console.log(movieName);
		console.log(Review);
		console.log(Brand);
		Axios.post("http://localhost:3002/api/insert", {
			vaccine_id: movieName,
			vaccine_name: Review,
			vaccine_brand: Brand
		});

		setMovieReviewList([
			...movieReviewList,
			{
				vaccine_id: movieName,
				vaccine_name: Review,
				vaccine_brand: Brand
			}
		]);
	};

	const deleteReview = movieName => {
		Axios.delete(`http://localhost:3002/api/delete/${movieName}`);
	};

	const updateReview = movieName => {
		Axios.put(`http://localhost:3002/api/update`, {
			movieName: movieName,
			movieReview: newReview
		});
		setNewReview("");
	};

	return (
		<div className="App">
			<h1> CRUD APPLICATIONS</h1>

			<div className="form">
				<label> Movie Name:</label>
				<input
					type="text"
					name="movieName"
					onChange={e => {
						setMovieName(e.target.value);
					}}
				/>
				<label> Review:</label>
				<input
					type="text"
					name="Review"
					onChange={e => {
						setReview(e.target.value);
					}}
				/>

				<label> Vaccine Brand: </label>
				<input
					type="text"
					name="Brand"
					onChange={e => {
						setReview(e.target.value);
					}}
				/>

				<button onClick={submitReview}> Submit</button>

				{movieReviewList.map(val => {
					return (
						<div className="card">
							<h1> MovieName: {val.movieName} </h1>
							<p>Movie Review: {val.movieReview}</p>
							<button
								onClick={() => {
									deleteReview(val.movieName);
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
									updateReview(val.movieName);
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
