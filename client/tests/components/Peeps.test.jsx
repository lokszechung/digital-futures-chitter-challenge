import { render, screen, waitFor } from "@testing-library/react";
import Peeps from "../../src/components/Peeps/Peeps";
import App from "../../src/App.jsx";
import testPeepsArray from "../data/testPeepsArray";
import { getAllPeeps, getUser } from "../../src/utils/services.js";
import { isAuthenticated } from "../../src/utils/auth.js";

describe("Peeps tests", () => {
	vi.mock("../../src/utils/services.js");

	it("Peeps should be displayed in reverse chronological order", async () => {
		getAllPeeps.mockResolvedValue(testPeepsArray);
		getUser.mockResolvedValue({
			firstname: "Fake",
			lastname: "User",
			username: "fakeuser",
		});

		render(<Peeps name={{}} />);

		let peeps;

		await waitFor(() => {
			peeps = screen.getAllByTestId("single-peep");
		});

		const timestamps = peeps.map((peep) =>
			new Date(peep.dataset.timestamp).getTime()
		);

		for (let i = 1; i < timestamps.length; i++) {
			const currentTimestamp = timestamps[i];
			const previousTimestamp = timestamps[i - 1];

			expect(currentTimestamp).toBeLessThanOrEqual(previousTimestamp);
		}
	});
});
