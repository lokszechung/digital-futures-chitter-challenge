import Navatar from "./Navatar/Navatar";
import SignInButton from "../SignInButton/SignInButton";
import SignInModal from "../SignInModal/SignInModal";

import { useEffect, useState } from "react";

import { getPayload, isAuthenticated } from "../../utils/auth";

import "./Navbar.css";

const Navbar = ({ authenticated, setAuthenticated, name }) => {
	// const [firstname, setFirstname] = useState("");
	// const [lastname, setLastname] = useState("");

	// useEffect(() => {
	// 	if (isAuthenticated()) {
	// 		const { firstname, lastname } = getPayload();
	// 		setFirstname(firstname);
	// 		setLastname(lastname);
	// 	}
	// }, [authenticated]);

	return (
		<nav className="navbar navbar-expand-lg fixed-top">
			<div className="container-fluid">
				<div></div>
				<h1 className="chitter">Chitter</h1>
				<div>
					{isAuthenticated() ? (
						<Navatar name={name} setAuthenticated={setAuthenticated} />
					) : (
						<>
							<SignInButton setAuthenticated={setAuthenticated} />
							<SignInModal setAuthenticated={setAuthenticated} />
						</>
					)}
					{/* <SignInModal setAuthenticated={setAuthenticated} /> */}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
