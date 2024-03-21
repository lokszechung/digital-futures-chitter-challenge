import "./Navatar.css";

import Avatar from "../../Avatar/Avatar";
import { handleLogOut, isAuthenticated } from "../../../utils/auth.js";

const Navatar = ({ firstname, lastname, setAuthenticated }) => {
	function ClickLogOut() {
		try {
			handleLogOut();
			setAuthenticated(isAuthenticated());
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="dropdown">
			<div
				className="navatar-container"
				role="button"
				data-bs-toggle="dropdown"
				aria-haspopup="true"
				aria-expanded="false"
			>
				<Avatar firstname={firstname} lastname={lastname} />
			</div>
			<ul className="dropdown-menu dropdown-menu-end">
				<li className="dropdown-item" onClick={ClickLogOut}>
					Log out
				</li>
			</ul>
		</div>
	);
};

export default Navatar;
