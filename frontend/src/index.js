import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import { Route, IndexRoute } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

import "semantic-ui-css/semantic.min.css";

ReactDOM.render(
	<BrowserRouter>
		<Routes /> {/* The various pages will be displayed by the `Main` component. */}
	</BrowserRouter>,
	document.getElementById("root")
);
