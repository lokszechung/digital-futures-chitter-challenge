import { expect } from "chai";
import sinon from "sinon";

import { updatePeep } from "../controllers/peepsControllers/updatePeep.controller.js";
import { updatePeepService } from "../services/peepsServices/updatePeep.service.js";

describe("updatePeep controller test", () => {
	let req, res, updatePeepServiceStub, jsonSpy, statusSpy;

	beforeEach(function () {
		req = {};
		res = {
			status: () => res,
			json: () => res,
		};

		jsonSpy = sinon.spy(res, "json");

		statusSpy = sinon.spy(res, "status");

		updatePeepServiceStub = sinon.stub(updatePeepService, "updatePeep");
	});

	afterEach(function () {
		updatePeepServiceStub.restore();
		jsonSpy.restore();
		statusSpy.restore();
	});

	it("Should call updatePeepService", async () => {
		updatePeepServiceStub.returns(Promise.resolve([]));

		await updatePeep(req, res);

		expect(updatePeepServiceStub.calledOnce).to.be.true;
	});

	it("Should call res.json and res.status with the result of updatePeepService call", async () => {
		const testPeep = [
			{
				id: 1,
				content: "test",
			},
		];

		updatePeepServiceStub.returns(Promise.resolve(testPeep));

		await updatePeep(req, res);

		expect(jsonSpy.calledOnceWith(testPeep)).to.be.true;
		expect(statusSpy.calledOnceWith(200)).to.be.true;
	});
});
