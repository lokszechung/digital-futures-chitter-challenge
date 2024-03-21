import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import HomeView from "./views/HomeView/HomeView";

import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { isAuthenticated } from "./utils/auth";

function App() {
	const [authenticated, setAuthenticated] = useState(isAuthenticated());

	return (
		<>
			<Navbar
				authenticated={authenticated}
				setAuthenticated={setAuthenticated}
			/>
			<Routes>
				<Route path="/" element={<HomeView />} />
			</Routes>
		</>
	);
}

export default App;
