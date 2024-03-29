export const sortPeepsByTime = (peeps) => {
	const sorted = peeps.sort((a, b) => {
		const dateA = new Date(a.createdAt);
		const dateB = new Date(b.createdAt);

		return dateB - dateA;
	});
	return sorted;
};

export const sortNotifsByTime = (notifs) => {
	const sorted = notifs.sort((a, b) => {
		const dateA = new Date(a.createdAt);
		const dateB = new Date(b.createdAt);

		return dateB - dateA;
	});
	return sorted;
};
