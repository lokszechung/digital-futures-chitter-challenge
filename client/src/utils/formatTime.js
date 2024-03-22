import moment from "moment";

function formatTime(date) {
	const diff = moment().diff(moment(date), "seconds");

	const thresholds = [
		{ value: 60, unit: "s" }, // seconds
		{ value: 60, unit: "m" }, // minutes
		{ value: 24, unit: "h" }, // hours
		{ value: 7, unit: "d" }, // days
		{ value: 4, unit: "w" }, // weeks
		{ value: 12, unit: "m" }, // months
		{ value: 1, unit: "y" }, // years
	];

	let unit;
	let diffe = diff;

	for (let i = 0; i < thresholds.length; i++) {
		if (diffe < thresholds[i].value) {
			unit = thresholds[i].unit;
			break;
		}
		if (i === thresholds.length - 1) {
			unit = thresholds[i].unit;
		}

		diffe /= thresholds[i].value;
	}

	const formattedDate = `${Math.floor(diffe)}${unit}`;

	return formattedDate;
}

export default formatTime;
