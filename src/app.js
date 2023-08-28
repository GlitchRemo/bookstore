const express = require("express");
const cookieParser = require("cookie-parser");

const { logger } = require("./middlewares/logger");
const { createAuthRoutes } = require("./router/auth");
const { createBookRoutes } = require("./router/book");
const { createUserRoutes } = require("./router/user");

const createApp = (users, books) => {
	const app = express();

	app.use(logger);
	app.use(cookieParser());
	app.use(express.json());
	app.use(express.urlencoded());

	app.users = users;
	app.books = books;

	createAuthRoutes(app);
	createBookRoutes(app);
	createUserRoutes(app);

	app.use(express.static("public"));

	return app;
};

module.exports = { createApp };
