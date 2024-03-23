import axios from "axios";
import { useState, useEffect } from "react";
import { isAuthenticated } from "../../utils/auth.js";

import SinglePeep from "../SinglePeep/SinglePeep";
import PostPeep from "../PostPeep/PostPeep";
import LogInToPost from "../LogInToPost/LogInToPost.jsx";

import "./Peeps.css";
import { set } from "mongoose";

const Peeps = ({ name }) => {
	const [peeps, setPeeps] = useState([]);
	const [loading, setLoading] = useState(false);

	const getPeeps = async () => {
		try {
			setLoading(true);
			const { data } = await axios.get("http://localhost:4000/api/peep");
			setPeeps(data.reverse());
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
		<div className="peeps-container">
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
