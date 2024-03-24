import { render, screen, waitFor, act } from "@testing-library/react";

import { setToken, isAuthenticated } from "../../src/utils/auth.js";
import userEvent from "@testing-library/user-event";

import Navbar from "../../src/components/Navbar/Navbar";

describe("Navbar tests", () => {
	it("Not Logged in user should see button to log in", async () => {
		render(
			<Navbar authenticated={false} setAuthenticated={vi.fn()} name={{}} />
		);

		expect(screen.getByTestId("sign-in-button")).toBeInTheDocument();
	});

	it("Logged in user should see their Avatar with log out button", async () => {
		const testName = {
			sub: "6600268fc250b55c639dbf7d",
			firstname: "Test",
			lastname: "User",
		};

		render(
			<Navbar authenticated={true} setAuthenticated={vi.fn()} name={testName} />
		);

		expect(screen.getByText("TU")).toBeInTheDocument();
		expect(screen.getByText("Log out")).toBeInTheDocument();
	});

	it("Should see Log In button after logging out", async () => {
		const testName = {
			sub: "6600268fc250b55c639dbf7d",
			firstname: "Test",
			lastname: "User",
		};

		let auth = true;
		const setAuthenticated = () => {
			auth = false;
		};

		const { rerender } = render(
			<Navbar
				authenticated={auth}
				setAuthenticated={setAuthenticated}
				name={testName}
			/>
		);

		await userEvent.click(screen.getByText("Log out"));

		rerender(
			<Navbar
				authenticated={auth}
				setAuthenticated={setAuthenticated}
				name={testName}
			/>
		);

		expect(screen.getByTestId("sign-in-button")).toBeInTheDocument();
	});
});
