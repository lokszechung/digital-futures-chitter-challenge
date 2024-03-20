import * as chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";
import supertest from "supertest";

import server from "../index.js";
import User from "../models/user.model.js";
import testUsersArray from "./data/testUsersArray.js";

chai.use(chaiHttp);

const request = supertest(server);

describe("Integration Tests on requests to the /user route", () => {
	const testRouteBase = "/user";

	beforeEach(async () => {
		try {
			await User.deleteMany();
			await User.insertMany(testUsersArray);
		} catch (error) {
			console.log(error);
		}
	});

	describe("POST requests to /user/register", () => {
		it("Should add a properly formatted user to the database", async () => {
			const testUser = {
				firstname: "Bobert",
				lastname: "Bobson",
				username: "bobertbobson",
				email: "bbobson@hotmail.com",
				password: "password123",
				passwordConfirmation: "password123",
			};

			const response = await request
				.post(`${testRouteBase}/register`)
				.send(testUser);

			expect(response).to.have.status(201);
			expect(response.body).to.have.property("_id");
			expect(response.body.firstname).to.eql(testUser.firstname);
			expect(response.body.username).to.eql(testUser.username);
		});

		it("Should not allow registration when email is duplicated", async () => {
			const testUser = {
				firstname: "Bobert",
				lastname: "Bobson",
				username: "bobertbobson",
				email: "testemail@test.com",
				password: "password123",
				passwordConfirmation: "password123",
			};

			const response = await request
				.post(`${testRouteBase}/register`)
				.send(testUser);

			expect(response).to.have.status(400);
			expect(response.text).to.eql(
				`{"message":"This email is already in use"}`
			);
		});

		it("Should not allow registration when username is duplicated", async () => {
			const testUser = {
				firstname: "Bobert",
				lastname: "Bobson",
				username: "testusername",
				email: "bbobson@hotmail.com",
				password: "password123",
				passwordConfirmation: "password123",
			};

			const response = await request
				.post(`${testRouteBase}/register`)
				.send(testUser);

			expect(response).to.have.status(400);
			expect(response.text).to.eql(
				`{"message":"This username is already in use"}`
			);
		});

		it("Should not allow registration when passwords do not match", async () => {
			const testUser = {
				firstname: "Bobert",
				lastname: "Bobson",
				username: "loksze",
				email: "bbobson@hotmail.com",
				password: "password123",
				passwordConfirmation: "4321secret",
			};

			const response = await request
				.post(`${testRouteBase}/register`)
				.send(testUser);

			expect(response).to.have.status(422);
			expect(response.text).to.eql(
				`{"message":"User validation failed: passwordConfirmation: Passwords do not match"}`
			);
		});
	});

	describe("POST requests to /user/login", () => {
		it("Should return a token when a user logs in with username", async () => {
			const testLogin = {
				usernameOrEmail: "testusername",
				password: "123",
			};

			const response = await request
				.post(`${testRouteBase}/login`)
				.send(testLogin);

			expect(response).to.have.status(200);
			expect(response.body).to.have.property("token").not.null;
		});

		it("Should return a token when a user logs in with username", async () => {
			const testLogin = {
				usernameOrEmail: "testemail@test.com",
				password: "123",
			};

			const response = await request
				.post(`${testRouteBase}/login`)
				.send(testLogin);

			expect(response).to.have.status(200);
			expect(response.body).to.have.property("token").not.null;
		});

		it("Should return an error message when a user logs in with incorrect usernameOrEmail", async () => {
			const testLogin = {
				usernameOrEmail: "noone",
				password: "123",
			};

			const response = await request
				.post(`${testRouteBase}/login`)
				.send(testLogin);

			expect(response).to.have.status(401);
			expect(response.text).to.eql(`{"message":"Invalid email or password"}`);
		});

		it("Should return an error message when a user logs in with incorrect password", async () => {
			const testLogin = {
				usernameOrEmail: "testemail@test.com",
				password: "wrong",
			};

			const response = await request
				.post(`${testRouteBase}/login`)
				.send(testLogin);

			expect(response).to.have.status(401);
			expect(response.text).to.eql(`{"message":"Invalid email or password"}`);
		});
	});

	describe("GET requests to /user/:id", () => {
		it("Should return a user when a valid id is provided", async () => {
			const testUser = testUsersArray[0];

			const response = await request.get(`${testRouteBase}/${testUser._id}`);

			expect(response).to.have.status(200);
			expect(response.body).to.have.property("_id").eql(testUser._id);
			expect(response.body)
				.to.have.property("firstname")
				.eql(testUser.firstname);
			expect(response.body).to.have.property("lastname").eql(testUser.lastname);
			expect(response.body).to.have.property("username").eql(testUser.username);
		});

		it("Should return status 404 when an invalid id is provided", async () => {
			const testId = "noSuchId";

			const response = await request.get(`${testRouteBase}/${testId}`);

			expect(response).to.have.status(404);
			expect(response.text).to.eql(`{"message":"User not found"}`);
		});
	});
});
