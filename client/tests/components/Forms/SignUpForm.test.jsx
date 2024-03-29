import { render, screen, waitFor } from "@testing-library/react";
import { signUp, getUser } from "../../../src/utils/services.js";
import Navbar from "../../../src/components/Navbar/Navbar.jsx";
import userEvent from "@testing-library/user-event";
import { setToken, isAuthenticated } from "../../../src/utils/auth.js";

describe("Sign up tests", () => {
	vi.mock("../../../src/utils/services.js");
	vi.mock("../../../src/utils/auth.js");

	it("User should be able to submit a sign up form and be logged in automatically", async () => {
		const testUser = {
			sub: "6600268fc250b55c639dbf7d",
			firstname: "Fake",
			lastname: "User",
		};
		const testToken = "fakeToken";

		signUp.mockResolvedValue({ user: {}, token: testToken });

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

		expect(screen.getByTestId("sign-in-button")).toBeInTheDocument();

		await userEvent.click(screen.getByTestId("sign-in-button"));

		await userEvent.click(screen.getByTestId("sign-up-tab"));

		await userEvent.type(screen.getByPlaceholderText("First name"), "Fake");
		await userEvent.type(screen.getByPlaceholderText("Surname"), "User");
		await userEvent.type(screen.getByPlaceholderText("Username"), "fakeuser");
		await userEvent.type(
			screen.getByPlaceholderText("Email"),
			"fakeuser@email.com"
		);
		await userEvent.type(screen.getByTestId("sign-up-password"), "password");
		await userEvent.type(
			screen.getByPlaceholderText("Confirm Password"),
			"password"
		);

		await userEvent.click(screen.getByTestId("sign-up-submit"));

		await waitFor(() => {
			rerender(
				<Navbar
					authenticated={auth}
					setAuthenticated={setAuthenticated}
					name={testUser}
				/>
			);

			expect(screen.getByText("FU")).toBeInTheDocument();
			expect(screen.queryByTestId("sign-in-button")).not.toBeInTheDocument();
		});
	});

	it("Should return an error if username is duplicated", async () => {
		const testError = new Error();
		testError.response = {
			data: { message: "This username is already in use" },
		};

		signUp.mockRejectedValue(testError);

		setToken.mockImplementation();

		isAuthenticated.mockResolvedValue(false);

		render(
			<Navbar authenticated={false} setAuthenticated={vi.fn()} name={{}} />
		);

		await userEvent.click(screen.getByTestId("sign-in-button"));

		await userEvent.click(screen.getByTestId("sign-up-tab"));

		await userEvent.type(screen.getByPlaceholderText("First name"), "Fake");
		await userEvent.type(screen.getByPlaceholderText("Surname"), "User");
		await userEvent.type(screen.getByPlaceholderText("Username"), "fakeuser");
		await userEvent.type(
			screen.getByPlaceholderText("Email"),
			"fakeUser@email.com"
		);
		await userEvent.type(screen.getByTestId("sign-up-password"), "password");
		await userEvent.type(
			screen.getByPlaceholderText("Confirm Password"),
			"password"
		);
		await userEvent.click(screen.getByTestId("sign-up-submit"));

		await waitFor(() => {
			expect(
				screen.getByText("This username is already in use")
			).toBeInTheDocument();
		});
	});

	it("Should return an error if passwords do not match", async () => {
		const testError = new Error();
		testError.response = {
			data: { message: "Passwords do not match" },
		};

		signUp.mockRejectedValue(testError);

		setToken.mockImplementation();

		isAuthenticated.mockResolvedValue(false);

		render(
			<Navbar authenticated={false} setAuthenticated={vi.fn()} name={{}} />
		);

		await userEvent.click(screen.getByTestId("sign-in-button"));

		await userEvent.click(screen.getByTestId("sign-up-tab"));

		await userEvent.type(screen.getByPlaceholderText("First name"), "Fake");
		await userEvent.type(screen.getByPlaceholderText("Surname"), "User");
		await userEvent.type(screen.getByPlaceholderText("Username"), "fakeuser");
		await userEvent.type(
			screen.getByPlaceholderText("Email"),
			"fakeUser@email.com"
		);
		await userEvent.type(screen.getByTestId("sign-up-password"), "password");
		await userEvent.type(
			screen.getByPlaceholderText("Confirm Password"),
			"passwordg"
		);
		await userEvent.click(screen.getByTestId("sign-up-submit"));

		await waitFor(() => {
			expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
		});
	});
});
