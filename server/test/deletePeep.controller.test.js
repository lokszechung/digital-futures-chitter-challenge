import { expect } from "chai";
import sinon from "sinon";

import { deletePeep } from "../controllers/peepsControllers/deletePeep.controller.js";
import { deletePeepService } from "../services/peepsServices/deletePeep.service.js";

describe("deletePeep controller test", () => {
	let req, res, deletePeepServiceStub, jsonSpy, statusSpy, sendStatusSpy;

	beforeEach(function () {
		req = {};
		res = {
			status: () => res,
			json: () => res,
			sendStatus: () => res,
		};

		jsonSpy = sinon.spy(res, "json");

		statusSpy = sinon.spy(res, "status");

		sendStatusSpy = sinon.spy(res, "sendStatus");

		deletePeepServiceStub = sinon.stub(deletePeepService, "deletePeep");
	});

	afterEach(function () {
		deletePeepServiceStub.restore();
		jsonSpy.restore();
		statusSpy.restore();
		sendStatusSpy.restore();
	});

	it("Should call deletePeepService", async () => {
		deletePeepServiceStub.returns(Promise.resolve([]));

		await deletePeep(req, res);

		expect(deletePeepServiceStub.calledOnce).to.be.true;
	});

	it("Should call res.status with the result of deletePeepService call", async () => {
		deletePeepServiceStub.returns(Promise.resolve([]));

		await deletePeep(req, res);

		expect(sendStatusSpy.calledOnceWith(204)).to.be.true;
	});
});
