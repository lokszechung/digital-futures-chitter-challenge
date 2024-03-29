import "./NotifBell.css";
import { getNotifications } from "../../../utils/services.js";
import { useState, useEffect } from "react";
import Notification from "../../Notification/Notification";
import { sortNotifsByTime } from "../../../utils/sortByTime.js";

const NotifBell = () => {
	const [notifications, setNotifications] = useState([]);
	const [loading, setLoading] = useState(true);
	const [unread, setUnread] = useState();

	const getNotifs = async () => {
		try {
			setLoading(true);
			const response = await getNotifications();
			const sortedByTime = await sortNotifsByTime(response);
			const unreadCount = response.filter(
				(notification) => notification.unread
			).length;
			setUnread(unreadCount);
			setNotifications(sortedByTime);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const interval = setInterval(() => {
			getNotifs();
		}, 5500);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="notif-container dropdown">
			<div
				className="notif-bell"
				role="button"
				aria-hidden="true"
				data-bs-toggle="dropdown"
				aria-haspopup="true"
				aria-expanded="false"
			>
				<svg viewBox="0 0 24 24" height="40">
					<g>
						<path
							d="M11.996 2c-4.062 0-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958C19.48 5.017 16.054 2 11.996 2zM9.171 18h5.658c-.412 1.165-1.523 2-2.829 2s-2.417-.835-2.829-2z"
							fill="#FFFFFF"
						></path>
					</g>
				</svg>
				<div>
					{unread > 0 && (
						<div className="unread-circle">
							<span>{unread}</span>
						</div>
					)}
				</div>
			</div>
			<ul className="dropdown-menu dropdown-menu-end notif-dropdown">
				{/* {loading ? (
					<div className="notif-container">
						<div className="spinner-border my-5" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
					</div>
				) : ( */}
				{notifications.map((notification) => {
					return (
						<li key={notification._id}>
							<Notification notification={notification} getNotifs={getNotifs} />
						</li>
					);
				})}
				{/* )} */}
			</ul>
		</div>
	);
};

export default NotifBell;
