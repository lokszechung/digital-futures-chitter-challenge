import { useState, useRef, useEffect } from "react";
import "./ReplyPeep.css";
import Avatar from "../Avatar/Avatar";
import { replyPeep } from "../../utils/services.js";

const ReplyPeep = ({ id, name, getPeep }) => {
	const contentRef = useRef(null);

	const [content, setContent] = useState("");

	const { sub, firstname, lastname } = name;

	function handleContentChange(e) {
		setContent(e.target.value);
	}

	const handleReply = async (e) => {
		e.preventDefault();
		try {
			await replyPeep(id, content);
			contentRef.current.value = "";
			setContent("");
			contentRef.current.style.height = "auto";
			getPeep();
		} catch (error) {
			console.error(error);
		}
	};

	function resize(e) {
		e.target.style.height = "auto";
		e.target.style.height = e.target.scrollHeight + "px";
	}

	return (
		<div className="reply-peep-container">
			<div className="input-container">
				<Avatar id={sub} firstname={firstname} lastname={lastname} />
				<form className="peep-form" onSubmit={handleReply}>
					<div className="input-group">
						<textarea
							className="peep-textarea form-control p-0"
							aria-label="textarea"
							onChange={handleContentChange}
							onInput={resize}
							ref={contentRef}
							placeholder="Reply to Peep..."
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
							Reply
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ReplyPeep;
