const registerUser = (req, res) => {
	const { username, password } = req.body;
	const { users } = req.app;

	users.add(username, password);

	res.cookie("username", username);
	res.redirect(301, "/");
};

module.exports = { registerUser };
