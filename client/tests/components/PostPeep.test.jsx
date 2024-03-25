import { render, screen, waitFor, act } from "@testing-library/react";
import PostPeep from "../../src/components/PostPeep/PostPeep";
import userEvent from "@testing-library/user-event";
import { postPeep } from "../../src/utils/services";

describe("PostPeep tests", () => {
	vi.mock("../../src/utils/services.js");
	it("Should be able to post a Peep when logged in", async () => {
		const testName = {
			sub: "6600268fc250b55c639dbf7d",
			firstname: "Test",
			lastname: "User",
		};

		render(<PostPeep name={testName} getPeeps={vi.fn()} />);

		postPeep.mockResolvedValue({});

		act(() => {
			userEvent.type(screen.getByRole("textbox"), "This is a test Peep");
			userEvent.click(screen.getByRole("button"));
		});

		await waitFor(() => {
			expect(screen.getByRole("textbox")).toHaveValue("");
		});
	});

	it("Should not be able to post a Peep if content is whitespace", async () => {
		const testName = {
			sub: "6600268fc250b55c639dbf7d",
			firstname: "Test",
			lastname: "User",
		};

		render(<PostPeep name={testName} getPeeps={vi.fn()} />);

		postPeep.mockResolvedValue({});

		const peepContent = " ";

		act(() => {
			userEvent.type(screen.getByRole("textbox"), " ");
			userEvent.click(screen.getByRole("button"));
		});

		await waitFor(() => {
			expect(postPeep).not.toBeCalled();
		});
	});
});
