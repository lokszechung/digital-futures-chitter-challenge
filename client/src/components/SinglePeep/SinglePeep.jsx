import { useState, useEffect } from "react";
import axios from "axios";

import formatDate from "../../utils/formatDate";
import Avatar from "../Avatar/Avatar";

const SinglePeep = ({ peep }) => {
	const { author: authorId, content, createdAt } = peep;

	// console.log(authorId, content, createdAt);

	const [author, setAuthor] = useState({});

	useEffect(() => {
		const getAuthor = async () => {
			try {
				const { data } = await axios.get(
					`http://localhost:4000/api/user/${authorId}`
				);
				// console.log(response);
				setAuthor(data);
			} catch (error) {
				console.error(error);
			}
		};
		getAuthor();
	}, [authorId]);

	// useEffect(() => {
	// 	console.log(author);
	// }, [author]);

	return (
		<div className="peep-container">
			<Avatar firstname={author.firstname} lastname={author.lastname} />
			<p>
				{author.firstname} {author.lastname} <span>@{author.username}</span>
			</p>
			<p className="peep-content">{content}</p>
			<p className="peep-posted-time">{formatDate(createdAt)}</p>
		</div>
	);
};

export default SinglePeep;
