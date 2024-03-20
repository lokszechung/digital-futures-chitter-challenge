import { expect } from "chai";
import sinon from "sinon";

import { getSingleUser } from "../controllers/usersControllers/getSingleUser.controller.js";
import { getSingleUserService } from "../services/usersServices/getSingleUser.service.js";

describe("getSingleUser controller test", () => {
	let req, res, getSingleUserServiceStub, jsonSpy, statusSpy;

	beforeEach(function () {
		req = {
			params: {
				id: "testId",
			},
		};
		res = {
			status: () => res,
			json: () => res,
		};

		jsonSpy = sinon.spy(res, "json");

		statusSpy = sinon.spy(res, "status");

		getSingleUserServiceStub = sinon.stub(
			getSingleUserService,
			"getSingleUser"
		);
	});

	afterEach(function () {
		getSingleUserServiceStub.restore();
		jsonSpy.restore();
		statusSpy.restore();
	});

	it("Should call getSingleUserService", async () => {
		getSingleUserServiceStub.returns(Promise.resolve([]));

		await getSingleUser(req, res);

		expect(getSingleUserServiceStub.calledOnce).to.be.true;
	});

	it("Should call res.json and res.status with the result of getSingleUserService call", async () => {
		const testUser = [
			{
				id: 1,
				username: "test",
			},
		];

		getSingleUserServiceStub.returns(Promise.resolve(testUser));

		await getSingleUser(req, res);

		expect(jsonSpy.calledOnceWith(testUser)).to.be.true;
		expect(statusSpy.calledOnceWith(200)).to.be.true;
	});
});
