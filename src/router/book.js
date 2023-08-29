const { serveBook, addReview, sendReviews } = require("../handlers/book");
const { addToFavourite, sendFavourites } = require("../handlers/favourites");
const { authenticate } = require("../middleware/authenticate");

const createBookRoutes = (app) => {
	app.get("/books/:bookId", authenticate, serveBook);

	app.post("/user/favourites", addToFavourite);
	app.get("/user/favourites", sendFavourites);

	app.post("/books/:bookId/review", addReview);
	app.get("/books/:bookId/reviews", sendReviews);
};

module.exports = { createBookRoutes };
