import { expect } from "chai";
import sinon from "sinon";

import { registerUser } from "../controllers/usersControllers/registerUser.controller.js";
import { registerUserService } from "../services/usersServices/registerUser.service.js";

describe("registerUser controller test", () => {
	let req, res, registerUserServiceStub, jsonSpy, statusSpy;

	beforeEach(function () {
		req = {};
		res = {
			status: () => res,
			json: () => res,
		};

		jsonSpy = sinon.spy(res, "json");

		statusSpy = sinon.spy(res, "status");

		registerUserServiceStub = sinon.stub(registerUserService, "registerUser");
	});

	afterEach(function () {
		registerUserServiceStub.restore();
		jsonSpy.restore();
		statusSpy.restore();
	});

	it("Should call registerUserService", async () => {
		registerUserServiceStub.returns(Promise.resolve([]));

		await registerUser(req, res);

		expect(registerUserServiceStub.calledOnce).to.be.true;
	});

	it("Should call res.json and res.status with the result of registerUserService call", async () => {
		const testUser = [
			{
				id: 1,
				username: "test",
			},
		];

		registerUserServiceStub.returns(Promise.resolve(testUser));

		await registerUser(req, res);

		expect(jsonSpy.calledOnceWith(testUser)).to.be.true;
		expect(statusSpy.calledOnceWith(201)).to.be.true;
	});
});
