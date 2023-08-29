const assert = require("assert");
const { describe, it, beforeEach } = require("node:test");
const Users = require("../../src/models/users");

describe("Users", () => {
	let usersData, users;

	beforeEach(() => {
		usersData = [
			{
				username: "Riya",
				password: "123",
				favourites: [{ bookId: "ikigai", title: "Ikigai" }],
			},
		];

		users = new Users(usersData);
	});

	describe("add", () => {
		it("should add an user", () => {
			users.add("Vidita", "123");

			const userDetails = [
				{
					username: "Riya",
					password: "123",
					favourites: [{ bookId: "ikigai", title: "Ikigai" }],
				},
				{ username: "Vidita", password: "123", favourites: [] },
			];

			assert.deepStrictEqual(users.details, userDetails);
		});
	});

	describe("authenticate", () => {
		it("should provide true for correct username and password", () => {
			assert.ok(users.authenticate("Riya", "123"));
		});

		it("should provide false for incorrect username or password", () => {
			assert.ok(!users.authenticate("Riya", "1234"));
		});
	});

	describe("addToFavourite", () => {
		it("should add a book to favourites list of a given user", () => {
			users.addToFavourite("Riya", { bookId: "flamingo", title: "Flamingo" });

			const userDetails = [
				{
					username: "Riya",
					password: "123",
					favourites: [
						{ bookId: "ikigai", title: "Ikigai" },
						{ bookId: "flamingo", title: "Flamingo" },
					],
				},
			];

			assert.deepStrictEqual(users.details, userDetails);
		});
	});

	describe("getFavourites", () => {
		it("should provide favourites of a given user", () => {
			const favourites = [{ bookId: "ikigai", title: "Ikigai" }];

			assert.deepStrictEqual(users.getFavourites("Riya"), favourites);
		});
	});

	describe("isValid", () => {
		it("should provide true if user exists", () => {
			assert.ok(users.isValid("Riya"));
		});

		it("should provide false if user doesn't exists", () => {
			assert.ok(!users.isValid("Vidita"));
		});
	});
});
