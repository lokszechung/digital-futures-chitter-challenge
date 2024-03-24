import Navatar from "./Navatar/Navatar";
import SignInButton from "../SignInButton/SignInButton";
import SignInModal from "../SignInModal/SignInModal";

// import { isAuthenticated } from "../../utils/auth";

import "./Navbar.css";

const Navbar = ({ authenticated, setAuthenticated, name }) => {
	return (
		<nav className="navbar navbar-expand-lg fixed-top p-0">
			<div className="navbar-container container-fluid">
				<h1 className="chitter">Chitter</h1>

				<div className="navbar-actions">
					{authenticated ? (
						<Navatar name={name} setAuthenticated={setAuthenticated} />
					) : (
						<>
							<SignInButton setAuthenticated={setAuthenticated} />
							<SignInModal setAuthenticated={setAuthenticated} />
						</>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
