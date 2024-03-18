import { expect } from "chai";
import sinon from "sinon";

import { addPeep } from "../controllers/peepsControllers/addPeep.controller.js";
import { addPeepService } from "../services/peepsServices/addPeep.service.js";

describe("addPeep controller test", () => {
	let req, res, addPeepServiceStub, jsonSpy, statusSpy;

	beforeEach(function () {
		req = {};
		res = {
			status: () => res,
			json: () => res,
		};

		jsonSpy = sinon.spy(res, "json");

		statusSpy = sinon.spy(res, "status");

		addPeepServiceStub = sinon.stub(addPeepService, "addPeep");
	});

	afterEach(function () {
		addPeepServiceStub.restore();
		jsonSpy.restore();
		statusSpy.restore();
	});

	it("Should call addPeepService", async () => {
		addPeepServiceStub.returns(Promise.resolve([]));

		await addPeep(req, res);

		expect(addPeepServiceStub.calledOnce).to.be.true;
	});

	it("Should call res.json and res.status with the result of addPeepService call", async () => {
		const testPeep = [
			{
				id: 1,
				content: "test",
			},
		];

		addPeepServiceStub.returns(Promise.resolve(testPeep));

		await addPeep(req, res);

		expect(jsonSpy.calledOnceWith(testPeep)).to.be.true;
		expect(statusSpy.calledOnceWith(201)).to.be.true;
	});
});
