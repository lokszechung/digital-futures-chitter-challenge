import { useState, useEffect } from "react";
import { isAuthenticated } from "../../utils/auth.js";
import { getAllPeeps } from "../../utils/services.js";

import SinglePeep from "../SinglePeep/SinglePeep";
import PostPeep from "../PostPeep/PostPeep";
import LogInToPost from "../LogInToPost/LogInToPost.jsx";

import "./Peeps.css";

const Peeps = ({ name }) => {
	const [peeps, setPeeps] = useState([]);
	const [loading, setLoading] = useState(false);

	const getPeeps = async () => {
		try {
			setLoading(true);
			const response = await getAllPeeps();
			setPeeps(response.reverse());
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
				<LogInToPost />
			)}
			<div className="separator"></div>
			{peeps.map((peep) => {
				return <SinglePeep key={peep._id} peep={peep} />;
			})}
		</div>
	);
};

export default Peeps;
