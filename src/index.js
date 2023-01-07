import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./Assets/Styles/Index.css";
import "./Assets/Styles/Fonts.css";
import "./Assets/Styles/TabView.css";
import "./Assets/Styles/MobileView.css";

ReactDOM.hydrateRoot(
	document.getElementById("root"),
	<BrowserRouter>
		<App />
	</BrowserRouter>
);

// ReactDOM.hydrateRoot(document.getElementById("root"), <App />);
