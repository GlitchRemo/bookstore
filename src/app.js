const express = require("express");
const cookieParser = require("cookie-parser");

const { logger } = require("./middleware/logger");
const { createAuthRoutes } = require("./router/auth");
const { createBookRoutes } = require("./router/book");

const createApp = (users, books, usersStorage, booksStorage) => {
	const app = express();

	app.use(logger);
	app.use(cookieParser());
	app.use(express.json());
	app.use(express.urlencoded());

	app.users = users;
	app.books = books;
	app.usersStorage = usersStorage;
	app.booksStorage = booksStorage;

	createAuthRoutes(app);
	createBookRoutes(app);

	app.use(express.static("public"));

	return app;
};

module.exports = { createApp };
