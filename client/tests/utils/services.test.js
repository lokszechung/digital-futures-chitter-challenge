import axios from "axios";
import {
	getAllPeeps,
	postPeep,
	logIn,
	signUp,
	getUser,
} from "../../src/utils/services";
import testPeepsArray from "../data/testPeepsArray";
import testUsersArray from "../data/testUsersArray";

vi.mock("axios");

describe("Services tests", () => {
	it("getAllPeeps should return all peeps", async () => {
		vi.spyOn(axios, "get").mockResolvedValue({ data: testPeepsArray });
		const response = await getAllPeeps();
		expect(axios.get).toHaveBeenCalledWith("http://localhost:4000/api/peep");
		expect(response).toEqual(testPeepsArray);
	});

	it("postPeep should post a Peep", async () => {
		vi.spyOn(axios, "post").mockResolvedValue();
		await postPeep("A peep");
		expect(axios.post).toHaveBeenCalledWith(
			"http://localhost:4000/api/peep",
			{ content: "A peep" },
			{
				headers: {
					Authorization: "Bearer null",
				},
			}
		);
	});

	it("logIn should return a user and token", async () => {
		vi.spyOn(axios, "post").mockResolvedValue({
			data: { user: testUsersArray[0], token: "token" },
		});
		const response = await logIn({
			usernameOrEmail: "testusername",
			password: "123",
		});

		expect(axios.post).toHaveBeenCalledWith(
			"http://localhost:4000/api/user/login",
			{ usernameOrEmail: "testusername", password: "123" }
		);
		expect(response).toEqual({ user: testUsersArray[0], token: "token" });
	});

	it("signUp should return a user and token", async () => {
		const testUser = {
			firstname: "Fake",
			lastname: "User",
			username: "fakeuser",
			email: "fakeuser@email.com",
			password: "123",
			passwordConfirmation: "123",
		};

		vi.spyOn(axios, "post").mockResolvedValue({
			data: { user: testUser, token: "token" },
		});
		const response = await signUp(testUser);

		expect(axios.post).toHaveBeenCalledWith(
			"http://localhost:4000/api/user/register",
			testUser
		);
		expect(response).toEqual({ user: testUser, token: "token" });
	});

	it("getUser should return a user", async () => {
		const testId = "6600268fc250b55c639dbf7d";
		vi.spyOn(axios, "get").mockResolvedValue({ data: testUsersArray[0] });
		const response = await getUser(testId);

		expect(axios.get).toHaveBeenCalledWith(
			`http://localhost:4000/api/user/${testId}`
		);
		expect(response).toEqual(testUsersArray[0]);
	});
});
