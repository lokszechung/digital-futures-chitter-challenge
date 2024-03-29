import { deletePeep } from "../../utils/services";

import "./DeletePeepModal.css";

const DeletePeepModal = ({ peepId, getPeeps }) => {
	const handleDelete = async () => {
		try {
			await deletePeep(peepId);
			getPeeps();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div
			className="modal fade"
			id="deletePeepModal"
			tabIndex="-1"
			aria-labelledby="deletePeepModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="exampleModalLabel">
							Delete Peep?
						</h5>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div className="modal-body">This cannot be undone.</div>
					<div className="modal-footer">
						<button
							type="button"
							className="cancel-delete-button"
							data-bs-dismiss="modal"
						>
							Cancel
						</button>
						<button
							type="button"
							className="delete-button"
							onClick={handleDelete}
							data-bs-dismiss="modal"
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeletePeepModal;
