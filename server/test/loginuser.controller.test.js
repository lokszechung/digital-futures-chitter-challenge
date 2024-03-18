import { expect } from "chai";
import sinon from "sinon";

import { loginUser } from "../controllers/usersControllers/loginUser.controller.js";
import { loginUserService } from "../services/usersServices/loginUser.service.js";

describe("loginUser controller test", () => {
	let req, res, loginUserServiceStub, jsonSpy, statusSpy;

	beforeEach(function () {
		req = {};
		res = {
			status: () => res,
			json: () => res,
		};

		jsonSpy = sinon.spy(res, "json");

		statusSpy = sinon.spy(res, "status");

		loginUserServiceStub = sinon.stub(loginUserService, "loginUser");
	});

	afterEach(function () {
		loginUserServiceStub.restore();
		jsonSpy.restore();
		statusSpy.restore();
	});

	it("Should call loginUserService", async () => {
		loginUserServiceStub.returns(Promise.resolve([]));

		await loginUser(req, res);

		expect(loginUserServiceStub.calledOnce).to.be.true;
	});

	it("Should call res.json and res.status with the result of loginUserService call", async () => {
		const testUser = [
			{
				username: "test",
			},
		];

		const testToken = "testToken";

		loginUserServiceStub.returns(
			Promise.resolve({ user: testUser, token: testToken })
		);

		await loginUser(req, res);

		// console.log(jsonSpy)

		expect(jsonSpy.calledOnceWith({ user: testUser, token: testToken })).to.be
			.true;
		expect(statusSpy.calledOnceWith(200)).to.be.true;
	});
});
