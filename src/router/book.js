const {
	addToFavourite,
	serveBook,
	addReview,
	sendReviews,
} = require("../handlers/book");
const { authenticate } = require("../middlewares/authenticate");

const createBookRoutes = (app) => {
	app.get("/books/:bookId", authenticate, serveBook);
	app.post("/user/favourites", addToFavourite);
	app.post("/books/:bookId/review", addReview);
	app.get("/books/:bookId/reviews", sendReviews);
};

module.exports = { createBookRoutes };
