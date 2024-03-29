import "./PeepReplies.css";

import SingleReply from "../SingleReply/SingleReply";
import { sortPeepsByTime } from "../../utils/sortByTime";

const PeepReplies = ({ peep }) => {
	const { replies } = peep;

	const sortedReplies = sortPeepsByTime(replies);
	return (
		<div className="peep-replies-container">
			{sortedReplies.map((reply) => {
				return <SingleReply key={reply._id} reply={reply} />;
			})}
		</div>
	);
};

export default PeepReplies;
