import "./Login.css";
import React, { useState, useEffect } from "react";
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import Axios from "axios";



function Login() {
	const [Username, setUsername] = useState("");
	const [Password, setPassword] = useState("");

	const checkAccount = () => {
		console.log("Pressed");
		Axios.post("http://localhost:3002/api/login", {
			username: Username
		}).then(response => {
			console.log("ran");
		});
	};

	return (
		<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header as='h2' color='black' textAlign='center'> Log-in to your account
      		</Header>
				<Form size='large'>
					<Segment stacked>
						<Form.Input
							fluid icon='user'
							iconPosition='left'
							placeholder='E-mail address'
							onChange={e => {
								setUsername(e.target.value);
							}
							} />
						<Form.Input
							fluid
							icon='lock'
							iconPosition='left'
							placeholder='Password'
							type='password'
							onChange={e => {
								setPassword(e.target.value);
							}
							} />

						<Button onClick={checkAccount}> Login </Button>
					</Segment>
				</Form>
				<Message>
					New to us? <a href='#'>Sign Up</a>
				</Message>
			</Grid.Column>
		</Grid>
	)
}

export default Login