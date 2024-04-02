import "./PostPeep.css";

import { useEffect, useState, useRef } from "react";

import Avatar from "../common/Avatar/Avatar.jsx";
import { postPeep } from "../../utils/services.js";

const PostPeep = ({ name, getPeeps }) => {
	const contentRef = useRef(null);

	const [content, setContent] = useState("");

	const { sub, firstname, lastname } = name;

	function handleContentChange(e) {
		setContent(e.target.value);
	}

	const handlePost = async (e) => {
		e.preventDefault();
		try {
			await postPeep(content);
			contentRef.current.value = "";
			setContent("");
			contentRef.current.style.height = "auto";
			getPeeps();
		} catch (error) {
			console.error(error);
		}
	};

	function resize(e) {
		e.target.style.height = "auto";
		e.target.style.height = e.target.scrollHeight + "px";
	}

	return (
		<div className="post-peep-container">
			<div className="input-container">
				<Avatar id={sub} firstname={firstname} lastname={lastname} />
				<form className="peep-form" onSubmit={handlePost}>
					<div className="input-group">
						<textarea
							className="peep-textarea form-control p-0"
							aria-label="textarea"
							onChange={handleContentChange}
							onInput={resize}
							ref={contentRef}
							placeholder="Share a Peep..."
						></textarea>
					</div>
					<div className="non-input-container">
						<p className="count m-0">
							Limit: <span>{content.trim().length}</span>/300
						</p>
						<button
							className="post-btn"
							type="submit"
							disabled={!content.trim()}
						>
							Post
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default PostPeep;
