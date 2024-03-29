import "./LogInToAction.css";

const LogInToAction = ({ action }) => {
	return (
		<div className="log-in-to-action-container">
			<p className="log-in-to-action-text">
				Log in to {action === "post" && "post a Peep"}
				{action === "reply" && "reply"}!
			</p>
		</div>
	);
};

export default LogInToAction;
