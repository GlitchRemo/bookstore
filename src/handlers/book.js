const fs = require("fs");

const generateAndSendHtml = ({ id, title, imgSrc, description }, res) => {
	fs.readFile("./templates/book.html", "utf-8", (_, content) => {
		const html = content
			.replace("{{title}}", title)
			.replace("{{id}}", id)
			.replace("{{description}}", description)
			.replace("{{imgSrc}}", imgSrc);

		res.send(html);
	});
};

const serveBook = (req, res) => {
	const { books } = req.app;
	const { bookId } = req.params;

	generateAndSendHtml(books.get(bookId), res);
};

const addReview = (req, res) => {
	const { books, booksStorage } = req.app;
	const { message } = req.body;
	const { bookId } = req.params;

	books.addReview(bookId, req.cookies.username, message);

	booksStorage.update(books.details, () => {
		res.status(201);
		res.json({ username: req.cookies.username, message });
	});
};

const sendReviews = (req, res) => {
	const { books } = req.app;
	const { bookId } = req.params;

	res.send(books.getReviews(bookId));
};

module.exports = { serveBook, addReview, sendReviews };
