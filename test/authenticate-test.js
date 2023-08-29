const assert = require("assert");
const { describe, it } = require("node:test");

const Users = require("../src/models/users");
const { authenticate } = require("../src/middleware/authenticate");

describe("middleware", () => {
	describe("authenticate", () => {
		it("should call the next fn for a valid user", (context) => {
			const next = context.mock.fn();

			const usersData = [
				{
					username: "Riya",
					password: "123",
					favourites: ["flamingo"],
				},
			];
			const users = new Users(usersData);
			const req = { app: { users }, cookies: { username: "Riya" } };

			authenticate(req, {}, next);

			assert.strictEqual(next.mock.callCount(), 1);
		});

		it("should redirect to login page for non existing user", (context) => {
			const req = { app: { users: { isValid: () => {} } } };
			const res = { redirect: context.mock.fn() };

			authenticate(req, res);

			assert.strictEqual(res.redirect.mock.calls[0].arguments[0], 302);
		});
	});
});
