import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PeepEdit from "../../src/components/PeepEdit/PeepEdit";
import { updatePeep } from "../../src/utils/services";

describe("PeepEdit tests", () => {
	vi.mock("../../src/utils/services.js");

	it("Should be able to edit a Peep if logged in", async () => {
		const testPeep = {
			_id: "65f6e53fc17272b3f094f32e",
			content: "first test peep",
			author: {
				_id: "65f264265fcbbabe667acb37",
				firstname: "Testname",
				lastname: "Testsurname",
				username: "testusername",
				email: "testemail@test.com",
				createdAt: "2024-03-14T16:56:27.545+00:00",
				updatedAt: "2024-03-14T16:56:27.545+00:00",
			},
			replies: [],
			edited: false,
			createdAt: "2024-03-17T12:42:39.055Z",
			updatedAt: "2024-03-17T12:42:39.055Z",
		};

		const replyContent = "This is an update";

		const { rerender } = render(
			<PeepEdit peep={testPeep} getPeeps={vi.fn()} setEditing={vi.fn()} />
		);

		updatePeep.mockResolvedValue();

		await userEvent.type(screen.getByRole("textbox"), replyContent);
		await userEvent.click(screen.getByText("Save"));

		expect(updatePeep).toHaveBeenCalledTimes(1);
	});
});
