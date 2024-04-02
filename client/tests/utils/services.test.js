import axios from "axios";
import {
	getAllPeeps,
	postPeep,
	logIn,
	signUp,
	getUser,
	deletePeep,
	updatePeep,
	getSinglePeep,
	replyPeep,
	getNotifications,
	updateNotification,
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

	it("deletePeep should delete a peep", async () => {
		const testId = "6600268fc250b55c639dbf7d";
		vi.spyOn(axios, "delete").mockResolvedValue({});

		await deletePeep(testId);

		expect(axios.delete).toHaveBeenCalledWith(
			"http://localhost:4000/api/peep/6600268fc250b55c639dbf7d",
			{
				headers: {
					Authorization: "Bearer null",
				},
			}
		);
	});

	it("updatePeep should edit a peep", async () => {
		const testId = "6600268fc250b55c639dbf7d";
		vi.spyOn(axios, "put").mockResolvedValue({});

		const testContent = "A peep updated";

		await updatePeep(testId, testContent);

		expect(axios.put).toHaveBeenCalledWith(
			"http://localhost:4000/api/peep/6600268fc250b55c639dbf7d",
			{ content: testContent },
			{
				headers: {
					Authorization: "Bearer null",
				},
			}
		);
	});

	it("getSinglePeeps should return a Peep", async () => {
		vi.spyOn(axios, "get").mockResolvedValue({ data: testPeepsArray[0] });

		const testId = "anyID";

		const response = await getSinglePeep(testId);

		expect(axios.get).toHaveBeenCalledWith(
			`http://localhost:4000/api/peep/${testId}`
		);
		expect(response).toEqual(testPeepsArray[0]);
	});

	it("replyPeep should reply to a Peep", async () => {
		const testId = "6600268fc250b55c639dbf7d";
		const testContent = "A peep reply";

		vi.spyOn(axios, "post").mockResolvedValue({});

		await replyPeep(testId, testContent);

		expect(axios.post).toHaveBeenCalledWith(
			`http://localhost:4000/api/peep/reply/${testId}`,
			{ content: testContent },
			{
				headers: {
					Authorization: "Bearer null",
				},
			}
		);
	});

	it("getNotifications should return notifications", async () => {
		vi.spyOn(axios, "get").mockResolvedValue({ data: [] });

		await getNotifications();

		expect(axios.get).toHaveBeenCalledWith(
			"http://localhost:4000/api/notification",
			{
				headers: {
					Authorization: "Bearer null",
				},
			}
		);
	});

	it("updateNotification should update a notification", async () => {
		const testId = "6600268fc250b55c639dbf7d";
		vi.spyOn(axios, "put").mockResolvedValue({});
		await updateNotification(testId);
		expect(axios.put).toHaveBeenCalledWith(
			`http://localhost:4000/api/notification/${testId}`,
			{ unread: false },
			{
				headers: {
					Authorization: "Bearer null",
				},
			}
		);
	});
});
