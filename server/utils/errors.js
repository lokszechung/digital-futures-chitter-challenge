export class Unauthorised extends Error {
	constructor(message) {
		super(message);
		this.name = "Unauthorised";
		this.message = message;
		this.status = 401;
	}
}

export class NotFound extends Error {
	constructor(message) {
		super(message);
		this.name = "NotFound";
		this.message = message;
		this.status = 404;
	}
}
