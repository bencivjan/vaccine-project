import "./Create_User.css";
import React, { useState, useEffect } from "react";
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import Axios from "axios";

function CreateUser() {
	const [first_name, setFirstName] = useState("");
	const [last_name, setLastName] = useState("");
	const [age, setAge] = useState();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const createAccount = () => {
		console.log("Pressed");
		Axios.post("https://us-central1-vaccine-backend.cloudfunctions.net/app/api/createUser", {
			first_name: first_name,
			last_name: last_name,
			age: age,
			email: email,
			username: username,
			password: password
		}).then(response => {
			console.log("created");
		});
	};

	return (
		<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
			<Grid.Column style={{ maxWidth: 1000 }}>
				<Header as='h2' color='black' textAlign='center'> Create your account
      </Header>
				<Form size='large'>
					<Segment stacked style={{ minWidth: 450 }}>
						<Form.Input
							placeholder='First Name'
							onChange={e => {
								setFirstName(e.target.value);
							}}
						/>
						<Form.Input
							placeholder='Last Name'
							onChange={e => {
								setLastName(e.target.value);
							}}
						/>
						<Form.Input
							placeholder='Age'
							onChange={e => {
								setAge(e.target.value);
							}}
						/>
						<Form.Input
							placeholder='Email'
							onChange={e => {
								setEmail(e.target.value);
							}}
						/>
						<Form.Input
							placeholder='Username'
							onChange={e => {
								setUsername(e.target.value);
							}}
						/>
						<Form.Input
							placeholder='Password'
							onChange={e => {
								setPassword(e.target.value);
							}}
						/>
						<Button onClick={createAccount}> Create Account </Button>
					</Segment>
				</Form>
			</Grid.Column>
		</Grid>
	)
}

export default CreateUser