const registerUser = (req, res) => {
	const { username, password } = req.body;
	const { users, usersStorage } = req.app;

	users.add(username, password);
	usersStorage.update(users.details).then(() => {
		res.cookie("username", username);
		res.redirect(301, "/");
	});
};

module.exports = { registerUser };
