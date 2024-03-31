import * as chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";
import supertest from "supertest";
import sinon from "sinon";

import jwt from "jsonwebtoken";

import { config } from "dotenv";

import server from "../index.js";
import Peep from "../models/peep.model.js";
import User from "../models/user.model.js";
import testPeepsArray from "./data/testPeepsArray.js";
import sendEmail from "../utils/sendEmail.js";

chai.use(chaiHttp);

const request = supertest(server);

config({ path: `.env.${process.env.NODE_ENV}` });

describe("Integration Tests on requests to the /peep route", () => {
	const testRouteBase = "/api/peep";

	let findByIdStub, sendEmailStub;

	beforeEach(async () => {
		try {
			await Peep.deleteMany();
			await Peep.insertMany(testPeepsArray);
		} catch (error) {
			console.log(error);
		}

		findByIdStub = sinon.stub(User, "findById");
		sendEmailStub = sinon.stub(sendEmail, "send");
	});

	afterEach(function () {
		findByIdStub.restore();
		sendEmailStub.restore();
	});

	describe("POST requests to /api/peep", () => {
		it("Should add a properly formatted peep to the database", async () => {
			const testId = "5f7d182b0621f63b943bfa3f";
			const testUsername = "testusername";
			const payload = {
				sub: testId,
				username: testUsername,
			};

			const token = jwt.sign(payload, process.env.SECRET, {
				expiresIn: "7 days",
			});

			findByIdStub.returns(
				Promise.resolve({ _id: testId, username: testUsername })
			);

			const testPeep = {
				content: "This is a test peep",
			};

			const response = await request
				.post(`${testRouteBase}`)
				.set("Authorization", `Bearer ${token}`)
				.send(testPeep);

			expect(response).to.have.status(201);
			expect(response.body.content).to.eql(testPeep.content);
			expect(response.body).to.have.property("author").to.eql(testId);
		});

		it("Should not allow a peep to be added without a valid token", async () => {
			const testPeep = {
				content: "This is a test peep",
			};

			const response = await request.post(`${testRouteBase}`).send(testPeep);

			expect(response).to.have.status(401);
			expect(response.text).to.eql(`{"message":"Missing headers"}`);
		});

		it("Should not allow a peep to be added with empty content field", async () => {
			const testId = "5f7d182b0621f63b943bfa3f";
			const testUsername = "testusername";
			const payload = {
				sub: testId,
				username: testUsername,
			};

			const token = jwt.sign(payload, process.env.SECRET, {
				expiresIn: "7 days",
			});

			findByIdStub.returns(
				Promise.resolve({ _id: testId, username: testUsername })
			);

			const testPeep = { content: "" };

			const response = await request
				.post(`${testRouteBase}`)
				.set("Authorization", `Bearer ${token}`)
				.send(testPeep);

			expect(response).to.have.status(422);
			expect(response.text).to.eql(
				`{"message":"Peep content cannot be empty"}`
			);
		});
	});

	describe("GET requests to /api/peep", () => {
		it("Should return all peeps in the database", async () => {
			const response = await request.get(`${testRouteBase}`);

			expect(response).to.have.status(200);
			expect(response.body).to.be.an("array");
			expect(response.body.length).to.eql(testPeepsArray.length);
		});
	});

	describe("PUT requests to /api/peep/:id", () => {
		it("Should update a peep in the database", async () => {
			const testUserId = testPeepsArray[0].author;
			const payload = {
				sub: testUserId,
			};
			const testPeepId = testPeepsArray[0]._id;

			const token = jwt.sign(payload, process.env.SECRET, {
				expiresIn: "7 days",
			});

			findByIdStub.returns(Promise.resolve({ _id: testUserId }));

			const updateContent = { content: "I am an updated peep" };

			const response = await request
				.put(`${testRouteBase}/${testPeepId}`)
				.set("Authorization", `Bearer ${token}`)
				.send(updateContent);

			expect(response).to.have.status(200);
			expect(response.body.content).to.eql(updateContent.content);
			expect(response.body).to.have.property("edited").to.eql(true);
		});

		it("Should return status 404 when an invalid id is provided", async () => {
			const testUserId = testPeepsArray[0].author;
			const payload = {
				sub: testUserId,
			};

			const token = jwt.sign(payload, process.env.SECRET, {
				expiresIn: "7 days",
			});

			findByIdStub.returns(Promise.resolve({ _id: testUserId }));

			const updateContent = { content: "I am an updated peep" };

			const response = await request
				.put(`${testRouteBase}/no_id`)
				.set("Authorization", `Bearer ${token}`)
				.send(updateContent);

			expect(response).to.have.status(404);
			expect(response.text).to.eql(`{"message":"Peep not found"}`);
		});

		it("Should return status 401 when not owner of Peep", async () => {
			const testUserId = testPeepsArray[0].author;
			const payload = {
				sub: testUserId,
			};

			const anotherPeepId = testPeepsArray[3]._id;

			const token = jwt.sign(payload, process.env.SECRET, {
				expiresIn: "7 days",
			});

			findByIdStub.returns(Promise.resolve({ _id: testUserId }));

			const updateContent = { content: "I am an updated peep" };

			const response = await request
				.put(`${testRouteBase}/${anotherPeepId}`)
				.set("Authorization", `Bearer ${token}`)
				.send(updateContent);

			expect(response).to.have.status(401);
			expect(response.text).to.eql(`{"message":"Not Peep author"}`);
		});
	});

	describe("DELETE request to /api/peep/:id", () => {
		it("Should delete a peep from the database", async () => {
			const testUserId = testPeepsArray[0].author;
			const payload = {
				sub: testUserId,
			};

			const testPeepId = testPeepsArray[0]._id;

			const token = jwt.sign(payload, process.env.SECRET, {
				expiresIn: "7 days",
			});

			findByIdStub.returns(Promise.resolve({ _id: testUserId }));

			const response = await request
				.delete(`${testRouteBase}/${testPeepId}`)
				.set("Authorization", `Bearer ${token}`);

			expect(response).to.have.status(204);

			const peepsResponse = await request.get(`${testRouteBase}`);

			expect(peepsResponse.body.length).to.eql(testPeepsArray.length - 1);
		});

		it("Should return status 404 when an invalid id is provided", async () => {
			const testUserId = testPeepsArray[0].author;
			const payload = {
				sub: testUserId,
			};

			const testPeepId = "fake_id";

			const token = jwt.sign(payload, process.env.SECRET, {
				expiresIn: "7 days",
			});

			findByIdStub.returns(Promise.resolve({ _id: testUserId }));

			const response = await request
				.delete(`${testRouteBase}/${testPeepId}`)
				.set("Authorization", `Bearer ${token}`);

			expect(response).to.have.status(404);
			expect(response.text).to.eql(`{"message":"Peep not found"}`);
		});

		it("Should return status 401 when not owner of Peep", async () => {
			const testUserId = testPeepsArray[0].author;
			const payload = {
				sub: testUserId,
			};

			const testPeepId = testPeepsArray[3]._id;

			const token = jwt.sign(payload, process.env.SECRET, {
				expiresIn: "7 days",
			});

			findByIdStub.returns(Promise.resolve({ _id: testUserId }));

			const response = await request
				.delete(`${testRouteBase}/${testPeepId}`)
				.set("Authorization", `Bearer ${token}`);

			expect(response).to.have.status(401);
			expect(response.text).to.eql(`{"message":"Not Peep author"}`);
		});
	});

	describe("POST requests to /api/peep/:id", () => {
		it("Should add a reply to Peep replies array", async () => {
			const testUserId = testPeepsArray[0].author;
			const payload = {
				sub: testUserId,
			};

			const testPeepId = testPeepsArray[3]._id;

			const token = jwt.sign(payload, process.env.SECRET, {
				expiresIn: "7 days",
			});

			findByIdStub.returns(Promise.resolve({ _id: testUserId }));
			sendEmailStub.returns(Promise.resolve({}));

			const testReply = {
				content: "This is a test reply",
			};

			const response = await request
				.post(`${testRouteBase}/reply/${testPeepId}`)
				.set("Authorization", `Bearer ${token}`)
				.send(testReply);

			expect(response).to.have.status(200);
			expect(response.body.peep.replies).to.be.an("array");
			expect(response.body.peep.replies.length).to.eql(1);
			expect(response.body.peep.replies[0].content).to.eql(testReply.content);
		});

		it("Should return status 404 when an invalid id is provided", async () => {
			const testUserId = testPeepsArray[0].author;
			const payload = {
				sub: testUserId,
			};

			const testPeepId = "fake_id";

			const token = jwt.sign(payload, process.env.SECRET, {
				expiresIn: "7 days",
			});

			findByIdStub.returns(Promise.resolve({ _id: testUserId }));

			const testReply = {
				content: "This is a test reply",
			};

			const response = await request
				.post(`${testRouteBase}/reply/${testPeepId}`)
				.set("Authorization", `Bearer ${token}`)
				.send(testReply);

			expect(response).to.have.status(404);
			expect(response.text).to.eql(`{"message":"Peep not found"}`);
		});

		it("Should create a new notification when a reply is added", async () => {
			const testUserId = testPeepsArray[0].author;
			const payload = {
				sub: testUserId,
			};

			const testPeepId = testPeepsArray[3]._id;

			const token = jwt.sign(payload, process.env.SECRET, {
				expiresIn: "7 days",
			});

			findByIdStub.returns(Promise.resolve({ _id: testUserId }));

			const testReply = {
				content: "This is a test reply",
			};

			const response = await request
				.post(`${testRouteBase}/reply/${testPeepId}`)
				.set("Authorization", `Bearer ${token}`)
				.send(testReply);

			expect(response).to.have.status(200);
			expect(response.body.notification).to.be.an("object");
			expect(response.body.notification).to.have.property("content");
		});

		it("Should not create a notification if author replies on their own Peep", async () => {
			const testUserId = testPeepsArray[0].author;
			const payload = {
				sub: testUserId,
			};

			const testPeepId = testPeepsArray[0]._id;

			const token = jwt.sign(payload, process.env.SECRET, {
				expiresIn: "7 days",
			});

			findByIdStub.returns(Promise.resolve({ _id: testUserId }));

			const testReply = {
				content: "This is a test reply",
			};

			const response = await request
				.post(`${testRouteBase}/reply/${testPeepId}`)
				.set("Authorization", `Bearer ${token}`)
				.send(testReply);

			expect(response).to.have.status(200);
			expect(response.body).to.not.have.property("notification");
		});
	});
});
