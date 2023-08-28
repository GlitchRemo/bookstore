const { sendFavourites } = require("../handlers/favourites");

const createUserRoutes = (app) => {
	app.get("/user/favourites", sendFavourites);
};

module.exports = { createUserRoutes };
