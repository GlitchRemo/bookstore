const { addToFavourite, serveBook, addReview } = require("../handlers/book");
const { authenticate } = require("../middlewares/authenticate");

const createBookRoutes = (app) => {
	app.get("/books/:bookId", authenticate, serveBook);
	app.post("/user/favourites", addToFavourite);
	app.post("/books/:bookId/review", addReview);
};

module.exports = { createBookRoutes };
