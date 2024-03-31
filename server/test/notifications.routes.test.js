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
import Notification from "../models/notification.model.js";
import testNotificationsArray from "./data/testNotificationsArray.js";
import sendEmail from "../utils/sendEmail.js";

chai.use(chaiHttp);

const request = supertest(server);

config({ path: `.env.${process.env.NODE_ENV}` });

describe("Integration Tests on requests to the /notifications route", () => {
	const testRouteBase = "/api/notification";

	let findByIdStub, sendEmailStub;

	beforeEach(async () => {
		try {
			await Notification.deleteMany();
			await Notification.insertMany(testNotificationsArray);
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
	describe("GET requests to /api/notification", () => {
		it("Should return all notifications for a particular user", async () => {
			const testUserId = testNotificationsArray[0].recipient;
			const payload = {
				sub: testUserId,
			};

			const token = jwt.sign(payload, process.env.SECRET, {
				expiresIn: "7 days",
			});

			findByIdStub.returns(Promise.resolve({ _id: testUserId }));

			const response = await request
				.get("/api/notification")
				.set("Authorization", `Bearer ${token}`);

			expect(response.status).to.equal(200);
			expect(response.body).to.be.an("array");
			expect(response.body.length).to.equal(2);
		});
	});
});
