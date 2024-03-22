// import moment from "moment";

function formatDateTime(date) {
	const newDate = new Date(date);
	const timeOptions = { hour: "numeric", minute: "2-digit", hour12: true };
	const dateOptions = { day: "2-digit", month: "short", year: "numeric" };
	const formattedTime = newDate.toLocaleTimeString("en-US", timeOptions);
	const formattedDate = newDate.toLocaleDateString("en-UK", dateOptions);
	return `${formattedTime} · ${formattedDate}`;
}

export default formatDateTime;
