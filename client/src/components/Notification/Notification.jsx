import "./Notification.css";
import formatDate from "../../utils/formatDate.js";
import { useNavigate } from "react-router-dom";
import { updateNotification } from "../../utils/services.js";

const Notification = ({ notification, getNotifs }) => {
	const {
		_id: id,
		content,
		sender,
		createdAt,
		unread,
		peep: peepId,
	} = notification;

	const navigate = useNavigate();

	const unreadToFalse = async () => {
		try {
			await updateNotification(id);
		} catch (error) {
			console.error(error);
		}
	};

	const handleClick = async () => {
		navigate(`/peep/${peepId}`);
		await unreadToFalse();
		getNotifs();
	};

	return (
		<div
			className={`notification-container ${unread ? `unread` : ""}`}
			data-testid="single-notification"
			onClick={handleClick}
		>
			<p className="notif-sender m-0">
				<span className="fw-bold">{sender.username}</span> replied to your post:
			</p>
			<p className="notif-content m-0">{content}</p>
			<span className="notif-date">{formatDate(createdAt)}</span>
		</div>
	);
};

export default Notification;
