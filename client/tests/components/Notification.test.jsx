import { render, screen, waitFor, act } from "@testing-library/react";
import Notification from "../../src/components/Notification/Notification";
import testNotificationsArray from "../data/testNotificationsArray.js";
import { updateNotification } from "../../src/utils/services.js";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

describe("Notification tests", () => {
	vi.mock("../../src/utils/services.js");

	it("Should call updateNotifcation when notification is clicked", async () => {
		const testNotification = testNotificationsArray[0];
		updateNotification.mockResolvedValue();

		render(
			<MemoryRouter>
				<Notification notification={testNotification} getNotifs={vi.fn()} />
			</MemoryRouter>
		);

		act(() => {
			userEvent.click(screen.getByTestId("single-notification"));
		});

		await waitFor(() => {
			expect(updateNotification).toBeCalled();
		});
	});
});
