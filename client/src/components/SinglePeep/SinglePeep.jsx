import { useState, useEffect, useRef } from "react";
import { getUser } from "../../utils/services.js";
import { useNavigate } from "react-router-dom";

import formatDateTime from "../../utils/formatDateTime.js";
import Avatar from "../Avatar/Avatar";

import "./SinglePeep.css";
import { getPayload, isAuthenticated } from "../../utils/auth.js";
import DeletePeepModal from "../DeletePeepModal/DeletePeepModal.jsx";
import PeepEdit from "../PeepEdit/PeepEdit.jsx";

const SinglePeep = ({ peep, getPeeps }) => {
	const {
		_id: id,
		author,
		content,
		createdAt,
		updatedAt,
		replies,
		edited,
	} = peep;

	const navigate = useNavigate();

	const [editing, setEditing] = useState(false);
	const peepOptionsRef = useRef(null);
	const dropdownMenuRef = useRef(null);

	const isOwner = isAuthenticated() && getPayload().sub === author._id;

	const closeDropdown = () => {
		const peepOptions = peepOptionsRef.current;
		const dropdownMenu = dropdownMenuRef.current;
		if (peepOptions && dropdownMenu) {
			peepOptions.classList.remove("show");
			peepOptions.setAttribute("aria-hidden", "true");
			dropdownMenu.classList.remove("show");
		}
	};

	return (
		<>
			<div
				className="single-peep-container"
				data-timestamp={createdAt}
				data-testid="single-peep"
				onClick={() => navigate(`/peep/${id}`)}
			>
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
					{isOwner && (
						<div
							className={`dropdown peep-option-dropdown`}
							onClick={(e) => e.stopPropagation()}
						>
							<div
								className="peep-options"
								ref={peepOptionsRef}
								role="button"
								data-bs-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								<svg viewBox="0 0 24 24" height="20" aria-hidden="true">
									<g>
										<path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
									</g>
								</svg>
							</div>
							<ul
								className="dropdown-menu dropdown-menu-end"
								ref={dropdownMenuRef}
							>
								<li
									className="dropdown-item"
									onClick={() => {
										closeDropdown();
										setEditing(true);
									}}
								>
									Edit Peep
								</li>
								<li
									className="dropdown-item text-danger"
									data-bs-toggle="modal"
									data-bs-target="#deletePeepModal"
									onClick={() => closeDropdown()}
								>
									Delete Peep
								</li>
							</ul>
						</div>
					)}
				</div>
				{editing ? (
					<PeepEdit peep={peep} getPeeps={getPeeps} setEditing={setEditing} />
				) : (
					<p className="peep-content">{content}</p>
				)}
				<p className="peep-posted-time">
					{formatDateTime(createdAt)}
					{edited && <span className="peep-edited"> (edited)</span>}
				</p>
				<p className="peep-replies-amt">
					{replies.length}
					{replies.length === 1 ? " reply" : " replies"}
				</p>
			</div>
			<DeletePeepModal peepId={id} getPeeps={getPeeps} />
		</>
	);
};

export default SinglePeep;
