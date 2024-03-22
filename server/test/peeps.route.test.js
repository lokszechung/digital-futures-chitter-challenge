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

chai.use(chaiHttp);

const request = supertest(server);

config({ path: `.env.${process.env.NODE_ENV}` });

describe("Integration Tests on requests to the /peep route", () => {
	const testRouteBase = "/api/peep";

	let findByIdStub;

	beforeEach(async () => {
		try {
			await Peep.deleteMany();
			await Peep.insertMany(testPeepsArray);
		} catch (error) {
			console.log(error);
		}

		findByIdStub = sinon.stub(User, "findById");
	});

	afterEach(function () {
		findByIdStub.restore();
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
});
