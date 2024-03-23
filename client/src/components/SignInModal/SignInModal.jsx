import LogInForm from "../Forms/LogInForm/LogInForm";
import SignUpForm from "../Forms/SignUpForm/SignUpForm";
import "./SignInModal.css";
import { useRef } from "react";

const SignInModal = ({ setAuthenticated }) => {
	const modalRef = useRef(null);

	const handleCloseModal = () => {
		const modal = modalRef.current;
		if (modal) {
			modal.classList.remove("show");
			modal.setAttribute("aria-hidden", "true");
			modal.removeAttribute("aria-modal");
			modal.removeAttribute("role");
			modal.style.transition = "opacity 0.3s";
			modal.style.opacity = "0";
			setTimeout(() => {
				modal.style.display = "none";
				document.body.style = "";
			}, 300);
			document.body.classList.remove("modal-open");
		}
		const backdrop = document.querySelector(".modal-backdrop");
		if (backdrop) {
			backdrop.classList.remove("show");
			setTimeout(() => {
				backdrop.remove();
			}, 300);
		}
	};

	return (
		<div
			className="modal fade"
			id="signInModal"
			tabIndex="-1"
			aria-labelledby="signInModalLabel"
			aria-hidden="true"
			ref={modalRef}
		>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<ul className="nav nav-tabs" id="myTab" role="tablist">
						<li className="nav-item modal-nav-item" role="presentation">
							<button
								className="nav-link active modal-nav-link"
								id="sign-up-tab"
								data-bs-toggle="tab"
								data-bs-target="#sign-up"
								type="button"
								role="tab"
								aria-controls="sign-up"
								aria-selected="true"
							>
								Sign Up
							</button>
						</li>
						<li className="nav-item modal-nav-item" role="presentation">
							<button
								className="nav-link modal-nav-link"
								id="log-in-tab"
								data-bs-toggle="tab"
								data-bs-target="#log-in"
								type="button"
								role="tab"
								aria-controls="log-in"
								aria-selected="false"
							>
								Log In
							</button>
						</li>
					</ul>
					<div className="tab-content" id="myTabContent">
						<div
							className="tab-pane fade show active"
							id="sign-up"
							role="tabpanel"
							aria-labelledby="sign-up-tab"
						>
							<div className="signup-container container-fluid p-4">
								<SignUpForm
									handleCloseModal={handleCloseModal}
									setAuthenticated={setAuthenticated}
								/>
							</div>
						</div>
						<div
							className="tab-pane fade"
							id="log-in"
							role="tabpanel"
							aria-labelledby="log-in-tab"
						>
							<div className="login-container container-fluid p-4">
								<LogInForm
									handleCloseModal={handleCloseModal}
									setAuthenticated={setAuthenticated}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignInModal;
