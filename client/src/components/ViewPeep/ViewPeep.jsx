import "./ViewPeep.css";

import { useState, useEffect } from "react";

import { isAuthenticated } from "../../utils/auth.js";

import { getSinglePeep } from "../../utils/services";

import MainPeep from "../MainPeep/MainPeep";
import PeepReplies from "../PeepReplies/PeepReplies";
import LogInToAction from "../common/LogInToAction/LogInToAction";
import ReplyPeep from "../ReplyPeep/ReplyPeep";
import BackButton from "../common/BackButton/BackButton";

const ViewPeep = ({ id, name }) => {
	const [peep, setPeep] = useState();
	const [loading, setLoading] = useState(true);

	const getPeep = async () => {
		try {
			setLoading(true);
			const response = await getSinglePeep(id);
			setPeep(response);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getPeep();
	}, [id]);

	return loading ? (
		<div className="view-peep-container">
			<div className="spinner-border mt-5" role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>
	) : (
		<div className="view-peep-container" data-testid="view-peeps-container">
			<BackButton />
			<MainPeep peep={peep} getPeep={getPeep} loading={loading} />
			<div className="separator"></div>
			{isAuthenticated() ? (
				<ReplyPeep id={peep._id} name={name} getPeep={getPeep} />
			) : (
				<LogInToAction action={"reply"} />
			)}
			<PeepReplies peep={peep} />
		</div>
	);
};

export default ViewPeep;
