import { expect } from "chai";
import sinon from "sinon";

import { getAllPeeps } from "../controllers/peepsControllers/getAllPeeps.controller.js";
import { getAllPeepsService } from "../services/peepsServices/getAllPeeps.service.js";

describe("getAllPeeps controller test", () => {
	let req, res, getAllPeepsServiceStub, jsonSpy, statusSpy;

	beforeEach(function () {
		req = {};
		res = {
			status: () => res,
			json: () => res,
		};

		jsonSpy = sinon.spy(res, "json");

		statusSpy = sinon.spy(res, "status");

		getAllPeepsServiceStub = sinon.stub(getAllPeepsService, "getAllPeeps");
	});

	afterEach(function () {
		getAllPeepsServiceStub.restore();
		jsonSpy.restore();
		statusSpy.restore();
	});

	it("Should call getAllPeepsService", async () => {
		getAllPeepsServiceStub.returns(Promise.resolve([]));

		await getAllPeeps(req, res);

		expect(getAllPeepsServiceStub.calledOnce).to.be.true;
	});

	it("Should call res.json and res.status with the result of getAllPeepsService call", async () => {
		const testPeep = [
			{
				id: 1,
				content: "test",
			},
		];

		getAllPeepsServiceStub.returns(Promise.resolve(testPeep));

		await getAllPeeps(req, res);

		expect(jsonSpy.calledOnceWith(testPeep)).to.be.true;
		expect(statusSpy.calledOnceWith(200)).to.be.true;
	});
});
