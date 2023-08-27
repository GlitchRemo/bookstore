const fs = require("fs");
const request = require("supertest");
const { describe, it } = require("node:test");
const { createApp } = require("../src/app");
const Users = require("../src/models/users");
const Books = require("../src/models/books");

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

	describe("POST /logout", () => {
		const app = createApp();

		it("should logout the current logged in user", (_, done) => {
			request(app)
				.post("/logout")
				.set("Cookie", "username=Riya")
				.send()
				.expect(301)
				.expect("set-cookie", /username=;/)
				.expect("location", "/")
				.end(done);
		});
	});

	describe("POST /user/favourites", () => {
		const users = new Users();
		const app = createApp(users);

		it("should add a book to favourites list of logged in user", (_, done) => {
			request(app)
				.post("/user/favourites")
				.set("Cookie", "username=Riya")
				.send({ title: "flamingo" })
				.expect(201)
				.end(done);
		});
	});

	describe("GET /books/bookId", () => {
		const booksData = {
			flamingo: {
				id: "flamingo",
				title: "Flamingo",
				imgSrc: "/flamingo.jpg",
				description: "Good Book",
			},
		};

		const books = new Books(booksData);
		const app = createApp({}, books);

		it("should send the html of the specified book", (_, done) => {
			const flamingoHtml = fs.readFileSync(
				"./test-data/flamingo.html",
				"utf-8"
			);

			request(app)
				.get("/books/flamingo")
				.expect(200)
				.expect("content-type", /text\/html/)
				.expect(flamingoHtml)
				.end(done);
		});
	});
});
