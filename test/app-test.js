const request = require("supertest");
const { describe, it } = require("node:test");
const { createApp } = require("../src/app");
const Users = require("../src/models/users");

describe("App", () => {
	describe("POST /login", () => {
		it("should allow login for a valid user", (_, done) => {
			const users = new Users();
			const app = createApp(users);

			request(app)
				.post("/login")
				.send("username=Riya&password=123")
				.expect(301)
				.expect("set-cookie", "username=Riya; Path=/")
				.expect("location", "/")
				.end(done);
		});

		it("should not allow login for an invalid user ", (_, done) => {
			const users = new Users();
			const app = createApp(users);

			request(app)
				.post("/login")
				.send("username=Riya&password=1234")
				.expect(403)
				.end(done);
		});
	});

	describe("GET /whoami", () => {
		it("should not send credentials of non existing users", (_, done) => {
			const app = createApp();

			request(app)
				.get("/whoami")
				.expect(200)
				.expect({ login: false })
				.end(done);
		});

		it("should send the credentials of existing users", (_, done) => {
			const app = createApp();

			request(app)
				.get("/whoami")
				.set("Cookie", "username=Riya")
				.expect(200)
				.expect({ username: "Riya", login: true })
				.end(done);
		});
	});
});
