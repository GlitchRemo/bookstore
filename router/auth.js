const { loginUser, sendUserCredentials } = require("../src/handlers/login");
const { logoutUser } = require("../src/handlers/logout");

const createAuthRoutes = (app) => {
	app.post("/login", loginUser);
	app.get("/whoami", sendUserCredentials);

	app.post("/logout", logoutUser);
};

module.exports = { createAuthRoutes };
