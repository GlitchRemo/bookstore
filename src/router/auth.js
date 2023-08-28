const { loginUser, sendUserCredentials } = require("../handlers/login");
const { logoutUser } = require("../handlers/logout");
const { registerUser } = require("../handlers/register");

const createAuthRoutes = (app) => {
	app.post("/login", loginUser);
	app.get("/whoami", sendUserCredentials);

	app.post("/register", registerUser);
	app.post("/logout", logoutUser);
};

module.exports = { createAuthRoutes };
