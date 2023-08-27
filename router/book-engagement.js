const { addToFavourite } = require("../src/handlers/add-to-favourite");

const createBookEngagementRoutes = (app) => {
	app.post("/user/favourites", addToFavourite);
};

module.exports = { createBookEngagementRoutes };
