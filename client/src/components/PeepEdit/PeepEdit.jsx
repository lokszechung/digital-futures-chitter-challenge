import "./PeepEdit.css";
import { useState, useRef, useEffect } from "react";

import { updatePeep, getAllPeeps } from "../../utils/services";
import { sortPeepsByTime } from "../../utils/sortByTime";

const PeepEdit = ({ peep, getPeeps, setEditing }) => {
	const contentRef = useRef(null);
	const [content, setContent] = useState(peep.content);

	useEffect(() => {
		const textArea = contentRef.current;
		textArea.focus();
		textArea.setSelectionRange(textArea.value.length, textArea.value.length);
	}, []);

	function handleContentChange(e) {
		setContent(e.target.value);
	}

	const handleSave = async (e) => {
		e.preventDefault();
		try {
			const response = await updatePeep(peep._id, content);
			console.log("edit response: ", response);
			setEditing(false);
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
		<div className="edit-peep-container" onClick={(e) => e.stopPropagation()}>
			<form className="peep-form" onSubmit={handleSave}>
				<div className="input-group">
					<textarea
						className="peep-textarea form-control p-0"
						aria-label="textarea"
						onChange={handleContentChange}
						onInput={resize}
						ref={contentRef}
						value={content}
					></textarea>
				</div>
				<div className="non-input-container">
					<p className="count m-0">
						Limit: <span>{content.trim().length}</span>/420
					</p>
					<button
						className="cancel-btn"
						onClick={() => {
							setEditing(false);
						}}
					>
						Cancel
					</button>
					<button className="post-btn" type="submit" disabled={!content.trim()}>
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

export default PeepEdit;
