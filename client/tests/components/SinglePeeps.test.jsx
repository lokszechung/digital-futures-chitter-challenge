import { render, screen, waitFor } from "@testing-library/react";
import SinglePeep from "../../src/components/SinglePeep/SinglePeep";
import { getUser } from "../../src/utils/services.js";
import testPeepsArray from "../data/testPeepsArray";

describe("Single Peeps tests", () => {
	vi.mock("../../src/utils/services.js");
	it("Peep should display author's name and handle", async () => {
		const testPeep = testPeepsArray[0];
		getUser.mockResolvedValue({
			firstname: "Fake",
			lastname: "User",
			username: "fakeuser",
		});

		render(<SinglePeep peep={testPeep} />);

		await waitFor(() => {
			expect(screen.getByText("Fake User")).toBeInTheDocument();
			expect(screen.getByText("@fakeuser")).toBeInTheDocument();
		});
	});
});
