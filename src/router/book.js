const { addToFavourite, serveBook, addReview } = require("../handlers/book");

const createBookRoutes = (app) => {
	app.get("/books/:bookId", serveBook);
	app.post("/user/favourites", addToFavourite);
	app.post("/books/:bookId/review", addReview);
};

module.exports = { createBookRoutes };
