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

const addToFavourite = (req, res) => {
	const { bookId } = req.body;
	const { users } = req.app;

	users.addToFavourite(req.cookies.username, bookId);
	console.log(users.favourites);

	res.sendStatus(201);
};

module.exports = { addToFavourite, serveBook };
