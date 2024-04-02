import "./Avatar.css";
import { useEffect, useState } from "react";
import findAvatarColour from "../../../utils/findAvatarColour.js";

const Avatar = ({ id, firstname, lastname }) => {
	const [avColour, setAvColour] = useState("");

	useEffect(() => {
		if (id) {
			setAvColour(findAvatarColour(id));
		}
	}, [id]);

	return (
		id &&
		firstname &&
		lastname && (
			<div
				className="avatar-container"
				style={{ backgroundColor: avColour.bgColor }}
			>
				<p className="avatar-name mb-0" style={{ color: avColour.textColor }}>
					{firstname[0]}
					{lastname[0]}
				</p>
			</div>
		)
	);
};

export default Avatar;
