import { render, screen, waitFor } from "@testing-library/react";
import ReplyPeep from "../../src/components/ReplyPeep/ReplyPeep";
import userEvent from "@testing-library/user-event";
import { replyPeep } from "../../src/utils/services";

describe("ReplyPeep tests", () => {
	vi.mock("../../src/utils/services.js");

	it("Should be able to reply to a Peep when logged in", async () => {
		const testName = {
			sub: "6600268fc250b55c639dbf7d",
			firstname: "Test",
			lastname: "User",
		};

		replyPeep.mockResolvedValue({});

		render(<ReplyPeep id="id" name={testName} getPeep={vi.fn()} />);

		await userEvent.type(screen.getByRole("textbox"), "This is a reply");
		await userEvent.click(screen.getByRole("button"));

		await waitFor(() => {
			expect(replyPeep).toBeCalledTimes(1);
		});
	});
});
