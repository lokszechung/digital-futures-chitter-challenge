import "./Avatar.css";
import { useEffect, useState } from "react";

const Avatar = ({ id, firstname, lastname }) => {
	const [avColour, setAvColour] = useState("");

	const colours = [
		{ bgColor: "#0079FF", textColor: "#FFFFFF" },
		{ bgColor: "#0EFFBD", textColor: "#000000" },
		{ bgColor: "#F6FA70", textColor: "#000000" },
		{ bgColor: "#FF0060", textColor: "#FFFFFF" },
		{ bgColor: "#8BB8E8", textColor: "#000000" },
		{ bgColor: "#F7D060", textColor: "#000000" },
		{ bgColor: "#FF864F", textColor: "#FFFFFF" },
		{ bgColor: "#178B6D", textColor: "#FFFFFF" },
	];

	function idToNum(id) {
		let hash = 0;
		for (let i = 0; i < id.length; i++) {
			hash += id.charCodeAt(i); // Add the character code of each character
		}
		return hash % 8;
	}

	useEffect(() => {
		if (id) {
			setAvColour(colours[idToNum(id)]);
			console.log(firstname, idToNum(id));
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
