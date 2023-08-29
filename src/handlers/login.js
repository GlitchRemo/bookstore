const loginUser = (req, res) => {
	const { username, password } = req.body;
	const { users } = req.app;

	const isValidUser = users.authenticate(username, password);

	if (isValidUser) {
		res.cookie("username", username);
		res.redirect(302, "/");
		return;
	}

	// eslint-disable-next-line max-len
	res.sendStatus(403); //client can use this status code to warn and reload the login page
};

const isUserLoggedIn = (req) => req.cookies?.username;

const sendUserCredentials = (req, res) => {
	if (isUserLoggedIn(req)) {
		res.send({ username: req.cookies.username, login: true });
		return;
	}

	res.send({ login: false });
};

module.exports = { loginUser, sendUserCredentials };
