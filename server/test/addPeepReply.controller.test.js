import { expect } from "chai";
import sinon from "sinon";

import { addPeepReply } from "../controllers/peepsControllers/addPeepReply.controller.js";
import { addPeepReplyService } from "../services/peepsServices/addPeepReply.service.js";
import { addNotificationService } from "../services/notificationsServices/addNotification.service.js";
import sendEmail from "../utils/sendEmail.js";

describe("addPeepReply controller test", () => {
	let req,
		res,
		addPeepReplyServiceStub,
		addNotificationServiceStub,
		sendEmailStub,
		jsonSpy,
		statusSpy;

	beforeEach(function () {
		req = {};
		res = {
			status: () => res,
			json: () => res,
		};

		jsonSpy = sinon.spy(res, "json");

		statusSpy = sinon.spy(res, "status");

		addPeepReplyServiceStub = sinon.stub(addPeepReplyService, "addPeepReply");
		addNotificationServiceStub = sinon.stub(
			addNotificationService,
			"addNotification"
		);
		sendEmailStub = sinon.stub(sendEmail, "send");
	});

	afterEach(function () {
		addPeepReplyServiceStub.restore();
		addNotificationServiceStub.restore();
		sendEmailStub.restore();
		jsonSpy.restore();
		statusSpy.restore();
	});

	it("Should call addPeepReplyService", async () => {
		addPeepReplyServiceStub.returns(Promise.resolve([]));

		await addPeepReply(req, res);

		expect(addPeepReplyServiceStub.calledOnce).to.be.true;
	});

	it("Should call addNotificationService", async () => {
		addNotificationServiceStub.returns(Promise.resolve([]));

		await addPeepReply(req, res);

		expect(addNotificationServiceStub.calledOnce).to.be.true;
	});

	it("Should call sendEmail", async () => {
		addNotificationServiceStub.returns(Promise.resolve({ notification: true }));
		sendEmailStub.returns(Promise.resolve([]));

		await addPeepReply(req, res);

		expect(sendEmailStub.calledOnce).to.be.true;
	});

	it("Should call res.json and res.status with the result of addPeepReplyService call", async () => {
		const testPeep = [
			{
				id: 1,
				content: "test",
			},
		];

		addPeepReplyServiceStub.returns(Promise.resolve(testPeep));
		addNotificationServiceStub.returns(Promise.resolve({}));
		sendEmailStub.returns(Promise.resolve({}));

		await addPeepReply(req, res);

		// console.log(response.status);
		expect(jsonSpy.calledOnceWith({ peep: testPeep, notification: {} })).to.be
			.true;
		expect(statusSpy.calledOnceWith(200)).to.be.true;
	});
});
