import axios from "axios";
import { useState, useEffect } from "react";

import SinglePeep from "../SinglePeep/SinglePeep";

const Peeps = () => {
	const [peeps, setPeeps] = useState([]);

	const getPeeps = async () => {
		try {
			const { data } = await axios.get("http://localhost:4000/api/peep");
			// console.log(response);
			setPeeps(data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getPeeps();
	}, []);

	// useEffect(() => {
	// 	console.log(peeps);
	// }, [peeps]);

	return (
		<div>
			{peeps.map((peep) => {
				return <SinglePeep key={peep._id} peep={peep} />;
			})}
		</div>
	);
};

export default Peeps;
