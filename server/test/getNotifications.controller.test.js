import { expect } from "chai";
import sinon from "sinon";

import { getNotifications } from "../controllers/notificationsControllers/getNotifications.controller.js";
import { getNotificationsService } from "../services/notificationsServices/getNotifications.service.js";

describe("getNotifications controller test", () => {
	let req, res, getNotificationsServiceStub, jsonSpy, statusSpy;

	beforeEach(function () {
		req = {};
		res = {
			status: () => res,
			json: () => res,
		};

		jsonSpy = sinon.spy(res, "json");

		statusSpy = sinon.spy(res, "status");

		getNotificationsServiceStub = sinon.stub(
			getNotificationsService,
			"getNotifications"
		);
	});

	afterEach(function () {
		getNotificationsServiceStub.restore();
		jsonSpy.restore();
		statusSpy.restore();
	});

	it("Should call getNotificationsService", async () => {
		getNotificationsServiceStub.returns(Promise.resolve([]));

		await getNotifications(req, res);

		expect(getNotificationsServiceStub.calledOnce).to.be.true;
	});

	it("Should call res.json and res.status with the result of getNotificationsService call", async () => {
		const testNotif = [
			{
				id: 1,
				content: "test",
			},
		];

		getNotificationsServiceStub.returns(Promise.resolve(testNotif));

		await getNotifications(req, res);

		expect(jsonSpy.calledOnceWith(testNotif)).to.be.true;
		expect(statusSpy.calledOnceWith(200)).to.be.true;
	});
});
