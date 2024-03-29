import { useState, useEffect } from "react";
import { isAuthenticated } from "../../utils/auth.js";
import { getAllPeeps } from "../../utils/services.js";
import { sortPeepsByTime } from "../../utils/sortByTime.js";

import SinglePeep from "../SinglePeep/SinglePeep";
import PostPeep from "../PostPeep/PostPeep";
import LogInToAction from "../LogInToAction/LogInToAction.jsx";

import "./Peeps.css";

const Peeps = ({ name }) => {
	const [peeps, setPeeps] = useState([]);
	const [loading, setLoading] = useState(false);

	const getPeeps = async () => {
		try {
			setLoading(true);
			const response = await getAllPeeps();
			console.log(response);
			setPeeps(sortPeepsByTime(response));
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getPeeps();
	}, []);

	return loading ? (
		<div className="peeps-container">
			<div className="spinner-border mt-5" role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>
	) : (
		<div className="peeps-container" data-testid="peeps-container">
			{isAuthenticated() ? (
				<PostPeep name={name} getPeeps={getPeeps} />
			) : (
				<LogInToAction action={"post"} />
			)}
			<div className="separator"></div>
			{peeps.map((peep) => {
				return <SinglePeep key={peep._id} peep={peep} getPeeps={getPeeps} />;
			})}
		</div>
	);
};

export default Peeps;
