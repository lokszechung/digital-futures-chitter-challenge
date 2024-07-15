import "./BackButton.css";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
	const navigate = useNavigate();

	return (
		<div className="back-container">
			<div
				className="back-btn-container"
				onClick={() => {
					navigate("/");
				}}
			>
				<svg className="back-btn" viewBox="0 0 24 24" aria-hidden="true">
					<g>
						<path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
					</g>
				</svg>
			</div>
			<p className="back-to-post m-0">Back to Posts</p>
		</div>
	);
};

export default BackButton;