const sendFavourites = (req, res) => {
	const { users } = req.app;
	const username = req.cookies.username;

	res.json(users.getFavourites(username));
};

const addToFavourite = (req, res) => {
	const { bookId } = req.body;
	const { users, books, usersStorage } = req.app;

	const username = req.cookies.username;

	const title = books.getTitle(bookId);
	users.addToFavourite(username, { bookId, title });

	usersStorage.update(users.details, () => {
		res.sendStatus(201);
	});
};

module.exports = { sendFavourites, addToFavourite };
