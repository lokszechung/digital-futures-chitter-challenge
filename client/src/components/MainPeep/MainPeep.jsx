import "./MainPeep.css";
import { useState, useEffect } from "react";

import { isAuthenticated, getPayload } from "../../utils/auth.js";
import Avatar from "../common/Avatar/Avatar";

import formatDateTime from "../../utils/formatDateTime.js";

import DeletePeepModal from "../DeletePeepModal/DeletePeepModal";
import PeepEdit from "../PeepEdit/PeepEdit";
import { useNavigate } from "react-router-dom";

const MainPeep = ({ peep, getPeep }) => {
	const { _id: id, author, content, createdAt, replies, edited } = peep;

	const navigate = useNavigate();

	const [editing, setEditing] = useState(false);

	const isOwner = isAuthenticated() && getPayload().sub === author._id;

	return (
		<>
			<div className="main-peep-container" data-testid="single-peep">
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
						<div className="dropdown peep-option-dropdown">
							<div
								className="peep-options"
								role="button"
								data-bs-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								<svg
									viewBox="0 0 24 24"
									height="20"
									aria-hidden="true"
									className=""
								>
									<g>
										<path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
									</g>
								</svg>
							</div>
							<ul className="dropdown-menu dropdown-menu-end">
								<li
									className="dropdown-item"
									onClick={() => {
										setEditing(true);
									}}
								>
									Edit Peep
								</li>
								<li
									className="dropdown-item text-danger"
									data-bs-toggle="modal"
									data-bs-target="#deletePeepModal"
								>
									Delete Peep
								</li>
							</ul>
						</div>
					)}
				</div>
				{editing ? (
					<PeepEdit peep={peep} setEditing={setEditing} getPeeps={getPeep} />
				) : (
					<p className="peep-content">{content}</p>
				)}
				<p className="peep-posted-time">
					{formatDateTime(createdAt)}
					{edited && <span className="peep-edited"> (edited)</span>}
				</p>
				{replies && (
					<p className="peep-replies-amt">
						{replies.length}
						{replies.length === 1 ? " reply" : " replies"}
					</p>
				)}
			</div>
			<DeletePeepModal
				peepId={id}
				getPeeps={() => {
					navigate("/");
				}}
			/>
		</>
	);
};

export default MainPeep;
