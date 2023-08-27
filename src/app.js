const express = require("express");
const cookieParser = require("cookie-parser");
const { logger } = require("./middlewares/logger");
const { createAuthRoutes } = require("../router/auth");
const { createBookEngagementRoutes } = require("../router/book-engagement");

const createApp = (users) => {
	const app = express();

	app.use(logger);
	app.use(cookieParser());
	app.use(express.urlencoded());

	app.users = users;

	createAuthRoutes(app);
	createBookEngagementRoutes(app);

	app.use(express.static("public"));

	return app;
};

module.exports = { createApp };
