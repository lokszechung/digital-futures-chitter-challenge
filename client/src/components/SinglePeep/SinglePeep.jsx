import { useState, useEffect } from "react";
import { getUser } from "../../utils/services.js";

import formatDateTime from "../../utils/formatDateTime.js";
import Avatar from "../Avatar/Avatar";

import "./SinglePeep.css";

const SinglePeep = ({ peep }) => {
	const { author: authorId, content, createdAt } = peep;

	const [author, setAuthor] = useState({});

	useEffect(() => {
		const getAuthor = async () => {
			try {
				const response = await getUser(authorId);
				setAuthor(response);
			} catch (error) {
				console.error(error);
			}
		};
		getAuthor();
	}, [authorId]);

	return (
		<div
			className="single-peep-container"
			data-timestamp={createdAt}
			data-testid="single-peep"
		>
			<div className="author-info">
				<Avatar
					id={authorId}
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

export default SinglePeep;
