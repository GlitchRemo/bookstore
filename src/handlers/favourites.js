const sendFavourites = (req, res) => {
	const { users } = req.app;
	const username = req.cookies.username;

	res.json(users.getFavourites(username));
};

module.exports = { sendFavourites };
