import { render, screen, waitFor } from "@testing-library/react";
import SinglePeep from "../../src/components/SinglePeep/SinglePeep";
import testPeepsArray from "../data/testPeepsArray";
import { MemoryRouter } from "react-router-dom";
import { isAuthenticated, getPayload } from "../../src/utils/auth.js";
import userEvent from "@testing-library/user-event";

describe("Single Peeps tests", () => {
	vi.mock("../../src/utils/auth.js");
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

	it("Should be able to see edit and delete options if logged in", async () => {
		const testPeep = testPeepsArray[0];

		isAuthenticated.mockReturnValue(true);
		getPayload.mockReturnValue({ sub: testPeep.author._id });

		render(
			<MemoryRouter>
				<SinglePeep peep={testPeep} />
			</MemoryRouter>
		);

		expect(screen.getByText("Edit Peep")).toBeInTheDocument();
		expect(screen.getByText("Delete Peep")).toBeInTheDocument();
	});

	it("Should show Peep Edit component when Edit Peep is clicked", async () => {
		const testPeep = testPeepsArray[0];

		isAuthenticated.mockReturnValue(true);
		getPayload.mockReturnValue({ sub: testPeep.author._id });

		render(
			<MemoryRouter>
				<SinglePeep peep={testPeep} />
			</MemoryRouter>
		);

		expect(screen.queryByTestId("edit-peep")).not.toBeInTheDocument();

		await userEvent.click(screen.getByText("Edit Peep"));
		expect(screen.getByTestId("edit-peep")).toBeInTheDocument();
	});
});
