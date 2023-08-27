const { addToFavourite, serveBook } = require("../handlers/book");

const createBookRoutes = (app) => {
	app.get("/books/:bookId", serveBook);
	app.post("/user/favourites", addToFavourite);
};

module.exports = { createBookRoutes };
