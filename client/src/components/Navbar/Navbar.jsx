import Navatar from "./Navatar/Navatar";
import SignInButton from "./SignInButton/SignInButton";
import SignInModal from "./SignInModal/SignInModal";
import NotifBell from "./NotifBell/NotifBell";

import "./Navbar.css";

const Navbar = ({ authenticated, setAuthenticated, name }) => {
	return (
		<nav className="navbar navbar-expand-lg fixed-top p-0">
			<div className="navbar-container container-fluid">
				<h1 className="chitter">Chitter</h1>

				<div className="navbar-actions">
					{authenticated ? (
						<div className="authd-actions">
							<NotifBell />
							<Navatar name={name} setAuthenticated={setAuthenticated} />
						</div>
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
