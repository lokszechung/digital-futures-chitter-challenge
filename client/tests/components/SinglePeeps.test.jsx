import { render, screen, waitFor } from "@testing-library/react";
import SinglePeep from "../../src/components/SinglePeep/SinglePeep";
import { getUser } from "../../src/utils/services.js";
import testPeepsArray from "../data/testPeepsArray";
import { MemoryRouter } from "react-router-dom";

describe("Single Peeps tests", () => {
	vi.mock("../../src/utils/services.js");
	it("Peep should display author's name and handle", async () => {
		const testPeep = testPeepsArray[0];

		render(
			<MemoryRouter>
				<SinglePeep peep={testPeep} />
			</MemoryRouter>
		);

		await waitFor(() => {
			expect(
				screen.getByText(
					`${testPeep.author.firstname} ${testPeep.author.lastname}`
				)
			).toBeInTheDocument();
			expect(
				screen.getByText(`@${testPeep.author.username}`)
			).toBeInTheDocument();
		});
	});
});
