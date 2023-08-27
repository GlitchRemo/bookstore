const addToFavourite = (req, res) => {
	const { title } = req.body;
	const { users } = req.app;

	users.addToFavourite(req.cookies.username, title);

	res.status(201);
	res.send();
};

module.exports = { addToFavourite };
