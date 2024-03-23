function findAvatarColour(id) {
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

	return colours[idToNum(id)];
}

function idToNum(id) {
	let hash = 0;
	for (let i = 0; i < id.length; i++) {
		hash += id.charCodeAt(i); // Add the character code of each character
	}
	return hash % 8;
}

export default findAvatarColour;
