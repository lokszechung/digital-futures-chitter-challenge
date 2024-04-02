import { render, screen, waitFor } from "@testing-library/react";
import NotifBell from "../../src/components/Navbar/NotifBell/NotifBell";
import testNotificationsArray from "../data/testNotificationsArray.js";
import { getNotifications } from "../../src/utils/services";
import { MemoryRouter } from "react-router-dom";

describe("NotifBell tests", () => {
	vi.mock("../../src/utils/services.js");
	globalThis.setInterval = vi.fn();

	it("Should show the number of notifications", async () => {
		const notifications = testNotificationsArray.filter(
			(notification) => notification.recipient === "65f32bbbce14d71c5a38f1b5"
		);
		const unreadNotifications = notifications.filter(
			(notification) => notification.unread
		);

		getNotifications.mockResolvedValue(notifications);

		render(
			<MemoryRouter>
				<NotifBell />
			</MemoryRouter>
		);

		await waitFor(() => {
			expect(screen.getByTestId("unread-circle")).toBeInTheDocument();
			expect(screen.getByText(unreadNotifications.length)).toBeInTheDocument();
		});
	});

	it("Should display all notifications", async () => {
		const notifications = testNotificationsArray.filter(
			(notification) => notification.recipient === "65f32bbbce14d71c5a38f1b5"
		);

		getNotifications.mockResolvedValue(notifications);

		render(
			<MemoryRouter>
				<NotifBell />
			</MemoryRouter>
		);

		await waitFor(() => {
			expect(screen.getAllByTestId("single-notification").length).toBe(
				notifications.length
			);
		});
	});
});
