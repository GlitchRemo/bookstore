const request = require("supertest");
const { describe, it } = require("node:test");
const { createApp } = require("../src/app");

describe("App", () => {
	describe("POST /login", () => {
		it("should authenticate and log in an user", (_, done) => {
			const app = createApp();

			request(app)
				.post("/login")
				.send("username=Riya&password=123")
				.expect(301)
				.expect("set-cookie", "username=Riya; Path=/")
				.expect("location", "/")
				.end(done);
		});
	});

	describe("GET /whoami", () => {
		it("should send the login status and user credentials", (_, done) => {
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
