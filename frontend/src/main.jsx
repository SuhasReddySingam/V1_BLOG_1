import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
	<BrowserRouter>
		<ChakraProvider>
			<GoogleOAuthProvider clientId="330400912428-6ie1055rvcm9gg9k9dqotdl42kudq995.apps.googleusercontent.com">
				<App />
			</GoogleOAuthProvider>	
		</ChakraProvider>
	</BrowserRouter>
</React.StrictMode>
);
