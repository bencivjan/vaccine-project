import React from "react";
import { Route, Switch } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import Create_User from "./Create_User";

/**
 * Import all page components here
 */
// import SomePage from './components/SomePage';
// import SomeOtherPage from './components/SomeOtherPage';

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */

function Routes() {
	return (
		<Switch>
			{/* The Switch decides which component to show based on the current URL.*/}
			<Route exact path="/" component={Login} />
			<Route exact path="/Create_User" component={Create_User} />
			<Route exact path="/home" component={App} />
		</Switch>
	);
}

export default Routes;
