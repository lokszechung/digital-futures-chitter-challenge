import axios from "axios";
import { useState, useEffect } from "react";
import { isAuthenticated } from "../../utils/auth.js";

import SinglePeep from "../SinglePeep/SinglePeep";
import PostPeep from "../PostPeep/PostPeep";
import LogInToPost from "../LogInToPost/LogInToPost.jsx";

import "./Peeps.css";

const Peeps = ({ name }) => {
	const [peeps, setPeeps] = useState([]);

	const getPeeps = async () => {
		try {
			const { data } = await axios.get("http://localhost:4000/api/peep");
			// console.log(response);
			setPeeps(data.reverse());
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
