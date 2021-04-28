import React from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

const Create_User = () => (
	<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
		<Grid.Column style={{ maxWidth: 450 }}>
			<Header as='h2' color='black' textAlign='center'> Log-in to your account
      </Header>
			<Form size='large'>
				<Segment stacked>
					<Form.Input placeholder='First Name' />
					<Form.Input placeholder='Last Name' />
					<Form.Input placeholder='Age' />
					<Form.Input placeholder='Email' />
					<Form.Input placeholder='Username' />
					<Form.Input placeholder='Password' />
					<Button color='black' fluid size='large'>
						Signup
          			</Button>
				</Segment>
			</Form>
		</Grid.Column>
	</Grid>
)

export default Create_User