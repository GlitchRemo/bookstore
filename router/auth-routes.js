const { userLogin, sendUserCredentials } = require("../src/handlers/login");

const createAuthRoutes = (app) => {
	app.post("/login", userLogin);

	app.get("/whoami", sendUserCredentials);
};

module.exports = { createAuthRoutes };
