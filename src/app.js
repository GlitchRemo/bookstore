const express = require("express");
const cookieParser = require("cookie-parser");
const { logger } = require("./middlewares/logger");
const { createAuthRoutes } = require("../router/auth-routes");

const createApp = (users) => {
	const app = express();

	app.use(logger);
	app.use(cookieParser());
	app.use(express.urlencoded());

	app.users = users;

	createAuthRoutes(app);

	app.use(express.static("public"));

	return app;
};

module.exports = { createApp };
