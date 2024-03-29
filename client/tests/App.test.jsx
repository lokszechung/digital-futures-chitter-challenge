import { render, screen, waitFor } from "@testing-library/react";
import App from "../src/App";
import { getAllPeeps, getUser } from "../src/utils/services.js";
import { isAuthenticated, getPayload } from "../src/utils/auth.js";
import { MemoryRouter } from "react-router-dom";
import testPeepsArray from "./data/testPeepsArray";

describe("App tests", () => {
	vi.mock("../src/utils/services.js");
	vi.mock("../src/utils/auth.js");
	it("App component should show Chitter name", () => {
		render(
			<MemoryRouter>
				<App />
			</MemoryRouter>
		);

		expect(screen.getByText("Chitter")).toBeInTheDocument();
	});

	it("Peeps should be displayed when not logged in", async () => {
		isAuthenticated.mockReturnValue(false);
		getPayload.mockResolvedValue({
			sub: "6600268fc250b55c639dbf7d",
			firstname: "Fake",
			lastname: "User",
		});
		getAllPeeps.mockResolvedValue(testPeepsArray);
		isAuthenticated.mockReturnValue(false);

		render(
			<MemoryRouter>
				<App />
			</MemoryRouter>
		);

		await waitFor(() => {
			expect(screen.getAllByTestId("single-peep").length).toBe(
				testPeepsArray.length
			);
		});
	});

	it("Peeps should be displayed when logged in", async () => {
		isAuthenticated.mockReturnValue(true);
		getAllPeeps.mockResolvedValue(testPeepsArray);
		isAuthenticated.mockReturnValue(false);

		render(
			<MemoryRouter>
				<App />
			</MemoryRouter>
		);

		await waitFor(() => {
			expect(screen.getAllByTestId("single-peep").length).toBe(
				testPeepsArray.length
			);
		});
	});

	it("Should see prompt to log in to post when not logged in", async () => {
		isAuthenticated.mockReturnValue(false);

		render(
			<MemoryRouter>
				<App />
			</MemoryRouter>
		);

		await waitFor(() => {
			expect(screen.getByText("Log in to post a Peep!")).toBeInTheDocument();
		});
	});

	it("Should see input box for posting Peep when logged in", async () => {
		getPayload.mockResolvedValue({
			sub: "6600268fc250b55c639dbf7d",
			firstname: "Fake",
			lastname: "User",
		});

		isAuthenticated.mockReturnValue(true);

		render(
			<MemoryRouter>
				<App />
			</MemoryRouter>
		);

		await waitFor(() => {
			expect(screen.getByRole("textbox")).toBeInTheDocument();
			expect(
				screen.getByPlaceholderText("Share a Peep...")
			).toBeInTheDocument();
		});
	});
});
