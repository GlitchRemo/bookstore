const fs = require("fs");

const request = require("supertest");
const { describe, it, beforeEach } = require("node:test");

const Users = require("../src/models/users");
const Books = require("../src/models/books");
const { createApp } = require("../src/app");

describe("App", () => {
	describe("POST /login", () => {
		let usersData, users, app;

		beforeEach(() => {
			usersData = [{ username: "Riya", password: "123", favourites: [] }];
			users = new Users(usersData);
			app = createApp(users);
		});

		it("should allow login for a valid user", (_, done) => {
			request(app)
				.post("/login")
				.send("username=Riya&password=123")
				.expect(303)
				.expect("set-cookie", "username=Riya; Path=/")
				.expect("location", "/")
				.end(done);
		});

		it("should not allow login for an invalid user ", (_, done) => {
			request(app)
				.post("/login")
				.send("username=Vidita&password=1234")
				.expect(403)
				.end(done);
		});
	});

	describe("GET /whoami", () => {
		it("should not send credentials of non logged in users", (_, done) => {
			const app = createApp();

			request(app)
				.get("/whoami")
				.expect(200)
				.expect({ login: false })
				.end(done);
		});

		it("should send the credentials of logged in users", (_, done) => {
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
		it("should logout the current logged in user", (_, done) => {
			const app = createApp();

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
		it("should add a book to favourites list of logged in user", (_, done) => {
			const users = new Users();
			const app = createApp(users);

			request(app)
				.post("/user/favourites")
				.set("Cookie", "username=Riya")
				.send({ bookId: "flamingo" })
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

		it("should send the html of the specified book", (_, done) => {
			const books = new Books(booksData);
			const app = createApp({}, books);

			const flamingoHtml = fs.readFileSync(
				"./test-data/flamingo.html",
				"utf-8"
			);

			request(app)
				.get("/books/flamingo")
				.set("Cookie", "username=Riya")
				.expect(200)
				.expect("content-type", /text\/html/)
				.expect(flamingoHtml)
				.end(done);
		});
	});

	describe("POST /books/bookId/review", () => {
		it("should add a review to the book with logged in username", (_, done) => {
			const books = new Books();
			const app = createApp({}, books);

			request(app)
				.post("/books/flamingo/review")
				.set("Cookie", "username=Riya")
				.send({ message: "Nice Book" })
				.expect(201)
				.expect({ username: "Riya", message: "Nice Book" })
				.end(done);
		});
	});

	describe("GET /books/bookId/reviews", () => {
		it("should send reviews for a particular book", (_, done) => {
			const booksData = {
				flamingo: {
					id: "flamingo",
					title: "Flamingo",
					imgSrc: "/images/flamingo.jpg",
					description: "Good Book",
					reviews: [
						{ username: "Riya", message: "Good book" },
						{ username: "Vidita", message: "Nice book" },
					],
				},
			};

			const books = new Books(booksData);
			const app = createApp({}, books);

			request(app)
				.get("/books/flamingo/reviews")
				.expect(200)
				.expect([
					{ username: "Riya", message: "Good book" },
					{ username: "Vidita", message: "Nice book" },
				])
				.end(done);
		});
	});

	describe("POST /register", () => {
		it("should create an user account", (_, done) => {
			const users = new Users();
			const app = createApp(users);

			request(app)
				.post("/register")
				.send({ username: "Sauma", password: "1234" })
				.expect(301)
				.expect("set-cookie", "username=Sauma; Path=/")
				.expect("location", "/")
				.end(done);
		});
	});
});
