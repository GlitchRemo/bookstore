const { loginUser, sendUserCredentials } = require("../handlers/login");
const { logoutUser } = require("../handlers/logout");

const createAuthRoutes = (app) => {
	app.post("/login", loginUser);
	app.get("/whoami", sendUserCredentials);

	app.post("/logout", logoutUser);
};

module.exports = { createAuthRoutes };
