import "./SingleReply.css";

import Avatar from "../common/Avatar/Avatar";
import formatDateTime from "../../utils/formatDateTime";

const SingleReply = ({ reply }) => {
	const { id, author, content, createdAt, updatedAt } = reply;
	return (
		<div className="single-reply-container" data-testid="single-reply">
			<div className="author-info">
				<Avatar
					id={author._id}
					firstname={author.firstname}
					lastname={author.lastname}
				/>
				<div className="author-name-username">
					<p className="author-name mb-0 fw-bold">
						{author.firstname} {author.lastname}
					</p>
					<p className="author-username mb-0">@{author.username}</p>
				</div>
			</div>

			<p className="peep-content">{content}</p>

			<p className="peep-posted-time">{formatDateTime(createdAt)}</p>
		</div>
	);
};

export default SingleReply;
