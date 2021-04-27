import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Routes from "./components/Routes";

import "semantic-ui-css/semantic.min.css";

ReactDOM.render(
	<BrowserRouter>
		<Routes /> {/* The various pages will be displayed by the `Main` component. */}
	</BrowserRouter>,
	document.getElementById("root")
);
