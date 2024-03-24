import { render, screen, waitFor } from "@testing-library/react";

import { logIn } from "../../../src/utils/services.js";
import Navbar from "../../../src/components/Navbar/Navbar.jsx";
import { setToken, isAuthenticated } from "../../../src/utils/auth.js";
import userEvent from "@testing-library/user-event";

describe("Log in tests", () => {
	vi.mock("../../../src/utils/services.js");
	vi.mock("../../../src/utils/auth.js");

	it("Should log in a user", async () => {
		const testUser = {
			sub: "6600268fc250b55c639dbf7d",
			firstname: "Fake",
			lastname: "User",
		};
		const testToken = "fakeToken";

		logIn.mockResolvedValue({ user: testUser, token: testToken });
		setToken.mockImplementation();

		let auth = false;

		const setAuthenticated = () => {
			auth = true;
		};

		const { rerender } = render(
			<Navbar
				authenticated={auth}
				setAuthenticated={setAuthenticated}
				name={{}}
			/>
		);

		await userEvent.click(screen.getByTestId("sign-in-button"));

		await userEvent.click(screen.getByTestId("log-in-tab"));

		await userEvent.type(
			screen.getByPlaceholderText("Email or username"),
			"Fake"
		);
		await userEvent.type(screen.getByTestId("log-in-password"), "123");

		await userEvent.click(screen.getByTestId("log-in-submit"));

		await waitFor(() => {
			rerender(
				<Navbar
					authenticated={auth}
					setAuthenticated={setAuthenticated}
					name={testUser}
				/>
			);

			expect(screen.getByText("FU")).toBeInTheDocument();
			expect(screen.getByText("Log out")).toBeInTheDocument();
		});
	});

	it("Should display error if username or password is incorrect", async () => {
		const testError = new Error();
		testError.response = {
			data: { message: "Username or password invalid" },
		};

		logIn.mockRejectedValue(testError);

		setToken.mockImplementation();

		render(
			<Navbar authenticated={false} setAuthenticated={vi.fn()} name={{}} />
		);

		await userEvent.click(screen.getByTestId("sign-in-button"));

		await userEvent.click(screen.getByTestId("log-in-tab"));

		await userEvent.type(
			screen.getByPlaceholderText("Email or username"),
			"Fake"
		);
		await userEvent.type(screen.getByTestId("log-in-password"), "123");

		await userEvent.click(screen.getByTestId("log-in-submit"));

		await waitFor(() => {
			expect(
				screen.getByText("Username or password invalid")
			).toBeInTheDocument();
		});
	});
});
